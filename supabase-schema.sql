-- Run this SQL in your Supabase Dashboard → SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cancellations table
CREATE TABLE IF NOT EXISTS cancellations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Customer
  vorname TEXT NOT NULL,
  nachname TEXT NOT NULL,
  email TEXT NOT NULL,
  strasse TEXT NOT NULL,
  plz_ort TEXT NOT NULL,

  -- Provider
  anbieter_id TEXT NOT NULL,
  anbieter_name TEXT NOT NULL,
  anbieter_kategorie TEXT NOT NULL,
  anbieter_adresse TEXT NOT NULL,

  -- Contract details
  kundennummer TEXT DEFAULT '',
  kuendigungsdatum TEXT DEFAULT '',
  grund TEXT DEFAULT '',

  -- Service tier
  paket TEXT NOT NULL DEFAULT 'standard', -- free | standard | premium
  preis INTEGER NOT NULL DEFAULT 0, -- in cents
  versand_methode TEXT NOT NULL DEFAULT 'email',
  versand_option TEXT NOT NULL DEFAULT 'standard',

  -- Status FSM
  status TEXT NOT NULL DEFAULT 'draft',
  status_updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Content
  brief_text TEXT DEFAULT '',
  vollmacht_signature TEXT DEFAULT '', -- base64 PNG

  -- Stripe
  stripe_session_id TEXT DEFAULT '',

  -- Admin
  admin_notiz TEXT DEFAULT ''
);

-- Events table (append-only audit log)
CREATE TABLE IF NOT EXISTS cancellation_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  cancellation_id UUID NOT NULL REFERENCES cancellations(id) ON DELETE CASCADE,
  from_status TEXT,
  to_status TEXT NOT NULL,
  actor TEXT NOT NULL DEFAULT 'system', -- system | admin | customer
  notiz TEXT DEFAULT ''
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_cancellations_email ON cancellations(email);
CREATE INDEX IF NOT EXISTS idx_cancellations_status ON cancellations(status);
CREATE INDEX IF NOT EXISTS idx_cancellations_stripe ON cancellations(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_events_cancellation ON cancellation_events(cancellation_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON cancellations
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security (RLS) - only service role can access
ALTER TABLE cancellations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cancellation_events ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role full access" ON cancellations
  FOR ALL USING (true);

CREATE POLICY "Service role full access" ON cancellation_events
  FOR ALL USING (true);
