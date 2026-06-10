import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Server-side client (full access)
export function getSupabaseAdmin() { return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "http://placeholder.supabase.co", process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder"); }

// Client-side client (limited access)
export function getSupabase() { return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "http://placeholder.supabase.co", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"); }

export type CancellationStatus =
  | "draft"
  | "sent"
  | "delivered"
  | "confirmed"
  | "failed"
  | "disputed";

export interface Cancellation {
  id: string;
  created_at: string;
  updated_at: string;
  // Customer
  vorname: string;
  nachname: string;
  email: string;
  strasse: string;
  plz_ort: string;
  // Provider
  anbieter_id: string;
  anbieter_name: string;
  anbieter_kategorie: string;
  anbieter_adresse: string;
  // Contract
  kundennummer: string;
  kuendigungsdatum: string;
  grund: string;
  // Service
  paket: "free" | "standard" | "premium";
  preis: number;
  versand_methode: string;
  versand_option: string;
  // Status
  status: CancellationStatus;
  status_updated_at: string;
  // Content
  brief_text: string;
  vollmacht_signature: string;
  // Stripe
  stripe_session_id: string;
  // Notes (admin)
  admin_notiz: string;
}

export interface CancellationEvent {
  id: string;
  created_at: string;
  cancellation_id: string;
  from_status: CancellationStatus | null;
  to_status: CancellationStatus;
  actor: "system" | "admin" | "customer";
  notiz: string;
}

export const STATUS_LABELS: Record<CancellationStatus, { label: string; icon: string; color: string; bg: string; desc: string }> = {
  draft: {
    label: "Entwurf",
    icon: "📋",
    color: "#6B6560",
    bg: "#F5F2EC",
    desc: "Brief wird vorbereitet",
  },
  sent: {
    label: "Versendet",
    icon: "📨",
    color: "#1A4B8C",
    bg: "#DBEAFE",
    desc: "Kündigung wurde an den Anbieter übermittelt",
  },
  delivered: {
    label: "Zugestellt",
    icon: "✅",
    color: "#2D6A4F",
    bg: "#D8F3DC",
    desc: "Zustellung bestätigt – Anbieter hat die Kündigung erhalten",
  },
  confirmed: {
    label: "Bestätigt",
    icon: "🎉",
    color: "#155724",
    bg: "#C3E6CB",
    desc: "Anbieter hat die Kündigung offiziell bestätigt",
  },
  failed: {
    label: "Fehlgeschlagen",
    icon: "⚠️",
    color: "#92400E",
    bg: "#FEF3C7",
    desc: "Versand fehlgeschlagen – wir kümmern uns",
  },
  disputed: {
    label: "Anbieter widerspricht",
    icon: "❗",
    color: "#991B1B",
    bg: "#FEE2E2",
    desc: "Der Anbieter hat die Kündigung abgelehnt – wir eskalieren",
  },
};
