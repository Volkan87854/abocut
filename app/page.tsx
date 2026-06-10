"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { alleAnbieter, alleKategorien, abofallen } from "@/lib/anbieter";

export default function Home() {
  const [suche, setSuche] = useState("");
  const [aktiveKat, setAktiveKat] = useState<string | null>(null);

  const gefiltert = useMemo(() => {
    return alleAnbieter.filter((a) => {
      const matchSuche = suche === "" || a.name.toLowerCase().includes(suche.toLowerCase()) || a.kategorie.toLowerCase().includes(suche.toLowerCase());
      const matchKat = aktiveKat === null || a.kategorie === aktiveKat;
      return matchSuche && matchKat;
    });
  }, [suche, aktiveKat]);

  const topAnbieter = [
    { id: "pvz", icon: "📰", name: "PVZ", hot: true },
    { id: "myiq", icon: "🧠", name: "MyIQ", hot: true },
    { id: "cvneed", icon: "📄", name: "Cvneed", hot: true },
    { id: "allianz-kfz", icon: "🚗", name: "Allianz KFZ" },
    { id: "huk-coburg", icon: "🔵", name: "HUK-COBURG" },
    { id: "fitx", icon: "💪", name: "FitX" },
    { id: "mcfit", icon: "🏋️", name: "McFIT" },
    { id: "parship", icon: "💑", name: "Parship" },
  ];

  const btnStyle = (active: boolean) => ({
    padding: "0.4rem 0.9rem", borderRadius: 100,
    border: "1px solid", borderColor: active ? "var(--green)" : "var(--border)",
    background: active ? "var(--green)" : "var(--white)",
    color: active ? "white" : "var(--ink-muted)",
    fontSize: "0.78rem", fontWeight: 600 as const,
    cursor: "pointer", fontFamily: "'Inter', sans-serif",
  });

  return (
    <>
      <Header />

      {/* ── HERO ── */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "4rem", alignItems: "start" }}>

          <div style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--green-light)", color: "var(--green)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "0.35rem 0.9rem", borderRadius: 100, marginBottom: "1.5rem", fontFamily: "'Inter', sans-serif" }}>
              ✓ Rechtssicher nach §126b BGB
            </div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "clamp(2.25rem, 4.5vw, 3.25rem)", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem", color: "var(--black)" }}>
              Abos kündigen —<br />
              <span style={{ color: "var(--green)" }}>rechtssicher & schnell.</span>
            </h1>
            <p style={{ color: "var(--ink-muted)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2rem", maxWidth: 440, fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
              Kein Kündigungsbutton beim Anbieter? Wir übernehmen: anwaltlich geprüftes Schreiben, direkter Versand an den Anbieter, Zeitstempel-Nachweis — damit Ihre Kündigung wirklich ankommt.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.75rem" }}>
              <a href="#alle" className="btn-primary">Anbieter wählen →</a>
              <a href="#wie" style={{ background: "transparent", color: "var(--ink-2)", padding: "0.85rem 1.75rem", borderRadius: 100, fontWeight: 600, fontSize: "0.92rem", border: "1.5px solid var(--border)", textDecoration: "none", display: "inline-flex", alignItems: "center", fontFamily: "'Inter', sans-serif" }}>
                So geht&apos;s
              </a>
            </div>
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              {["Kein §312k-Button? Wir helfen.", "Ab 19,99 € einmalig", "SSL-gesichert"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--ink-muted)", fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "var(--green)", fontSize: "0.55rem", fontWeight: 800 }}>✓</span>
                  </div>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Search Card */}
          <div style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
            <div style={{ background: "var(--cream)", border: "1px solid var(--border)", borderRadius: 20, padding: "1.75rem" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.3rem", color: "var(--black)" }}>Welches Abo soll weg?</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-muted)", marginBottom: "1.25rem", fontFamily: "'Inter', sans-serif" }}>Nur Anbieter wo Abocut echten Mehrwert hat</div>

              <div style={{ display: "flex", border: "2px solid var(--black)", borderRadius: 12, background: "var(--white)", overflow: "hidden", marginBottom: "0.9rem" }}>
                <span style={{ padding: "0 0.75rem 0 1rem", display: "flex", alignItems: "center", color: "var(--ink-4)", fontSize: "1rem" }}>🔍</span>
                <input
                  style={{ flex: 1, border: "none", background: "transparent", fontSize: "0.9rem", padding: "0.85rem 0.5rem", outline: "none", color: "var(--ink)", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                  placeholder="Anbieter suchen…"
                  value={suche}
                  onChange={(e) => setSuche(e.target.value)}
                />
                {suche && <button onClick={() => setSuche("")} style={{ padding: "0 1rem", background: "none", border: "none", cursor: "pointer", color: "var(--ink-4)" }}>✕</button>}
              </div>

              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                {topAnbieter.map((a) => (
                  <Link key={a.id} href={`/kuendigen/${a.id}`}
                    style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.35rem", background: a.hot ? "#FEF3C7" : "var(--white)", border: `1px solid ${a.hot ? "#F59E0B44" : "var(--border)"}`, borderRadius: 100, padding: "0.35rem 0.75rem", fontSize: "0.75rem", fontWeight: 600, color: a.hot ? "#92400E" : "var(--ink-2)", fontFamily: "'Inter', sans-serif" }}>
                    {a.icon} {a.name} {a.hot ? "⚠️" : ""}
                  </Link>
                ))}
              </div>

              <div style={{ height: 1, background: "var(--border)", marginBottom: "1rem" }} />
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--ink-4)", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "0.75rem", fontFamily: "'Inter', sans-serif" }}>Meistgekündigt</div>

              {[
                { id: "pvz", icon: "📰", name: "PVZ Pressevertriebszentrale", cat: "⚠️ Über 21.000 Beschwerden 2024/25" },
                { id: "myiq", icon: "🧠", name: "MyIQ (IQ-Test Abo)", cat: "⚠️ Abofalle" },
                { id: "allianz-kfz", icon: "🚗", name: "Allianz KFZ-Versicherung", cat: "Versicherung — kein Button" },
              ].map((p) => (
                <Link key={p.id} href={`/kuendigen/${p.id}`}
                  style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem", background: "var(--white)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.75rem 0.9rem", marginBottom: "0.5rem", color: "inherit" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem", flexShrink: 0, border: "1px solid var(--border)" }}>{p.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "var(--black)", fontFamily: "'Inter', sans-serif" }}>{p.name}</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>{p.cat}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: "var(--green)", fontWeight: 700 }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live search results */}
      {suche !== "" && (
        <div style={{ background: "var(--white)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.5rem 2rem" }}>
            <div style={{ fontSize: "0.82rem", color: "var(--ink-muted)", marginBottom: "1rem", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
              {gefiltert.length} Ergebnisse für &ldquo;{suche}&rdquo;
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.6rem" }}>
              {gefiltert.map((a) => (
                <Link key={a.id} href={`/kuendigen/${a.id}`}
                  style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem", background: "var(--cream)", border: "1px solid var(--border)", borderRadius: 12, padding: "0.85rem 1rem", color: "inherit" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--white)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{a.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--black)", fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>{a.kategorie}</div>
                  </div>
                  <span style={{ color: "var(--green)", fontWeight: 700, flexShrink: 0 }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trust Bar */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {[
          { num: "30+", label: "Anbieter ohne §312k-Button" },
          { num: "§126b", label: "BGB-konform" },
          { num: "3 Min", label: "Aufwand" },
          { num: "Einmalig", label: "Kein Abo bei uns" },
        ].map((t, i) => (
          <div key={t.label} style={{ padding: "1.5rem 1rem", textAlign: "center", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "1.75rem", color: "var(--black)", lineHeight: 1, marginBottom: "0.25rem", letterSpacing: "-0.03em" }}>{t.num}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--ink-muted)", fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>{t.label}</div>
          </div>
        ))}
      </div>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>

        {/* All Providers */}
        <section id="alle" style={{ marginTop: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "var(--black)", letterSpacing: "-0.02em" }}>
              {aktiveKat ? aktiveKat : `Alle Anbieter — ${alleAnbieter.length} verfügbar`}
            </h2>
            <div style={{ fontSize: "0.78rem", color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
              Nicht dabei? <a href="mailto:hallo@abocut.de" style={{ color: "var(--green)", fontWeight: 700, textDecoration: "none" }}>Vorschlagen</a>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            <button onClick={() => setAktiveKat(null)} style={btnStyle(aktiveKat === null)}>Alle</button>
            {alleKategorien.map((k) => (
              <button key={k} onClick={() => setAktiveKat(k === aktiveKat ? null : k)} style={btnStyle(aktiveKat === k)}>
                {k === "Abofallen & Widersprüche" ? "⚠️ Abofallen" : k}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.6rem", marginBottom: "4rem" }}>
            {(aktiveKat === null ? alleAnbieter : gefiltert).map((a) => {
              const isAbofalle = a.kategorie === "Abofallen & Widersprüche";
              const isSofort = a.sofortKuendbar;
              return (
                <Link key={a.id} href={`/kuendigen/${a.id}`}
                  style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem", background: isAbofalle ? "#FFFBEB" : "var(--white)", border: `1px solid ${isAbofalle ? "#F59E0B44" : "var(--border)"}`, borderRadius: 12, padding: "0.9rem 1rem", color: "inherit" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: isAbofalle ? "#FEF3C7" : "var(--cream)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{a.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--black)", fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "0.2rem" }}>{a.name}</div>
                    <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                      {isSofort && !isAbofalle && <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "var(--green)", background: "var(--green-light)", padding: "0.1rem 0.45rem", borderRadius: 100, fontFamily: "'Inter', sans-serif" }}>Sofort kündbar</span>}
                      {isAbofalle && <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "#B45309", background: "#FEF3C7", padding: "0.1rem 0.45rem", borderRadius: 100, fontFamily: "'Inter', sans-serif" }}>⚠️ Abofalle</span>}
                      <span style={{ fontSize: "0.62rem", color: "var(--ink-4)", fontFamily: "'Inter', sans-serif" }}>{a.kategorie}</span>
                    </div>
                  </div>
                  <span style={{ color: "var(--green)", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>→</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section id="wie" style={{ borderTop: "1px solid var(--border)", paddingTop: "3.5rem", marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--green)", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "1rem", fontFamily: "'Inter', sans-serif" }}>✦ So funktioniert&apos;s</div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "2rem", letterSpacing: "-0.03em", marginBottom: "2.5rem", color: "var(--black)" }}>Drei Schritte. Eine Kündigung.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
            {[
              { n: "1", icon: "🔍", title: "Anbieter wählen", text: "Anbieter aus unserer Liste wählen — Daten eingeben, fertig." },
              { n: "2", icon: "✍️", title: "Daten eintragen", text: "Wir versenden ein anwaltlich geprüftes Kündigungsschreiben direkt an den Anbieter." },
              { n: "3", icon: "📨", title: "Wir versenden", text: "Zeitstempel-Nachweis inklusive — Sie bekommen eine Bestätigung, wir tracken den Status." },
            ].map((s) => (
              <div key={s.n} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.75rem" }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: "var(--green-light)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 800, marginBottom: "0.85rem" }}>{s.n}</div>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.65rem" }}>{s.icon}</div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", marginBottom: "0.4rem", letterSpacing: "-0.01em", color: "var(--black)" }}>{s.title}</div>
                <div style={{ fontSize: "0.83rem", color: "var(--ink-muted)", lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>{s.text}</div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
