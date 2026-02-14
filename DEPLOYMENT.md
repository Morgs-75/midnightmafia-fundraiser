# Deployment Checklist

Quick reference for deploying your fundraiser board to production.

## Pre-Deployment Checklist

### ✅ Supabase Setup
- [ ] Project created at supabase.com
- [ ] `schema.sql` executed in SQL Editor
- [ ] Board record created (saved board ID)
- [ ] 100 number records inserted
- [ ] Realtime enabled for `numbers` table
- [ ] API keys copied (URL, anon key, service role key)

### ✅ Stripe Setup
- [ ] Stripe account created
- [ ] API keys copied (secret key)
- [ ] Test mode enabled for development
- [ ] Webhook endpoint created (after deploying to Netlify)
- [ ] Webhook secret copied

### ✅ Code Configuration
- [ ] `.env` file created and filled out
- [ ] `index.html` updated with:
  - `BOARD_ID`
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `TEAM_HANDLE`
- [ ] `npm install` completed

### ✅ Local Testing
- [ ] `npm run dev` starts successfully
- [ ] Board loads 100 numbers
- [ ] Can select numbers
- [ ] Hold creation works
- [ ] Stripe redirect works
- [ ] Test payment succeeds (4242 4242 4242 4242)
- [ ] Board updates after payment
- [ ] Realtime subscription works

## Deployment Steps

### 1. Deploy to Netlify

```bash
# Install Netlify CLI if not installed
npm install -g netlify-cli

# Login
netlify login

# Initialize site (first time only)
netlify init

# Deploy to production
netlify deploy --prod
```

### 2. Configure Netlify Environment Variables

Go to Netlify Dashboard → Site settings → Environment variables

Add these variables:
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx (or sk_test_ for testing)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
SITE_URL=https://your-site.netlify.app
ADMIN_TOKEN=your-secure-random-string
```

### 3. Update Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Update endpoint URL to: `https://YOUR-SITE.netlify.app/.netlify/functions/stripe-webhook`
3. Ensure `checkout.session.completed` event is selected
4. Copy the new signing secret and update `STRIPE_WEBHOOK_SECRET` in Netlify

### 4. Update Frontend URLs

Option A: **Environment variables at build time** (recommended)
- Use Netlify build environment variables
- Update `index.html` to read from env during build

Option B: **Hardcode** (quick MVP)
- Update `index.html` with production values:
  ```javascript
  const SUPABASE_URL = "https://xxxxx.supabase.co";
  const SUPABASE_ANON_KEY = "your-anon-key";
  ```

### 5. Test Production

- [ ] Visit your Netlify URL
- [ ] Board loads correctly
- [ ] Can select and purchase numbers
- [ ] Payment succeeds
- [ ] Board updates in real-time
- [ ] Success page displays
- [ ] Check Stripe dashboard for payment

### 6. Enable Scheduled Function (Auto-release Holds)

Scheduled functions should work automatically via `netlify.toml`, but verify:
1. Go to Netlify Dashboard → Functions
2. Check `release-expired-holds` shows up
3. Verify it runs every 2 minutes
4. Check function logs to confirm execution

Manual trigger for testing:
```bash
curl https://YOUR-SITE.netlify.app/.netlify/functions/release-expired-holds
```

## Post-Deployment

### Monitor
- [ ] Check Netlify function logs for errors
- [ ] Monitor Stripe dashboard for payments
- [ ] Check Supabase dashboard for database activity
- [ ] Test with a real purchase (in test mode first!)

### Go Live
When ready for real payments:
1. Switch Stripe to **Live mode**
2. Get live API keys
3. Update `STRIPE_SECRET_KEY` in Netlify
4. Create new webhook for live mode
5. Update `STRIPE_WEBHOOK_SECRET` in Netlify
6. Test with a real card
7. Announce to your community!

## Quick Reference

### Environment Variables
| Variable | Where to get it |
|----------|----------------|
| `SUPABASE_URL` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API |
| `SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks |
| `SITE_URL` | Your Netlify site URL |
| `ADMIN_TOKEN` | Generate a random string |

### Function Endpoints
| Function | URL | Purpose |
|----------|-----|---------|
| `create-hold` | `/.netlify/functions/create-hold` | Create 10-min hold |
| `create-checkout` | `/.netlify/functions/create-checkout` | Create Stripe session |
| `stripe-webhook` | `/.netlify/functions/stripe-webhook` | Handle payment success |
| `release-expired-holds` | `/.netlify/functions/release-expired-holds` | Release expired holds (cron) |
| `publish-draw` | `/.netlify/functions/publish-draw` | Publish draw results (admin) |

### Test Cards (Stripe Test Mode)
| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 9995` | Decline |

### Publish Draw (Admin)
```bash
curl -X POST https://YOUR-SITE.netlify.app/.netlify/functions/publish-draw \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "boardId": "YOUR_BOARD_ID",
    "winnersCount": 1,
    "drawLabel": "Main Draw"
  }'
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Functions not found | Verify `netlify.toml` has correct `functions` path |
| Payment fails | Check Stripe keys, webhook secret |
| Board doesn't update | Check realtime enabled, verify board_id filter |
| Holds don't expire | Check scheduled function logs |
| 404 on success page | Ensure `public/success.html` exists |

## Support

- [Netlify Docs](https://docs.netlify.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)

## MVP Launch Day

1. ✅ Deploy to production
2. ✅ Test end-to-end with test card
3. ✅ Switch to live Stripe keys
4. ✅ Do one real test purchase
5. ✅ Share link with your team
6. ✅ Monitor Netlify logs for any errors
7. ✅ Respond to supporters!
