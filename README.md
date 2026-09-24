# antl — E-commerce Template 03

Base e-commerce React / Vite / TypeScript, conçue pour être livrée à un client puis adaptée sans modifier les composants métier.

## Personnaliser une boutique

[`src/content/commerce.ts`](src/content/commerce.ts) est la source unique pour :

- la marque, les textes, navigation et message d'annonce ;
- la palette, les polices et le rayon des éléments ;
- le contenu et l'ordre des sections (`sections`) ;
- les produits, images, libellés, disponibilité, prix de démonstration et `offerId` Stripe.

Les sections sont des composants indépendants dans `src/views/layouts/commercePage/components/`. Déplacer une entrée dans `sections`, ou mettre `enabled: false`, modifie la page sans toucher à son rendu.

## Panier et paiement

Le panier est persistant dans le navigateur, gère les quantités et ne transmet au paiement que les `offerId` et quantités. Les montants ne viennent jamais du front.

Le module autonome `antl-site-payments` a été exporté dans ce dépôt :

- client : `src/payments/` ;
- vérification Stripe et Checkout : `server/payments/` ;
- variables serveur : `server/payments/env.payments.example` ;
- guide de branchement : [`PAYMENTS_SETUP.md`](PAYMENTS_SETUP.md).

Le paiement est désactivé par défaut avec `VITE_PAYMENTS_ENABLED=false`. GitHub Pages héberge la démo statique ; un paiement réel nécessite un hébergement avec une route serveur `/api/checkout` et un webhook Stripe. Ne placez jamais une clé Stripe secrète dans un fichier `VITE_*`.

## Vérifier et démarrer

```sh
npm install
npm run dev
npm run verify
```

`npm run verify` compile le front et les sources serveur de paiement. Avant une mise en ligne marchande, renseigner le compte Stripe du client, vérifier les prix et exécuter un paiement de test avec le webhook configuré.
