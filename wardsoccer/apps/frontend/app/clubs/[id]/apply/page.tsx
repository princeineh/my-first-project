"use client";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { clubs } from "@/lib/mockData";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PLATFORM_FEE = 0.0375;

export default function ApplyPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const defaultPath = searchParams.get("path") === "transfer" ? "transfer" : "academy";
  const club = clubs.find(c => c.id === id) ?? clubs[0];

  const [path, setPath] = useState<"academy" | "transfer">(defaultPath);
  const [transferFee, setTransferFee] = useState("50000");
  const [submitted, setSubmitted] = useState(false);

  const fee = parseInt(transferFee) || 0;
  const platformCut = Math.round(fee * PLATFORM_FEE);
  const coachCut    = Math.round(fee * 0.25);
  const mediaCut    = Math.round(fee * 0.10);
  const analystCut  = Math.round(fee * 0.10);
  const playerGets  = fee - platformCut - coachCut - mediaCut - analystCut;

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "var(--surface2)", border: "1px solid var(--border)",
    borderRadius: 12, padding: "13px 16px", color: "var(--text)", fontSize: 15,
    outline: "none", boxSizing: "border-box",
  };

  if (submitted) return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
      <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 8, textAlign: "center" }}>Application Submitted!</div>
      <div style={{ fontSize: 14, color: "var(--muted)", textAlign: "center", marginBottom: 32, lineHeight: 1.6 }}>
        Your application to join <strong style={{ color: "var(--text)" }}>{club.name}</strong> is now under review.<br />
        Scouts, coaches, media and managers will vote. You will be notified of the outcome.
      </div>
      <Link href={`/clubs/${club.id}`} style={{ textDecoration: "none" }}>
        <button style={{
          background: "var(--accent)", color: "#000", fontWeight: 800, fontSize: 15,
          padding: "14px 32px", borderRadius: 14, border: "none", cursor: "pointer",
        }}>Back to Club</button>
      </Link>
    </main>
  );

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 40 }}>
      <header style={{
        padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
        borderBottom: "1px solid var(--border)",
      }}>
        <Link href={`/clubs/${club.id}`} style={{ color: "var(--text)", display: "flex" }}><ArrowLeft size={20} /></Link>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15 }}>Apply to {club.name}</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>Jersey Application</div>
        </div>
      </header>

      <div style={{ padding: "20px 16px" }}>

        {/* Path selector */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 12, letterSpacing: 1 }}>APPLICATION PATH</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          {(["academy", "transfer"] as const).map(p => (
            <button key={p} onClick={() => setPath(p)} style={{
              flex: 1, padding: "14px", borderRadius: 12, cursor: "pointer",
              background: path === p ? (p === "academy" ? "rgba(34,197,94,0.1)" : "rgba(124,58,237,0.1)") : "var(--surface)",
              border: `1px solid ${path === p ? (p === "academy" ? "rgba(34,197,94,0.4)" : "rgba(124,58,237,0.4)") : "var(--border)"}`,
              textAlign: "center",
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{p === "academy" ? "🎓" : "🔄"}</div>
              <div style={{ fontWeight: 800, fontSize: 13, color: path === p ? (p === "academy" ? "var(--accent)" : "var(--accent2)") : "var(--text)" }}>
                {p === "academy" ? "Academy" : "Transfer"}
              </div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}>
                {p === "academy" ? "Selected by scouts & coaches" : "Pay your way in"}
              </div>
            </button>
          ))}
        </div>

        {/* Academy info */}
        {path === "academy" && (
          <div style={{
            background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)",
            borderRadius: 14, padding: "16px", marginBottom: 20,
          }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Academy Application Process</div>
            {[
              "Submit your application here — your stats from preseason are attached",
              "Scouts review your performance and rate your potential",
              "Coaches, media, and managers vote on jersey selection",
              "You will NOT be present during the vote — only results are shared",
              "If selected, your jersey is assigned and you join the full squad",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}.</span>
                <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{step}</span>
              </div>
            ))}
          </div>
        )}

        {/* Transfer breakdown */}
        {path === "transfer" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8, display: "block", fontWeight: 600 }}>
                Transfer Fee (₦)
              </label>
              <input value={transferFee} onChange={e => setTransferFee(e.target.value)}
                type="number" placeholder="50000" style={inputStyle} />
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>
                This is what you agree to pay. It will be distributed automatically.
              </div>
            </div>

            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 14, padding: "16px", marginBottom: 20,
            }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 14 }}>Transfer Fee Breakdown</div>
              {[
                { label: "Platform (3.75%)",  value: platformCut, color: "var(--accent2)" },
                { label: "Coach (25%)",        value: coachCut,    color: "var(--accent)"  },
                { label: "Media (10%)",        value: mediaCut,    color: "#f59e0b"        },
                { label: "Data Analyst (10%)", value: analystCut,  color: "#06b6d4"        },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{r.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: r.color }}>₦{r.value.toLocaleString()}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 4, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700 }}>You receive</span>
                <span style={{ fontWeight: 900, fontSize: 16, color: "var(--accent)" }}>₦{playerGets.toLocaleString()}</span>
              </div>
            </div>

            <div style={{
              background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: 12, padding: "12px 14px", marginBottom: 20, fontSize: 12,
              color: "var(--muted)", lineHeight: 1.6,
            }}>
              Transfers happen with full knowledge of all teams. Other clubs are notified before the transfer is confirmed.
            </div>
          </div>
        )}

        <button onClick={() => setSubmitted(true)} style={{
          width: "100%", background: "var(--accent)", color: "#000",
          fontWeight: 800, fontSize: 16, padding: "15px",
          borderRadius: 14, border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          Submit Application <ArrowRight size={18} />
        </button>
      </div>
    </main>
  );
}
