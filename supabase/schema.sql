-- Boards
create table boards (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_cents integer not null,
  currency text default 'AUD',
  status text default 'active',
  created_at timestamptz default now()
);

-- Numbers
create table numbers (
  id uuid primary key default gen_random_uuid(),
  board_id uuid references boards(id) on delete cascade,
  number integer not null,
  status text default 'available', -- available | held | sold
  display_name text,
  message text,
  hold_expires_at timestamptz,
  created_at timestamptz default now(),
  unique(board_id, number)
);

-- Holds
create table holds (
  id uuid primary key default gen_random_uuid(),
  board_id uuid references boards(id),
  email text not null,
  phone text,
  display_name text not null,
  message text,
  expires_at timestamptz not null,
  stripe_session_id text,
  created_at timestamptz default now()
);

-- Purchases
create table purchases (
  id uuid primary key default gen_random_uuid(),
  board_id uuid references boards(id),
  email text not null,
  phone text,
  display_name text not null,
  message text,
  amount_cents integer not null,
  stripe_payment_intent text,
  created_at timestamptz default now()
);

-- Draws
create table draws (
  id uuid primary key default gen_random_uuid(),
  board_id uuid references boards(id) on delete cascade,
  draw_number bigint not null,
  winners jsonb not null,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Row Level Security
alter table numbers enable row level security;

-- Public can read board state ONLY
create policy "public_read_numbers"
on numbers for select
using (true);

-- No public writes
