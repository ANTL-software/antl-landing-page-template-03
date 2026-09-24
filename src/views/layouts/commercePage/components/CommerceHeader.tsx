import { FiShoppingBag } from "react-icons/fi";
import type { StoreNavigationItem } from "../../../../types/commerce.types";

type CommerceHeaderProps = { brand: string; navigation: readonly StoreNavigationItem[]; cartCount: number; onOpenCart: () => void };

export function CommerceHeader({ brand, navigation, cartCount, onOpenCart }: CommerceHeaderProps) {
  return <header className="veloce__header">
    <a href="#top" className="veloce__brand">{brand}</a>
    <nav aria-label="Navigation principale">{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
    <button className="veloce__cart" type="button" onClick={onOpenCart} aria-label={`Ouvrir le panier, ${cartCount} article${cartCount > 1 ? "s" : ""}`}>
      <FiShoppingBag aria-hidden="true" /> Panier <span>{cartCount}</span>
    </button>
  </header>;
}
