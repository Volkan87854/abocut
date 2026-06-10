import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPaket } from "@/lib/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "placeholder", {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(req: NextRequest) {
  try {
    const { anbieter, form, paket: paketId, signature } = await req.json();

    if (!form.vorname || !form.nachname || !form.email || !form.strasse || !form.plz || !form.ort) {
      return NextResponse.json({ error: "Bitte alle Pflichtfelder ausfüllen." }, { status: 400 });
    }

    const paket = getPaket(paketId);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: form.email,
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: {
            name: `Abocut ${paket.name}: ${anbieter.name} kündigen`,
            description: paket.features.join(" · "),
          },
          unit_amount: paket.stripe_preis,
        },
        quantity: 1,
      }],
      metadata: {
        anbieter_id: anbieter.id,
        anbieter_name: anbieter.name,
        anbieter_kategorie: anbieter.kategorie,
        anbieter_adresse: anbieter.adresse.slice(0, 490),
        anbieter_frist: anbieter.kuendigungsfrist.slice(0, 490),
        versand_methode: anbieter.versandmethode,
        vorname: form.vorname,
        nachname: form.nachname,
        strasse: `${form.strasse} ${form.hausnummer}`,
        plz_ort: `${form.plz} ${form.ort}`,
        email: form.email,
        kundennummer: form.kundennummer || "",
        kuendigungsdatum: form.kuendigungsdatum || "",
        grund: (form.grund || "").slice(0, 490),
        paket: paketId,
        signature: (signature || "").slice(0, 490),
      },
      success_url: `${baseUrl}/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/kuendigen/${anbieter.id}`,
      locale: "de",
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: "Zahlung konnte nicht gestartet werden." }, { status: 500 });
  }
}
