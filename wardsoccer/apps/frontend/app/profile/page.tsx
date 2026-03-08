"use client";
import BottomNav from "@/components/BottomNav";
import { playerProfile } from "@/lib/mockData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const formArrow = (f: "up" | "down" | "neutral") => {
  if (f === "up")   return <TrendingUp  size={18} color="#22c55e" />;
  if (f === "down") return <TrendingDown size={18} color="#ef4444" />;
  return <Minus size={18} color="#64748b" />;
};

const resultColor = (r: string) =>
  r.startsWith("W") ? "#22c55e" : r.startsWith("D") ? "#f59e0b" : "#ef4444";

export default function ProfilePage() {
  const p = playerProfile;

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(180deg, var(--surface2) 0%, var(--background) 100%)",
        padding: "32px 20px 24px", textAlign: "center",
        borderBottom: "1px solid var(--border)",
      }}>
        {/* Avatar */}
        <div style={{
          width: 72, height: 72, borderRadius: "50%", margin: "0 auto 14px",
          background: "linear-gradient(135deg, var(--accent), var(--accent2))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, fontWeight: 900, color: "#000",
          border: "3px solid var(--border)",
        }}>
          {p.name.split(" ").map(w => w[0]).join("")}
        </div>

        <div style={{ fontSize: 20, fontWeight: 800 }}>{p.name}</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
          {p.position} · {p.club} · {p.district}
        </div>

        {/* Rating + Form */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16 }}>
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 12, padding: "10px 20px", textAlign: "center",
          }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: "var(--accent2)" }}>{p.rating}</div>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>Rating</div>
          </div>
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 12, padding: "10px 20px", textAlign: "center",
            display: "flex", flexDirection: "column", alignItems: "center",
          }}>
            {formArrow(p.form)}
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}>Form</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>

        {/* Stats grid */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 12, letterSpacing: 1 }}>SEASON STATS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 24 }}>
          {[
            { label: "Goals",    value: p.stats.goals,         color: "var(--accent)"  },
            { label: "Assists",  value: p.stats.assists,       color: "var(--accent2)" },
            { label: "Matches",  value: p.stats.matchesPlayed, color: "var(--text)"    },
            { label: "Avg Rtg",  value: p.stats.avgRating,     color: "var(--accent2)" },
            { label: "Yellows",  value: p.stats.yellowCards,   color: "#f59e0b"        },
            { label: "Reds",     value: p.stats.redCards,      color: "var(--live)"    },
          ].map(s => (
            <div key={s.label} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "14px 10px", textAlign: "center",
            }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Recent matches */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 12, letterSpacing: 1 }}>RECENT MATCHES</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {p.recentMatches.map((m, i) => (
            <div key={i} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "12px 14px",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: resultColor(m.result) + "22",
                border: `1px solid ${resultColor(m.result)}44`,
                color: resultColor(m.result), fontWeight: 800, fontSize: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{m.result[0]}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>vs {m.opponent}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{m.result}</div>
              </div>
              <div style={{ display: "flex", gap: 12, textAlign: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--accent)" }}>{m.goals}</div>
                  <div style={{ fontSize: 9, color: "var(--muted)" }}>G</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{m.assists}</div>
                  <div style={{ fontSize: 9, color: "var(--muted)" }}>A</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--accent2)" }}>{m.rating}</div>
                  <div style={{ fontSize: 9, color: "var(--muted)" }}>Rtg</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Kit CTA */}
        <div style={{
          marginTop: 24, background: "rgba(34,197,94,0.08)",
          border: "1px solid rgba(34,197,94,0.25)", borderRadius: 14, padding: "16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--accent)" }}>Kit not purchased</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Buy your kit to play in official matches</div>
          </div>
          <a href="/kit" style={{
            background: "var(--accent)", color: "#000", fontWeight: 700,
            fontSize: 12, padding: "8px 14px", borderRadius: 8, textDecoration: "none",
          }}>Buy Kit</a>
        </div>

      </div>
      <BottomNav />
    </main>
  );
}
