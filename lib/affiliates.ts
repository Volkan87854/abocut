export interface Alternative {
  id: string;
  name: string;
  icon: string;
  beschreibung: string;
  preis: number; // monatlich in €
  affiliateUrl: string;
  badge?: string;
  highlight?: string;
}

export interface UpsellConfig {
  titel: string;
  savings_text?: string;
  alternativen: Alternative[];
}

// Affiliate upsell map per provider category / specific provider
export const upsellMap: Record<string, UpsellConfig> = {
  // Netflix
  netflix: {
    titel: "Günstiger streamen",
    alternativen: [
      {
        id: "disney-plus",
        name: "Disney+",
        icon: "✨",
        beschreibung: "Disney, Marvel, Star Wars, Pixar & mehr",
        preis: 1.99,
        affiliateUrl: "https://www.disneyplus.com/de-de/sign-up",
        badge: "Aktuelles Angebot",
        highlight: "Ab €1,99/Monat",
      },
      {
        id: "apple-tv",
        name: "Apple TV+",
        icon: "🍎",
        beschreibung: "Preisgekrönte Originals & Filme",
        preis: 9.99,
        affiliateUrl: "https://tv.apple.com/de",
        badge: "7 Tage gratis",
      },
      {
        id: "wow",
        name: "WOW",
        icon: "🎥",
        beschreibung: "HBO Originals, Blockbuster & Sport",
        preis: 7.99,
        affiliateUrl: "https://www.wowtv.de",
      },
    ],
  },

  // Spotify
  spotify: {
    titel: "Musik günstiger hören",
    alternativen: [
      {
        id: "youtube-premium",
        name: "YouTube Premium",
        icon: "▶️",
        beschreibung: "Musik + werbefreies YouTube + YouTube Music",
        preis: 11.99,
        affiliateUrl: "https://www.youtube.com/premium",
        badge: "3 Monate gratis",
      },
      {
        id: "apple-music",
        name: "Apple Music",
        icon: "🎵",
        beschreibung: "100 Mio. Songs, Spatial Audio, kein Algorithmus",
        preis: 10.99,
        affiliateUrl: "https://music.apple.com/de",
        badge: "3 Monate gratis",
      },
    ],
  },

  // Fitnessstudios
  fitx: {
    titel: "Sport flexibler & günstiger",
    alternativen: [
      {
        id: "urban-sports",
        name: "Urban Sports Club",
        icon: "🏊",
        beschreibung: "1.000+ Studios, Yoga, Schwimmen, Klettern – ohne feste Bindung",
        preis: 29.99,
        affiliateUrl: "https://urbansportsclub.com/de",
        badge: "1. Monat gratis",
        highlight: "Keine Mindestlaufzeit",
      },
      {
        id: "gymondo",
        name: "Gymondo",
        icon: "🧘",
        beschreibung: "Online-Fitness & Yoga zuhause – 900+ Workouts",
        preis: 7.99,
        affiliateUrl: "https://www.gymondo.com/de",
        badge: "14 Tage gratis",
      },
    ],
  },
  mcfit: {
    titel: "Sport flexibler & günstiger",
    alternativen: [
      {
        id: "urban-sports",
        name: "Urban Sports Club",
        icon: "🏊",
        beschreibung: "1.000+ Studios ohne Bindung",
        preis: 29.99,
        affiliateUrl: "https://urbansportsclub.com/de",
        badge: "1. Monat gratis",
        highlight: "Keine Mindestlaufzeit",
      },
      {
        id: "gymondo",
        name: "Gymondo",
        icon: "🧘",
        beschreibung: "Online-Fitness zuhause ab €7,99",
        preis: 7.99,
        affiliateUrl: "https://www.gymondo.com/de",
        badge: "14 Tage gratis",
      },
    ],
  },

  // Telekom / Internet
  vodafone: {
    titel: "Günstigerer Tarif gefällig?",
    alternativen: [
      {
        id: "check24-mobile",
        name: "Tarif-Vergleich bei CHECK24",
        icon: "📱",
        beschreibung: "Alle Anbieter vergleichen – oft 30–50% günstiger",
        preis: 0,
        affiliateUrl: "https://www.check24.de/handytarife/",
        badge: "Kostenlos vergleichen",
        highlight: "Bis zu 50% sparen",
      },
      {
        id: "verivox-mobile",
        name: "Verivox Tarifrechner",
        icon: "🔍",
        beschreibung: "Unabhängiger Preisvergleich für Mobilfunk",
        preis: 0,
        affiliateUrl: "https://www.verivox.de/handytarife/",
        badge: "Gratis & unverbindlich",
      },
    ],
  },
  telekom: {
    titel: "Günstigerer Tarif gefällig?",
    alternativen: [
      {
        id: "check24-mobile",
        name: "Tarif-Vergleich bei CHECK24",
        icon: "📱",
        beschreibung: "Alle Anbieter vergleichen – oft 30–50% günstiger",
        preis: 0,
        affiliateUrl: "https://www.check24.de/handytarife/",
        badge: "Kostenlos vergleichen",
        highlight: "Bis zu 50% sparen",
      },
    ],
  },
  o2: {
    titel: "Günstigerer Tarif gefällig?",
    alternativen: [
      {
        id: "check24-mobile",
        name: "CHECK24 Tarifvergleich",
        icon: "📱",
        beschreibung: "Jetzt besseren & günstigeren Tarif finden",
        preis: 0,
        affiliateUrl: "https://www.check24.de/handytarife/",
        badge: "Kostenlos & unverbindlich",
        highlight: "Oft 30–50% günstiger",
      },
    ],
  },

  // Energie
  eon: {
    titel: "Günstiger Strom & Gas",
    alternativen: [
      {
        id: "check24-strom",
        name: "Strom-Vergleich CHECK24",
        icon: "⚡",
        beschreibung: "Günstigsten Stromanbieter in Ihrer Region finden",
        preis: 0,
        affiliateUrl: "https://www.check24.de/strom/",
        badge: "Bis zu 400€ sparen",
        highlight: "Durchschnittlich 400€/Jahr gespart",
      },
      {
        id: "verivox-strom",
        name: "Verivox Stromvergleich",
        icon: "🔌",
        beschreibung: "Unabhängiger Preisvergleich für Strom & Gas",
        preis: 0,
        affiliateUrl: "https://www.verivox.de/strom/",
        badge: "Kostenlos vergleichen",
      },
    ],
  },
  rwe: {
    titel: "Günstiger Strom & Gas",
    alternativen: [
      {
        id: "check24-strom",
        name: "Strom-Vergleich CHECK24",
        icon: "⚡",
        beschreibung: "Günstigsten Stromanbieter finden",
        preis: 0,
        affiliateUrl: "https://www.check24.de/strom/",
        badge: "Bis zu 400€ sparen",
        highlight: "Durchschnittlich 400€/Jahr gespart",
      },
    ],
  },

  // Versicherungen
  "huk-coburg": {
    titel: "Günstigere Versicherung",
    alternativen: [
      {
        id: "check24-kfz",
        name: "KFZ-Versicherung vergleichen",
        icon: "🚗",
        beschreibung: "Über 180 Tarife vergleichen – Wechsel lohnt sich!",
        preis: 0,
        affiliateUrl: "https://www.check24.de/kfz-versicherung/",
        badge: "Bis zu 850€ sparen",
        highlight: "Jetzt Stichtag 30. November nutzen",
      },
    ],
  },
  allianz: {
    titel: "Günstigere Versicherung",
    alternativen: [
      {
        id: "check24-kfz",
        name: "KFZ-Versicherung vergleichen",
        icon: "🚗",
        beschreibung: "180+ Tarife, unabhängig verglichen",
        preis: 0,
        affiliateUrl: "https://www.check24.de/kfz-versicherung/",
        badge: "Bis zu 850€ sparen",
      },
      {
        id: "verivox-versicherung",
        name: "Verivox Versicherungsvergleich",
        icon: "🛡️",
        beschreibung: "Hausrat, Haftpflicht, KFZ – alles vergleichen",
        preis: 0,
        affiliateUrl: "https://www.verivox.de/versicherungen/",
        badge: "Gratis & unverbindlich",
      },
    ],
  },

  // Banking
  ing: {
    titel: "Noch besseres Konto",
    alternativen: [
      {
        id: "n26",
        name: "N26 Konto",
        icon: "📱",
        beschreibung: "Modernes Mobile-Banking, kostenlos",
        preis: 0,
        affiliateUrl: "https://n26.com/de-de",
        badge: "Kostenlos",
        highlight: "In 8 Minuten eröffnet",
      },
      {
        id: "check24-konto",
        name: "Girokonto-Vergleich",
        icon: "🏦",
        beschreibung: "Alle kostenlosen Girokonten vergleichen",
        preis: 0,
        affiliateUrl: "https://www.check24.de/girokonto/",
        badge: "Bis zu 150€ Bonus",
      },
    ],
  },

  // Default fallback (for categories without specific mapping)
  default_streaming: {
    titel: "Alternativ streamen",
    alternativen: [
      {
        id: "disney-plus",
        name: "Disney+",
        icon: "✨",
        beschreibung: "Disney, Marvel, Star Wars & mehr",
        preis: 1.99,
        affiliateUrl: "https://www.disneyplus.com/de-de/sign-up",
        badge: "Aktuelles Angebot",
      },
    ],
  },
  default_telekom: {
    titel: "Besseren Tarif finden",
    alternativen: [
      {
        id: "check24-mobile",
        name: "CHECK24 Tarifvergleich",
        icon: "📱",
        beschreibung: "Alle Anbieter kostenlos vergleichen",
        preis: 0,
        affiliateUrl: "https://www.check24.de/handytarife/",
        badge: "Kostenlos",
        highlight: "Bis zu 50% sparen",
      },
    ],
  },
  default_energie: {
    titel: "Günstigeren Energieanbieter finden",
    alternativen: [
      {
        id: "check24-strom",
        name: "CHECK24 Strom & Gas",
        icon: "⚡",
        beschreibung: "Jetzt Tarife vergleichen und sparen",
        preis: 0,
        affiliateUrl: "https://www.check24.de/strom/",
        badge: "Bis zu 400€ sparen",
      },
    ],
  },
  default_versicherung: {
    titel: "Günstigere Versicherung finden",
    alternativen: [
      {
        id: "check24-versicherung",
        name: "CHECK24 Versicherungsvergleich",
        icon: "🛡️",
        beschreibung: "Hausrat, Haftpflicht, KFZ – alles vergleichen",
        preis: 0,
        affiliateUrl: "https://www.check24.de/versicherungen/",
        badge: "Kostenlos vergleichen",
      },
    ],
  },
};

export function getUpsell(anbieterId: string, kategorie: string): UpsellConfig | null {
  // Direct provider match first
  if (upsellMap[anbieterId]) return upsellMap[anbieterId];

  // Category fallback
  const cat = kategorie.toLowerCase();
  if (cat.includes("streaming")) return upsellMap["default_streaming"];
  if (cat.includes("telefon") || cat.includes("internet")) return upsellMap["default_telekom"];
  if (cat.includes("energie")) return upsellMap["default_energie"];
  if (cat.includes("versicherung")) return upsellMap["default_versicherung"];

  return null;
}

// Calculate annual savings
export function calculateSavings(currentPreis: number, alternativePreis: number): number {
  return Math.round((currentPreis - alternativePreis) * 12);
}
