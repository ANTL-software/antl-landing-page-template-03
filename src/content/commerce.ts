import heroImage from "../assets/veloce-hero.jpg";
import primaveraImage from "../assets/veloce-primavera.jpg";
import mikeVeraImage from "../assets/veloce-mike-vera.jpg";
import lavandeSpeziaImage from "../assets/veloce-lavande-spezia.jpg";
import type { StoreSite } from "../types/commerce.types";

export const commerceSite: StoreSite = {
  brand: "VÉLOCE",
  language: "fr",
  announcement: "Livraison offerte dès 45 € · Des apéritifs sans détour.",
  theme: { palette: { ink: "#161310", paper: "#f5f1e8", cocoa: "#382b1c", sand: "#d5ad77", accent: "#d49a57", muted: "#5f554b" }, fonts: { display: "Cormorant Garamond, Georgia, serif", body: "DM Sans, Arial, sans-serif" }, radius: "0px" },
  navigation: [{ label: "Boutique", href: "#shop" }, { label: "Le rituel", href: "#rituel" }, { label: "L'histoire", href: "#histoire" }],
  hero: { eyebrow: "Aperitivi italiani", title: "Un apéro qui a du rythme.", text: "Des boissons pétillantes, amères et très fraîches, imaginées pour rallonger les soirées.", cta: { label: "Voir la collection", href: "#shop" }, image: heroImage, imageAlt: "Assortiment de boissons VÉLOCE" },
  collection: { eyebrow: "La collection", title: "Choisissez votre tempo.", addLabel: "Ajouter" },
  marquee: ["L'apéritif sans détour", "Servir très frais", "Fabriqué pour s'attarder", "Livraison offerte dès 45 €"],
  ritual: { eyebrow: "Le rituel VÉLOCE", title: "Trois gestes. Toute la soirée.", text: "Une bouteille, du froid, et ce qu'il faut de temps. Les recettes sont pensées pour rester simples, même quand la table ne l'est plus.", steps: [{ number: "01", title: "Un grand verre", text: "Prenez un verre qui laisse respirer les arômes." }, { number: "02", title: "Beaucoup de glace", text: "Le froid allonge le moment sans diluer le goût." }, { number: "03", title: "Le détail frais", text: "Un agrume, une herbe, ou rien du tout." }] },
  services: [{ icon: "delivery", title: "Expédition soignée", text: "Préparée en 24 à 48 h ouvrées." }, { icon: "card", title: "Paiement sécurisé", text: "Checkout Stripe une fois configuré." }, { icon: "leaf", title: "À savourer librement", text: "Pur, allongé ou en cocktail." }],
  story: { eyebrow: "À servir très frais", title: "Fabriqué pour les tables qui s'éternisent.", text: "VÉLOCE accompagne les apéritifs spontanés, les grands repas et les retours de marché. À boire pur, allongé ou mélangé." },
  footer: "Template e-commerce antl",
  products: [
    { id: "primavera", offerId: "primavera", name: "Primavera", collection: "Aperitivo", description: "Pamplemousse rose, gentiane et agrumes.", price: 24, currency: "EUR", image: primaveraImage, imageAlt: "Bouteille d'apéritif ambré Primavera avec pamplemousse", accent: "#d49a57", available: true, volume: "70 cl", notes: ["Pamplemousse", "Gentiane", "Agrumes"], badge: "Best-seller" },
    { id: "mike-vera", offerId: "mike-vera", name: "Mike Vera", collection: "Bitter", description: "Bitter rouge, orange sanguine et épices.", price: 26, currency: "EUR", image: mikeVeraImage, imageAlt: "Bouteille de bitter rouge Mike Vera avec orange sanguine", accent: "#9b3827", available: true, volume: "70 cl", notes: ["Orange sanguine", "Épices", "Bitter"], badge: "Nouveau" },
    { id: "lavande-spezia", offerId: "lavande-spezia", name: "Lavande Spezia", collection: "Soda botanique", description: "Lavande, citron et herbes de Méditerranée.", price: 25, currency: "EUR", image: lavandeSpeziaImage, imageAlt: "Bouteille de soda botanique Lavande Spezia avec citron", accent: "#7b8061", available: true, volume: "70 cl", notes: ["Lavande", "Citron", "Herbes"], badge: "Sans alcool" },
  ],
  sections: [{ id: "hero", enabled: true }, { id: "marquee", enabled: true }, { id: "products", enabled: true }, { id: "ritual", enabled: true }, { id: "services", enabled: true }, { id: "story", enabled: true }],
};
