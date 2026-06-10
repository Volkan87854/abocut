import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#0F1B3C", color: "white", padding: "3rem 2rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr", gap: "3rem", marginBottom: "2.5rem" }}>

          {/* Col 1: Logo + Description + Badges */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <Image
                src="/logo-transparent.png"
                alt="abocut"
                width={120}
                height={32}
                style={{ objectFit: "contain", height: 30, width: "auto", filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Abocut ist ein unabhängiger Kündigungsservice. Wir erstellen Kündigungsschreiben und helfen dabei, Abonnements sauber zu beenden.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                "🔒 SSL-verschlüsselt",
                "📄 Rechnung per E-Mail",
                "⚡ Antwort in <24h (Werktage)",
              ].map((badge) => (
                <span key={badge} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "0.35rem 0.85rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", width: "fit-content" }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "white", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.1rem" }}>Navigation</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                { label: "Home", href: "/" },
                { label: "Alle Anbieter", href: "/#alle" },
                { label: "So funktioniert's", href: "/#wie" },
                { label: "Kontakt", href: "mailto:hallo@abocut.de" },
              ].map((l) => (
                <Link key={l.label} href={l.href} style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.15s" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Rechtliches */}
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "white", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.1rem" }}>Rechtliches</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                { label: "AGB", href: "/agb" },
                { label: "Datenschutz", href: "/datenschutz" },
                { label: "Widerruf", href: "/widerruf" },
                { label: "Impressum", href: "/impressum" },
              ].map((l) => (
                <Link key={l.label} href={l.href} style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Kontakt */}
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "white", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.1rem" }}>Kontakt</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.85rem" }}>✉️</div>
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.15rem" }}>E-Mail</div>
                  <a href="mailto:hallo@abocut.de" style={{ fontSize: "0.85rem", color: "white", textDecoration: "none", fontWeight: 600 }}>hallo@abocut.de</a>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.85rem" }}>🕐</div>
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.15rem" }}>Erreichbarkeit</div>
                  <div style={{ fontSize: "0.85rem", color: "white", fontWeight: 600 }}>Mo–Fr: 09:00–17:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>© {new Date().getFullYear()} Abocut. Alle Rechte vorbehalten.</span>
          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>Service ohne Verbindung zu Anbietern.</span>
        </div>
      </div>
    </footer>
  );
}
