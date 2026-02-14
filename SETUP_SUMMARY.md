# Setup Summary

## ✅ What's Been Done

All backend functions are implemented and your UI is connected to Supabase + Stripe.

## 📁 Complete File Structure

```
fundraiser-board/
├── public/
│   ├── index.html              ← Main board UI (UPDATED with Supabase)
│   └── success.html            ← Post-payment page (NEW)
│
├── netlify/                    ← Netlify Functions directory
│   ├── create-hold.js          ← Creates 10-min hold (EXISTING)
│   ├── create-checkout.js      ← Creates Stripe session (EXISTING)
│   ├── stripe-webhook.js       ← Handles payment webhook (EXISTING)
│   ├── release-expired-holds.js← Auto-releases expired holds (EXISTING)
│   └── publish-draw.js         ← Admin: publish winners (EXISTING)
│
├── supabase/
│   └── schema.sql              ← Database schema (UPDATED - added draws table)
│
├── .env                        ← Environment variables (UPDATED with docs)
├── .env.example                ← Template (NEW)
├── .gitignore                  ← Git ignore (NEW)
├── netlify.toml                ← Netlify config (UPDATED)
├── package.json                ← Dependencies (NEW)
├── README.md                   ← Full documentation (NEW)
├── DEPLOYMENT.md               ← Deployment checklist (NEW)
└── SETUP_SUMMARY.md            ← This file (NEW)
```

## 🔧 Required Environment Variables

Add these to Netlify and your local `.env`:

```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhb...  # Service role key (secret!)

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Site
SITE_URL=https://your-site.netlify.app

# Admin
ADMIN_TOKEN=your-secure-random-string
```

## 🎨 Frontend Config (in index.html)

Around **line 615**, update these values:

```javascript
const BOARD_ID = "YOUR_BOARD_ID_HERE";  // From Supabase boards table
const SUPABASE_URL = "https://xxxxx.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key-here";  # Public key - safe for frontend
const TEAM_HANDLE = "@TEAMINSTAGRAMHANDLE";
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
```sql
-- Run schema.sql in Supabase SQL Editor
-- Then create a board:
INSERT INTO boards (name, price_cents, currency)
VALUES ('Worlds 2026', 2000, 'AUD')
RETURNING id;  -- Save this ID!

-- Create 100 numbers:
INSERT INTO numbers (board_id, number, status)
SELECT 'YOUR_BOARD_ID', generate_series(1, 100), 'available';
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with your keys
```

### 4. Update Frontend
Edit `public/index.html` with your `BOARD_ID`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY`

### 5. Test Locally
```bash
npm run dev
# Visit http://localhost:8888
```

### 6. Deploy
```bash
netlify deploy --prod
```

## 🔄 The Complete Flow

```
User selects numbers
        ↓
Frontend calls /.netlify/functions/create-hold
        ↓
Backend creates hold in Supabase (10 min expiry)
Numbers marked as "held"
        ↓
Frontend calls /.netlify/functions/create-checkout
        ↓
Redirects to Stripe Checkout
        ↓
User pays with card/Apple Pay/Google Pay
        ↓
Stripe sends webhook to /.netlify/functions/stripe-webhook
        ↓
Backend marks numbers as "sold"
Creates purchase record
        ↓
Supabase realtime pushes update
        ↓
All connected clients see board update instantly
        ↓
User redirects to /success.html
```

## ⏰ Background Job

**Every 2 minutes**, Netlify runs `release-expired-holds`:
- Finds numbers with `status='held'` and `hold_expires_at < NOW()`
- Marks them back as `available`
- Prevents abandoned carts from blocking sales

## 🎲 Publishing Draw Results

When ready to announce winners:

```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/publish-draw \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "boardId": "YOUR_BOARD_ID",
    "winnersCount": 1
  }'
```

## 🔒 Security Features

✅ Email is **private** (never sent to frontend)
✅ Service role key only used server-side
✅ Public can only **read** numbers (RLS policy)
✅ Stripe webhook signature verification
✅ Display name + message sanitization
✅ Admin token for draw publishing

## ⚠️ Before Going Live

- [ ] Run `supabase/schema.sql` in production
- [ ] Create board and 100 numbers
- [ ] Enable Realtime for `numbers` table
- [ ] Update all environment variables in Netlify
- [ ] Update frontend config in `index.html`
- [ ] Create Stripe webhook for production URL
- [ ] Test with Stripe test card: `4242 4242 4242 4242`
- [ ] Switch to Stripe live keys when ready
- [ ] Do one real test purchase
- [ ] Launch! 🚀

## 📚 Documentation

- **README.md** - Full setup guide
- **DEPLOYMENT.md** - Deployment checklist
- **This file** - Quick reference

## 🐛 Common Issues

**Board doesn't load:**
- Check browser console
- Verify `BOARD_ID`, `SUPABASE_URL`, `SUPABASE_ANON_KEY` are correct
- Confirm 100 numbers exist in database

**Payment fails:**
- Check Netlify function logs
- Verify Stripe keys are correct
- Check webhook is configured

**Realtime doesn't work:**
- Enable replication for `numbers` table
- Check subscription in browser console

## 🎯 Next Steps

1. Read **README.md** for detailed setup
2. Follow **DEPLOYMENT.md** checklist
3. Test locally first
4. Deploy to Netlify
5. Test end-to-end
6. Launch!

---

**Questions?** Check README.md or function logs for errors.
