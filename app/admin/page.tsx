"use client";
import { useState, useEffect, useCallback } from "react";
import { STATUS_LABELS, CancellationStatus } from "@/lib/supabase";
import type { Cancellation } from "@/lib/supabase";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "abocut2024";

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [cancellations, setCancellations] = useState<Cancellation[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<CancellationStatus | "all">("all");
  const [selected, setSelected] = useState<Cancellation | null>(null);
  const [notiz, setNotiz] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/cancellations");
      const data = await res.json();
      setCancellations(data.cancellations || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) setAuthed(true);
    else alert("Falsches Passwort");
  };

  const updateStatus = async (id: string, newStatus: CancellationStatus) => {
    setUpdating(true);
    await fetch("/api/admin/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus, notiz }),
    });
    await fetchData();
    setUpdating(false);
    setSelected(null);
    setNotiz("");
  };

  const filtered = filter === "all" ? cancellations : cancellations.filter((c) => c.status === filter);

  const stats = {
    total: cancellations.length,
    sent: cancellations.filter((c) => c.status === "sent").length,
    confirmed: cancellations.filter((c) => c.status === "confirmed").length,
    umsatz: cancellations.reduce((sum, c) => sum + (c.preis || 0), 0) / 100,
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#1E1C19", border: "1px solid #333", borderRadius: 12, padding: "2.5rem", width: 340, textAlign: "center" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "1.75rem", color: "white", marginBottom: "0.25rem" }}>
            abo<span style={{ color: "#C84B2F" }}>cut</span>
          </div>
          <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: "1.5rem" }}>Admin-Dashboard</p>
          <input
            type="password"
            placeholder="Passwort"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", background: "#2A2825", border: "1px solid #444", borderRadius: 6, padding: "0.7rem 1rem", color: "white", fontSize: "1rem", marginBottom: "1rem", boxSizing: "border-box" }}
          />
          <button onClick={handleLogin} style={{ width: "100%", background: "#C84B2F", color: "white", border: "none", borderRadius: 6, padding: "0.75rem", fontSize: "1rem", cursor: "pointer", fontWeight: 600 }}>
            Einloggen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0F0E0C", color: "white", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#1A1714", borderBottom: "1px solid #2A2825", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem" }}>
          abo<span style={{ color: "#C84B2F" }}>cut</span>
          <span style={{ color: "#555", fontSize: "0.8rem", marginLeft: "0.75rem" }}>Admin</span>
        </div>
        <button onClick={fetchData} style={{ background: "#2A2825", border: "1px solid #333", color: "#CCC", borderRadius: 6, padding: "0.4rem 0.9rem", cursor: "pointer", fontSize: "0.82rem" }}>
          🔄 Aktualisieren
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Gesamt", value: stats.total, icon: "📋", color: "#C84B2F" },
            { label: "Versendet", value: stats.sent, icon: "📨", color: "#1A4B8C" },
            { label: "Bestätigt", value: stats.confirmed, icon: "✅", color: "#2D6A4F" },
            { label: "Umsatz", value: `€${stats.umsatz.toFixed(2)}`, icon: "💰", color: "#B7791F" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#1A1714", border: "1px solid #2A2825", borderRadius: 10, padding: "1.25rem" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{s.icon}</div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.2rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          {["all", "sent", "delivered", "confirmed", "failed", "disputed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as CancellationStatus | "all")}
              style={{
                padding: "0.35rem 0.85rem", borderRadius: 20, border: "1px solid",
                borderColor: filter === f ? "#C84B2F" : "#333",
                background: filter === f ? "#C84B2F" : "#1A1714",
                color: filter === f ? "white" : "#888",
                fontSize: "0.8rem", cursor: "pointer",
              }}
            >
              {f === "all" ? "Alle" : STATUS_LABELS[f as CancellationStatus]?.icon + " " + STATUS_LABELS[f as CancellationStatus]?.label}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: "center", color: "#555", padding: "4rem" }}>Lade…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", color: "#555", padding: "4rem" }}>Keine Einträge</div>
        ) : (
          <div style={{ background: "#1A1714", border: "1px solid #2A2825", borderRadius: 10, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #2A2825" }}>
                  {["Datum", "Kunde", "Anbieter", "Paket", "Preis", "Status", "Aktion"].map((h) => (
                    <th key={h} style={{ padding: "0.85rem 1rem", textAlign: "left", fontSize: "0.75rem", color: "#666", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => {
                  const s = STATUS_LABELS[c.status] || STATUS_LABELS.sent;
                  return (
                    <tr key={c.id} style={{ borderBottom: "1px solid #1E1C19", background: i % 2 === 0 ? "transparent" : "#161412" }}>
                      <td style={{ padding: "0.85rem 1rem", fontSize: "0.8rem", color: "#888" }}>
                        {new Date(c.created_at).toLocaleDateString("de-DE")}
                      </td>
                      <td style={{ padding: "0.85rem 1rem" }}>
                        <div style={{ fontSize: "0.88rem", fontWeight: 600 }}>{c.vorname} {c.nachname}</div>
                        <div style={{ fontSize: "0.75rem", color: "#666" }}>{c.email}</div>
                      </td>
                      <td style={{ padding: "0.85rem 1rem" }}>
                        <div style={{ fontSize: "0.88rem" }}>{c.anbieter_name}</div>
                        <div style={{ fontSize: "0.75rem", color: "#666" }}>{c.anbieter_kategorie}</div>
                      </td>
                      <td style={{ padding: "0.85rem 1rem" }}>
                        <span style={{ fontSize: "0.75rem", background: "#2A2825", padding: "0.2rem 0.5rem", borderRadius: 4, textTransform: "uppercase" }}>
                          {c.paket}
                        </span>
                      </td>
                      <td style={{ padding: "0.85rem 1rem", fontSize: "0.88rem", color: "#C84B2F", fontWeight: 600 }}>
                        €{((c.preis || 0) / 100).toFixed(2)}
                      </td>
                      <td style={{ padding: "0.85rem 1rem" }}>
                        <span style={{ background: s.bg, color: s.color, padding: "0.2rem 0.6rem", borderRadius: 12, fontSize: "0.75rem", fontWeight: 600 }}>
                          {s.icon} {s.label}
                        </span>
                      </td>
                      <td style={{ padding: "0.85rem 1rem" }}>
                        <button
                          onClick={() => { setSelected(c); setNotiz(""); }}
                          style={{ background: "#2A2825", border: "1px solid #333", color: "#CCC", borderRadius: 6, padding: "0.3rem 0.7rem", cursor: "pointer", fontSize: "0.78rem" }}
                        >
                          Details →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Detail Modal */}
        {selected && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
            <div style={{ background: "#1A1714", border: "1px solid #2A2825", borderRadius: 12, padding: "2rem", maxWidth: 680, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h2 style={{ margin: 0, fontSize: "1.15rem" }}>{selected.anbieter_name} — {selected.vorname} {selected.nachname}</h2>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#666", fontSize: "1.25rem", cursor: "pointer" }}>✕</button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem", fontSize: "0.85rem" }}>
                {[
                  ["E-Mail", selected.email],
                  ["Adresse", `${selected.strasse}, ${selected.plz_ort}`],
                  ["Kundennummer", selected.kundennummer || "–"],
                  ["Paket", selected.paket],
                  ["Preis", `€${((selected.preis || 0) / 100).toFixed(2)}`],
                  ["Eingegangen", new Date(selected.created_at).toLocaleString("de-DE")],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ color: "#555", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.2rem" }}>{k}</div>
                    <div style={{ color: "#DDD" }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Current status */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ color: "#555", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Aktueller Status</div>
                <span style={{ background: STATUS_LABELS[selected.status]?.bg, color: STATUS_LABELS[selected.status]?.color, padding: "0.3rem 0.8rem", borderRadius: 12, fontSize: "0.82rem", fontWeight: 600 }}>
                  {STATUS_LABELS[selected.status]?.icon} {STATUS_LABELS[selected.status]?.label}
                </span>
              </div>

              {/* Status change */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ color: "#555", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Status ändern</div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                  {(["sent", "delivered", "confirmed", "failed", "disputed"] as CancellationStatus[]).map((s) => (
                    <button
                      key={s}
                      disabled={selected.status === s || updating}
                      onClick={() => updateStatus(selected.id, s)}
                      style={{
                        padding: "0.35rem 0.75rem", borderRadius: 6, border: "1px solid",
                        borderColor: STATUS_LABELS[s].color + "44",
                        background: selected.status === s ? STATUS_LABELS[s].bg : "transparent",
                        color: STATUS_LABELS[s].color,
                        fontSize: "0.78rem", cursor: selected.status === s ? "default" : "pointer",
                        opacity: selected.status === s ? 0.5 : 1,
                      }}
                    >
                      {STATUS_LABELS[s].icon} {STATUS_LABELS[s].label}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Notiz zum Statuswechsel (optional)"
                  value={notiz}
                  onChange={(e) => setNotiz(e.target.value)}
                  style={{ width: "100%", background: "#0F0E0C", border: "1px solid #333", borderRadius: 6, padding: "0.6rem 0.9rem", color: "white", fontSize: "0.85rem", boxSizing: "border-box" }}
                />
              </div>

              {/* Brief */}
              <div>
                <div style={{ color: "#555", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Kündigungsschreiben</div>
                <pre style={{ background: "#0F0E0C", border: "1px solid #2A2825", borderRadius: 8, padding: "1rem", fontSize: "0.78rem", lineHeight: 1.7, whiteSpace: "pre-wrap", color: "#CCC", maxHeight: 300, overflowY: "auto" }}>
                  {selected.brief_text}
                </pre>
              </div>

              {selected.vollmacht_signature && (
                <div style={{ marginTop: "1rem" }}>
                  <div style={{ color: "#555", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Vollmacht-Unterschrift</div>
                  <img src={selected.vollmacht_signature} alt="Unterschrift" style={{ background: "white", borderRadius: 6, padding: "0.5rem", maxWidth: "100%" }} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
