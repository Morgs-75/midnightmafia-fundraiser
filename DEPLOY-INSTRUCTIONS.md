# 🚀 Deploy Midnight Mafia Fundraiser to Netlify

## Quick Deploy (5 minutes)

### Step 1: Connect GitHub to Netlify

**Click this link:** https://app.netlify.com/start/deploy?repository=https://github.com/Morgs-75/midnightmafia-fundraiser

This will:
- Open Netlify
- Auto-connect your GitHub repo
- Auto-detect build settings from `netlify.toml`

### Step 2: Configure Environment Variables

Click "Show advanced" → "Add environment variable" and paste these:

#### Backend Variables (for Netlify Functions):

**Copy these from your `.env` and `.env.local` files:**

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `STRIPE_SECRET_KEY` - Your Stripe secret key (from .env file)
- `STRIPE_WEBHOOK_SECRET` - Set to `whsec_xxxxx` initially (update after webhook setup)
- `SITE_URL` - Set to `https://midnightmafia-fundraiser.netlify.app`
- `ADMIN_TOKEN` - Your admin token (from .env file)

#### Frontend Variables (for Vite):

**Copy these from your `.env.local` file:**

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key
- `VITE_BOARD_ID` - Your board ID

> **Note:** All values are in your local `.env` and `.env.local` files

### Step 3: Deploy

Click **"Deploy site"** button

Build will complete in ~2 minutes. Your site will be live at:
`https://midnightmafia-fundraiser.netlify.app`

---

## Post-Deployment Steps

### 1. Update Database Schema

Go to Supabase SQL Editor: https://app.supabase.com/project/xwdkvsexakvyvsasuayz/sql

Run this SQL:
```sql
ALTER TABLE holds ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS phone text;
```

### 2. Configure Stripe Webhook

1. Get your Netlify function URL (after deploy completes):
   ```
   https://midnightmafia-fundraiser.netlify.app/.netlify/functions/stripe-webhook
   ```

2. Go to Stripe Dashboard: https://dashboard.stripe.com/test/webhooks

3. Click "Add endpoint"
   - URL: `https://midnightmafia-fundraiser.netlify.app/.netlify/functions/stripe-webhook`
   - Events to send: `checkout.session.completed`
   - Click "Add endpoint"

4. Copy the "Signing secret" (starts with `whsec_`)

5. Update Netlify environment variable:
   - Go to: Site settings → Environment variables
   - Edit `STRIPE_WEBHOOK_SECRET`
   - Paste the real signing secret
   - Click "Save"

6. Redeploy (Netlify will auto-redeploy when you save env vars)

### 3. Add Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter: `midnightmafia.au`
4. Follow DNS configuration instructions
5. Update `SITE_URL` env var to `https://midnightmafia.au`
6. Redeploy

---

## Testing Checklist

After deployment, test these features:

- [ ] Landing page loads
- [ ] Can select numbers on bingo board
- [ ] Upsell popup appears at 2-4, 6-7, 8-9 numbers
- [ ] Checkout modal shows correct pricing
- [ ] Name field is required
- [ ] "Display publicly" checkbox works
- [ ] Phone field saves (optional)
- [ ] Stripe checkout redirects correctly
- [ ] After payment, numbers show as "sold"
- [ ] QR code share button works
- [ ] Urgency popups appear

---

## Troubleshooting

**Build fails?**
- Check environment variables are all set
- Check build logs in Netlify dashboard

**Numbers not showing as sold after payment?**
- Check Stripe webhook is configured
- Check webhook secret matches in Netlify env vars
- Check Supabase tables have phone column

**Functions timing out?**
- Check Supabase service role key is correct
- Check Stripe secret key is correct

---

## Support

- Netlify Dashboard: https://app.netlify.com
- Supabase Dashboard: https://app.supabase.com/project/xwdkvsexakvyvsasuayz
- Stripe Dashboard: https://dashboard.stripe.com/test/dashboard

Your GitHub repo: https://github.com/Morgs-75/midnightmafia-fundraiser
