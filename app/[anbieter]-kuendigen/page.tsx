import { notFound } from "next/navigation";
import { alleAnbieter, getAlleAnbieterById } from "@/lib/anbieter";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ [key: string]: string }>;
};

export async function generateStaticParams() {
  return alleAnbieter.map((a) => ({
    "anbieter-kuendigen": `${a.id}-kuendigen`,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = Object.values(resolvedParams)[0] || "";
  const id = slug.replace("-kuendigen", "");
  const a = getAlleAnbieterById(id);
  if (!a) return {};
  return {
    title: `${a.name} kündigen — in 2 Minuten | Abocut`,
    description: `${a.name} kündigen leicht gemacht. Kündigungsschreiben erstellen, direkt versenden. Frist: ${a.kuendigungsfrist}. Ab 0 € kostenlos.`,
  };
}

export default async function AnbieterLandingPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = Object.values(resolvedParams)[0] || "";
  const id = slug.replace("-kuendigen", "");
  const a = getAlleAnbieterById(id);

  if (!a) notFound();

  const isAbofalle = a.kategorie === "Abofallen & Widersprüche";

  return (
    <>
      <Header />
      <main style={{ maxWidth: 780, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ fontSize: "0.82rem", color: "var(--ink-muted)", marginBottom: "1.5rem" }}>
          <Link href="/" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>Startseite</Link>
          {" › "}{a.name} kündigen
        </div>

        {isAbofalle && (
          <div style={{ background: "#FEF3C7", border: "1px solid #F59E0B", borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "1.5rem", fontSize: "0.88rem", lineHeight: 1.65 }}>
            <strong>⚠️ Bekannte Abofalle:</strong> Viele Betroffene berichten von ungewollten Abos bei {a.name}. Falls Sie dieses Abo nicht bewusst abgeschlossen haben, können Sie <strong>Widerspruch einlegen</strong>. Wir erstellen das passende Schreiben für Sie.
          </div>
        )}

        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "2rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 60, height: 60, borderRadius: 12, background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", flexShrink: 0 }}>
              {a.icon}
            </div>
            <div>
              <h1 style={{ fontSize: "1.75rem", marginBottom: "0.25rem" }}>{a.name} kündigen</h1>
              <p style={{ color: "var(--ink-muted)", fontSize: "0.9rem", margin: 0 }}>{a.beschreibung}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { label: "Kündigungsfrist", value: a.kuendigungsfrist.slice(0, 40) + "…", icon: "⏰" },
              { label: "Versand", value: a.versandmethode === "email" ? "Per E-Mail" : a.versandmethode === "online-formular" ? "Online-Portal" : "Einschreiben", icon: "📨" },
              { label: "Ab Preis", value: "0 € kostenlos", icon: "💰" },
            ].map((item) => (
              <div key={item.label} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: "1rem" }}>
                <div style={{ fontSize: "1.25rem", marginBottom: "0.35rem" }}>{item.icon}</div>
                <div style={{ fontSize: "0.68rem", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" }}>{item.label}</div>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)" }}>{item.value}</div>
              </div>
            ))}
          </div>

          <Link href={`/kuendigen/${a.id}`} className="btn-primary" style={{ display: "inline-flex", justifyContent: "center", width: "100%", fontSize: "1rem", padding: "0.9rem" }}>
            {isAbofalle ? `⚠️ Widerspruch / Kündigung einreichen →` : `📨 ${a.name} jetzt kündigen →`}
          </Link>
        </div>

        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "2rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>So kündigen Sie {a.name} — Schritt für Schritt</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { n: "1", title: "Formular ausfüllen", text: `Geben Sie Ihre persönlichen Daten und Ihre ${a.name}-Kundennummer ein. Dauert unter 2 Minuten.` },
              { n: "2", title: "Paket wählen", text: "Free: Brief herunterladen. Standard €4,99: Wir versenden direkt. Premium €9,99: Vollmacht + Garantie." },
              { n: "3", title: "Kündigung versenden", text: `KI generiert ein rechtssicheres Schreiben nach §126b BGB und sendet es direkt an ${a.name}.` },
            ].map((s) => (
              <div key={s.n} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent-light)", color: "var(--accent-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: "0.2rem" }}>{s.title}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--ink-muted)", lineHeight: 1.6 }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1.25rem" }}>Häufige Fragen zur {a.name}-Kündigung</h2>
          {[
            { q: `Wie kündige ich ${a.name} fristgerecht?`, a: `Die Kündigungsfrist bei ${a.name}: ${a.kuendigungsfrist}` },
            { q: `Muss ich ${a.name} schriftlich kündigen?`, a: `Textform nach §126b BGB ist ausreichend — eine E-Mail mit Ihren Daten reicht in den meisten Fällen.` },
            { q: "Erhalte ich eine Bestätigung?", a: `Mit Abocut erhalten Sie sofort einen Versandnachweis. ${a.name} sollte innerhalb von 14 Tagen bestätigen.` },
            ...(isAbofalle ? [{ q: `Das ${a.name}-Abo wurde ohne mein Wissen abgeschlossen — was tun?`, a: `Bei ungewollten Abos können Sie Widerspruch einlegen. Wir erstellen das passende Schreiben. Das 14-tägige Widerrufsrecht gilt bei Online-Abos.` }] : []),
          ].map((faq, i, arr) => (
            <div key={i} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none", paddingBottom: i < arr.length - 1 ? "1rem" : 0, marginBottom: i < arr.length - 1 ? "1rem" : 0 }}>
              <div style={{ fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.95rem" }}>{faq.q}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--ink-muted)", lineHeight: 1.65 }}>{faq.a}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
