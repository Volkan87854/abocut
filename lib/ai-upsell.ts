import Anthropic from "@anthropic-ai/sdk";

export interface UpsellAlternative {
  name: string;
  icon: string;
  beschreibung: string;
  preis_text: string;
  vorteil: string; // why it's better for THIS customer
  cta: string;
  url: string;
  badge?: string;
  savings_text?: string;
}

export interface AIUpsellResult {
  headline: string;
  subline: string;
  alternativen: UpsellAlternative[];
  savings_summary?: string;
}

export async function generateAIUpsell(params: {
  anbieter_name: string;
  anbieter_kategorie: string;
  anbieter_id: string;
  kuendigungsgrund: string;
  plz_ort: string;
  paket: string;
}): Promise<AIUpsellResult | null> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || "placeholder",
  });

  const prompt = `Du bist ein deutscher Verbraucherberater der einem Kunden hilft, nach der Kündigung seines Abos die beste Alternative zu finden.

KONTEXT:
- Gekündigter Anbieter: ${params.anbieter_name}
- Kategorie: ${params.anbieter_kategorie}
- Kündigungsgrund: "${params.kuendigungsgrund || "nicht angegeben"}"
- Standort: ${params.plz_ort}
- Datum: ${new Date().toLocaleDateString("de-DE")}

AUFGABE:
Recherchiere die aktuell besten 2-3 Alternativen für diesen Kunden in Deutschland. 
Berücksichtige dabei BESONDERS den Kündigungsgrund — wenn der Kunde wegen "zu teuer" kündigt, zeige günstigere Optionen. Bei "nutze es nicht" zeige flexiblere Optionen ohne Bindung. Bei "Umzug" zeige überregionale Optionen.

Suche nach:
1. Aktuellen Preisen und Angeboten der Alternativen
2. Aktionszeiträumen (z.B. "3 Monate gratis")
3. Konkreten Vorteilen gegenüber dem gekündigten Anbieter
4. Affiliate-/Vergleichsportale (Check24, Verivox) wo relevant

Antworte NUR mit einem JSON-Objekt (kein Markdown, keine Erklärungen):
{
  "headline": "Kurze, motivierende Headline (max 8 Wörter)",
  "subline": "Erklärung warum diese Empfehlungen zu diesem Kunden passen (1 Satz)",
  "savings_summary": "Falls Ersparnis berechenbar: z.B. 'Bis zu 120€/Jahr sparen'",
  "alternativen": [
    {
      "name": "Anbieter-Name",
      "icon": "passendes Emoji",
      "beschreibung": "Kurze Beschreibung (max 12 Wörter)",
      "preis_text": "z.B. 'Ab €4,99/Monat' oder 'Kostenlos vergleichen'",
      "vorteil": "Konkreter Vorteil für DIESEN Kunden basierend auf Kündigungsgrund (1 Satz)",
      "cta": "Button-Text (max 4 Wörter)",
      "url": "Direkte URL (verwende echte URLs von Check24, Verivox, oder dem Anbieter direkt)",
      "badge": "Optional: z.B. '3 Monate gratis' oder 'Bis 50% sparen'"
    }
  ]
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1500,
      tools: [
        {
          type: "web_search_20250305" as const,
          name: "web_search",
        },
      ],
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract text from response (may include tool use blocks)
    let jsonText = "";
    for (const block of response.content) {
      if (block.type === "text") {
        jsonText += block.text;
      }
    }

    // Handle multi-turn if tool use happened
    if (response.stop_reason === "tool_use") {
      // Continue the conversation after tool use
      const toolUseBlocks = response.content.filter((b) => b.type === "tool_use");
      const toolResultBlocks = toolUseBlocks.map((block) => {
        if (block.type === "tool_use") {
          return {
            type: "tool_result" as const,
            tool_use_id: block.id,
            content: "Search results integrated.",
          };
        }
        return null;
      }).filter(Boolean);

      const followUp = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 1500,
        tools: [
          {
            type: "web_search_20250305" as const,
            name: "web_search",
          },
        ],
        messages: [
          { role: "user", content: prompt },
          { role: "assistant", content: response.content },
          {
            role: "user",
            content: toolResultBlocks as Anthropic.ToolResultBlockParam[],
          },
        ],
      });

      for (const block of followUp.content) {
        if (block.type === "text") {
          jsonText = block.text;
        }
      }
    }

    // Clean and parse JSON
    const cleaned = jsonText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const result = JSON.parse(cleaned) as AIUpsellResult;

    // Validate structure
    if (!result.alternativen || result.alternativen.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    console.error("AI Upsell generation failed:", error);
    return null;
  }
}

// Fallback static upsell if AI fails
export function getFallbackUpsell(
  anbieterId: string,
  kategorie: string
): AIUpsellResult {
  const cat = kategorie.toLowerCase();

  if (cat.includes("streaming")) {
    return {
      headline: "Günstiger weiterstreamen",
      subline: "Diese Alternativen bieten top Inhalte zu besserem Preis.",
      alternativen: [
        {
          name: "Disney+",
          icon: "✨",
          beschreibung: "Marvel, Star Wars, Disney & Pixar",
          preis_text: "Ab €1,99/Monat",
          vorteil: "Deutlich günstiger mit riesigem Inhaltskatalog.",
          cta: "Jetzt wechseln",
          url: "https://www.disneyplus.com/de-de/sign-up",
          badge: "Aktuelles Angebot",
        },
        {
          name: "Alle Streaming vergleichen",
          icon: "📊",
          beschreibung: "Unabhängiger Vergleich aller Anbieter",
          preis_text: "Kostenlos vergleichen",
          vorteil: "Finden Sie den günstigsten Anbieter für Ihre Bedürfnisse.",
          cta: "Jetzt vergleichen",
          url: "https://www.check24.de/streaming/",
          badge: "Gratis & unabhängig",
        },
      ],
    };
  }

  if (cat.includes("telefon") || cat.includes("internet")) {
    return {
      headline: "Besseren Tarif sichern",
      subline: "Ein Anbieterwechsel spart im Schnitt €200–400 pro Jahr.",
      savings_summary: "Durchschnittlich €200–400/Jahr gespart",
      alternativen: [
        {
          name: "CHECK24 Tarifvergleich",
          icon: "📱",
          beschreibung: "Alle Mobilfunk-Tarife im Vergleich",
          preis_text: "Kostenlos vergleichen",
          vorteil: "Oft 30–50% günstiger als Ihr bisheriger Tarif.",
          cta: "Tarif vergleichen",
          url: "https://www.check24.de/handytarife/",
          badge: "Bis 50% sparen",
        },
        {
          name: "Verivox",
          icon: "🔍",
          beschreibung: "Unabhängiger Preisvergleich",
          preis_text: "Kostenlos & unverbindlich",
          vorteil: "Neutrale Empfehlung ohne Werbedruck.",
          cta: "Jetzt vergleichen",
          url: "https://www.verivox.de/handytarife/",
        },
      ],
    };
  }

  if (cat.includes("fitness")) {
    return {
      headline: "Flexibler trainieren",
      subline: "Ohne Mindestlaufzeit und günstiger als ein klassisches Fitnessstudio.",
      alternativen: [
        {
          name: "Urban Sports Club",
          icon: "🏊",
          beschreibung: "1.000+ Studios, Yoga, Schwimmen ohne Bindung",
          preis_text: "Ab €29,99/Monat",
          vorteil: "Keine Mindestlaufzeit — perfekt wenn Sie weniger oft trainieren.",
          cta: "1. Monat gratis",
          url: "https://urbansportsclub.com/de",
          badge: "1 Monat gratis",
        },
        {
          name: "Gymondo",
          icon: "🧘",
          beschreibung: "Online-Fitness zuhause, 900+ Workouts",
          preis_text: "Ab €7,99/Monat",
          vorteil: "Trainieren wann und wo Sie wollen — kein Weg zum Studio.",
          cta: "14 Tage gratis",
          url: "https://www.gymondo.com/de",
          badge: "14 Tage gratis",
        },
      ],
    };
  }

  if (cat.includes("versicherung")) {
    return {
      headline: "Günstigere Versicherung finden",
      subline: "Ein Versicherungswechsel spart oft mehrere Hundert Euro jährlich.",
      savings_summary: "Bis zu 850€/Jahr bei KFZ-Versicherung",
      alternativen: [
        {
          name: "CHECK24 Versicherungsvergleich",
          icon: "🛡️",
          beschreibung: "180+ Tarife unabhängig verglichen",
          preis_text: "Kostenlos vergleichen",
          vorteil: "Gleicher Schutz, oft deutlich günstigerer Beitrag.",
          cta: "Jetzt vergleichen",
          url: "https://www.check24.de/versicherungen/",
          badge: "Bis 850€ sparen",
        },
      ],
    };
  }

  if (cat.includes("energie")) {
    return {
      headline: "Günstigeren Stromanbieter finden",
      subline: "Ein Wechsel spart deutschen Haushalten durchschnittlich 400€ pro Jahr.",
      savings_summary: "Durchschnittlich 400€/Jahr gespart",
      alternativen: [
        {
          name: "CHECK24 Stromvergleich",
          icon: "⚡",
          beschreibung: "Günstigsten Anbieter in Ihrer Region finden",
          preis_text: "Kostenlos vergleichen",
          vorteil: "In Ihrer Region könnte ein Wechsel bis zu 400€/Jahr sparen.",
          cta: "Jetzt sparen",
          url: "https://www.check24.de/strom/",
          badge: "Bis 400€/Jahr sparen",
        },
        {
          name: "Verivox Stromvergleich",
          icon: "🔌",
          beschreibung: "Unabhängiger Energievergleich",
          preis_text: "Kostenlos & unverbindlich",
          vorteil: "Neutrale Empfehlung, kein Werbedruck.",
          cta: "Tarife vergleichen",
          url: "https://www.verivox.de/strom/",
        },
      ],
    };
  }

  // Generic fallback
  return {
    headline: "Smarter wechseln",
    subline: "Basierend auf Ihrer Kündigung haben wir passende Alternativen gefunden.",
    alternativen: [
      {
        name: "CHECK24 Vergleich",
        icon: "📊",
        beschreibung: "Alle Kategorien unabhängig verglichen",
        preis_text: "Kostenlos vergleichen",
        vorteil: "Finden Sie den besten Anbieter in Ihrer Kategorie.",
        cta: "Jetzt vergleichen",
        url: "https://www.check24.de",
        badge: "Gratis & unabhängig",
      },
    ],
  };
}
