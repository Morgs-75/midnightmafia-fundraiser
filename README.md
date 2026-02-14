# Worlds Fundraiser Number Board

A beautiful, real-time fundraiser number board with Stripe payments and Supabase backend.

## Features

- ✨ Beautiful cheer-style number board (1-100)
- 💳 Stripe Checkout (Apple Pay / Google Pay enabled)
- ⚡ Real-time updates via Supabase
- 🔒 10-minute holds with auto-expiry
- 📱 Instagram Story tile generation
- 🚫 No user accounts required

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS (no build step)
- **Backend**: Netlify Functions
- **Database**: Supabase (PostgreSQL + Realtime)
- **Payments**: Stripe Checkout

## Project Structure

```
fundraiser-board/
├── public/
│   ├── index.html          # Main board UI
│   └── success.html        # Post-payment success page
├── netlify/
│   ├── create-hold.js      # Create 10-min hold on numbers
│   ├── create-checkout.js  # Create Stripe Checkout session
│   ├── stripe-webhook.js   # Handle payment success
│   ├── release-expired-holds.js  # Cron: release expired holds
│   └── publish-draw.js     # Admin: publish draw results
├── supabase/
│   └── schema.sql          # Database schema
├── .env                    # Environment variables (gitignored)
├── .env.example            # Template for .env
├── netlify.toml            # Netlify config
└── package.json            # Dependencies
```

## Setup Instructions

### 1. Clone and Install

```bash
cd fundraiser-board
npm install
```

### 2. Set Up Supabase

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Create a new project
3. Go to **SQL Editor** and run the entire `supabase/schema.sql` file
4. Create a board record:
   ```sql
   INSERT INTO boards (name, price_cents, currency, status)
   VALUES ('Worlds 2026', 2000, 'AUD', 'active')
   RETURNING id;
   ```
   **Save the returned board ID** - you'll need it!

5. Create 100 number records:
   ```sql
   INSERT INTO numbers (board_id, number, status)
   SELECT
     'YOUR_BOARD_ID_HERE',  -- Replace with actual board ID
     generate_series(1, 100),
     'available';
   ```

6. Enable Realtime:
   - Go to **Database** → **Replication**
   - Enable replication for the `numbers` table

7. Get your API keys from **Settings** → **API**:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY` (for frontend)
   - `SUPABASE_SERVICE_ROLE_KEY` (for backend)

### 3. Set Up Stripe

1. Go to [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. Copy your **Secret key** (starts with `sk_test_` or `sk_live_`)
3. For webhook secret:
   - Go to **Developers** → **Webhooks**
   - Click **Add endpoint**
   - Endpoint URL: `https://YOUR-SITE.netlify.app/.netlify/functions/stripe-webhook`
   - Events: Select `checkout.session.completed`
   - Copy the **Signing secret** (starts with `whsec_`)

### 4. Configure Environment Variables

Copy `.env.example` to `.env` and fill in all values:

```bash
cp .env.example .env
```

Edit `.env`:
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
SITE_URL=https://your-site.netlify.app
ADMIN_TOKEN=your-secure-random-string
```

### 5. Update Frontend Config

Edit `public/index.html` and replace these values (around line 615):

```javascript
const BOARD_ID = "YOUR_BOARD_ID_HERE";  // From step 2.4
const SUPABASE_URL = "YOUR_SUPABASE_URL_HERE";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY_HERE";
const TEAM_HANDLE = "@YOUR_TEAM_INSTAGRAM_HANDLE";
```

### 6. Test Locally

```bash
npm run dev
```

Visit http://localhost:8888

**Test the flow:**
1. Click on available numbers
2. Click "Continue"
3. Fill in name, email, message
4. Click "Confirm & Pay"
5. Use Stripe test card: `4242 4242 4242 4242`
6. Verify the board updates in real-time

### 7. Deploy to Netlify

```bash
# Login
npx netlify login

# Deploy
npm run deploy
```

Or connect your GitHub repo to Netlify for auto-deployments.

**After deploying:**
1. Update `SITE_URL` in Netlify environment variables
2. Update Stripe webhook endpoint URL to production domain
3. Update `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `index.html` (or use build-time replacement)

### 8. Set Up Netlify Environment Variables

In Netlify dashboard:
1. Go to **Site settings** → **Environment variables**
2. Add all variables from your `.env` file

## Usage

### User Flow

1. **Select numbers**: Click to select one or more available numbers
2. **Continue**: Click the sticky "Continue" button
3. **Fill details**: Enter display name, email, and optional message
4. **Pay**: Redirects to Stripe Checkout (Apple Pay / Google Pay supported)
5. **Success**: Returns to success page, board updates instantly

### Admin: Publishing Draw Results

To publish draw results and pick winners:

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

Response:
```json
{
  "label": "Main Draw",
  "winners": [
    {
      "place": 1,
      "number": 42,
      "displayName": "Jess M.",
      "message": "Go team!"
    }
  ],
  "publishedAt": "2026-02-14T10:30:00Z"
}
```

## How It Works

### Hold Flow
1. User selects numbers → frontend calls `create-hold`
2. Backend checks availability, creates hold record, marks numbers as `held` for 10 minutes
3. Returns `holdId` to frontend

### Payment Flow
1. Frontend calls `create-checkout` with `holdId`
2. Backend creates Stripe Checkout session with `holdId` in metadata
3. User redirects to Stripe, pays
4. Stripe webhook calls `stripe-webhook` with payment details
5. Backend marks numbers as `sold`, creates purchase record
6. Supabase realtime pushes update to all connected clients
7. Board updates instantly

### Expired Holds
- Scheduled function `release-expired-holds` runs every 2 minutes
- Finds numbers with `status='held'` and `hold_expires_at < NOW()`
- Marks them back as `available`

## Security

- ✅ Email is **private** (never sent to frontend)
- ✅ Service role key only used server-side
- ✅ Row-level security prevents public writes
- ✅ Stripe webhook signature verification
- ✅ Display name + message sanitization
- ✅ No SQL injection (parameterized queries)

## Troubleshooting

### Numbers not loading
- Check browser console for errors
- Verify `BOARD_ID`, `SUPABASE_URL`, `SUPABASE_ANON_KEY` are correct
- Check Supabase table has 100 number records

### Payment fails
- Check Netlify function logs
- Verify `STRIPE_SECRET_KEY` is correct
- Check Stripe dashboard for failed payments

### Realtime not working
- Verify realtime is enabled for `numbers` table in Supabase
- Check browser console for subscription errors
- Ensure `board_id` filter matches your board ID

### Holds not expiring
- Check Netlify scheduled function logs
- Verify `release-expired-holds` is configured in `netlify.toml`
- Manually trigger: `curl https://YOUR-SITE.netlify.app/.netlify/functions/release-expired-holds`

## Customization

### Change price
Update `price_cents` in the `boards` table and `PRICE_PER_NUMBER` in `index.html`

### Change number of cells
Update the board record and insert more/fewer numbers. Update CSS grid if needed.

### Styling
All styles are inline in `index.html` - search for `<style>` tag.

## License

MIT
