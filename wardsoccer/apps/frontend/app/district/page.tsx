"use client";
import BottomNav from "@/components/BottomNav";
import { districts, standings, districtOwnership, liveMatches } from "@/lib/mockData";
import { Map } from "lucide-react";

export default function DistrictPage() {
  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "16px", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: 10,
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <Map size={18} color="var(--accent)" />
        <div>
          <span style={{ fontWeight: 800, fontSize: 16 }}>Districts</span>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>Each district owns one club · No travel required</div>
        </div>
      </header>

      <div style={{ padding: "16px" }}>

        {/* How it works */}
        <div style={{
          background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)",
          borderRadius: 14, padding: "14px 16px", marginBottom: 20,
        }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "var(--accent2)", marginBottom: 8 }}>How Districts Work</div>
          <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
            Every district <strong style={{ color: "var(--text)" }}>owns a club</strong>. When Man United (PH) plays Chelsea (Lagos), it means PH players rep Man United and Lagos players rep Chelsea — wherever they currently are. No one has to travel.
          </div>
        </div>

        {/* Heatmap stub */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 14, padding: "16px", marginBottom: 20,
        }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 12, letterSpacing: 1 }}>
            LIVE DISTRICT MAP
          </div>
          <svg viewBox="0 0 320 300" width="100%" style={{ display: "block" }}>
            <rect x="60" y="40" width="200" height="220" rx="30" fill="var(--surface2)" stroke="var(--border)" strokeWidth="1" />
            {[
              { x: 210, y: 200, label: "PH",    color: "#22c55e", active: 3, club: "Man Utd" },
              { x: 100, y: 180, label: "Lagos",  color: "#3b82f6", active: 2, club: "Chelsea" },
              { x: 180, y: 100, label: "Abuja",  color: "#f59e0b", active: 1, club: "Barca"   },
              { x: 170, y: 195, label: "Warri",  color: "#ef4444", active: 2, club: "Arsenal" },
              { x: 230, y: 150, label: "Enugu",  color: "#8b5cf6", active: 1, club: "LFC"     },
              { x: 160, y: 60,  label: "Kano",   color: "#64748b", active: 0, club: "Bayern"  },
            ].map(d => (
              <g key={d.label}>
                <circle cx={d.x} cy={d.y} r={d.active > 0 ? 18 : 10}
                  fill={d.color + "33"} stroke={d.color} strokeWidth="2"
                  style={{ filter: d.active > 0 ? `drop-shadow(0 0 8px ${d.color})` : "none" }}
                />
                {d.active > 0 && <circle cx={d.x} cy={d.y} r={5} fill={d.color} opacity={0.9} />}
                <text x={d.x} y={d.y + 30} textAnchor="middle" fill="var(--muted)" fontSize="8" fontWeight="600">{d.label}</text>
                <text x={d.x} y={d.y + 40} textAnchor="middle" fill={d.color} fontSize="7" fontWeight="700">{d.club}</text>
                {d.active > 0 && (
                  <text x={d.x} y={d.y + 4} textAnchor="middle" fill={d.color} fontSize="9" fontWeight="800">{d.active}</text>
                )}
              </g>
            ))}
            <text x="160" y="285" textAnchor="middle" fill="var(--muted)" fontSize="7">
              number = active matches · club = owner
            </text>
          </svg>
        </div>

        {/* District ownership cards */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 12, letterSpacing: 1 }}>DISTRICT OWNERSHIP</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {districts.map(d => {
            const owner = districtOwnership[d.name] ?? d.ownerClub;
            const liveFixture = liveMatches.find(m =>
              m.districtMatches.some(dm => dm.district === d.name && dm.status === "live")
            );
            return (
              <div key={d.id} style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 12, padding: "14px 16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: d.color + "22", border: `1px solid ${d.color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>
                    {d.activeMatches > 0 ? "⚽" : "💤"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: d.color, fontWeight: 700, marginTop: 1 }}>
                      {owner}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 1 }}>{d.players} registered players</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    {d.activeMatches > 0 ? (
                      <div style={{
                        fontSize: 11, fontWeight: 700, color: d.color,
                        background: d.color + "22", border: `1px solid ${d.color}44`,
                        borderRadius: 6, padding: "3px 8px", marginBottom: 4,
                      }}>{d.activeMatches} LIVE</div>
                    ) : (
                      <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>No matches</div>
                    )}
                  </div>
                </div>

                {/* Live fixture in this district */}
                {liveFixture && (
                  <div style={{
                    marginTop: 10, background: "var(--surface2)", border: "1px solid var(--border)",
                    borderRadius: 8, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>
                      {liveFixture.homeClub} vs {liveFixture.awayClub}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "var(--live)" }}>
                      {liveFixture.homeScore}–{liveFixture.awayScore}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Leaderboard */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 12, letterSpacing: 1 }}>LEADERBOARD</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {standings.slice(0, 5).map((row, i) => (
            <div key={row.pos} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "10px 14px",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{
                fontWeight: 800, fontSize: 14, width: 20, textAlign: "center",
                color: i === 0 ? "var(--accent)" : "var(--muted)",
              }}>{row.pos}</span>
              <span style={{ flex: 1, fontWeight: 600, fontSize: 13 }}>{row.club}</span>
              <span style={{ fontWeight: 900, fontSize: 16, color: i === 0 ? "var(--accent)" : "var(--text)" }}>{row.pts}</span>
              <span style={{ fontSize: 10, color: "var(--muted)" }}>pts</span>
            </div>
          ))}
        </div>

      </div>
      <BottomNav />
    </main>
  );
}
