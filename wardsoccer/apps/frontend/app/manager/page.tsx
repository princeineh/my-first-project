"use client";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { governanceLog, governanceDecisions, coachSquad } from "@/lib/mockData";

export default function ManagerPage() {
  const income  = governanceLog.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expense = governanceLog.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const balance = income - expense;
  const fees    = governanceLog.reduce((s, t) => s + (t.platformFee ?? 0), 0);

  const typeColors: Record<string, string> = {
    registration: "var(--accent2)",
    kit_sale:     "var(--accent)",
    transfer:     "#f59e0b",
    facility:     "var(--live)",
    coach_pay:    "var(--live)",
  };

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "16px", borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>🏢 Manager Dashboard</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{coachSquad.club} · Full financial control</div>
      </header>

      <div style={{ padding: "16px" }}>

        {/* Financial summary */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
          <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 12, padding: "14px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: "var(--accent)" }}>₦{income.toLocaleString()}</div>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 3 }}>Total Income</div>
          </div>
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: "14px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: "var(--live)" }}>₦{expense.toLocaleString()}</div>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 3 }}>Total Expenses</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900 }}>₦{balance.toLocaleString()}</div>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 3 }}>Net Balance</div>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: "var(--accent2)" }}>₦{fees.toLocaleString()}</div>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 3 }}>Platform Fees (3.75%)</div>
          </div>
        </div>

        {/* Transaction log */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>TRANSACTION LOG</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
          {governanceLog.map(t => (
            <div key={t.id} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "10px 14px",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                background: typeColors[t.type] ?? "var(--muted)",
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{t.description}</div>
                <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 1 }}>
                  {t.date} · {t.district} · fee: ₦{t.platformFee}
                </div>
              </div>
              <div style={{
                fontWeight: 800, fontSize: 14,
                color: t.amount > 0 ? "var(--accent)" : "var(--live)",
              }}>
                {t.amount > 0 ? "+" : ""}₦{Math.abs(t.amount).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Governance decisions */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>RECENT DECISIONS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {governanceDecisions.map(d => (
            <div key={d.id} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "10px 14px",
            }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{d.title}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}>
                {d.date} · {d.votes.for} for / {d.votes.against} against · <span style={{ color: "var(--accent)" }}>{d.outcome}</span>
              </div>
            </div>
          ))}
        </div>

        <Link href="/reports" style={{ textDecoration: "none" }}>
          <button style={{
            width: "100%", background: "var(--surface2)", color: "var(--text)",
            fontWeight: 700, fontSize: 13, padding: "12px", borderRadius: 12,
            border: "1px solid var(--border)", cursor: "pointer",
          }}>View Public Reports →</button>
        </Link>
      </div>
      <BottomNav />
    </main>
  );
}
