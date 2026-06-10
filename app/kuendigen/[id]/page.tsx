"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAlleAnbieterById } from "@/lib/anbieter";
import { pakete } from "@/lib/pricing";

export default function KuendigungPage() {
  const params = useParams();
  const anbieter = getAlleAnbieterById(params.id as string);
  const [form, setForm] = useState({
    vorname: "", nachname: "", strasse: "", hausnummer: "",
    plz: "", ort: "", email: "", kundennummer: "",
    kuendigungsdatum: "", grund: "",
  });
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const paket = pakete[0];

  if (!anbieter) {
    return (
      <>
        <Header />
        <main style={{ maxWidth: 600, margin: "4rem auto", padding: "0 1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, marginBottom: "0.75rem" }}>Anbieter nicht gefunden</h1>
          <p style={{ color: "var(--ink-muted)", marginBottom: "1.5rem", fontFamily: "'Inter', sans-serif" }}>Dieser Anbieter ist noch nicht in unserer Datenbank.</p>
          <Link href="/" className="btn-primary">← Alle Anbieter anzeigen</Link>
        </main>
        <Footer />
      </>
    );
  }

  const isAbofalle = anbieter.kategorie === "Abofallen & Widersprüche";
  const isSofort = anbieter.versandmethode === "email" || anbieter.versandmethode === "online-formular";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading"); setErrorMsg("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anbieter, form: { ...form }, paket: paket.id, signature: "" }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Fehler.");
      window.location.href = data.url;
    } catch (err: unknown) {
      setStatus("idle");
      setErrorMsg(err instanceof Error ? err.message : "Fehler aufgetreten.");
    }
  };

  const trustPoints = [
    { icon: "⚖️", title: "Anwaltlich geprüftes Schreiben", text: "Rechtssichere Vorlage nach §126b BGB — formuliert für maximale Wirksamkeit." },
    { icon: "📨", title: "Sofortiger Versand mit Nachweis", text: "Direkt nach Bestellung — mit Zeitstempel als rechtsgültigem Beleg." },
    { icon: "🔒", title: "Datenschutz & Sicherheit", text: "SSL-verschlüsselt, DSGVO-konform. Ihre Daten nur für diese Kündigung." },
  ];

  const faqs = [
    { q: `Wie lange dauert die Kündigung bei ${anbieter.name}?`, a: `Mit Abocut unter 2 Minuten. ${anbieter.name} bestätigt in der Regel innerhalb von 7–14 Werktagen.` },
    { q: `Was passiert nach meiner Kündigung?`, a: `Ihr Abo läuft bis Ende der bezahlten Laufzeit. Danach keine Verlängerung. Sie erhalten eine offizielle Bestätigung von ${anbieter.name}.` },
    { q: `Muss ich eine Kündigungsfrist beachten?`, a: anbieter.kuendigungsfrist },
    { q: `Erhalte ich eine Bestätigung?`, a: `Sofort nach Zahlung: Versandnachweis mit Zeitstempel. Innerhalb von Minuten: vollständiges Schreiben per E-Mail.` },
    ...(isAbofalle ? [{ q: `Das Abo wurde ohne mein Wissen abgeschlossen — was tun?`, a: `Bei ungewollten Abos haben Sie ein 14-tägiges Widerrufsrecht. Wir erstellen das Widerspruchsschreiben.` }] : []),
  ];

  const labelStyle = { fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 700 as const, color: "var(--ink-muted)", textTransform: "uppercase" as const, letterSpacing: "0.05em", display: "block", marginBottom: "0.35rem" };
  const inputStyle = { fontFamily: "'Inter', sans-serif", fontSize: "0.88rem" };

  return (
    <>
      <Header />

      {/* ── UPPER: Trust Left + Form Right ── */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

          {/* LEFT — Trust */}
          <div style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
            <div style={{ fontSize: "0.78rem", color: "var(--ink-muted)", marginBottom: "1.5rem", fontFamily: "'Inter', sans-serif" }}>
              <Link href="/" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>Startseite</Link>
              {" › "}
              <Link href="/#alle" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>{anbieter.kategorie}</Link>
              {" › "}{anbieter.name}
            </div>

            {isAbofalle && (
              <div style={{ background: "#FEF3C7", border: "1px solid #F59E0B", borderRadius: 10, padding: "0.85rem 1rem", marginBottom: "1.25rem" }}>
                <div style={{ fontWeight: 700, color: "#92400E", fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", marginBottom: "0.2rem" }}>⚠️ Bekannte Abofalle</div>
                <div style={{ fontSize: "0.8rem", color: "#B45309", lineHeight: 1.55, fontFamily: "'Inter', sans-serif" }}>Falls Sie dieses Abo nicht bewusst abgeschlossen haben, können Sie Widerspruch einlegen — wir erstellen das passende Schreiben.</div>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1rem" }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>{anbieter.icon}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "1.1rem", color: "var(--black)", letterSpacing: "-0.02em" }}>{anbieter.name} kündigen</span>
                  {isSofort && !isAbofalle && <span style={{ background: "var(--green-light)", color: "var(--green)", fontSize: "0.65rem", fontWeight: 700, padding: "0.15rem 0.55rem", borderRadius: 100, fontFamily: "'Inter', sans-serif" }}>Sofort kündbar</span>}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif", marginTop: "0.15rem" }}>
                  Frist: <strong style={{ color: "var(--black)" }}>{isSofort ? "Sofort" : anbieter.kuendigungsfrist.split("–")[0].trim()}</strong>
                </div>
              </div>
            </div>

            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "0.85rem", color: "var(--black)" }}>
              {isAbofalle ? `${anbieter.name} kündigen — schnell & rechtssicher.` : `${anbieter.name} kündigen — in 2 Minuten erledigt.`}
            </h1>

            <p style={{ color: "var(--ink-muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem", fontFamily: "'Inter', sans-serif" }}>
              {isAbofalle
                ? `Schluss mit dem ungewollten ${anbieter.name}-Abo. Abocut erstellt das rechtssichere Schreiben und versendet es direkt — inklusive Versandnachweis.`
                : `Abocut übernimmt die komplette Kündigung für Sie — rechtssicher, sofort und mit vollständigem Nachweis.`}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {trustPoints.map((tp, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{tp.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--black)", marginBottom: "0.2rem", letterSpacing: "-0.01em" }}>{tp.title}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "var(--ink-muted)", lineHeight: 1.6 }}>{tp.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Form (no USP box, starts immediately) */}
          <div style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
            <div style={{ background: "var(--cream)", border: "1px solid var(--border)", borderRadius: 20, padding: "1.5rem" }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.6rem" }}>
                  <div><label style={labelStyle} htmlFor="vorname">Vorname *</label><input id="vorname" name="vorname" type="text" required value={form.vorname} onChange={handleChange} placeholder="Max" style={inputStyle} /></div>
                  <div><label style={labelStyle} htmlFor="nachname">Nachname *</label><input id="nachname" name="nachname" type="text" required value={form.nachname} onChange={handleChange} placeholder="Mustermann" style={inputStyle} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "0.6rem", marginBottom: "0.6rem" }}>
                  <div><label style={labelStyle} htmlFor="strasse">Straße *</label><input id="strasse" name="strasse" type="text" required value={form.strasse} onChange={handleChange} placeholder="Musterstraße" style={inputStyle} /></div>
                  <div><label style={labelStyle} htmlFor="hausnummer">Nr. *</label><input id="hausnummer" name="hausnummer" type="text" required value={form.hausnummer} onChange={handleChange} placeholder="12" style={inputStyle} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0.6rem", marginBottom: "0.6rem" }}>
                  <div><label style={labelStyle} htmlFor="plz">PLZ *</label><input id="plz" name="plz" type="text" required value={form.plz} onChange={handleChange} placeholder="70173" maxLength={5} style={inputStyle} /></div>
                  <div><label style={labelStyle} htmlFor="ort">Ort *</label><input id="ort" name="ort" type="text" required value={form.ort} onChange={handleChange} placeholder="Stuttgart" style={inputStyle} /></div>
                </div>
                <div style={{ marginBottom: "0.6rem" }}>
                  <label style={labelStyle} htmlFor="email">E-Mail * <span style={{ textTransform: "none", fontWeight: 400, opacity: 0.7 }}>(Nachweis)</span></label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="max@mustermann.de" style={inputStyle} />
                </div>
                <div style={{ marginBottom: "0.6rem" }}>
                  <label style={labelStyle} htmlFor="kundennummer">Kundennummer <span style={{ textTransform: "none", fontWeight: 400, opacity: 0.7 }}>(empfohlen)</span></label>
                  <input id="kundennummer" name="kundennummer" type="text" value={form.kundennummer} onChange={handleChange} placeholder="Aus Rechnung oder App" style={inputStyle} />
                </div>
                <div style={{ marginBottom: "0.6rem" }}>
                  <label style={labelStyle} htmlFor="kuendigungsdatum">Datum <span style={{ textTransform: "none", fontWeight: 400, opacity: 0.7 }}>(leer = nächstmöglich)</span></label>
                  <input id="kuendigungsdatum" name="kuendigungsdatum" type="date" value={form.kuendigungsdatum} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={labelStyle} htmlFor="grund">Grund <span style={{ textTransform: "none", fontWeight: 400, opacity: 0.7 }}>(optional)</span></label>
                  <textarea id="grund" name="grund" rows={2} value={form.grund} onChange={handleChange} placeholder="z.B. zu teuer, nutze es nicht…" style={{ ...inputStyle, resize: "none" }} />
                </div>

                <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 8, padding: "0.75rem 0.85rem", marginBottom: "1rem", fontSize: "0.72rem", color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                  <span style={{ fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.05em", fontSize: "0.65rem" }}>Kündigung geht an: </span>
                  {anbieter.adresse}
                </div>

                {errorMsg && (
                  <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "0.65rem 0.85rem", marginBottom: "0.85rem", fontSize: "0.82rem", color: "#991B1B", fontFamily: "'Inter', sans-serif" }}>⚠️ {errorMsg}</div>
                )}

                <button type="submit" disabled={status === "loading"}
                  style={{
                    width: "100%", padding: "1.1rem 1.5rem", borderRadius: 14,
                    fontFamily: "'Inter', sans-serif", cursor: "pointer",
                    background: "var(--green)", color: "white", border: "none",
                    opacity: status === "loading" ? 0.6 : 1,
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem",
                  }}>
                  <span style={{ fontWeight: 900, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
                    {status === "loading" ? "⏳ Weiterleitung…" : "Jetzt Kündigung beauftragen"}
                  </span>
                  {status !== "loading" && (
                    <span style={{ fontSize: "0.78rem", fontWeight: 400, opacity: 0.75 }}>
                      zahlungspflichtig — {paket.preis.toFixed(2).replace(".", ",")} € einmalig
                    </span>
                  )}
                </button>

                <p style={{ textAlign: "center", fontSize: "0.7rem", color: "var(--ink-muted)", marginTop: "0.6rem", fontFamily: "'Inter', sans-serif" }}>
                  🔐 SSL · Stripe · Kreditkarte, PayPal, SEPA
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ── LOWER: Only Tips + FAQ (no company data, no next steps) ── */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem 4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>

          {/* Tipps */}
          <div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "1.2rem", letterSpacing: "-0.02em", color: "var(--black)", marginBottom: "1.25rem" }}>
              💡 Tipps zur Kündigung von {anbieter.name}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                `Halten Sie Ihre Kundennummer bereit — das beschleunigt die Bearbeitung erheblich.`,
                isSofort ? `Die Kündigung ist sofort wirksam — Sie erhalten innerhalb weniger Tage eine Bestätigung.` : `Frist beachten: ${anbieter.kuendigungsfrist}`,
                `Bewahren Sie die Bestätigungs-E-Mail als Nachweis auf — Datum und Uhrzeit sind rechtsgültig.`,
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", background: "var(--white)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.85rem 1rem" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem" }}>
                    <span style={{ color: "white", fontSize: "0.6rem", fontWeight: 800 }}>✓</span>
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "var(--ink-2)", lineHeight: 1.55, fontFamily: "'Inter', sans-serif" }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ only */}
          <div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "1.2rem", letterSpacing: "-0.02em", color: "var(--black)", marginBottom: "1.25rem" }}>
              ❓ Häufige Fragen zu {anbieter.name} kündigen
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", background: "var(--white)" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.95rem 1.1rem", background: openFaq === i ? "var(--cream)" : "var(--white)", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 700, color: "var(--black)", letterSpacing: "-0.01em" }}>
                    {faq.q}
                    <span style={{ color: "var(--green)", flexShrink: 0, marginLeft: "0.75rem", transform: openFaq === i ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>
                  </button>
                  {openFaq === i && <div style={{ padding: "0 1.1rem 0.95rem", fontSize: "0.83rem", color: "var(--ink-muted)", lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
