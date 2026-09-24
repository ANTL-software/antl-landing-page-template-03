import { payments } from "./config.js";
import { UnknownOfferError } from "./server.js";

type CheckoutLineRequest = { offerId: string; quantity: number };

function isCheckoutLine(value: unknown): value is CheckoutLineRequest {
  if (typeof value !== "object" || value === null || !("offerId" in value) || !("quantity" in value)) return false;
  const { offerId, quantity } = value;
  return typeof offerId === "string" && typeof quantity === "number" && Number.isSafeInteger(quantity) && quantity > 0 && quantity <= 99;
}

/** Framework-neutral handler core for POST /api/checkout. */
export async function createCheckout(body: unknown): Promise<{ url: string }> {
  if (typeof body !== "object" || body === null) throw new UnknownOfferError();
  if ("lines" in body && Array.isArray(body.lines) && body.lines.length > 0 && body.lines.every(isCheckoutLine)) {
    const session = await payments.createCart(body.lines);
    return { url: session.url };
  }
  if ("offerId" in body && typeof body.offerId === "string") {
    const session = await payments.create(body.offerId);
    return { url: session.url };
  }
  throw new UnknownOfferError();
}
