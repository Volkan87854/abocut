import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Widerruf — Abocut" };

export default function Widerruf() {
  const h2 = { fontFamily:"'Inter',sans-serif", fontWeight:800 as const, fontSize:"1.1rem", color:"#0A0A0A", marginBottom:"0.5rem", marginTop:"2rem", letterSpacing:"-0.02em" };
  const p = { fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", color:"#6B6B6B", lineHeight:1.75, marginBottom:"0.5rem" };
  return (
    <>
      <Header />
      <main style={{ maxWidth:780, margin:"0 auto", padding:"3rem 2rem 5rem" }}>
        <h1 style={{ fontFamily:"'Inter',sans-serif", fontWeight:900, fontSize:"2rem", color:"#0A0A0A", letterSpacing:"-0.03em", marginBottom:"0.5rem" }}>Widerrufsbelehrung</h1>
        <p style={{ ...p, marginBottom:"2rem" }}>Stand: Juni 2026</p>

        <h2 style={h2}>Widerrufsrecht</h2>
        <p style={p}>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
        <p style={p}>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Volkan Aslan, Schwabstraße 32, 73760 Ostfildern, E-Mail: hallo@abocut.de) mittels einer eindeutigen Erklärung (z. B. ein per E-Mail versandter Brief) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
        <p style={p}>Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>

        <h2 style={h2}>Erlöschen des Widerrufsrechts bei Dienstleistungen</h2>
        <p style={p}>Das Widerrufsrecht erlischt bei einem Vertrag zur Erbringung von Dienstleistungen, wenn wir die Dienstleistung vollständig erbracht haben und mit der Ausführung der Dienstleistung erst begonnen haben, nachdem Sie dazu Ihre ausdrückliche Zustimmung gegeben haben und gleichzeitig Ihre Kenntnis davon bestätigt haben, dass Sie Ihr Widerrufsrecht bei vollständiger Vertragserfüllung durch uns verlieren.</p>
        <p style={p}><strong>Hinweis:</strong> Da Abocut das Kündigungsschreiben unmittelbar nach Zahlungseingang erstellt und versendet, erlischt das Widerrufsrecht in der Regel mit Abschluss dieser Leistung. Sie stimmen dem ausdrücklich mit Ihrer Bestellung zu.</p>

        <h2 style={h2}>Folgen des Widerrufs</h2>
        <p style={p}>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, sofern nicht ausdrücklich etwas anderes vereinbart wurde.</p>

        <h2 style={h2}>Muster-Widerrufsformular</h2>
        <div style={{ background:"#FAF8F4", border:"1px solid #E2DAD0", borderRadius:12, padding:"1.5rem", marginTop:"1rem" }}>
          <p style={p}><strong>An:</strong><br/>Volkan Aslan<br/>Schwabstraße 32<br/>73760 Ostfildern<br/>hallo@abocut.de</p>
          <p style={{ ...p, marginTop:"1rem" }}>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung:</p>
          <p style={p}>Bestellt am (*): _______________</p>
          <p style={p}>Name des/der Verbraucher(s): _______________</p>
          <p style={p}>Anschrift des/der Verbraucher(s): _______________</p>
          <p style={p}>Datum: _______________</p>
          <p style={{ ...p, marginTop:"1rem", fontSize:"0.78rem", opacity:0.7 }}>(*) Unzutreffendes streichen</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
