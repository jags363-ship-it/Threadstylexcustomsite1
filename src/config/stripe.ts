export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || '';

// Product configuration for Stripe
export const STRIPE_CONFIG = {
  currency: 'usd',
  successUrl: `${window.location.origin}/order-success`,
  cancelUrl: `${window.location.origin}/checkout-cancelled`,
};