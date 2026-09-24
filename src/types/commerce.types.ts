export type CurrencyCode = "EUR";

export type ThemePalette = { ink: string; paper: string; cocoa: string; sand: string; accent: string; muted: string };
export type StoreTheme = { palette: ThemePalette; fonts: { display: string; body: string }; radius: string };
export type StoreProduct = {
  id: string; offerId: string; name: string; collection: string; description: string; price: number; currency: CurrencyCode;
  image: string; imageAlt: string; accent: string; available: boolean; volume: string; notes: readonly string[]; badge?: string;
};
export type StoreSectionId = "hero" | "marquee" | "products" | "ritual" | "services" | "story";
export type StoreSection = { id: StoreSectionId; enabled: boolean };
export type StoreNavigationItem = { label: string; href: string };
export type StoreSite = {
  brand: string; language: "fr"; announcement: string; theme: StoreTheme; navigation: readonly StoreNavigationItem[];
  hero: { eyebrow: string; title: string; text: string; cta: StoreNavigationItem; image: string; imageAlt: string };
  collection: { eyebrow: string; title: string; addLabel: string };
  marquee: readonly string[];
  ritual: { eyebrow: string; title: string; text: string; steps: readonly { number: string; title: string; text: string }[] };
  services: readonly { icon: "delivery" | "card" | "leaf"; title: string; text: string }[];
  story: { eyebrow: string; title: string; text: string };
  footer: string; products: readonly StoreProduct[]; sections: readonly StoreSection[];
};
export type CartLine = { product: StoreProduct; quantity: number };
