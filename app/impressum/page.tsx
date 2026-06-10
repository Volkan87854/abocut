import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Impressum — Abocut" };

export default function Impressum() {
  const h2 = { fontFamily:"'Inter',sans-serif", fontWeight:800 as const, fontSize:"1.1rem", color:"#0A0A0A", marginBottom:"0.5rem", marginTop:"2rem", letterSpacing:"-0.02em" };
  const p = { fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", color:"#6B6B6B", lineHeight:1.75, marginBottom:"0.5rem" };
  return (
    <>
      <Header />
      <main style={{ maxWidth:780, margin:"0 auto", padding:"3rem 2rem 5rem" }}>
        <h1 style={{ fontFamily:"'Inter',sans-serif", fontWeight:900, fontSize:"2rem", color:"#0A0A0A", letterSpacing:"-0.03em", marginBottom:"0.5rem" }}>Impressum</h1>
        <p style={{ ...p, marginBottom:"2rem" }}>Angaben gemäß § 5 TMG</p>

        <h2 style={h2}>Anbieter</h2>
        <p style={p}>Volkan Aslan<br/>Schwabstraße 32<br/>73760 Ostfildern<br/>Deutschland</p>

        <h2 style={h2}>Kontakt</h2>
        <p style={p}>E-Mail: hallo@abocut.de</p>

        <h2 style={h2}>Plattform der EU-Kommission zur Online-Streitbeilegung</h2>
        <p style={p}>https://ec.europa.eu/consumers/odr<br/>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

        <h2 style={h2}>Haftung für Inhalte</h2>
        <p style={p}>Als Dienstanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Dienstanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>

        <h2 style={h2}>Haftung für Links</h2>
        <p style={p}>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>

        <h2 style={h2}>Urheberrecht</h2>
        <p style={p}>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
      </main>
      <Footer />
    </>
  );
}
