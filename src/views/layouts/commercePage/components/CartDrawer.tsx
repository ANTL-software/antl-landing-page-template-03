import { useState, type RefObject } from "react";
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2, FiX } from "react-icons/fi";
import { paymentConfiguration, startCartCheckout } from "../../../../payments/checkout";
import type { CartLine } from "../../../../types/commerce.types";
import { formatPrice } from "../../../../utils/formatPrice";

type CartDrawerProps = { dialogRef: RefObject<HTMLDialogElement | null>; lines: readonly CartLine[]; total: number; onAdd: (product: CartLine["product"]) => void; onDecrease: (id: string) => void; onRemove: (id: string) => void };

export function CartDrawer({ dialogRef, lines, total, onAdd, onDecrease, onRemove }: CartDrawerProps) {
  const [error, setError] = useState("");
  const [isStartingCheckout, setIsStartingCheckout] = useState(false);
  const currency = lines[0]?.product.currency ?? "EUR";
  async function handleCheckout() {
    if (!lines.length || isStartingCheckout) return;
    setError(""); setIsStartingCheckout(true);
    try { await startCartCheckout(lines); } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Le paiement n'a pas pu démarrer."); setIsStartingCheckout(false);
    }
  }
  return <dialog className="veloce__drawer" ref={dialogRef} aria-labelledby="cart-title">
    <button className="veloce__close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Fermer le panier"><FiX aria-hidden="true" /></button>
    <p className="veloce__eyebrow">Votre panier</p><h2 id="cart-title">Votre sélection</h2>
    {lines.length ? <><div className="veloce__lines">{lines.map((line) => <div className="veloce__line" key={line.product.id}>
      <div><strong>{line.product.name}</strong><span>{formatPrice(line.product.price, line.product.currency)}</span></div>
      <div className="veloce__quantity"><button type="button" onClick={() => onDecrease(line.product.id)} aria-label={`Retirer un ${line.product.name}`}><FiMinus aria-hidden="true" /></button><span>{line.quantity}</span><button type="button" onClick={() => onAdd(line.product)} aria-label={`Ajouter un ${line.product.name}`}><FiPlus aria-hidden="true" /></button><button type="button" onClick={() => onRemove(line.product.id)} aria-label={`Supprimer ${line.product.name}`}><FiTrash2 aria-hidden="true" /></button></div>
    </div>)}</div><div className="veloce__cart-total"><span>Total</span><strong>{formatPrice(total, currency)}</strong></div>
      <button className="veloce__checkout" type="button" onClick={handleCheckout} disabled={isStartingCheckout}>{isStartingCheckout ? "Redirection…" : "Passer au paiement"}</button>
      {!paymentConfiguration.enabled ? <p className="veloce__payment-note">Paiement désactivé en démo. Activez-le via <code>VITE_PAYMENTS_ENABLED</code> après la configuration serveur.</p> : null}
      {error ? <p className="veloce__payment-error" role="alert">{error}</p> : null}
    </> : <div className="veloce__empty-cart"><FiShoppingBag aria-hidden="true" /><p>Votre panier est vide.</p></div>}
  </dialog>;
}
