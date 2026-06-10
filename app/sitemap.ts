import { MetadataRoute } from "next";
import { alleAnbieter } from "@/lib/anbieter";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://abocut.de";

  const anbieterPages = alleAnbieter.map((a) => ({
    url: `${base}/${a.id}-kuendigen`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: a.beliebt ? 0.9 : 0.7,
  }));

  const kuendigenPages = alleAnbieter.map((a) => ({
    url: `${base}/kuendigen/${a.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/admin`, lastModified: new Date(), changeFrequency: "never", priority: 0 },
    ...anbieterPages,
    ...kuendigenPages,
  ];
}
