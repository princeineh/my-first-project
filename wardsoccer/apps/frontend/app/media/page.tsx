"use client";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { buzzFeed, dailyReports, governanceDecisions } from "@/lib/mockData";
import { useState } from "react";

export default function MediaPage() {
  const [published, setPublished] = useState<string[]>([]);
  const [buzz, setBuzz] = useState("");

  const publish = () => {
    if (!buzz.trim()) return;
    setPublished(p => [buzz, ...p]);
    setBuzz("");
  };

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "16px", borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>🎥 Media Dashboard</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>Cover matches · Report governance · Publish buzz</div>
      </header>

      <div style={{ padding: "16px" }}>

        {/* Publish buzz */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>PUBLISH TO BUZZ FEED</div>
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 14, padding: "16px", marginBottom: 24,
        }}>
          <textarea value={buzz} onChange={e => setBuzz(e.target.value)}
            placeholder="Write your match report, goal highlight, or player spotlight..."
            rows={3}
            style={{
              width: "100%", background: "var(--surface2)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "12px", color: "var(--text)", fontSize: 13,
              outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit",
            }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>Resets at midnight · Visible to all fans</span>
            <button onClick={publish} style={{
              background: "var(--accent)", color: "#000", fontWeight: 700,
              fontSize: 13, padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer",
            }}>Publish</button>
          </div>
          {published.map((p, i) => (
            <div key={i} style={{
              marginTop: 8, background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "var(--muted)",
            }}>✓ Published: {p}</div>
          ))}
        </div>

        {/* Governance decisions to report */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>GOVERNANCE — REPORT THESE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {governanceDecisions.map(d => (
            <div key={d.id} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "12px 14px",
            }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{d.title}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
                {d.date} · {d.votes.for} for / {d.votes.against} against · {d.outcome}
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                {d.reporters.map(r => (
                  <span key={r} style={{
                    fontSize: 10, padding: "2px 8px", borderRadius: 6,
                    background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
                    color: "var(--accent2)",
                  }}>{r}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Today's buzz */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>TODAY&apos;S BUZZ FEED</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {buzzFeed.map(b => (
            <div key={b.id} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "var(--muted)",
            }}>
              <div style={{ color: "var(--text)", marginBottom: 4 }}>{b.text}</div>
              <div style={{ fontSize: 10 }}>{b.time} · {b.district}</div>
            </div>
          ))}
        </div>

        <Link href="/governance" style={{ textDecoration: "none" }}>
          <button style={{
            width: "100%", background: "var(--surface2)", color: "var(--text)",
            fontWeight: 700, fontSize: 13, padding: "12px",
            borderRadius: 12, border: "1px solid var(--border)", cursor: "pointer", marginTop: 20,
          }}>View Full Governance Dashboard →</button>
        </Link>
      </div>
      <BottomNav />
    </main>
  );
}
