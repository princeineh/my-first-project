"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { clubs, clubApplicants, topScorers } from "@/lib/mockData";
import { ArrowLeft, Users } from "lucide-react";

export default function ClubDetailPage() {
  const { id } = useParams();
  const club = clubs.find(c => c.id === id) ?? clubs[0];
  const applicants = clubApplicants.filter(a => a.clubId === club.id);

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
        borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <Link href="/clubs" style={{ color: "var(--text)", display: "flex" }}><ArrowLeft size={20} /></Link>
        <span style={{ fontWeight: 800, fontSize: 16, flex: 1 }}>{club.name}</span>
        <span style={{
          fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
          background: club.phase === "full_season" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
          color: club.phase === "full_season" ? "var(--accent)" : "#f59e0b",
        }}>
          {club.phase === "full_season" ? "Full Season" : "Preseason"}
        </span>
      </header>

      {/* Club hero */}
      <div style={{
        background: `linear-gradient(180deg, ${club.color}22 0%, var(--background) 100%)`,
        padding: "32px 20px 24px", textAlign: "center", borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ fontSize: 64, marginBottom: 12 }}>{club.badge}</div>
        <div style={{ fontWeight: 900, fontSize: 24 }}>{club.name}</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
          District: <span style={{ color: club.color, fontWeight: 700 }}>{club.ownerDistrict}</span>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
          {[
            { label: "Squad Size", value: club.squadSize },
            { label: "Open Slots", value: club.openSlots },
            { label: "Applicants",  value: applicants.length },
          ].map(s => (
            <div key={s.label} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "12px 16px", textAlign: "center",
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: club.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>

        {/* How to join */}
        <div style={{
          background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: 14, padding: "16px", marginBottom: 20,
        }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "var(--accent)", marginBottom: 10 }}>
            How to join {club.name}
          </div>
          {[
            { icon: "🎓", text: "Academy path — train in preseason, get scouted and selected by coaches/scouts/media vote." },
            { icon: "🔄", text: "Transfer path — if you're in the league, apply for a transfer. Fee is shared with your coach, media, and data analysts." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Apply CTA */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <Link href={`/clubs/${club.id}/apply`} style={{ flex: 1, textDecoration: "none" }}>
            <button style={{
              width: "100%", background: "var(--accent)", color: "#000",
              fontWeight: 800, fontSize: 14, padding: "13px",
              borderRadius: 12, border: "none", cursor: "pointer",
            }}>
              🎓 Apply (Academy)
            </button>
          </Link>
          <Link href={`/clubs/${club.id}/apply?path=transfer`} style={{ flex: 1, textDecoration: "none" }}>
            <button style={{
              width: "100%", background: "var(--surface2)", color: "var(--text)",
              fontWeight: 700, fontSize: 14, padding: "13px",
              borderRadius: 12, border: "1px solid var(--border)", cursor: "pointer",
            }}>
              🔄 Transfer
            </button>
          </Link>
        </div>

        {/* Current applicants */}
        {applicants.length > 0 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Users size={14} color="var(--muted)" />
              <span style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", letterSpacing: 1 }}>JERSEY APPLICANTS (IN VOTING)</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {applicants.map(a => {
                const totalVotes = a.votes.scouts + a.votes.coaches + a.votes.media + a.votes.managers;
                return (
                  <div key={a.id} style={{
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: 12, padding: "12px 14px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{a.name}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)" }}>{a.position} · {a.district} · Age {a.age}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 18, fontWeight: 900, color: "var(--accent2)" }}>{totalVotes}</div>
                        <div style={{ fontSize: 9, color: "var(--muted)" }}>votes</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {[
                        { label: "Scouts", val: a.votes.scouts },
                        { label: "Coaches", val: a.votes.coaches },
                        { label: "Media", val: a.votes.media },
                        { label: "Managers", val: a.votes.managers },
                      ].map(v => (
                        <span key={v.label} style={{
                          fontSize: 10, padding: "3px 8px", borderRadius: 6,
                          background: "var(--surface2)", border: "1px solid var(--border)",
                          color: "var(--muted)",
                        }}>{v.label}: {v.val}</span>
                      ))}
                      <span style={{
                        fontSize: 10, padding: "3px 8px", borderRadius: 6,
                        background: a.path === "academy" ? "rgba(34,197,94,0.1)" : "rgba(124,58,237,0.1)",
                        border: `1px solid ${a.path === "academy" ? "rgba(34,197,94,0.3)" : "rgba(124,58,237,0.3)"}`,
                        color: a.path === "academy" ? "var(--accent)" : "var(--accent2)",
                        fontWeight: 700,
                      }}>{a.path === "academy" ? "🎓 Academy" : "🔄 Transfer"}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href={`/clubs/${club.id}/vote`} style={{ textDecoration: "none" }}>
              <button style={{
                width: "100%", background: "var(--accent2)", color: "#fff",
                fontWeight: 800, fontSize: 14, padding: "13px",
                borderRadius: 12, border: "none", cursor: "pointer",
              }}>
                🗳️ Vote on Jersey Selection
              </button>
            </Link>
          </>
        )}

        {/* Top scorers from this club */}
        {topScorers.filter(p => p.club.toLowerCase().includes(club.name.toLowerCase())).length > 0 && (
          <>
            <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", margin: "24px 0 12px", letterSpacing: 1 }}>TOP PLAYERS</div>
            {topScorers.filter(p => p.club.toLowerCase().includes(club.name.toLowerCase())).map(p => (
              <div key={p.rank} style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 12, padding: "12px 14px", marginBottom: 8,
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{p.district}</div>
                </div>
                <div style={{ display: "flex", gap: 14, textAlign: "center" }}>
                  <div><div style={{ fontSize: 18, fontWeight: 900, color: "var(--accent)" }}>{p.goals}</div><div style={{ fontSize: 9, color: "var(--muted)" }}>G</div></div>
                  <div><div style={{ fontSize: 18, fontWeight: 900 }}>{p.assists}</div><div style={{ fontSize: 9, color: "var(--muted)" }}>A</div></div>
                  <div><div style={{ fontSize: 18, fontWeight: 900, color: "var(--accent2)" }}>{p.rating}</div><div style={{ fontSize: 9, color: "var(--muted)" }}>Rtg</div></div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <BottomNav />
    </main>
  );
}
