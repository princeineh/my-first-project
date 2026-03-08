"use client";
import BottomNav from "@/components/BottomNav";
import { governanceLog, governanceDecisions } from "@/lib/mockData";

const typeLabel: Record<string, string> = {
  registration: "Registration", kit_sale: "Kit Sale",
  transfer: "Transfer", facility: "Facility", coach_pay: "Coach Pay",
};
const typeColor: Record<string, string> = {
  registration: "var(--accent2)", kit_sale: "var(--accent)",
  transfer: "#f59e0b", facility: "var(--live)", coach_pay: "var(--live)",
};

export default function GovernancePage() {
  const income  = governanceLog.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expense = governanceLog.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const fees    = governanceLog.reduce((s, t) => s + (t.platformFee ?? 0), 0);

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "16px", borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>Governance</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>
          Full financial transparency · All decisions are public
        </div>
      </header>

      <div style={{ padding: "16px" }}>

        {/* Transparency notice */}
        <div style={{
          background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: 14, padding: "12px 14px", marginBottom: 20,
          fontSize: 12, color: "var(--muted)", lineHeight: 1.6,
        }}>
          <strong style={{ color: "var(--accent)" }}>Full transparency:</strong> Every transaction, every decision, and every naira collected or spent is recorded here. Media can report. Fans receive daily updates automatically.
        </div>

        {/* Financial overview */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>FINANCIAL OVERVIEW</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 24 }}>
          {[
            { label: "Income",   value: income,   color: "var(--accent)" },
            { label: "Spent",    value: expense,  color: "var(--live)"   },
            { label: "Fees (3.75%)", value: fees, color: "var(--accent2)"},
          ].map(s => (
            <div key={s.label} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "12px 8px", textAlign: "center",
            }}>
              <div style={{ fontSize: 15, fontWeight: 900, color: s.color }}>₦{s.value.toLocaleString()}</div>
              <div style={{ fontSize: 9, color: "var(--muted)", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Transaction log */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>ALL TRANSACTIONS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
          {governanceLog.map(t => (
            <div key={t.id} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "10px 14px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{
                      fontSize: 9, padding: "2px 7px", borderRadius: 4, fontWeight: 700,
                      background: (typeColor[t.type] ?? "var(--muted)") + "22",
                      color: typeColor[t.type] ?? "var(--muted)",
                    }}>{typeLabel[t.type] ?? t.type}</span>
                    <span style={{ fontSize: 10, color: "var(--muted)" }}>{t.date}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{t.description}</div>
                  <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>
                    {t.district} · Platform fee: ₦{t.platformFee}
                  </div>
                  {t.breakdown && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                      {Object.entries(t.breakdown).map(([k, v]) => (
                        <span key={k} style={{
                          fontSize: 9, padding: "2px 7px", borderRadius: 4,
                          background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--muted)",
                        }}>{k}: ₦{(v as number).toLocaleString()}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{
                  fontWeight: 900, fontSize: 15, flexShrink: 0, marginLeft: 12,
                  color: t.amount > 0 ? "var(--accent)" : "var(--live)",
                }}>
                  {t.amount > 0 ? "+" : ""}₦{Math.abs(t.amount).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decisions log */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>GOVERNANCE DECISIONS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {governanceDecisions.map(d => (
            <div key={d.id} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "12px 14px",
            }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{d.title}</div>
              <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700 }}>{d.votes.for} For</span>
                <span style={{ fontSize: 12, color: "var(--live)" }}>{d.votes.against} Against</span>
                <span style={{
                  fontSize: 10, padding: "2px 8px", borderRadius: 6,
                  background: "rgba(34,197,94,0.1)", color: "var(--accent)", fontWeight: 700,
                }}>{d.outcome}</span>
                <span style={{ fontSize: 10, color: "var(--muted)", marginLeft: "auto" }}>{d.date}</span>
              </div>
              <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                {d.reporters.map(r => (
                  <span key={r} style={{
                    fontSize: 10, padding: "2px 7px", borderRadius: 4,
                    background: "rgba(124,58,237,0.1)", color: "var(--accent2)",
                  }}>📰 {r}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
