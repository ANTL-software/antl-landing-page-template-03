import { useEffect, useMemo, useState } from "react";
import type { StoreProduct } from "../types/commerce.types";

type CartLine = { product: StoreProduct; quantity: number };
const storageKey = "antl-veloce-cart";

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>(() => { const stored = localStorage.getItem(storageKey); return stored ? JSON.parse(stored) as CartLine[] : []; });
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(lines)); }, [lines]);
  const count = useMemo(() => lines.reduce((total, line) => total + line.quantity, 0), [lines]);
  const total = useMemo(() => lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0), [lines]);
  const add = (product: StoreProduct) => setLines((current) => { const line = current.find(({ product: item }) => item.id === product.id); return line ? current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { product, quantity: 1 }]; });
  const remove = (id: string) => setLines((current) => current.filter((line) => line.product.id !== id));
  return { lines, count, total, add, remove };
}
