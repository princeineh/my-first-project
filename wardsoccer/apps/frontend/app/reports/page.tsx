"use client";
import BottomNav from "@/components/BottomNav";
import { dailyReports, governanceDecisions } from "@/lib/mockData";
import { Bell } from "lucide-react";

export default function ReportsPage() {
  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "16px", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: 10,
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <Bell size={18} color="var(--accent)" />
        <div>
          <span style={{ fontWeight: 800, fontSize: 16 }}>Daily Reports</span>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>Auto-generated · Sent to all fans</div>
        </div>
      </header>

      <div style={{ padding: "16px" }}>

        {/* How reports work */}
        <div style={{
          background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.2)",
          borderRadius: 14, padding: "12px 14px", marginBottom: 20,
          fontSize: 12, color: "var(--muted)", lineHeight: 1.6,
        }}>
          Daily reports are <strong style={{ color: "var(--text)" }}>automatically generated</strong> by the platform and sent to every registered fan, player, and stakeholder. You are entitled to know everything happening in your league.
        </div>

        {/* Daily reports */}
        {dailyReports.map(r => (
          <div key={r.id} style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 14, padding: "16px", marginBottom: 16,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{r.title}</div>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>{r.date}</span>
            </div>

            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: "0 0 14px" }}>{r.summary}</p>

            {/* Highlights */}
            <div style={{ fontWeight: 700, fontSize: 11, color: "var(--muted)", marginBottom: 8, letterSpacing: 0.5 }}>HIGHLIGHTS</div>
            {r.highlights.map((h, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{h}</span>
              </div>
            ))}

            {/* Financials */}
            <div style={{
              marginTop: 14, background: "var(--surface2)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "10px 14px",
            }}>
              <div style={{ fontWeight: 700, fontSize: 11, color: "var(--muted)", marginBottom: 8, letterSpacing: 0.5 }}>DAILY FINANCIALS</div>
              <div style={{ display: "flex", gap: 0 }}>
                {[
                  { label: "Collected", value: `₦${r.financials.collected.toLocaleString()}`, color: "var(--accent)" },
                  { label: "Spent",     value: `₦${r.financials.spent.toLocaleString()}`,     color: "var(--live)"   },
                  { label: "Fees",      value: `₦${r.financials.platformFee.toLocaleString()}`, color: "var(--accent2)" },
                ].map((f, i, arr) => (
                  <div key={f.label} style={{
                    flex: 1, textAlign: "center", padding: "6px 4px",
                    borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                  }}>
                    <div style={{ fontWeight: 800, fontSize: 14, color: f.color }}>{f.value}</div>
                    <div style={{ fontSize: 9, color: "var(--muted)", marginTop: 2 }}>{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Recent decisions (public) */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>RECENT DECISIONS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {governanceDecisions.map(d => (
            <div key={d.id} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "12px 14px",
            }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{d.title}</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: "var(--accent)" }}>{d.votes.for} For</span>
                <span style={{ fontSize: 12, color: "var(--live)" }}>{d.votes.against} Against</span>
                <span style={{
                  fontSize: 10, padding: "2px 8px", borderRadius: 6,
                  background: "rgba(34,197,94,0.1)", color: "var(--accent)", fontWeight: 700,
                }}>{d.outcome}</span>
                <span style={{ fontSize: 10, color: "var(--muted)", marginLeft: "auto" }}>{d.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
      <BottomNav />
    </main>
  );
}
