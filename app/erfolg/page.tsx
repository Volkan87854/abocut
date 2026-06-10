"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { AIUpsellResult } from "@/lib/ai-upsell";

function ErfolgContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [upsell, setUpsell] = useState<AIUpsellResult | null>(null);
  const [upsellSource, setUpsellSource] = useState<"ai" | "fallback" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) { setLoading(false); return; }
    fetch(`/api/upsell?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((d) => { if (d.upsell) { setUpsell(d.upsell); setUpsellSource(d.source); } setLoading(false); })
      .catch(() => setLoading(false));
  }, [sessionId]);

  return (
    <>
      <Header />
      <main style={{ maxWidth: 660, margin: "3rem auto", padding: "0 1.5rem" }}>

        {/* Success */}
        <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 16, padding: "2.5rem 2rem", textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", margin: "0 auto 1.25rem" }}>✅</div>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.75rem", fontWeight: 400, marginBottom: "0.75rem" }}>Kündigung eingereicht!</h1>
          <p style={{ color: "var(--ink-muted)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
            Sie erhalten in wenigen Minuten eine <strong>Bestätigungs-E-Mail</strong> mit dem vollständigen Kündigungsschreiben als Nachweis.
          </p>
          <div style={{ background: "var(--green-light)", border: "1px solid var(--green-mid)", borderRadius: 10, padding: "0.85rem 1.25rem", fontSize: "0.83rem", color: "var(--green)", marginBottom: "1.75rem", lineHeight: 1.6 }}>
            💡 Falls Sie innerhalb von 14 Tagen keine Bestätigung vom Anbieter erhalten, empfehlen wir eine kurze telefonische Nachfrage.
          </div>
          <Link href="/" className="btn-primary">← Weiteres Abo kündigen</Link>
        </div>

        {/* Loading upsell */}
        {loading && (
          <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 16, padding: "2rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🤖</div>
            <div style={{ color: "var(--ink-muted)", fontSize: "0.88rem" }}>KI sucht die besten Alternativen für Sie…</div>
          </div>
        )}

        {/* AI Upsell */}
        {!loading && upsell && (
          <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ background: "var(--ink)", padding: "1.5rem 2rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.2rem 0.65rem", borderRadius: 100, marginBottom: "0.6rem" }}>
                  {upsellSource === "ai" ? "🤖 KI-Empfehlung" : "💡 Empfehlung"}
                </div>
                <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.35rem", fontWeight: 400, color: "white", margin: 0, lineHeight: 1.2 }}>{upsell.headline}</h2>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem", marginTop: "0.4rem", lineHeight: 1.55 }}>{upsell.subline}</p>
              </div>
              {upsell.savings_summary && (
                <div style={{ background: "var(--green)", color: "white", borderRadius: 10, padding: "0.6rem 0.9rem", textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.06em", opacity: 0.8, textTransform: "uppercase" }}>Potenzial</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, marginTop: "0.15rem" }}>{upsell.savings_summary}</div>
                </div>
              )}
            </div>
            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {upsell.alternativen.map((alt, i) => (
                <a key={i} href={alt.url} target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "1rem", background: i === 0 ? "var(--green-light)" : "var(--cream)", border: `1px solid ${i === 0 ? "var(--green-mid)" : "var(--border)"}`, borderRadius: 12, padding: "1rem 1.25rem", color: "inherit", transition: "all 0.15s" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 10, background: "var(--white)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.35rem", flexShrink: 0 }}>{alt.icon}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.15rem", flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--ink)" }}>{alt.name}</span>
                      {alt.badge && <span style={{ background: i === 0 ? "var(--green)" : "var(--ink)", color: "white", fontSize: "0.62rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: 100 }}>{alt.badge}</span>}
                      <span style={{ fontSize: "0.78rem", color: "var(--green)", fontWeight: 700 }}>{alt.preis_text}</span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>{alt.beschreibung}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--green)", marginTop: "0.2rem", fontStyle: "italic" }}>↳ {alt.vorteil}</div>
                  </div>
                  <div style={{ background: i === 0 ? "var(--green)" : "var(--ink)", color: "white", padding: "0.55rem 1rem", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{alt.cta} →</div>
                </a>
              ))}
              <p style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>
                {upsellSource === "ai" ? "🤖 KI-Empfehlung basierend auf aktuellen Marktdaten." : "ℹ️ Empfehlungen basierend auf Ihrer Kategorie."}
                {" "}Abocut erhält ggf. eine Provision — für Sie keine Mehrkosten.
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default function ErfolgPage() {
  return (
    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center" }}>Lade…</div>}>
      <ErfolgContent />
    </Suspense>
  );
}
