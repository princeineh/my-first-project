"use client";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { coachSquad } from "@/lib/mockData";
import { Bell, CheckCircle, XCircle, Clock, Send, Users } from "lucide-react";

type Availability = "available" | "unavailable" | "pending" | "none";

const availColor: Record<Availability, string> = {
  available:   "var(--accent)",
  unavailable: "var(--live)",
  pending:     "#f59e0b",
  none:        "var(--muted)",
};
const availIcon: Record<Availability, string> = {
  available:   "✓ Available",
  unavailable: "✗ Unavailable",
  pending:     "⏳ No response",
  none:        "— Not eligible",
};

export default function CoachPage() {
  const [availability, setAvailability] = useState<Record<string, Availability>>(
    Object.fromEntries(coachSquad.players.map(p => [p.name, p.availability as Availability]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [notifSent, setNotifSent] = useState(coachSquad.nextFixture.notificationSent);

  const eligible     = coachSquad.players.filter(p => p.status === "eligible");
  const ineligible   = coachSquad.players.filter(p => p.status === "ineligible");
  const confirmed    = eligible.filter(p => availability[p.name] === "available");
  const unavailable  = eligible.filter(p => availability[p.name] === "unavailable");
  const pending      = eligible.filter(p => availability[p.name] === "pending");

  const toggleAvail = (name: string, val: Availability) => {
    if (submitted) return;
    setAvailability(prev => ({ ...prev, [name]: prev[name] === val ? "pending" : val }));
  };

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "16px", borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>📋 Coach Dashboard</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>
          {coachSquad.club} · {coachSquad.district}
        </div>
      </header>

      <div style={{ padding: "16px" }}>

        {/* Squad overview */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 24 }}>
          {[
            { label: "Total Squad", value: coachSquad.players.length, color: "var(--text)"   },
            { label: "Eligible",    value: eligible.length,           color: "var(--accent)" },
            { label: "Ineligible",  value: ineligible.length,         color: "var(--live)"   },
          ].map(s => (
            <div key={s.label} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "14px 10px", textAlign: "center",
            }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── AVAILABILITY TRACKER ── */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>NEXT FIXTURE — AVAILABILITY</div>

        {/* Fixture card */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 14, padding: "14px", marginBottom: 16,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>
                {coachSquad.club} <span style={{ color: "var(--muted)", fontWeight: 400 }}>vs</span> {coachSquad.nextFixture.opponent}
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>
                {coachSquad.nextFixture.date} · {coachSquad.nextFixture.kickoff} · {coachSquad.nextFixture.venue}
              </div>
            </div>
            <span style={{
              fontSize: 10, padding: "3px 8px", borderRadius: 6, fontWeight: 700,
              background: "rgba(34,197,94,0.1)", color: "var(--accent)",
            }}>PRESEASON</span>
          </div>

          {/* Availability summary bar */}
          <div style={{ display: "flex", gap: 0, marginBottom: 12, borderRadius: 8, overflow: "hidden", height: 8 }}>
            <div style={{ flex: confirmed.length,   background: "var(--accent)", transition: "flex 0.4s" }} />
            <div style={{ flex: unavailable.length, background: "var(--live)",   transition: "flex 0.4s" }} />
            <div style={{ flex: pending.length,     background: "#f59e0b",       transition: "flex 0.4s" }} />
          </div>

          <div style={{ display: "flex", gap: 14, fontSize: 11 }}>
            <span style={{ color: "var(--accent)", fontWeight: 700 }}>
              <CheckCircle size={12} style={{ verticalAlign: "middle", marginRight: 3 }} />
              {confirmed.length} Available
            </span>
            <span style={{ color: "var(--live)" }}>
              <XCircle size={12} style={{ verticalAlign: "middle", marginRight: 3 }} />
              {unavailable.length} Out
            </span>
            <span style={{ color: "#f59e0b" }}>
              <Clock size={12} style={{ verticalAlign: "middle", marginRight: 3 }} />
              {pending.length} Pending
            </span>
          </div>
        </div>

        {/* Notify button */}
        {!notifSent ? (
          <button onClick={() => setNotifSent(true)} style={{
            width: "100%", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
            color: "var(--accent)", fontWeight: 700, fontSize: 13, padding: "11px",
            borderRadius: 12, cursor: "pointer", marginBottom: 16,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <Bell size={15} /> Notify All Players of Fixture
          </button>
        ) : (
          <div style={{
            background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)",
            borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 12,
            color: "var(--muted)", display: "flex", alignItems: "center", gap: 8,
          }}>
            <Send size={13} color="var(--accent)" />
            Notification sent to all {eligible.length} eligible players · Deadline: {coachSquad.nextFixture.deadline}
          </div>
        )}

        {/* Player availability list — eligible only */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>PLAYER AVAILABILITY</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {eligible.map(p => {
            const avail = availability[p.name];
            return (
              <div key={p.name} style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 12, padding: "12px 14px",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                {/* Position badge */}
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800, color: "var(--accent)", flexShrink: 0,
                }}>{p.position}</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: availColor[avail], marginTop: 1, fontWeight: 600 }}>
                    {availIcon[avail]}
                  </div>
                </div>

                {/* Availability toggle buttons */}
                {!submitted && (
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button
                      onClick={() => toggleAvail(p.name, "available")}
                      style={{
                        width: 32, height: 32, borderRadius: 8, border: "none", cursor: "pointer",
                        background: avail === "available" ? "rgba(34,197,94,0.2)" : "var(--surface2)",
                        color: avail === "available" ? "var(--accent)" : "var(--muted)",
                        fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
                      }}>✓</button>
                    <button
                      onClick={() => toggleAvail(p.name, "unavailable")}
                      style={{
                        width: 32, height: 32, borderRadius: 8, border: "none", cursor: "pointer",
                        background: avail === "unavailable" ? "rgba(239,68,68,0.2)" : "var(--surface2)",
                        color: avail === "unavailable" ? "var(--live)" : "var(--muted)",
                        fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
                      }}>✗</button>
                  </div>
                )}

                {submitted && (
                  <span style={{
                    fontSize: 10, padding: "3px 8px", borderRadius: 6, fontWeight: 700,
                    background: avail === "available" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.08)",
                    color: availColor[avail],
                  }}>
                    {avail === "available" ? "SELECTED" : avail === "unavailable" ? "OUT" : "PENDING"}
                  </span>
                )}

                <div style={{ fontWeight: 900, fontSize: 15, color: "var(--accent2)", flexShrink: 0 }}>{p.rating}</div>
              </div>
            );
          })}
        </div>

        {/* Ineligible */}
        {ineligible.length > 0 && (
          <>
            <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>INELIGIBLE (no kit)</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20, opacity: 0.6 }}>
              {ineligible.map(p => (
                <div key={p.name} style={{
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 10, padding: "10px 14px",
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 8, background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 800, color: "var(--live)",
                  }}>{p.position}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>
                      {p.kitStatus === "pending" ? "⏳ Kit instalment in progress" : "✗ No kit — must purchase to be eligible"}
                    </div>
                  </div>
                  <div style={{ fontWeight: 900, fontSize: 15, color: "var(--muted)" }}>{p.rating}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Submit squad list */}
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={confirmed.length < 7}
            style={{
              width: "100%", background: confirmed.length >= 7 ? "var(--accent)" : "var(--surface)",
              color: confirmed.length >= 7 ? "#000" : "var(--muted)",
              fontWeight: 800, fontSize: 15, padding: "14px",
              borderRadius: 14, border: `1px solid ${confirmed.length >= 7 ? "var(--accent)" : "var(--border)"}`,
              cursor: confirmed.length >= 7 ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
            <Users size={16} />
            Submit Squad List ({confirmed.length} players confirmed)
          </button>
        ) : (
          <div style={{
            background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: 14, padding: "14px", textAlign: "center",
          }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>✅</div>
            <div style={{ fontWeight: 800, fontSize: 15, color: "var(--accent)" }}>Squad submitted!</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
              {confirmed.length} players locked in for {coachSquad.nextFixture.date}. Auto-shared with referee and platform.
            </div>
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <Link href="/clubs/manutd/vote" style={{ textDecoration: "none" }}>
            <button style={{
              width: "100%", background: "var(--accent2)", color: "#fff",
              fontWeight: 800, fontSize: 14, padding: "13px",
              borderRadius: 12, border: "none", cursor: "pointer",
            }}>🗳️ Vote on Jersey Selection</button>
          </Link>
        </div>

      </div>
      <BottomNav role="coach" />
    </main>
  );
}
