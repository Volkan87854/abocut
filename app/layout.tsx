import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abocut – Abos kündigen in Minuten",
  description: "Anbieter auswählen, Daten eintragen – Abocut erstellt das Kündigungsschreiben und sendet es direkt. Rechtssicher nach §126b BGB. Ab 0 € kostenlos.",
  keywords: "kündigen, abo kündigen, kündigungsschreiben, netflix kündigen, spotify kündigen, myiq kündigen, pvz kündigen",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
