import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { commerceSite } from "../../../content/commerce";
import { useCart } from "../../../hooks/useCart";
import type { StoreSection } from "../../../types/commerce.types";
import { CartDrawer } from "./components/CartDrawer";
import { CommerceHeader } from "./components/CommerceHeader";
import { HeroSection } from "./components/HeroSection";
import { ProductCollection } from "./components/ProductCollection";
import { StorySection } from "./components/StorySection";
import { MarqueeSection } from "./components/MarqueeSection";
import { RitualSection } from "./components/RitualSection";
import { ServiceStrip } from "./components/ServiceStrip";
import "./commercePage.scss";

type ThemeVariable = "--store-ink" | "--store-paper" | "--store-cocoa" | "--store-sand" | "--store-accent" | "--store-muted" | "--store-display" | "--store-body" | "--store-radius";
type ThemeStyle = CSSProperties & Record<ThemeVariable, string>;

function themeStyle(): ThemeStyle {
  const { palette, fonts, radius } = commerceSite.theme;
  return { "--store-ink": palette.ink, "--store-paper": palette.paper, "--store-cocoa": palette.cocoa, "--store-sand": palette.sand, "--store-accent": palette.accent, "--store-muted": palette.muted, "--store-display": fonts.display, "--store-body": fonts.body, "--store-radius": radius };
}

export function CommercePage() {
  const cart = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [lastAdded, setLastAdded] = useState("");
  function addProduct(product: typeof commerceSite.products[number]) {
    cart.add(product);
    setLastAdded(product.name);
    window.setTimeout(() => setLastAdded(""), 2600);
  }
  const sections: Record<StoreSection["id"], () => ReactNode> = {
    hero: () => <HeroSection hero={commerceSite.hero} />,
    marquee: () => <MarqueeSection items={commerceSite.marquee} />,
    products: () => <ProductCollection collection={commerceSite.collection} products={commerceSite.products} onAdd={addProduct} />,
    ritual: () => <RitualSection ritual={commerceSite.ritual} />,
    services: () => <ServiceStrip services={commerceSite.services} />,
    story: () => <StorySection story={commerceSite.story} />,
  };
  return <main className="veloce" lang={commerceSite.language} style={themeStyle()}>
    <div className="veloce__announcement">{commerceSite.announcement}</div>
    <CommerceHeader brand={commerceSite.brand} navigation={commerceSite.navigation} cartCount={cart.count} onOpenCart={() => dialogRef.current?.showModal()} />
    {commerceSite.sections.filter((section) => section.enabled).map((section) => <div key={section.id}>{sections[section.id]()}</div>)}
    <footer>© 2026 {commerceSite.brand} · {commerceSite.footer}</footer>
    <CartDrawer dialogRef={dialogRef} lines={cart.lines} total={cart.total} onAdd={addProduct} onDecrease={cart.decrease} onRemove={cart.remove} />
    {lastAdded ? <button className="veloce__toast" type="button" onClick={() => dialogRef.current?.showModal()}>{lastAdded} ajouté au panier <span>Voir le panier →</span></button> : null}
  </main>;
}

export function CommerceNotFoundPage() {
  return <main className="veloce veloce__not-found" style={themeStyle()}><p className="veloce__eyebrow">404</p><h1>Cette bouteille n'existe pas.</h1><a className="veloce__cta" href="#/"><span>Retour à la boutique</span><FiArrowUpRight aria-hidden="true" /></a></main>;
}

export function PaymentSuccessPage({ sessionId }: { sessionId: string | null }) {
  return <main className="veloce veloce__not-found" style={themeStyle()}><p className="veloce__eyebrow">Paiement reçu</p><h1>Merci pour votre commande.</h1><p>Nous préparons votre commande. Cette page ne remplace pas la confirmation reçue par webhook.</p>{sessionId ? <p className="veloce__session">Référence : {sessionId}</p> : null}<a className="veloce__cta" href="#/"><span>Retour à la boutique</span><FiArrowUpRight aria-hidden="true" /></a></main>;
}

export function PaymentCancelledPage() {
  return <main className="veloce veloce__not-found" style={themeStyle()}><p className="veloce__eyebrow">Paiement annulé</p><h1>Votre panier vous attend.</h1><a className="veloce__cta" href="#/"><span>Retour à la boutique</span><FiArrowUpRight aria-hidden="true" /></a></main>;
}
