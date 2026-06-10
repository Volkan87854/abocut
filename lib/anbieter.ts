export interface Anbieter {
  id: string;
  name: string;
  kategorie: string;
  icon: string;
  adresse: string;
  kuendigungsfrist: string;
  beschreibung: string;
  beliebt?: boolean;
  versandmethode: "email" | "online-formular" | "einschreiben";
  kuendigungsEmail?: string;
  onlineFormularUrl?: string;
  onlineFormularAnleitung?: string;
  einschreibenPreis?: number;
  sofortKuendbar?: boolean;
}

export const anbieter: Anbieter[] = [

  // ══════════════════════════════════════════════════════
  // ABOFALLEN & WIDERSPRÜCHE
  // Strategie: NICHT ordentlich kündigen — Widerruf + Anfechtung + nicht zahlen
  // ══════════════════════════════════════════════════════
  {
    id: "pvz",
    name: "PVZ Pressevertriebszentrale",
    kategorie: "Abofallen & Widersprüche",
    icon: "📰",
    // Korrekte Adresse laut Recherche — info@pvz.de kein Bounce belegt
    adresse: "PVZ Pressevertriebszentrale GmbH & Co. KG, Bahndamm 9, 23617 Stockelsdorf",
    kuendigungsfrist: "Widerruf: 14 Tage — Kündigung: 4 Wochen zum Monatsende",
    beschreibung: "Über 21.000 Beschwerden 2024/2025 — Zeitschriften-Abofalle durch Gewinnspiele & Telefonakquise",
    beliebt: true,
    // Einschreiben zwingend empfohlen da Zugangsnachweis kritisch
    versandmethode: "einschreiben",
    einschreibenPreis: 9.99,
  },
  {
    id: "wolfram-klenk",
    name: "Wolfgang Klenk Abonnementverwaltung",
    kategorie: "Abofallen & Widersprüche",
    icon: "⚠️",
    // Kündigung läuft über PVZ-Adresse laut Recherche
    adresse: "Wolfgang Klenk / PVZ, Bahndamm 9, 23617 Stockelsdorf",
    kuendigungsfrist: "Widerruf sofort — Anfechtung wegen Täuschung möglich",
    beschreibung: "Gewinnspiel-Cold-Calls → Zeitschriften- & Reiseabos — bekannte Abofalle",
    beliebt: true,
    versandmethode: "einschreiben",
    einschreibenPreis: 9.99,
  },
  {
    id: "myiq",
    name: "MyIQ (IQ-Test Abo)",
    kategorie: "Abofallen & Widersprüche",
    icon: "🧠",
    adresse: "myIQ.com, Attn: Customer Support, 340 S Lemon Ave #1537, Walnut CA 91789, USA",
    kuendigungsfrist: "Monatlich kündbar — sofort wirksam",
    beschreibung: "IQ-Test-Seite mit verstecktem Abo — Kündigung nur über Account-Portal, E-Mail an support@myiq.com",
    beliebt: true,
    // Kündigung NUR über Account-Portal oder E-Mail — kein Einschreiben sinnvoll (US-Anbieter)
    versandmethode: "online-formular",
    onlineFormularUrl: "https://myiq.com/de/help/how-do-i-cancel-my-subscription",
    onlineFormularAnleitung: "1. Auf myiq.com einloggen → 2. Konto/Account → 3. Abonnement kündigen → alternativ E-Mail an support@myiq.com → Kreditkarte sperren lassen",
    sofortKuendbar: true,
  },
  {
    id: "cvneed",
    name: "Cvneed (Lebenslauf-Abofalle)",
    kategorie: "Abofallen & Widersprüche",
    icon: "📄",
    adresse: "Cvneed B.V., Keizersgracht 520H, 1017 EK Amsterdam, Niederlande",
    kuendigungsfrist: "Widerruf sofort — monatlich kündbar",
    beschreibung: "Über 1.000 Beschwerden seit 2024 — 'kostenloser' Lebenslauf wird zum 30€/Monat-Abo",
    beliebt: true,
    // Laut Recherche: Online-Kündigungsbutton auf Website mit Registrierungs-E-Mail
    versandmethode: "online-formular",
    onlineFormularUrl: "https://cvneed.com",
    onlineFormularAnleitung: "1. cvneed.com aufrufen → 2. Registrierungs-E-Mail eingeben → 3. 'Abonnement kündigen' → Zusätzlich: Lastschrift über Bank zurückbuchen, SEPA-Mandat widerrufen",
    sofortKuendbar: true,
  },
  {
    id: "cyando",
    name: "Cyando / Uploaded.net",
    kategorie: "Abofallen & Widersprüche",
    icon: "💾",
    // Korrekte Adresse: Schweiz (Cham), nicht München
    adresse: "Cyando AG, Alte Steinhauserstrasse 1, 6330 Cham, Schweiz",
    kuendigungsfrist: "Monatlich kündbar — Premium-Pakete laufen teils automatisch aus",
    beschreibung: "Cloud-Speicher mit verstecktem Abo — Kündigung per E-Mail",
    beliebt: false,
    versandmethode: "email",
    // deutsch@uploaded.net laut Recherche, nicht support@uploaded.net
    kuendigungsEmail: "deutsch@uploaded.net",
  },

  // ══════════════════════════════════════════════════════
  // VERSICHERUNGEN
  // Gesetzlich vom §312k-Button ausgenommen (Finanzdienstleistung)
  // ══════════════════════════════════════════════════════
  {
    id: "allianz-kfz",
    name: "Allianz KFZ-Versicherung",
    kategorie: "Versicherungen",
    icon: "🚗",
    adresse: "Allianz Versicherungs-AG, 10900 Berlin",
    kuendigungsfrist: "1 Monat zum Versicherungsjahr (KFZ-Stichtag: 30.11.)",
    beschreibung: "KFZ-Versicherung — kein §312k-Button (Finanzdienstleistung), E-Mail wird akzeptiert",
    beliebt: true,
    versandmethode: "email",
    // Korrekte Adresse laut Recherche
    kuendigungsEmail: "sachversicherung@allianz.de",
  },
  {
    id: "allianz-haftpflicht",
    name: "Allianz Haftpflicht / Hausrat",
    kategorie: "Versicherungen",
    icon: "🛡️",
    adresse: "Allianz Versicherungs-AG, 10900 Berlin",
    kuendigungsfrist: "1 Monat zum Versicherungsjahr",
    beschreibung: "Haftpflicht/Hausrat — gesetzlich kein Kündigungsbutton, E-Mail wirksam",
    beliebt: false,
    versandmethode: "email",
    kuendigungsEmail: "sachversicherung@allianz.de",
  },
  {
    id: "huk-coburg",
    name: "HUK-COBURG",
    kategorie: "Versicherungen",
    icon: "🔵",
    // Korrekte Postanschrift laut HUK eigener Website
    adresse: "HUK-COBURG-Allgemeine Versicherung AG, 96444 Coburg",
    kuendigungsfrist: "1 Monat zum Versicherungsjahr (KFZ-Stichtag: 30.11.)",
    beschreibung: "KFZ/Haftpflicht — E-Mail an info@huk-coburg.de wird von HUK offiziell bestätigt",
    beliebt: true,
    versandmethode: "email",
    // info@huk-coburg.de ist korrekt — HUK bestätigt das selbst auf huk.de
    kuendigungsEmail: "info@huk-coburg.de",
  },
  {
    id: "axa",
    name: "AXA Versicherung",
    kategorie: "Versicherungen",
    icon: "🔒",
    adresse: "AXA Versicherung AG, 51171 Köln",
    kuendigungsfrist: "3 Monate zum Versicherungsjahr",
    beschreibung: "KFZ/Haftpflicht — E-Mail oder Online-Kündigung möglich",
    beliebt: false,
    versandmethode: "email",
    kuendigungsEmail: "service@axa.de",
  },
  {
    id: "devk",
    name: "DEVK Versicherungen",
    kategorie: "Versicherungen",
    icon: "🚂",
    adresse: "DEVK Allgemeine Versicherungs-AG, Riehler Str. 190, 50735 Köln",
    kuendigungsfrist: "3 Monate zum Versicherungsjahr",
    beschreibung: "KFZ/Haftpflicht — E-Mail wird von DEVK offiziell bestätigt, telefonisch NICHT möglich",
    beliebt: false,
    versandmethode: "email",
    // DEVK bestätigt E-Mail-Kündigung offiziell auf devk.de
    kuendigungsEmail: "info@devk.de",
  },
  {
    id: "ergo",
    name: "ERGO Versicherung",
    kategorie: "Versicherungen",
    icon: "🏥",
    adresse: "ERGO Versicherung AG, ERGO-Platz 1, 40477 Düsseldorf",
    kuendigungsfrist: "3 Monate zum Versicherungsjahr",
    beschreibung: "Kranken/Haftpflicht — E-Mail offiziell bestätigt auf ergo.de",
    beliebt: false,
    versandmethode: "email",
    // service@ergo.de von ERGO offiziell bestätigt
    kuendigungsEmail: "service@ergo.de",
  },
  {
    id: "rv-versicherung",
    name: "R+V Versicherung",
    kategorie: "Versicherungen",
    icon: "🌿",
    adresse: "R+V Versicherung AG, Raiffeisenplatz 1, 65189 Wiesbaden",
    kuendigungsfrist: "3 Monate zum Versicherungsjahr",
    beschreibung: "Genossenschaftliche Versicherung — korrekte E-Mail: ruv@ruv.de (nicht info@ruv.de)",
    beliebt: false,
    versandmethode: "email",
    // KORRIGIERT: info@ruv.de ist falsch — korrekt ist ruv@ruv.de laut Recherche
    kuendigungsEmail: "ruv@ruv.de",
  },

  // ══════════════════════════════════════════════════════
  // FITNESS
  // ══════════════════════════════════════════════════════
  {
    id: "fitx",
    name: "FitX",
    kategorie: "Fitness",
    icon: "💪",
    // Korrekte Zentral-Adresse (nicht Studio-Adresse)
    adresse: "FitX Deutschland GmbH, Zentrale Mitgliederverwaltung, Stoppenberger Straße 61, 45141 Essen",
    kuendigungsfrist: "1 Monat zum Monatsende (Verträge ab 03/2022) — 3 Monate (Altverträge)",
    beschreibung: "Fitnesskette — E-Mail an Zentrale (nicht ans Studio), Mitgliedsnummer zwingend",
    beliebt: true,
    versandmethode: "email",
    // KORRIGIERT: mitglied@fitx.de (nicht kuendigung@fitx.de)
    kuendigungsEmail: "mitglied@fitx.de",
  },
  {
    id: "mcfit",
    name: "McFIT",
    kategorie: "Fitness",
    icon: "🏋️",
    // Korrekte RSG-Adresse laut Recherche
    adresse: "RSG Group GmbH, Tannenberg 4, 96132 Schlüsselfeld",
    kuendigungsfrist: "1 Monat zum Monatsende",
    beschreibung: "Fitnesskette — nur Brief/Einschreiben an Schlüsselfeld, E-Mail-Kündigung abgeschafft",
    beliebt: true,
    versandmethode: "einschreiben",
    einschreibenPreis: 9.99,
  },
  {
    id: "clever-fit",
    name: "Clever Fit",
    kategorie: "Fitness",
    icon: "🏃",
    // Franchise: Vertragsstudio, nicht Zentrale
    adresse: "Ihr lokales Clever Fit Studio (Vertragspartner) — Adresse aus Ihrem Mitgliedsvertrag",
    kuendigungsfrist: "1 Monat (Verträge ab 03/2022) — 3 Monate (Altverträge) zum Monatsende",
    beschreibung: "Franchise (~450 Studios) — Kündigung ZWINGEND ans lokale Studio, nicht an Zentrale",
    beliebt: true,
    versandmethode: "einschreiben",
    einschreibenPreis: 9.99,
  },
  {
    id: "kieser-training",
    name: "Kieser Training",
    kategorie: "Fitness",
    icon: "🦾",
    // Korrekte Adresse: Köln (nicht Zürich)
    adresse: "Kieser Training GmbH, Schanzenstraße 39/D15, 51063 Köln",
    kuendigungsfrist: "2 Monate zum Laufzeitende (12 oder 24 Monate)",
    beschreibung: "Kraft-Training — Schriftform erforderlich, Einschreiben zwingend empfohlen",
    beliebt: false,
    versandmethode: "einschreiben",
    einschreibenPreis: 9.99,
  },
  {
    id: "john-reed",
    name: "John Reed",
    kategorie: "Fitness",
    icon: "🎸",
    // Gleiche RSG-Adresse wie McFIT
    adresse: "RSG Group GmbH, Tannenberg 4, 96132 Schlüsselfeld",
    kuendigungsfrist: "1 Monat zum Monatsende",
    beschreibung: "Premium-Studio (RSG Group) — E-Mail-Kündigung abgeschafft, nur Brief/Einschreiben",
    beliebt: false,
    versandmethode: "einschreiben",
    einschreibenPreis: 9.99,
  },
  {
    id: "urban-sports",
    name: "Urban Sports Club",
    kategorie: "Fitness",
    icon: "🏊",
    // Korrekte Adresse laut Recherche
    adresse: "Urban Sports GmbH, Michaelkirchstr. 20, 10179 Berlin",
    kuendigungsfrist: "Monatlich kündbar",
    beschreibung: "Multi-Sport — E-Mail oder Online-Kündigung über 'Mein Konto'",
    beliebt: false,
    versandmethode: "email",
    // Laut Recherche: member-contact@urbansportsclub.com
    kuendigungsEmail: "member-contact@urbansportsclub.com",
    sofortKuendbar: true,
  },

  // ══════════════════════════════════════════════════════
  // ENERGIE & STROM
  // ══════════════════════════════════════════════════════
  {
    id: "eprimo",
    name: "eprimo",
    kategorie: "Energie & Strom",
    icon: "⚡",
    adresse: "eprimo GmbH, Kundenservice, Flughafenstr. 20, 63263 Neu-Isenburg",
    kuendigungsfrist: "4 Wochen zum Monatsende",
    beschreibung: "Strom/Gas — E-Mail an kundenservice@eprimo.de, Zählernummer angeben, Einschreiben empfohlen",
    beliebt: true,
    versandmethode: "email",
    kuendigungsEmail: "kundenservice@eprimo.de",
  },
  {
    id: "yello",
    name: "Yello Strom",
    kategorie: "Energie & Strom",
    icon: "🌟",
    adresse: "Yello Strom GmbH, Siegburger Straße 229, 50679 Köln",
    kuendigungsfrist: "4 Wochen zum Monatsende",
    beschreibung: "Strom/Gas — E-Mail oder Portal 'Mein Yello'",
    beliebt: false,
    versandmethode: "email",
    // KORRIGIERT: immerda@yello.de (nicht service@yello.de)
    kuendigungsEmail: "immerda@yello.de",
  },
  {
    id: "eon",
    name: "E.ON",
    kategorie: "Energie & Strom",
    icon: "🔌",
    adresse: "E.ON Energie Deutschland GmbH, Postfach 1475, 84001 Landshut",
    kuendigungsfrist: "4 Wochen zum Monatsende",
    beschreibung: "Großer Energieversorger — E-Mail oder Online-Kündigungsformular",
    beliebt: false,
    versandmethode: "email",
    // KORRIGIERT: kundenservice@eon.de (nicht service@eon.de)
    kuendigungsEmail: "kundenservice@eon.de",
  },

  // ══════════════════════════════════════════════════════
  // ZEITSCHRIFTEN & VERLAGE
  // ══════════════════════════════════════════════════════
  {
    id: "burda-abo",
    name: "Burda Direct / NVG Abos",
    kategorie: "Zeitschriften & Verlage",
    icon: "📖",
    adresse: "Burda Direct GmbH, Marlener Str. 4, 77656 Offenburg",
    kuendigungsfrist: "4 Wochen zum Quartalsende",
    beschreibung: "Bunte, Focus, TV Spielfilm etc. — E-Mail offiziell bestätigt",
    beliebt: false,
    versandmethode: "email",
    // kundenservice@burdadirect.de offiziell bestätigt
    kuendigungsEmail: "kundenservice@burdadirect.de",
  },
  {
    id: "bauer-abo",
    name: "Bauer Media (TV Movie, Bravo etc.)",
    kategorie: "Zeitschriften & Verlage",
    icon: "📺",
    // Korrekte Adresse: Hamburg (nicht München)
    adresse: "Bauer Vertriebs KG, Meßberg 1, 20086 Hamburg",
    kuendigungsfrist: "4 Wochen zum Quartalsende",
    beschreibung: "TV Movie, Bravo, InTouch etc. — E-Mail oder Online-Formular",
    beliebt: false,
    versandmethode: "email",
    // KORRIGIERT: kundenservice@bauermedia.com (nicht bauervertrieb.de)
    kuendigungsEmail: "kundenservice@bauermedia.com",
  },

  // ══════════════════════════════════════════════════════
  // DATING & PARTNERSCHAFT
  // ══════════════════════════════════════════════════════
  {
    id: "parship",
    name: "Parship / ElitePartner",
    kategorie: "Partnervermittlung",
    icon: "💑",
    adresse: "PE Digital GmbH, Kundenservice Parship, Speersort 10, 20095 Hamburg",
    kuendigungsfrist: "3 Monate zum Ende der Mindestlaufzeit (6 oder 12 Monate)",
    beschreibung: "Dating-Portal — E-Mail oder Kündigungsbutton; Profil-Löschung ist KEINE Kündigung",
    beliebt: true,
    versandmethode: "email",
    // premiumkuendigung@parship.de laut Recherche — info@parship.de als Alternative
    kuendigungsEmail: "premiumkuendigung@parship.de",
  },
  {
    id: "lovescout",
    name: "LoveScout24",
    kategorie: "Partnervermittlung",
    icon: "❤️",
    // Korrekte Adresse laut Recherche
    adresse: "FriendScout24 GmbH / LoveScout24, Weihenstephaner Str. 12, 81673 München",
    // Frist korrigiert: 48h vor Ablauf (nicht generisch)
    kuendigungsfrist: "Mind. 48 Stunden vor Laufzeitende — sehr kurze Frist!",
    beschreibung: "Dating-Portal — E-Mail oder Online-Kündigung, 48h-Frist beachten",
    beliebt: false,
    versandmethode: "email",
    kuendigungsEmail: "kundenservice@lovescout24.de",
  },

  // ══════════════════════════════════════════════════════
  // SONSTIGES
  // ══════════════════════════════════════════════════════
  {
    id: "adac",
    name: "ADAC Mitgliedschaft",
    kategorie: "Sonstiges",
    icon: "🚘",
    adresse: "ADAC e.V., Mitgliederservice, Hansastraße 19, 80686 München",
    kuendigungsfrist: "2 Monate zum Ende des Beitragsjahres",
    beschreibung: "Automobilclub — E-Mail oder Online-Formular, offiziell von ADAC bestätigt",
    beliebt: true,
    versandmethode: "email",
    // service@adac.de von ADAC offiziell bestätigt
    kuendigungsEmail: "service@adac.de",
  },
  {
    id: "nordvpn",
    name: "NordVPN",
    kategorie: "Sonstiges",
    icon: "🔐",
    adresse: "Nord Security Inc., 1209 Orange St, Wilmington DE 19801, USA",
    kuendigungsfrist: "Vor Verlängerung Auto-Renewal deaktivieren",
    beschreibung: "VPN-Dienst — NUR über Account-Portal (Auto-Renewal deaktivieren), E-Mail reicht nicht",
    beliebt: false,
    versandmethode: "online-formular",
    onlineFormularUrl: "https://my.nordaccount.com",
    onlineFormularAnleitung: "1. my.nordaccount.com → 2. Billing → 3. Subscriptions → 4. Auto-Renewal 'Cancel' → Bei App-Store-Kauf: über Apple/Google kündigen",
    sofortKuendbar: true,
  },
  {
    id: "xing-premium",
    name: "XING Premium",
    kategorie: "Sonstiges",
    icon: "🔷",
    adresse: "New Work SE, Am Strandkai 1, 20457 Hamburg",
    kuendigungsfrist: "3 Wochen vor Laufzeitende",
    beschreibung: "Business-Netzwerk — Kündigung über spezielle Kündigungsseite mit Login",
    beliebt: false,
    versandmethode: "online-formular",
    onlineFormularUrl: "https://www.xing.com/upsell/cancellations/requests/premium/new",
    onlineFormularAnleitung: "1. xing.com → Einloggen → 2. Kündigungsseite aufrufen → 3. Bestätigungs-E-Mail mit Link kommt → 4. Link bestätigen → Achtung: Zusatzpakete separat kündigen",
    sofortKuendbar: true,
  },
];

// ─── EXPORTS ──────────────────────────────────────────────────────────────────
export const abofallen: Anbieter[] = anbieter.filter(
  (a) => a.kategorie === "Abofallen & Widersprüche"
);

export const alleAnbieter = anbieter;

export const alleKategorien = [
  "Abofallen & Widersprüche",
  "Versicherungen",
  "Fitness",
  "Energie & Strom",
  "Zeitschriften & Verlage",
  "Partnervermittlung",
  "Sonstiges",
];

export function getAnbieterById(id: string): Anbieter | undefined {
  return anbieter.find((a) => a.id === id);
}

export function getAlleAnbieterById(id: string): Anbieter | undefined {
  return anbieter.find((a) => a.id === id);
}

export function getBeliebteAlleAnbieter(): Anbieter[] {
  return anbieter.filter((a) => a.beliebt);
}
