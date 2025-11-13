# Deployment Instructions

## Project Overview
Custom apparel e-commerce platform with Stripe checkout, Supabase database, and order management.

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your Git repository
3. Configure environment variables (see below)
4. Deploy

## Environment Variables

### Required for Vercel Deployment

Add these in Vercel Dashboard → Settings → Environment Variables:

```
# Stripe (Backend - for API routes)
STRIPE_SECRET_KEY=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

# Stripe (Frontend)
VITE_STRIPE_PUBLIC_KEY=pk_live_51NkAnWDfFHB8HRzFnSudnVGzRSOvDzW2GasyDS53Cp1yw3tqIh2MdU1Hl7YCwIX2GX4P5yhwfSdivHGdtDQdln5M001rIsCa58

# Supabase
VITE_SUPABASE_URL=https://fpeudldcemfoknfcbuex.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwZXVkbGRjZW1mb2tuZmNidWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0OTQzNjEsImV4cCI6MjA3NzA3MDM2MX0.1MA17_t19h7_9uLxlwPURIXSfQrijqNMsNgJ_D6bUU8

# N8n Webhook
VITE_N8N_WEBHOOK_URL=https://amrio.app.n8n.cloud/webhook/orders/new

# Printful (Optional)
VITE_PRINTFUL_API_KEY=your_printful_api_key_here
```

## Deployment Configuration

The project includes:
- ✅ `vercel.json` - API route configuration
- ✅ `api/create-checkout-session.ts` - Stripe checkout endpoint
- ✅ Supabase integration
- ✅ TypeScript compilation
- ✅ Vite build optimization

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Connect to Vercel
- Visit https://vercel.com
- Click "Add New Project"
- Import your GitHub repository
- Vercel auto-detects Vite configuration

### 3. Configure Environment Variables
- In Vercel dashboard, go to project Settings → Environment Variables
- Add all variables listed above
- Set them for Production, Preview, and Development environments

### 4. Deploy
- Vercel will automatically deploy
- Your site will be live at `https://your-project.vercel.app`

## API Routes

The serverless function is available at:
```
https://your-domain.vercel.app/api/create-checkout-session
```

## Database Setup

Supabase is already configured. The database includes:
- Orders table with RLS policies
- Automatic order tracking
- Secure authentication

## Post-Deployment

### Test Checkout Flow
1. Visit your deployed site
2. Configure a product
3. Add to cart
4. Complete checkout with Stripe test card: `4242 4242 4242 4242`

### Monitor Orders
- Orders are saved to Supabase
- Webhooks sent to N8n for processing
- Admin dashboard available at `/admin`

## Troubleshooting

### API Route Not Found
- Verify `vercel.json` is in the root
- Check `api/` folder is committed
- Redeploy from Vercel dashboard

### Stripe Errors
- Confirm `STRIPE_SECRET_KEY` is set in Vercel (not `VITE_` prefix)
- Verify API version is `2025-09-30.clover`
- Check Stripe dashboard for logs

### Database Connection Issues
- Verify Supabase credentials
- Check RLS policies are enabled
- Review Supabase logs

## Local Development

```bash
npm install
npm run dev
```

Access at `http://localhost:5173`

## Build Verification

```bash
npm run build
npm run preview
```

## Support

- Stripe Dashboard: https://dashboard.stripe.com
- Supabase Dashboard: https://supabase.com/dashboard
- Vercel Dashboard: https://vercel.com/dashboard

---

**Ready to deploy!** Follow the steps above to go live.
