import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { generateAIUpsell, getFallbackUpsell } from "@/lib/ai-upsell";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "placeholder", {
  apiVersion: "2026-05-27.dahlia",
});

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) return NextResponse.json({ upsell: null });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const meta = session.metadata || {};

    if (!meta.anbieter_id) return NextResponse.json({ upsell: null });

    // Try AI-powered upsell first
    const aiUpsell = await generateAIUpsell({
      anbieter_name: meta.anbieter_name || "",
      anbieter_kategorie: meta.anbieter_kategorie || "",
      anbieter_id: meta.anbieter_id || "",
      kuendigungsgrund: meta.grund || "",
      plz_ort: meta.plz_ort || "",
      paket: meta.paket || "standard",
    });

    if (aiUpsell) {
      return NextResponse.json({ upsell: aiUpsell, source: "ai" });
    }

    // Fallback to static upsell
    const fallback = getFallbackUpsell(
      meta.anbieter_id || "",
      meta.anbieter_kategorie || ""
    );
    return NextResponse.json({ upsell: fallback, source: "fallback" });
  } catch (error) {
    console.error("Upsell error:", error);
    return NextResponse.json({ upsell: null });
  }
}
