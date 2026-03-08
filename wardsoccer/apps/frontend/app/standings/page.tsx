"use client";
import BottomNav from "@/components/BottomNav";
import { standings, topScorers } from "@/lib/mockData";
import { useState } from "react";
import { Trophy } from "lucide-react";

const formColor: Record<string, string> = { W: "#22c55e", D: "#f59e0b", L: "#ef4444" };

export default function StandingsPage() {
  const [tab, setTab] = useState<"table" | "scorers">("table");

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "16px", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: 10,
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <Trophy size={18} color="var(--accent)" />
        <span style={{ fontWeight: 800, fontSize: 16 }}>Standings</span>
      </header>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 0,
        borderBottom: "1px solid var(--border)",
        padding: "0 16px",
      }}>
        {(["table", "scorers"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "12px 0", fontWeight: 700, fontSize: 13,
            background: "none", border: "none", cursor: "pointer",
            color: tab === t ? "var(--accent)" : "var(--muted)",
            borderBottom: tab === t ? "2px solid var(--accent)" : "2px solid transparent",
            transition: "color 0.2s",
          }}>
            {t === "table" ? "League Table" : "Top Scorers"}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px" }}>
        {tab === "table" ? (
          <div>
            {/* Header row */}
            <div style={{
              display: "grid", gridTemplateColumns: "28px 1fr 32px 32px 32px 40px 52px",
              gap: 0, padding: "8px 12px",
              fontSize: 10, color: "var(--muted)", fontWeight: 700, letterSpacing: 0.5,
            }}>
              <span>#</span><span>Club</span><span style={{textAlign:"center"}}>P</span>
              <span style={{textAlign:"center"}}>W</span><span style={{textAlign:"center"}}>D</span>
              <span style={{textAlign:"center"}}>L</span><span style={{textAlign:"center"}}>PTS</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {standings.map((row, i) => (
                <div key={row.pos} style={{
                  display: "grid", gridTemplateColumns: "28px 1fr 32px 32px 32px 40px 52px",
                  gap: 0, padding: "12px 12px",
                  background: i === 0 ? "rgba(34,197,94,0.08)" : "var(--surface)",
                  border: `1px solid ${i === 0 ? "rgba(34,197,94,0.2)" : "var(--border)"}`,
                  borderRadius: 10, alignItems: "center",
                }}>
                  <span style={{
                    fontWeight: 800, fontSize: 13,
                    color: i < 2 ? "var(--accent)" : i < 4 ? "var(--accent2)" : "var(--muted)",
                  }}>{row.pos}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{row.club}</div>
                    <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
                      {row.form.map((f, fi) => (
                        <span key={fi} style={{
                          width: 14, height: 14, borderRadius: 3, fontSize: 8,
                          background: formColor[f], color: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontWeight: 800,
                        }}>{f}</span>
                      ))}
                    </div>
                  </div>
                  <span style={{ textAlign: "center", fontSize: 12, color: "var(--muted)" }}>{row.played}</span>
                  <span style={{ textAlign: "center", fontSize: 12 }}>{row.won}</span>
                  <span style={{ textAlign: "center", fontSize: 12, color: "var(--muted)" }}>{row.drawn}</span>
                  <span style={{ textAlign: "center", fontSize: 12, color: "var(--live)" }}>{row.lost}</span>
                  <span style={{
                    textAlign: "center", fontWeight: 900, fontSize: 15,
                    color: i === 0 ? "var(--accent)" : "var(--text)",
                  }}>{row.pts}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ marginTop: 16, display: "flex", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--accent)" }} />
                <span style={{ fontSize: 10, color: "var(--muted)" }}>Promotion</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--accent2)" }} />
                <span style={{ fontSize: 10, color: "var(--muted)" }}>Playoffs</span>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {topScorers.map(p => (
              <div key={p.rank} style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 12, padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <span style={{
                  fontWeight: 900, fontSize: 18, width: 28, textAlign: "center",
                  color: p.rank === 1 ? "#f59e0b" : p.rank === 2 ? "#94a3b8" : p.rank === 3 ? "#cd7c2e" : "var(--muted)",
                }}>{p.rank}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{p.club} · {p.district}</div>
                </div>
                <div style={{ display: "flex", gap: 16, textAlign: "center" }}>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "var(--accent)" }}>{p.goals}</div>
                    <div style={{ fontSize: 9, color: "var(--muted)" }}>Goals</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 900 }}>{p.assists}</div>
                    <div style={{ fontSize: 9, color: "var(--muted)" }}>Assists</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "var(--accent2)" }}>{p.rating}</div>
                    <div style={{ fontSize: 9, color: "var(--muted)" }}>Rating</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
