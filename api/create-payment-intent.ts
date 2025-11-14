import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

const sendOrderToN8n = async (orderData: any) => {
  const webhookUrl = process.env.N8N_WEBHOOK_URL || 'https://amrio.app.n8n.cloud/webhook/orders/new';

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      console.error('N8n webhook error:', response.status);
    }
  } catch (error) {
    console.error('N8n webhook exception:', error);
  }
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, orderData } = req.body;

    if (!amount || amount < 50) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderNumber: orderData.orderNumber,
        orderId: orderData.orderId,
      },
    });

    if (orderData) {
      await sendOrderToN8n(orderData);
    }

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Payment intent error:', error);
    res.status(500).json({ error: error.message || 'Failed to create payment intent' });
  }
}
