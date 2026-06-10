import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "AGB — Abocut" };

export default function AGB() {
  const h2 = { fontFamily:"'Inter',sans-serif", fontWeight:800 as const, fontSize:"1.1rem", color:"#0A0A0A", marginBottom:"0.5rem", marginTop:"2rem", letterSpacing:"-0.02em" };
  const p = { fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", color:"#6B6B6B", lineHeight:1.75, marginBottom:"0.5rem" };
  return (
    <>
      <Header />
      <main style={{ maxWidth:780, margin:"0 auto", padding:"3rem 2rem 5rem" }}>
        <h1 style={{ fontFamily:"'Inter',sans-serif", fontWeight:900, fontSize:"2rem", color:"#0A0A0A", letterSpacing:"-0.03em", marginBottom:"0.5rem" }}>Allgemeine Geschäftsbedingungen</h1>
        <p style={{ ...p, marginBottom:"2rem" }}>Stand: Juni 2026</p>

        <h2 style={h2}>§ 1 Anbieter und Geltungsbereich</h2>
        <p style={p}>Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen Abocut (Volkan Aslan, Schwabstraße 32, 73760 Ostfildern, hallo@abocut.de) und dem Kunden über die Nutzung des Kündigungsservices auf abocut.de.</p>

        <h2 style={h2}>§ 2 Leistungsbeschreibung</h2>
        <p style={p}>Abocut erstellt im Auftrag des Kunden ein rechtssicheres Kündigungsschreiben nach §126b BGB und übermittelt dieses im Namen des Kunden an den angegebenen Vertragspartner. Abocut handelt dabei als Bevollmächtigter des Kunden in Textform. Abocut ist kein Rechtsanwalt und erbringt keine Rechtsberatung.</p>

        <h2 style={h2}>§ 3 Vertragsschluss</h2>
        <p style={p}>Der Vertrag kommt zustande, wenn der Kunde das Bestellformular vollständig ausfüllt und durch Klick auf „Jetzt Kündigung beauftragen" den Bestellvorgang abschließt und die Zahlung erfolgreich abgewickelt wird.</p>

        <h2 style={h2}>§ 4 Preise und Zahlung</h2>
        <p style={p}>Der Preis für eine Kündigung beträgt einmalig 19,99 € (inkl. MwSt.). Die Zahlung erfolgt über den Zahlungsdienstleister Stripe. Es entstehen keine weiteren Kosten. Abocut erhebt kein eigenes Abo-Modell.</p>

        <h2 style={h2}>§ 5 Leistungserbringung</h2>
        <p style={p}>Nach erfolgreicher Zahlung erstellt Abocut das Kündigungsschreiben und versendet es in der Regel innerhalb weniger Minuten an den angegebenen Anbieter. Der Kunde erhält eine Bestätigungs-E-Mail mit dem vollständigen Schreiben und einem Zeitstempel als Nachweis.</p>

        <h2 style={h2}>§ 6 Pflichten des Kunden</h2>
        <p style={p}>Der Kunde ist verpflichtet, vollständige und wahrheitsgemäße Angaben zu machen. Der Kunde versichert, dass er berechtigt ist, den genannten Vertrag zu kündigen. Abocut übernimmt keine Haftung für fehlerhafte Angaben des Kunden.</p>

        <h2 style={h2}>§ 7 Haftungsbeschränkung</h2>
        <p style={p}>Abocut übernimmt keine Garantie dafür, dass die Kündigung vom jeweiligen Anbieter akzeptiert wird, insbesondere wenn Kündigungsfristen nicht eingehalten werden können oder der Anbieter besondere Formvorschriften stellt. Abocut haftet nicht für etwaige Schäden, die durch fehlerhafte oder unvollständige Kundenangaben entstehen.</p>

        <h2 style={h2}>§ 8 Widerrufsrecht</h2>
        <p style={p}>Als Verbraucher haben Sie grundsätzlich ein 14-tägiges Widerrufsrecht. Da Abocut die Leistung (Versand des Kündigungsschreibens) unmittelbar nach der Zahlung erbringt, erlischt das Widerrufsrecht mit vollständiger Erbringung der Dienstleistung, wenn der Kunde ausdrücklich zugestimmt hat. Einzelheiten finden Sie in unserer Widerrufsbelehrung.</p>

        <h2 style={h2}>§ 9 Anwendbares Recht</h2>
        <p style={p}>Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Stuttgart, sofern der Kunde Kaufmann ist.</p>
      </main>
      <Footer />
    </>
  );
}
