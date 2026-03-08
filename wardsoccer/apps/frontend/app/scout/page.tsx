"use client";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { scoutEvaluations, clubApplicants } from "@/lib/mockData";

export default function ScoutPage() {
  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "16px", borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>🔭 Scout Dashboard</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>Evaluate players · Vote on jerseys · Academy oversight</div>
      </header>

      <div style={{ padding: "16px" }}>

        {/* Academy evaluations */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>PLAYER EVALUATIONS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {scoutEvaluations.map(ev => (
            <div key={ev.id} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 14, padding: "14px 16px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{ev.player}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                    {ev.position} · {ev.district} · Age {ev.age}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "var(--accent2)" }}>{ev.rating}</div>
                  <div style={{ fontSize: 10, color: ev.recommendation === "Fast Track" ? "var(--accent)" : "var(--muted)", fontWeight: 600 }}>
                    {ev.recommendation}
                  </div>
                </div>
              </div>

              {/* Attribute bars */}
              {[
                { label: "Speed",     val: ev.speed     },
                { label: "Technique", val: ev.technique },
                { label: "Teamwork",  val: ev.teamwork  },
              ].map(bar => (
                <div key={bar.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: "var(--muted)", width: 64, flexShrink: 0 }}>{bar.label}</span>
                  <div style={{ flex: 1, height: 5, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${bar.val * 10}%`, height: "100%", background: "var(--accent)", borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 10, color: "var(--muted)", width: 16, textAlign: "right" }}>{bar.val}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Jersey voting queue */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>JERSEY VOTING QUEUE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {clubApplicants.filter(a => a.status === "voting").map(a => (
            <div key={a.id} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "12px 14px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{a.name}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{a.position} · {a.district}</div>
              </div>
              <Link href={`/clubs/${a.clubId}/vote`} style={{ textDecoration: "none" }}>
                <button style={{
                  background: "var(--accent2)", color: "#fff",
                  fontWeight: 700, fontSize: 11, padding: "7px 12px",
                  borderRadius: 8, border: "none", cursor: "pointer",
                }}>Vote</button>
              </Link>
            </div>
          ))}
        </div>

      </div>
      <BottomNav />
    </main>
  );
}
