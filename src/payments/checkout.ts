import { startHostedCheckout } from "./client";
import type { CartLine } from "../types/commerce.types";

export const paymentConfiguration = {
  enabled: import.meta.env.VITE_PAYMENTS_ENABLED === "true",
  endpoint: import.meta.env.VITE_PAYMENTS_CHECKOUT_ENDPOINT || "/api/checkout",
} as const;

export class PaymentUnavailableError extends Error {
  constructor() {
    super("Le paiement n'est pas encore configuré pour cette boutique.");
    this.name = "PaymentUnavailableError";
  }
}

/** Sends only product offer IDs and quantities. Prices stay on the payment server. */
export async function startCartCheckout(lines: readonly CartLine[]): Promise<void> {
  if (!paymentConfiguration.enabled) throw new PaymentUnavailableError();
  await startHostedCheckout({
    endpoint: paymentConfiguration.endpoint,
    lines: lines.map(({ product, quantity }) => ({ offerId: product.offerId, quantity })),
  });
}
