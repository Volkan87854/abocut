import Link from "next/link";
import { Anbieter } from "@/lib/anbieter";

export default function AnbieterCard({ anbieter }: { anbieter: Anbieter }) {
  const isAbofalle = anbieter.kategorie === "Abofallen & Widersprüche";
  const cardBg = isAbofalle ? "#FFFBEB" : "var(--white)";
  const cardBorder = isAbofalle ? "1px solid #F59E0B44" : "1px solid var(--border)";
  const iconBg = isAbofalle ? "#FEF3C7" : "var(--cream)";
  return (
    <Link href={`/kuendigen/${anbieter.id}`} style={{ textDecoration: "none" }}>
      <div style={{ background: cardBg, border: cardBorder, borderRadius: 12, padding: "1rem 1.1rem", display: "flex", alignItems: "center", gap: "0.75rem", transition: "all 0.15s", cursor: "pointer" }}>
        <div style={{ width: 38, height: 38, borderRadius: 9, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0, border: "1px solid var(--border)" }}>
          {anbieter.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)", marginBottom: "0.1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {anbieter.name}
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--ink-muted)" }}>{anbieter.kategorie}</div>
        </div>
        <span style={{ color: "var(--green)", fontSize: "0.9rem", flexShrink: 0 }}>→</span>
      </div>
    </Link>
  );
}
