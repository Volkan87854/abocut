import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Datenschutz — Abocut" };

export default function Datenschutz() {
  const h2 = { fontFamily:"'Inter',sans-serif", fontWeight:800 as const, fontSize:"1.1rem", color:"#0A0A0A", marginBottom:"0.5rem", marginTop:"2rem", letterSpacing:"-0.02em" };
  const p = { fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", color:"#6B6B6B", lineHeight:1.75, marginBottom:"0.5rem" };
  return (
    <>
      <Header />
      <main style={{ maxWidth:780, margin:"0 auto", padding:"3rem 2rem 5rem" }}>
        <h1 style={{ fontFamily:"'Inter',sans-serif", fontWeight:900, fontSize:"2rem", color:"#0A0A0A", letterSpacing:"-0.03em", marginBottom:"0.5rem" }}>Datenschutzerklärung</h1>
        <p style={{ ...p, marginBottom:"2rem" }}>Stand: Juni 2026</p>

        <h2 style={h2}>1. Verantwortlicher</h2>
        <p style={p}>Volkan Aslan, Schwabstraße 32, 73760 Ostfildern, Deutschland<br/>E-Mail: hallo@abocut.de</p>

        <h2 style={h2}>2. Erhebung und Verarbeitung personenbezogener Daten</h2>
        <p style={p}>Wir erheben personenbezogene Daten nur, soweit dies zur Erbringung unserer Dienstleistung erforderlich ist. Dies umfasst: Name, Anschrift, E-Mail-Adresse sowie ggf. Kundennummer beim zu kündigenden Anbieter. Diese Daten werden ausschließlich zur Erstellung und Übermittlung des Kündigungsschreibens verwendet.</p>

        <h2 style={h2}>3. Zweck der Datenverarbeitung</h2>
        <p style={p}>Ihre Daten werden verarbeitet zur Erstellung des Kündigungsschreibens (Art. 6 Abs. 1 lit. b DSGVO), zur Abwicklung der Zahlung über Stripe (Art. 6 Abs. 1 lit. b DSGVO) sowie zur Zusendung der Auftragsbestätigung per E-Mail.</p>

        <h2 style={h2}>4. Weitergabe an Dritte</h2>
        <p style={p}>Ihre Daten werden an folgende Dritte weitergegeben, soweit dies zur Vertragserfüllung notwendig ist:<br/>
        <strong>Stripe Inc.</strong> (Zahlungsabwicklung) — Datenschutzerklärung: stripe.com/de/privacy<br/>
        <strong>Resend Inc.</strong> (E-Mail-Versand) — Datenschutzerklärung: resend.com/legal/privacy-policy<br/>
        <strong>Anthropic PBC</strong> (KI-Texterstellung) — Datenschutzerklärung: anthropic.com/privacy<br/>
        <strong>Anbieter der Kündigung</strong> — Das Kündigungsschreiben mit Ihren Daten wird an den von Ihnen genannten Anbieter übermittelt.</p>

        <h2 style={h2}>5. Speicherdauer</h2>
        <p style={p}>Ihre Daten werden nach vollständiger Abwicklung des Auftrags gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen (z. B. steuerrechtliche Aufbewahrungsfristen von 10 Jahren für Buchungsbelege).</p>

        <h2 style={h2}>6. Cookies und Analyse</h2>
        <p style={p}>Unsere Website verwendet keine Tracking-Cookies und keine Analyse-Tools von Drittanbietern. Es werden ausschließlich technisch notwendige Cookies gesetzt.</p>

        <h2 style={h2}>7. Ihre Rechte</h2>
        <p style={p}>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) sowie Datenübertragbarkeit (Art. 20 DSGVO). Wenden Sie sich hierfür an: hallo@abocut.de</p>

        <h2 style={h2}>8. Beschwerderecht</h2>
        <p style={p}>Sie haben das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde zu beschweren. Zuständig ist der Landesbeauftragte für den Datenschutz Baden-Württemberg.</p>

        <h2 style={h2}>9. Hosting</h2>
        <p style={p}>Diese Website wird gehostet bei Vercel Inc., 340 Pine Street Suite 701, San Francisco, CA 94104, USA. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert.</p>
      </main>
      <Footer />
    </>
  );
}
