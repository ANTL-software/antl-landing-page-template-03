export type StoreProduct = { id: string; name: string; description: string; price: number; image: string; accent: string };
export type StoreSite = { brand: string; announcement: string; hero: { eyebrow: string; title: string; text: string; image: string }; products: readonly StoreProduct[]; sections: readonly { id: "hero" | "products" | "story"; enabled: boolean }[] };
