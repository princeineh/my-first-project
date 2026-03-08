"use client";
import BottomNav from "@/components/BottomNav";
import { seasonState, eliminationBracket, standings, eliminatedClubs, upcomingMatches } from "@/lib/mockData";
import { useState } from "react";

const slotIcon: Record<string, string> = { Morning: "🌅", Afternoon: "☀️", Evening: "🌙" };

export default function SeasonPage() {
  const [tab, setTab] = useState<"preseason" | "full_season">("full_season");

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "16px", borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>Season Structure</div>
        {/* Season progress bar */}
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>
              {seasonState.phase === "full_season" ? "Full Season" : "Preseason"} · Week {seasonState.week}
            </span>
            <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 700 }}>
              MD {seasonState.matchday} / {seasonState.totalWeeks}
            </span>
          </div>
          <div style={{ height: 5, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              width: `${(seasonState.matchday / seasonState.totalWeeks) * 100}%`,
              height: "100%", background: "var(--accent)", borderRadius: 3, transition: "width 0.5s",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontSize: 9, color: "var(--muted)" }}>Preseason (Wk 1-8)</span>
            <span style={{ fontSize: 9, color: "var(--muted)" }}>Full Season (Wk 9-38)</span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", padding: "0 16px" }}>
        {(["preseason", "full_season"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "12px 0", fontWeight: 700, fontSize: 13, background: "none",
            border: "none", cursor: "pointer",
            color: tab === t ? "var(--accent)" : "var(--muted)",
            borderBottom: tab === t ? "2px solid var(--accent)" : "2px solid transparent",
          }}>
            {t === "preseason" ? "🏟️ Preseason" : "🏆 Full Season"}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px" }}>

        {/* ── PRESEASON TAB ── */}
        {tab === "preseason" && (
          <div>
            <div style={{
              background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: 14, padding: "14px 16px", marginBottom: 20,
            }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#f59e0b", marginBottom: 6 }}>Academy / Preseason Phase</div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
                The elimination stage. Every club starts here. Lose and you are eliminated — your district retains its position but the club does not advance to the Full Season.
              </div>
            </div>

            {/* Bracket */}
            {eliminationBracket.map(round => (
              <div key={round.round} style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>
                  {round.round.toUpperCase()}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {round.matches.map((m, i) => (
                    <div key={i} style={{
                      background: "var(--surface)", border: "1px solid var(--border)",
                      borderRadius: 12, padding: "12px 14px",
                      display: "flex", alignItems: "center", gap: 12,
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontWeight: 700, fontSize: 13, color: "var(--accent)" }}>{m.winner}</span>
                          <span style={{ fontSize: 11, color: "var(--muted)" }}>vs</span>
                          <span style={{ fontWeight: 600, fontSize: 13, color: "var(--muted)", textDecoration: "line-through" }}>{m.eliminated}</span>
                        </div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                          {m.home} vs {m.away}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 800, fontSize: 14 }}>{m.result}</div>
                        <div style={{ fontSize: 10, color: "var(--live)", marginTop: 2 }}>✗ {m.eliminated} eliminated</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Eliminated list */}
            <div style={{
              background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)",
              borderRadius: 12, padding: "14px",
            }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "var(--live)", marginBottom: 10 }}>ELIMINATED CLUBS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {eliminatedClubs.map(c => (
                  <span key={c} style={{
                    fontSize: 12, padding: "5px 12px", borderRadius: 8,
                    background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                    color: "var(--live)", textDecoration: "line-through",
                  }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── FULL SEASON TAB ── */}
        {tab === "full_season" && (
          <div>
            <div style={{
              background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: 14, padding: "14px 16px", marginBottom: 20,
            }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "var(--accent)", marginBottom: 6 }}>Full Season — Matchday {seasonState.matchday}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
                Schedule mirrors the <strong style={{ color: "var(--text)" }}>{seasonState.schedule}</strong>. Fixtures are played simultaneously in all active districts. Home/Away is determined by district club ownership.
              </div>
            </div>

            {/* Upcoming schedule */}
            <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 12, letterSpacing: 1 }}>NEXT FIXTURES</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {upcomingMatches.map(m => (
                <div key={m.id} style={{
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 12, padding: "12px 14px",
                  display: "flex", alignItems: "center",
                }}>
                  <div style={{ marginRight: 12, fontSize: 18 }}>{slotIcon[m.slot] ?? "⚽"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{m.homeClub} <span style={{ color: "var(--muted)", fontWeight: 400 }}>vs</span> {m.awayClub}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{m.slot} · {m.date}</div>
                  </div>
                  <div style={{
                    fontSize: 14, fontWeight: 800, color: "var(--accent2)",
                    background: "rgba(124,58,237,0.12)", borderRadius: 8, padding: "5px 12px",
                  }}>{m.kickoff}</div>
                </div>
              ))}
            </div>

            {/* League table */}
            <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 12, letterSpacing: 1 }}>CURRENT STANDINGS</div>
            <div style={{
              display: "grid", gridTemplateColumns: "28px 1fr 32px 32px 32px 48px",
              padding: "6px 10px", fontSize: 10, color: "var(--muted)", fontWeight: 700, letterSpacing: 0.5,
            }}>
              <span>#</span><span>Club</span><span style={{textAlign:"center"}}>P</span>
              <span style={{textAlign:"center"}}>W</span><span style={{textAlign:"center"}}>L</span>
              <span style={{textAlign:"center"}}>PTS</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {standings.map((row, i) => (
                <div key={row.pos} style={{
                  display: "grid", gridTemplateColumns: "28px 1fr 32px 32px 32px 48px",
                  padding: "11px 10px",
                  background: i === 0 ? "rgba(34,197,94,0.07)" : "var(--surface)",
                  border: `1px solid ${i === 0 ? "rgba(34,197,94,0.2)" : "var(--border)"}`,
                  borderRadius: 10, alignItems: "center",
                }}>
                  <span style={{ fontWeight: 800, fontSize: 13, color: i < 2 ? "var(--accent)" : "var(--muted)" }}>{row.pos}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{row.club}</div>
                    <div style={{ display: "flex", gap: 3, marginTop: 3 }}>
                      {row.form.map((f, fi) => (
                        <span key={fi} style={{
                          width: 12, height: 12, borderRadius: 2, fontSize: 7,
                          background: f === "W" ? "#22c55e" : f === "D" ? "#f59e0b" : "#ef4444",
                          color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800,
                        }}>{f}</span>
                      ))}
                    </div>
                  </div>
                  <span style={{ textAlign: "center", fontSize: 12, color: "var(--muted)" }}>{row.played}</span>
                  <span style={{ textAlign: "center", fontSize: 12 }}>{row.won}</span>
                  <span style={{ textAlign: "center", fontSize: 12, color: "var(--live)" }}>{row.lost}</span>
                  <span style={{ textAlign: "center", fontWeight: 900, fontSize: 15, color: i === 0 ? "var(--accent)" : "var(--text)" }}>{row.pts}</span>
                </div>
              ))}
            </div>

            {/* Points legend */}
            <div style={{
              marginTop: 16, background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "14px",
            }}>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 10 }}>Points System</div>
              {[
                { icon: "🏆", text: "Win a district match → 2 points" },
                { icon: "🤝", text: "Draw a district match → 1 point each" },
                { icon: "📊", text: "Win 25%+ of district matches in a round → +1 bonus point" },
                { icon: "⚡", text: "Maximum 3 points per fixture" },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 14 }}>{p.icon}</span>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </main>
  );
}
