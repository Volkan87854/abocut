import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getAlleAnbieterById } from "@/lib/anbieter";
import { getUpsell } from "@/lib/affiliates";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "placeholder", {
  apiVersion: "2026-05-27.dahlia",
});

function getAnthropic() { return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || "placeholder" }); }
function getResend() { return new Resend(process.env.RESEND_API_KEY || "placeholder"); }

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || "");
  } catch (err) {
    console.error("Webhook signature failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const meta = session.metadata || {};

  try {
    const anthropic = getAnthropic();
    const resend = getResend();
    const db = getSupabaseAdmin();
    const anbieter = getAlleAnbieterById(meta.anbieter_id);

    const heute = new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
    const uhrzeit = new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
    const kuendigungsdatumText = meta.kuendigungsdatum
      ? `zum ${new Date(meta.kuendigungsdatum).toLocaleDateString("de-DE")}`
      : "zum nächstmöglichen Zeitpunkt";

    // Generate letter with Claude
    const aiResponse = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1200,
      messages: [{
        role: "user",
        content: `Erstelle ein formelles deutsches Kündigungsschreiben (§126b BGB Textform):

Absender: ${meta.vorname} ${meta.nachname}, ${meta.strasse}, ${meta.plz_ort}
Empfänger: ${meta.anbieter_name}, ${meta.anbieter_adresse}
Datum: ${heute}
Kündigung: ${kuendigungsdatumText}
${meta.kundennummer ? `Kundennummer: ${meta.kundennummer}` : ""}
${meta.grund ? `Grund: ${meta.grund}` : ""}

Professionell, höflich, präzise. Wichtig für Formatierung:
- Zwischen Absätzen immer genau EINE Leerzeile
- Direkt nach "Mit freundlichen Grüßen" kommt auf der nächsten Zeile der Name — keine Leerzeile dazwischen
- Konsistente, gleichmäßige Abstände überall
- Nur den fertigen Brieftext zurückgeben, keine Erklärungen.`,
      }],
    });

    const rawBrief = aiResponse.content[0].type === "text" ? aiResponse.content[0].text : "";
    // Normalize spacing: collapse 3+ newlines to max 2, clean trailing spaces
    const briefText = rawBrief
      .replace(/\r\n/g, "\n")           // normalize line endings
      .replace(/[ \t]+$/gm, "")          // remove trailing spaces
      .replace(/\n{3,}/g, "\n\n")       // max 2 consecutive blank lines
      .trim();
    const upsell = getUpsell(meta.anbieter_id, meta.anbieter_kategorie);
    const istOnlineFormular = anbieter?.versandmethode === "online-formular";

    // Save to Supabase
    const { data: cancellation, error: dbError } = await db
      .from("cancellations")
      .insert({
        vorname: meta.vorname,
        nachname: meta.nachname,
        email: meta.email,
        strasse: meta.strasse,
        plz_ort: meta.plz_ort,
        anbieter_id: meta.anbieter_id,
        anbieter_name: meta.anbieter_name,
        anbieter_kategorie: meta.anbieter_kategorie,
        anbieter_adresse: meta.anbieter_adresse,
        kundennummer: meta.kundennummer || "",
        kuendigungsdatum: meta.kuendigungsdatum || "",
        grund: meta.grund || "",
        paket: meta.paket || "standard",
        preis: session.amount_total || 0,
        versand_methode: meta.versand_methode || "email",
        versand_option: "standard",
        status: "sent",
        status_updated_at: new Date().toISOString(),
        brief_text: briefText,
        vollmacht_signature: meta.signature || "",
        stripe_session_id: session.id,
      })
      .select()
      .single();

    if (dbError) console.error("Supabase error:", dbError);

    // Send to provider (email method only)
    if (anbieter?.versandmethode === "email" && anbieter.kuendigungsEmail) {
      await resend.emails.send({
        from: `${meta.vorname} ${meta.nachname} via Abocut <noreply@abocut.de>`,
        to: anbieter.kuendigungsEmail,
        replyTo: meta.email,
        subject: `Kündigung${meta.kundennummer ? ` – Kundennummer ${meta.kundennummer}` : ""}`,
        html: `<pre style="font-family: serif; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">${briefText}</pre>`,
      });
    }

    // ── CUSTOMER EMAIL — clean, minimal, honest ──
    const customerHtml = `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F5F5F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F5;padding:32px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;overflow:hidden;max-width:580px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0A0A0A;padding:20px 32px;">
            <span style="font-size:20px;font-weight:900;color:#FFFFFF;letter-spacing:-0.03em;">abo<span style="color:#2E6B4F;">cut</span></span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 32px 0;">

            ${istOnlineFormular ? `
            <!-- Online portal case: honest, clear, step-by-step -->
            <p style="font-size:28px;margin:0 0 8px;font-weight:900;color:#0A0A0A;letter-spacing:-0.02em;">Ihr Kündigungsschreiben ist fertig.</p>
            <p style="font-size:15px;color:#6B6B6B;line-height:1.6;margin:0 0 28px;">Guten Tag ${meta.vorname} ${meta.nachname},<br><br>
            wir haben Ihr rechtssicheres Kündigungsschreiben für <strong style="color:#0A0A0A;">${meta.anbieter_name}</strong> erstellt.<br><br>
            <strong style="color:#0A0A0A;">Wichtiger Hinweis:</strong> ${meta.anbieter_name} akzeptiert Kündigungen ausschließlich über das eigene Online-Portal (gesetzlicher Kündigungsbutton nach §312k BGB). Das bedeutet: Ihr Schreiben unten dient als rechtliche Vorlage — die Kündigung selbst müssen Sie einmalig über den Button unten abschicken. Das dauert weniger als 60 Sekunden.</p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8E7;border:1px solid #F0D060;border-radius:10px;margin:0 0 28px;">
              <tr><td style="padding:20px 24px;">
                <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#0A0A0A;">So gehen Sie vor:</p>
                <p style="margin:0 0 6px;font-size:13px;color:#4A4A4A;line-height:1.6;">1. Klicken Sie auf den Button unten</p>
                <p style="margin:0 0 6px;font-size:13px;color:#4A4A4A;line-height:1.6;">2. Loggen Sie sich in Ihr ${meta.anbieter_name}-Konto ein</p>
                <p style="margin:0 0 16px;font-size:13px;color:#4A4A4A;line-height:1.6;">3. Folgen Sie den Anweisungen zur Kündigung (ca. 60 Sekunden)</p>
                ${anbieter?.onlineFormularUrl ? `
                <a href="${anbieter.onlineFormularUrl}" style="display:inline-block;background:#2E6B4F;color:#FFFFFF;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:700;">→ Jetzt bei ${meta.anbieter_name} kündigen</a>
                ` : ""}
              </td></tr>
            </table>
            ` : `
            <!-- Email case: we handled everything -->
            <p style="font-size:28px;margin:0 0 8px;font-weight:900;color:#0A0A0A;letter-spacing:-0.02em;">Ihre Kündigung ist raus.</p>
            <p style="font-size:15px;color:#6B6B6B;line-height:1.6;margin:0 0 28px;">Guten Tag ${meta.vorname} ${meta.nachname},<br><br>
            Ihre Kündigung bei <strong style="color:#0A0A0A;">${meta.anbieter_name}</strong> wurde heute um <strong style="color:#0A0A0A;">${uhrzeit} Uhr</strong> direkt per E-Mail an den Anbieter versendet. Sie müssen nichts weiter tun.</p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#EAF4EE;border-radius:10px;margin:0 0 28px;">
              <tr><td style="padding:16px 20px;">
                <p style="margin:0;font-size:13px;color:#1E4D38;line-height:1.6;">
                  <strong>✓ Versandnachweis:</strong> ${heute}, ${uhrzeit} Uhr<br>
                  <strong>✓ Empfänger:</strong> ${anbieter?.kuendigungsEmail || meta.anbieter_name}<br>
                  <strong>✓ Nächster Schritt:</strong> ${meta.anbieter_name} bestätigt in der Regel innerhalb von 14 Tagen
                </p>
              </td></tr>
            </table>
            `}

            <!-- Letter -->
            <p style="font-size:11px;font-weight:700;color:#A0A0A0;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;">Ihr Kündigungsschreiben</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F8;border-radius:10px;border:1px solid #EBEBEB;margin:0 0 32px;">
              <tr><td style="padding:24px;">
                <pre style="font-family:'Georgia',serif;font-size:13px;line-height:1.9;white-space:pre-wrap;margin:0;color:#2A2A2A;">${briefText}</pre>
              </td></tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 32px 32px;border-top:1px solid #F0F0F0;">
            <p style="font-size:12px;color:#B0B0B0;margin:0;line-height:1.6;text-align:center;">
              © ${new Date().getFullYear()} Abocut · <a href="https://abocut.de/impressum" style="color:#B0B0B0;">Impressum</a> · <a href="https://abocut.de/datenschutz" style="color:#B0B0B0;">Datenschutz</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    // Send customer email
    await resend.emails.send({
      from: "Abocut <noreply@abocut.de>",
      to: meta.email,
      subject: istOnlineFormular
        ? `✅ Ihr ${meta.anbieter_name}-Kündigungsschreiben ist fertig`
        : `✅ Ihre ${meta.anbieter_name}-Kündigung wurde versendet`,
      html: customerHtml,
    });

    // Admin notification — compact
    await resend.emails.send({
      from: "Abocut <noreply@abocut.de>",
      to: process.env.ADMIN_EMAIL || "admin@abocut.de",
      subject: `[${meta.paket?.toUpperCase()}] ${meta.anbieter_name} – ${meta.vorname} ${meta.nachname} – €${((session.amount_total || 0) / 100).toFixed(2)} ✅`,
      html: `
        <h2 style="font-family:sans-serif;">Neue Kündigung</h2>
        <p style="font-family:sans-serif;"><strong>Preis:</strong> €${((session.amount_total || 0) / 100).toFixed(2)}</p>
        <p style="font-family:sans-serif;"><strong>Anbieter:</strong> ${meta.anbieter_name} (${meta.versand_methode})</p>
        <p style="font-family:sans-serif;"><strong>Kunde:</strong> ${meta.vorname} ${meta.nachname} — ${meta.email}</p>
        <p style="font-family:sans-serif;"><strong>Adresse:</strong> ${meta.strasse}, ${meta.plz_ort}</p>
        ${meta.kundennummer ? `<p style="font-family:sans-serif;"><strong>Kundennummer:</strong> ${meta.kundennummer}</p>` : ""}
        ${cancellation ? `<p style="font-family:sans-serif;"><strong>DB-ID:</strong> ${cancellation.id}</p>` : ""}
        <hr/>
        <pre style="font-family:serif;font-size:14px;line-height:1.8;white-space:pre-wrap;">${briefText}</pre>
      `,
    });

  } catch (err) {
    console.error("Post-payment error:", err);
  }

  return NextResponse.json({ received: true });
}
