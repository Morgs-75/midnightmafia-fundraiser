# Setup Guide - Midnight Mafia Fundraiser

🎉 Your React + Supabase + Stripe fundraiser board is ready!

## 🎨 What You Have

- ✅ **Beautiful Figma Design** - Dark theme, animations, casino-style UI
- ✅ **React + TypeScript** - Modern, component-based architecture
- ✅ **Supabase Backend** - Real-time database with live updates
- ✅ **Stripe Payments** - Secure checkout with Apple Pay / Google Pay
- ✅ **Netlify Functions** - Serverless backend for holds & payments
- ✅ **All integrated!** - Everything is wired up and ready to configure

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Create a new project
3. Go to **SQL Editor** and run `supabase/schema.sql`
4. Create a board:
   ```sql
   INSERT INTO boards (name, price_cents, currency)
   VALUES ('Midnight Mafia Worlds 2026', 2500, 'AUD')
   RETURNING id;  -- SAVE THIS ID!
   ```
5. Create 100 numbers:
   ```sql
   INSERT INTO numbers (board_id, number, status)
   SELECT 'YOUR_BOARD_ID_HERE', generate_series(1, 100), 'available';
   ```
6. **Enable Realtime** for `numbers` table:
   - Go to **Database** → **Replication**
   - Enable replication for `numbers` table

### 3. Configure Environment Variables

#### Frontend (.env.local)
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_BOARD_ID=your-board-id-from-step-2
```

#### Backend (.env)
Already exists! Just fill in your values:
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
SITE_URL=http://localhost:5173
ADMIN_TOKEN=your-secure-random-string
```

### 4. Test Locally

```bash
npm run dev
```

Visit **http://localhost:5173**

You should see:
- Landing page with Midnight Mafia logo
- "Enter Now" button
- Black/purple/pink gradient theme

Click "Enter Now" to see the number board!

### 5. Test the Full Flow

1. Click on some available numbers (they'll highlight in pink)
2. Click "Continue" in the bottom checkout bar
3. Fill in name, email, message
4. Click "Confirm & Pay"
5. You'll be redirected to Stripe Checkout
6. Use test card: `4242 4242 4242 4242`
7. Complete payment
8. Should redirect to success page
9. Check the board - numbers should update instantly!

## 🎯 Key Files Modified

### New Files Created:
- `src/lib/supabase.ts` - Supabase client configuration
- `src/lib/useNumbers.ts` - Hook for loading numbers + realtime
- `src/lib/useSupporters.ts` - Hook for loading supporters
- `.env.local` - Frontend environment variables
- `tailwind.config.js` - Tailwind configuration

### Modified Files:
- `package.json` - Merged dependencies (React + Supabase + Stripe)
- `netlify.toml` - Updated to build from Vite
- `src/app/components/BingoGame.tsx` - Now uses Supabase hooks
- `src/app/components/CheckoutModal.tsx` - Calls Netlify Functions

### Unchanged (still working!):
- `netlify/create-hold.js`
- `netlify/create-checkout.js`
- `netlify/stripe-webhook.js`
- `netlify/release-expired-holds.js`
- `netlify/publish-draw.js`

## 📱 How It Works

```
User clicks numbers → Clicks "Continue"
        ↓
Opens checkout modal → Fills in details → Clicks "Confirm & Pay"
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
Backend marks numbers as "sold", creates purchase record
        ↓
Supabase realtime pushes update to ALL connected clients
        ↓
Board updates instantly everywhere!
        ↓
User redirects back to your site
```

## 🎨 Customization

### Update Team Info

Edit `src/app/components/BingoGame.tsx` (lines 29-61):

```typescript
const CONFIG = {
  drawDate: new Date(2026, 3, 1, 20, 0), // April 1, 2026 at 8:00 PM
  departureDate: "April 16, 2026",
  pricePerNumber: 25,
  teamInstagramHandle: "@outlaws.midnightmafia",
  teamName: "Midnight Mafia Cheer",
  contactName: "Jemma Morgan",
  contactPhone: "0481 568 152",
  contactEmail: "jemmarmorgan@gmail.com",
};
```

### Change Logo

Replace `src/assets/6a2c355cdbff31bd04948b947b0cb06414f136cc.png` with your logo.

### Update Colors

The design uses Tailwind. Main colors are in `src/styles/theme.css`:
- Black: `#000000` (background)
- Purple: `purple-600` to `purple-900`
- Pink: `pink-500` to `pink-600`
- Yellow/Gold: `yellow-400` (accents)

## 🚢 Deploy to Netlify

### Option 1: CLI Deploy

```bash
npm run build
netlify deploy --prod
```

### Option 2: GitHub + Netlify Auto-Deploy

1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in Netlify dashboard

### After Deploying:

1. Update `SITE_URL` in Netlify env vars
2. Update `.env` locally with production URL
3. Create Stripe webhook for production:
   - URL: `https://YOUR-SITE.netlify.app/.netlify/functions/stripe-webhook`
   - Event: `checkout.session.completed`
4. Update `STRIPE_WEBHOOK_SECRET` in Netlify

## 🧪 Testing Checklist

Before going live:

- [ ] Numbers load from Supabase
- [ ] Can select/deselect numbers
- [ ] Checkout modal opens
- [ ] Can fill in form
- [ ] Hold creation works (check Supabase)
- [ ] Stripe redirect works
- [ ] Test payment succeeds (use 4242... card)
- [ ] Numbers update in realtime
- [ ] Supporters feed shows new entries
- [ ] Success page displays

## 🐛 Troubleshooting

### Board doesn't load
- Check browser console for errors
- Verify `.env.local` has correct values
- Check Supabase has 100 numbers

### Payment fails
- Check Netlify function logs
- Verify `.env` has correct Stripe keys
- Check webhook is configured

### Realtime doesn't work
- Enable replication for `numbers` table
- Check browser console for subscription errors
- Verify `board_id` filter matches

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Commands

```bash
# Development
npm run dev              # Start Vite dev server
npm run netlify:dev      # Start with Netlify Functions

# Build
npm run build            # Build for production
npm run preview          # Preview production build

# Deploy
npm run deploy           # Deploy to Netlify
```

## 🎉 You're Ready!

Your fundraiser board is fully integrated with:
- ✅ Beautiful React UI from Figma
- ✅ Real-time Supabase updates
- ✅ Secure Stripe payments
- ✅ Automated hold management
- ✅ Instagram story generation

Just configure your environment variables and you're good to go!

---

**Need help?** Check `README.md` for detailed documentation or `DEPLOYMENT.md` for deployment guide.
