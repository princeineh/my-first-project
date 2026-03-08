"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { liveMatches, districtOwnership } from "@/lib/mockData";
import LiveBadge from "@/components/LiveBadge";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Info } from "lucide-react";
import { useEffect, useState } from "react";

const eventIcon: Record<string, string> = {
  goal: "⚽", yellow: "🟨", red: "🟥", assist: "🎯", sub: "🔄",
};

export default function MatchPage() {
  const { id } = useParams();
  const match = liveMatches.find(m => m.id === id) ?? liveMatches[0];
  const [ticker, setTicker] = useState(match.minute);
  const [showOwnership, setShowOwnership] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTicker(p => Math.min(p + 1, 90)), 60000);
    return () => clearInterval(t);
  }, []);

  const homeGoals = match.events.filter(e => e.type === "goal" && e.team === "home").length;
  const awayGoals = match.events.filter(e => e.type === "goal" && e.team === "away").length;

  // District ownership display
  const homeOwner = match.homeOwnerDistrict;
  const awayOwner = match.awayOwnerDistrict;
  const currentDistrictPlayers = match.districtPlayers?.[match.district];

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      {/* Top bar */}
      <header style={{
        padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
        borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <Link href="/" style={{ color: "var(--text)", display: "flex" }}><ArrowLeft size={20} /></Link>
        <span style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>Live Match</span>
        <LiveBadge minute={ticker} />
      </header>

      {/* Distributed play banner */}
      <div style={{
        background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)",
        padding: "10px 16px", display: "flex", alignItems: "flex-start", gap: 10,
      }}>
        <Info size={14} color="var(--accent2)" style={{ marginTop: 1, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: "var(--accent2)", fontWeight: 700 }}>
            No Travel League · {match.district} District
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2, lineHeight: 1.5 }}>
            {match.homeClub} (home district: {homeOwner}) vs {match.awayClub} (home district: {awayOwner}).
            {" "}Players of {match.awayClub} currently in <strong style={{ color: "var(--text)" }}>{match.district}</strong> are representing their team here.
          </div>
        </div>
        <button onClick={() => setShowOwnership(!showOwnership)} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: 11, color: "var(--accent2)", fontWeight: 700, flexShrink: 0,
        }}>{showOwnership ? "Less" : "More"}</button>
      </div>

      {/* Ownership detail panel */}
      {showOwnership && currentDistrictPlayers && (
        <div style={{
          background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "12px 16px",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {(["home", "away"] as const).map(side => (
              <div key={side}>
                <div style={{
                  fontSize: 10, fontWeight: 700, marginBottom: 6,
                  color: side === "home" ? "var(--accent)" : "var(--muted)",
                  letterSpacing: 0.5,
                }}>
                  {side === "home" ? match.homeClub : match.awayClub}
                </div>
                {currentDistrictPlayers[side].map(p => (
                  <div key={p} style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: side === "home" ? "var(--accent)" : "var(--muted)", display: "inline-block", flexShrink: 0 }} />
                    {p}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hero score */}
      <div style={{
        background: "linear-gradient(180deg, var(--surface2) 0%, var(--background) 100%)",
        padding: "24px 20px 20px", textAlign: "center",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 14, letterSpacing: 1 }}>
          {match.venue.toUpperCase()} · {match.district.toUpperCase()}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ flex: 1, textAlign: "right" }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{match.homeClub}</div>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{homeOwner}</div>
          </div>
          <div style={{
            display: "flex", gap: 12, alignItems: "center",
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 16, padding: "10px 22px", margin: "0 16px",
          }}>
            <span style={{ fontSize: 38, fontWeight: 900 }}>{homeGoals}</span>
            <span style={{ fontSize: 18, color: "var(--muted)" }}>—</span>
            <span style={{ fontSize: 38, fontWeight: 900 }}>{awayGoals}</span>
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{match.awayClub}</div>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{awayOwner}</div>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{
          display: "flex", gap: 0, marginTop: 16,
          background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)", overflow: "hidden",
        }}>
          {[
            { label: "Possession", home: "54%", away: "46%" },
            { label: "Shots",      home: "8",   away: "5"   },
            { label: "Corners",    home: "4",   away: "2"   },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: "10px 6px", textAlign: "center",
              borderRight: i < 2 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{ fontSize: 9, color: "var(--muted)", marginBottom: 4 }}>{s.label}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700 }}>
                <span style={{ color: "var(--accent)" }}>{s.home}</span>
                <span style={{ color: "var(--muted)", fontSize: 9 }}>vs</span>
                <span>{s.away}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>

        {/* District aggregation */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>
            DISTRICT MATCHES — {match.districtMatches.filter(d => d.status === "live").length} LIVE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {match.districtMatches.map(dm => {
              const ownerClub = districtOwnership[dm.district];
              return (
                <div key={dm.district} style={{
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 10, padding: "10px 14px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{dm.district}</span>
                    {ownerClub && (
                      <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 1 }}>
                        {ownerClub.split(" ")[0]} territory
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16, fontWeight: 800 }}>{dm.home} — {dm.away}</span>
                    {dm.status === "live"
                      ? <LiveBadge minute={dm.minute} />
                      : <span style={{ fontSize: 10, color: "var(--muted)", background: "var(--surface2)", padding: "2px 8px", borderRadius: 6 }}>FT</span>
                    }
                  </div>
                </div>
              );
            })}
          </div>

          {/* Aggregated totals */}
          <div style={{
            marginTop: 10, background: "var(--surface2)", border: "1px solid var(--border)",
            borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>Aggregate</span>
            <span style={{ fontWeight: 900, fontSize: 16 }}>
              {match.districtMatches.reduce((s, d) => s + d.home, 0)} — {match.districtMatches.reduce((s, d) => s + d.away, 0)}
            </span>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>across {match.districtMatches.length} districts</span>
          </div>
        </div>

        {/* Match timeline */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>MATCH TIMELINE</div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 38, top: 0, bottom: 0, width: 2, background: "var(--border)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[...match.events].reverse().map((ev, i) => (
                <div key={ev.id} style={{
                  display: "flex", alignItems: "flex-start", padding: "10px 0",
                  animation: `fadeIn 0.4s ease ${i * 0.05}s both`,
                }}>
                  <div style={{
                    width: 32, textAlign: "right", fontSize: 11,
                    color: "var(--muted)", fontWeight: 700, paddingTop: 2, flexShrink: 0,
                  }}>{ev.minute}&apos;</div>
                  <div style={{
                    width: 14, height: 14, borderRadius: "50%", margin: "0 10px",
                    background: ev.type === "goal" ? "var(--accent)" : ev.type === "red" ? "var(--live)" : "var(--surface2)",
                    border: `2px solid ${ev.type === "goal" ? "var(--accent)" : "var(--border)"}`,
                    flexShrink: 0, marginTop: 2,
                  }} />
                  <div style={{
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: 10, padding: "8px 12px", flex: 1,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{eventIcon[ev.type]}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{ev.player}</div>
                        {"assist" in ev && ev.assist && (
                          <div style={{ fontSize: 11, color: "var(--muted)" }}>🎯 {ev.assist}</div>
                        )}
                      </div>
                      <span style={{
                        marginLeft: "auto", fontSize: 10, fontWeight: 600,
                        color: ev.team === "home" ? "var(--accent)" : "var(--muted)",
                        background: ev.team === "home" ? "rgba(34,197,94,0.1)" : "var(--surface2)",
                        padding: "2px 8px", borderRadius: 6,
                      }}>
                        {ev.team === "home" ? match.homeClub.split(" ")[0] : match.awayClub.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:none } }`}</style>
      <BottomNav />
    </main>
  );
}
