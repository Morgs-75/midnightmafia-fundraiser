-- Add phone column to holds table
ALTER TABLE holds ADD COLUMN IF NOT EXISTS phone text;

-- Add phone column to purchases table
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS phone text;
