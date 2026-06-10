export interface Paket {
  id: "standard";
  name: string;
  preis: number;
  stripe_preis: number;
  icon: string;
  tagline: string;
  features: string[];
}

export const pakete: Paket[] = [
  {
    id: "standard",
    name: "Abocut",
    preis: 19.99,
    stripe_preis: 1999,
    icon: "✂️",
    tagline: "Einmalig · Kein Abo · Sofort aktiv",
    features: [
      "Anwaltlich geprüftes Kündigungsschreiben",
      "Zeitstempel-Nachweis als rechtlicher Beleg",
      "Kostenloser & schneller Kundensupport bei Problemen",
    ],
  },
];

export function getPaket(id: string): Paket {
  return pakete[0];
}
