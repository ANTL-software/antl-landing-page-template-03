import { useEffect, useMemo, useState } from "react";
import type { CartLine, StoreProduct } from "../types/commerce.types";

const storageKey = "antl-store-cart";

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== "object" || value === null || !("product" in value) || !("quantity" in value)) return false;
  const { product, quantity } = value;
  return typeof quantity === "number" && Number.isSafeInteger(quantity) && quantity > 0 &&
    typeof product === "object" && product !== null && "id" in product && typeof product.id === "string";
}

function readCart(): CartLine[] {
  try {
    const stored = localStorage.getItem(storageKey);
    const value: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(value) && value.every(isCartLine) ? value : [];
  } catch { return []; }
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>(readCart);
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(lines)); }, [lines]);
  const count = useMemo(() => lines.reduce((total, line) => total + line.quantity, 0), [lines]);
  const total = useMemo(() => lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0), [lines]);
  const add = (product: StoreProduct) => setLines((current) => { const line = current.find(({ product: item }) => item.id === product.id); return line ? current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { product, quantity: 1 }]; });
  const remove = (id: string) => setLines((current) => current.filter((line) => line.product.id !== id));
  const decrease = (id: string) => setLines((current) => current.flatMap((line) => {
    if (line.product.id !== id) return [line];
    return line.quantity === 1 ? [] : [{ ...line, quantity: line.quantity - 1 }];
  }));
  const clear = () => setLines([]);
  return { lines, count, total, add, decrease, remove, clear };
}
