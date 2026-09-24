import type { CurrencyCode } from "../types/commerce.types";

export function formatPrice(amount: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(amount);
}
