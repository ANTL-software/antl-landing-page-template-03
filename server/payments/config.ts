import Stripe from 'stripe';
import { createMerchantCheckout, type MerchantSetup } from './server.js';

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing payment configuration: ${name}`);
  return value;
}

function positiveInteger(name: string): number {
  const value = Number(required(name));
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`Invalid payment amount: ${name}`);
  }
  return value;
}

function paymentMode(): MerchantSetup['mode'] {
  const value = required('PAYMENTS_MODE');
  if (value !== 'test' && value !== 'live') {
    throw new Error('PAYMENTS_MODE must be test or live');
  }
  return value;
}

// This file belongs to the client site. Product offerId values must match src/content/commerce.ts.
export const paymentSetup: MerchantSetup = {
  merchant: {
    name: required('PAYMENTS_MERCHANT_NAME'),
    stripeAccountId: required('STRIPE_ACCOUNT_ID'),
  },
  mode: paymentMode(),
  siteUrl: required('PUBLIC_SITE_URL'),
  offers: {
    primavera: {
      priceId: required('STRIPE_PRICE_PRIMAVERA'),
      unitAmount: positiveInteger('STRIPE_PRICE_PRIMAVERA_AMOUNT_MINOR'),
      currency: required('STRIPE_PRICE_PRIMAVERA_CURRENCY').toLowerCase(),
    },
    'mike-vera': {
      priceId: required('STRIPE_PRICE_MIKE_VERA'),
      unitAmount: positiveInteger('STRIPE_PRICE_MIKE_VERA_AMOUNT_MINOR'),
      currency: required('STRIPE_PRICE_MIKE_VERA_CURRENCY').toLowerCase(),
    },
    'lavande-spezia': {
      priceId: required('STRIPE_PRICE_LAVANDE_SPEZIA'),
      unitAmount: positiveInteger('STRIPE_PRICE_LAVANDE_SPEZIA_AMOUNT_MINOR'),
      currency: required('STRIPE_PRICE_LAVANDE_SPEZIA_CURRENCY').toLowerCase(),
    },
  },
};

export const stripe = new Stripe(required('STRIPE_SECRET_KEY'));
export const stripeWebhookSecret = required('STRIPE_WEBHOOK_SECRET');
export const payments = createMerchantCheckout(stripe, paymentSetup);
