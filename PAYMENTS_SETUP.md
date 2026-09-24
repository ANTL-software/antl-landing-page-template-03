# Paiements du site

Les fichiers dans `src/payments` et `server/payments` appartiennent à ce projet. Le site utilise directement les clés du compte Stripe du client. Aucun service ni dépôt central n'intervient dans l'encaissement.

## Configuration

1. Installer `stripe` (`npm install stripe`) et les types Node (`npm install -D @types/node`) dans le projet. React est nécessaire uniquement si `src/payments/react.tsx` a été exporté.
2. Copier les noms de variables de `server/payments/env.payments.example` dans les secrets de l'hébergement. Garder `STRIPE_SECRET_KEY` et `STRIPE_WEBHOOK_SECRET` côté serveur exclusivement.
3. Renseigner le compte Stripe bénéficiaire dans `STRIPE_ACCOUNT_ID`. Le code vérifie que la clé secrète utilisée appartient à ce compte avant de créer un paiement.
4. Définir les offres dans `server/payments/config.ts`. Les clés (`primavera`, `mike-vera`, etc.) correspondent aux `offerId` des produits dans `src/content/commerce.ts`. Pour chaque offre, renseigner un prix Stripe ponctuel, son montant en plus petite unité monétaire et sa devise. Les valeurs déclarées sont comparées à Stripe avant le premier paiement de chaque instance serveur. Appeler `await payments.verify()` avant l'ouverture du site pour vérifier la configuration immédiatement.
5. Configurer `/api/checkout` et `/api/stripe-webhook` dans le serveur du site. `server/payments/checkout.ts` valide le body et crée une session pour une offre ou un panier. Le webhook doit recevoir le corps brut et traiter `checkout.session.completed` ainsi que `checkout.session.async_payment_succeeded`.
6. L'action métier après paiement doit être durable et idempotente sur `session.id`. Tester en mode test avant de renseigner des clés et prix live.

Le navigateur n'envoie que l'identifiant d'offre ou le panier : par exemple `{ "lines": [{ "offerId": "primavera", "quantity": 2 }] }`. Les prix restent résolus dans le catalogue serveur. Le client autonome est dans `src/payments/client.ts` et l'adaptateur de panier du site dans `src/payments/checkout.ts`.

Exemple de route Checkout Express :

```ts
import { createCheckout } from './server/payments/checkout.js';
import { UnknownOfferError } from './server/payments/server.js';

app.use(express.json());
app.post('/api/checkout', async (req, res) => {
  try {
    res.json(await createCheckout(req.body));
  } catch (error) {
    res.sendStatus(error instanceof UnknownOfferError ? 400 : 500);
  }
});
```

Exemple de traitement webhook dans un serveur Express : monter cette route **avant** `express.json()`.

```ts
import express from 'express';
import { stripe, stripeWebhookSecret } from './server/payments/config.js';
import { InvalidWebhookSignatureError, processStripeWebhook } from './server/payments/server.js';

app.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    await processStripeWebhook({
      stripe,
      payload: req.body as Buffer,
      signature: req.header('stripe-signature') ?? '',
      webhookSecret: stripeWebhookSecret,
      onPaidOnce: fulfillPaidSession,
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(error instanceof InvalidWebhookSignatureError ? 400 : 500);
  }
});
```

`fulfillPaidSession` appartient au métier du site. Il doit enregistrer l'identifiant de session Stripe sous contrainte d'unicité et ne livrer la commande qu'une fois. Une page de succès ne remplace pas ce traitement. GitHub Pages sert uniquement la démo : déployer ces routes sur un hébergement Node ou serverless avant d'activer `VITE_PAYMENTS_ENABLED=true`.
