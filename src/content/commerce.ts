import heroImage from "../assets/veloce-hero.png";
import type { StoreSite } from "../types/commerce.types";

export const commerceSite: StoreSite = {
  brand: "VÉLOCE",
  announcement: "Livraison offerte dès 45 € · Des apéritifs sans détour.",
  hero: { eyebrow: "Aperitivi italiani", title: "Un apéro qui a du rythme.", text: "Des boissons pétillantes, amères et très fraîches, imaginées pour rallonger les soirées.", image: heroImage },
  products: [
    { id: "primavera", name: "Primavera", description: "Pamplemousse rose, gentiane et agrumes.", price: 24, image: heroImage, accent: "#d49a57" },
    { id: "mike-vera", name: "Mike Vera", description: "Bitter rouge, orange sanguine et épices.", price: 26, image: heroImage, accent: "#9b3827" },
    { id: "lavande", name: "Lavande Spezia", description: "Lavande, citron et herbes de Méditerranée.", price: 25, image: heroImage, accent: "#7b8061" },
  ],
  sections: [{ id: "hero", enabled: true }, { id: "products", enabled: true }, { id: "story", enabled: true }],
};
