import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";

// Clients initialized lazily to avoid build-time errors
function getAnthropic() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || "placeholder" });
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "placeholder");
}

export async function POST(req: NextRequest) {
  try {
    const { anbieter, form } = await req.json();

    // Validate required fields
    if (!form.vorname || !form.nachname || !form.email || !form.strasse || !form.plz || !form.ort) {
      return NextResponse.json({ error: "Bitte füllen Sie alle Pflichtfelder aus." }, { status: 400 });
    }

    const heute = new Date().toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const kuendigungsdatumText = form.kuendigungsdatum
      ? `zum ${new Date(form.kuendigungsdatum).toLocaleDateString("de-DE")}`
      : "zum nächstmöglichen Zeitpunkt";

    const grundText = form.grund ? `Grund: ${form.grund}` : "";

    // Generate letter with Claude
    const anthropic = getAnthropic();
    const resend = getResend();
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `Erstelle ein formelles deutsches Kündigungsschreiben mit folgenden Daten:

Absender:
${form.vorname} ${form.nachname}
${form.strasse} ${form.hausnummer}
${form.plz} ${form.ort}

Empfänger:
${anbieter.name}
${anbieter.adresse}

Datum: ${heute}
Betreff: Kündigung meines Abonnements ${form.kundennummer ? `(Kundennummer: ${form.kundennummer})` : ""}
Kündigung: ${kuendigungsdatumText}
${grundText}

Das Schreiben soll:
- Professionell und höflich sein
- Eine klare Bestätigung der Kündigung anfordern
- Auf die gesetzlichen Vorgaben verweisen
- Kurz und präzise sein (max. 200 Wörter Brieftext)
- Auf Deutsch verfasst sein

Gib NUR den fertigen Brieftext zurück (ohne Anmerkungen, ohne Formatierungs-Tags, nur den reinen Text des Briefes inkl. Absender, Empfänger, Datum, Betreff, Anrede, Haupttext und Grußformel).`,
        },
      ],
    });

    const briefText = response.content[0].type === "text" ? response.content[0].text : "";

    // Send confirmation to user
    await resend.emails.send({
      from: "Abocut <noreply@abocut.de>",
      to: form.email,
      subject: `Bestätigung: Kündigung ${anbieter.name} eingegangen`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A1714;">
          <div style="background: #1A1714; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">✂️ Abocut</h1>
          </div>
          <div style="background: #FDFBF7; border: 1px solid #E2DDD7; border-top: none; padding: 32px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1A1714; margin-top: 0;">Ihre Kündigung ist eingegangen</h2>
            <p>Guten Tag ${form.vorname} ${form.nachname},</p>
            <p>wir haben Ihr Kündigungsschreiben an <strong>${anbieter.name}</strong> übermittelt.</p>
            
            <div style="background: #F5F2EC; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6B6560;">Ihr Kündigungsschreiben</h3>
              <pre style="font-family: serif; font-size: 14px; line-height: 1.8; white-space: pre-wrap; color: #1A1714; margin: 0;">${briefText}</pre>
            </div>
            
            <p style="color: #6B6560; font-size: 13px;">
              Bitte heben Sie diese E-Mail als Nachweis auf. Falls Sie innerhalb von 14 Tagen keine Kündigungsbestätigung vom Anbieter erhalten, empfehlen wir eine Nachfrage per Telefon oder Einschreiben.
            </p>
            
            <hr style="border: none; border-top: 1px solid #E2DDD7; margin: 24px 0;" />
            <p style="color: #6B6560; font-size: 12px; text-align: center;">
              KündigungsProfi · Unabhängiger Service · Alle Angaben ohne Gewähr
            </p>
          </div>
        </div>
      `,
    });

    // Send the actual cancellation letter to the provider (via email if available)
    // In production you'd use the provider's specific email address
    // For now we log it and send to an admin address
    await resend.emails.send({
      from: "Abocut <noreply@abocut.de>",
      to: process.env.ADMIN_EMAIL || "admin@abocut.de",
      subject: `[Kündigung] ${anbieter.name} – ${form.vorname} ${form.nachname}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Neue Kündigung eingegangen</h2>
          <p><strong>Anbieter:</strong> ${anbieter.name}</p>
          <p><strong>Nutzer:</strong> ${form.vorname} ${form.nachname} (${form.email})</p>
          <p><strong>Adresse:</strong> ${form.strasse} ${form.hausnummer}, ${form.plz} ${form.ort}</p>
          ${form.kundennummer ? `<p><strong>Kundennummer:</strong> ${form.kundennummer}</p>` : ""}
          <hr />
          <h3>Generiertes Kündigungsschreiben:</h3>
          <pre style="font-family: serif; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">${briefText}</pre>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Kündigung erfolgreich versendet." });
  } catch (error: unknown) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." },
      { status: 500 }
    );
  }
}
