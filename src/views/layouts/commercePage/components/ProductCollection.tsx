import type { StoreProduct, StoreSite } from "../../../../types/commerce.types";
import { formatPrice } from "../../../../utils/formatPrice";

type ProductCollectionProps = { collection: StoreSite["collection"]; products: readonly StoreProduct[]; onAdd: (product: StoreProduct) => void };

export function ProductCollection({ collection, products, onAdd }: ProductCollectionProps) {
  return <section className="veloce__shop" id="shop">
    <p className="veloce__eyebrow">{collection.eyebrow}</p><h2>{collection.title}</h2>
    <div className="veloce__products">{products.map((product) => <article key={product.id}>
      <div className="veloce__product-image" style={{ backgroundColor: product.accent }}><img src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" />{product.badge ? <span>{product.badge}</span> : null}<button type="button" onClick={() => onAdd(product)} aria-label={`Ajouter ${product.name} au panier`}>+</button></div>
      <div><div className="veloce__product-meta"><p className="veloce__product-collection">{product.collection}</p><span>{product.volume}</span></div><h3>{product.name}</h3><p>{product.description}</p><ul>{product.notes.map((note) => <li key={note}>{note}</li>)}</ul><div><strong>{formatPrice(product.price, product.currency)}</strong>
        <button type="button" disabled={!product.available} onClick={() => onAdd(product)}>{product.available ? collection.addLabel : "Indisponible"}</button>
      </div></div>
    </article>)}</div>
  </section>;
}
