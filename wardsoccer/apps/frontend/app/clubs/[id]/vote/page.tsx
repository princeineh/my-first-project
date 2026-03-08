"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { clubs, clubApplicants } from "@/lib/mockData";
import { ArrowLeft, Check } from "lucide-react";

export default function VotePage() {
  const { id } = useParams();
  const club = clubs.find(c => c.id === id) ?? clubs[0];
  const applicants = clubApplicants.filter(a => a.clubId === club.id);

  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggle = (applicantId: string) =>
    setVotes(v => ({ ...v, [applicantId]: !v[applicantId] }));

  const totalVoted = Object.values(votes).filter(Boolean).length;

  if (submitted) return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🗳️</div>
      <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Votes Submitted</div>
      <div style={{ fontSize: 14, color: "var(--muted)", textAlign: "center", marginBottom: 32, lineHeight: 1.6 }}>
        Your votes have been recorded. Players being voted on were not present during this process.
        Results will be published when all voters have submitted.
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
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <Link href={`/clubs/${club.id}`} style={{ color: "var(--text)", display: "flex" }}><ArrowLeft size={20} /></Link>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 15 }}>Jersey Selection Vote</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>{club.name} — Players absent during vote</div>
        </div>
      </header>

      <div style={{ padding: "20px 16px" }}>

        {/* Notice */}
        <div style={{
          background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)",
          borderRadius: 12, padding: "12px 14px", marginBottom: 20,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b", marginBottom: 4 }}>Confidential Voting Session</div>
          <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>
            Players being evaluated are NOT present. Vote honestly based on performance, attitude, and potential. Results will be published transparently on the platform.
          </div>
        </div>

        {/* Voter role notice */}
        <div style={{
          display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap",
        }}>
          {["Scout", "Coach", "Media", "Manager"].map(role => (
            <span key={role} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6,
              background: "var(--surface2)", border: "1px solid var(--border)",
              color: "var(--muted)", fontWeight: 600,
            }}>✓ {role}</span>
          ))}
          <span style={{ fontSize: 11, color: "var(--muted)", alignSelf: "center" }}>eligible to vote</span>
        </div>

        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 12, letterSpacing: 1 }}>
          CANDIDATES ({applicants.length})
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {applicants.map(a => {
            const voted = votes[a.id] ?? false;
            const totalVotes = a.votes.scouts + a.votes.coaches + a.votes.media + a.votes.managers;
            return (
              <div key={a.id} style={{
                background: voted ? "rgba(34,197,94,0.08)" : "var(--surface)",
                border: `1px solid ${voted ? "rgba(34,197,94,0.3)" : "var(--border)"}`,
                borderRadius: 14, padding: "16px", transition: "all 0.2s",
              }}>
                {/* Candidate header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>{a.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                      {a.position} · {a.district} · Age {a.age} · Rating {a.rating}
                    </div>
                    <span style={{
                      fontSize: 10, padding: "3px 8px", borderRadius: 6, marginTop: 6, display: "inline-block",
                      background: a.path === "academy" ? "rgba(34,197,94,0.1)" : "rgba(124,58,237,0.1)",
                      color: a.path === "academy" ? "var(--accent)" : "var(--accent2)",
                      fontWeight: 700,
                    }}>{a.path === "academy" ? "🎓 Academy" : "🔄 Transfer"}</span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: "var(--accent2)" }}>{totalVotes}</div>
                    <div style={{ fontSize: 9, color: "var(--muted)" }}>current votes</div>
                  </div>
                </div>

                {/* Rating bars */}
                <div style={{ marginBottom: 14 }}>
                  {[
                    { label: "Speed",       val: 80 },
                    { label: "Technique",   val: 72 },
                    { label: "Teamwork",    val: 85 },
                  ].map(bar => (
                    <div key={bar.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 10, color: "var(--muted)", width: 60, flexShrink: 0 }}>{bar.label}</span>
                      <div style={{ flex: 1, height: 5, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ width: `${bar.val}%`, height: "100%", background: "var(--accent2)", borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 10, color: "var(--muted)", width: 24, textAlign: "right" }}>{bar.val}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => toggle(a.id)} style={{
                  width: "100%", padding: "11px",
                  background: voted ? "var(--accent)" : "var(--surface2)",
                  border: `1px solid ${voted ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: 10, cursor: "pointer",
                  color: voted ? "#000" : "var(--text)",
                  fontWeight: 700, fontSize: 13,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "all 0.2s",
                }}>
                  {voted ? <><Check size={16} /> Voted</> : "Vote for this player"}
                </button>
              </div>
            );
          })}
        </div>

        {applicants.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--muted)" }}>
            No applicants currently in the voting queue for {club.name}.
          </div>
        )}

        <button
          onClick={() => totalVoted > 0 && setSubmitted(true)}
          disabled={totalVoted === 0}
          style={{
            width: "100%", background: totalVoted > 0 ? "var(--accent)" : "var(--surface2)",
            color: totalVoted > 0 ? "#000" : "var(--muted)",
            fontWeight: 800, fontSize: 16, padding: "15px",
            borderRadius: 14, border: "none", cursor: totalVoted > 0 ? "pointer" : "not-allowed",
          }}>
          Submit {totalVoted > 0 ? `${totalVoted} Vote${totalVoted > 1 ? "s" : ""}` : "Votes"}
        </button>
      </div>
    </main>
  );
}
