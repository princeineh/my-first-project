"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formingDistricts, launchState, recentJoiners, clubs, leagues } from "@/lib/mockData";
import { ArrowRight, Share2, Bell, ChevronRight } from "lucide-react";

// Simulated logged-in user (would come from auth in production)
const ME = {
  name:       "Chukwu Emeka",
  role:       "Player",
  leagueId:  "pl",
  clubId:    "manutd",
  district:  "Port Harcourt Main",
  lga:       "Port Harcourt",
  state:     "Rivers",
  area:      "Rumuola",
};

const myClub     = clubs.find(c => c.id === ME.clubId)!;
const myLeague   = leagues.find(l => l.id === ME.leagueId)!;
const myDistrict = formingDistricts[0];

const REQ = { players: 18, coaches: 1, referees: 2, scouts: 1, trainers: 1, firstAid: 1, media: 1 };

function RequirementRow({ label, current, required, icon }: { label: string; current: number; required: number; icon: string }) {
  const done = current >= required;
  const pct  = Math.min(Math.round((current / required) * 100), 100);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>{icon}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: done ? "var(--text)" : "var(--muted)" }}>{label}</span>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 6,
          background: done ? "rgba(34,197,94,0.1)" : "var(--surface2)",
          color: done ? "var(--accent)" : "var(--muted)",
        }}>{done ? "✓ Done" : `${current}/${required}`}</span>
      </div>
      <div style={{ height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`, height: "100%", borderRadius: 2,
          background: done ? "var(--accent)" : "rgba(34,197,94,0.35)",
          transition: "width 0.5s",
        }} />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [cd, setCd] = useState({ d: launchState.daysToPreseason, h: 0, m: 0, s: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const diff = new Date(launchState.preseasonDate).getTime() - Date.now();
      if (diff <= 0) return;
      setCd({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const distChecks = [
    { label: "Players",   current: myDistrict.players,  required: REQ.players,  icon: "⚽" },
    { label: "Coach",     current: myDistrict.coaches,  required: REQ.coaches,  icon: "📋" },
    { label: "Referees",  current: myDistrict.referees, required: REQ.referees, icon: "🟨" },
    { label: "Scout",     current: myDistrict.scouts,   required: REQ.scouts,   icon: "🔭" },
    { label: "Trainer",   current: myDistrict.trainers, required: REQ.trainers, icon: "💪" },
    { label: "First Aid", current: myDistrict.firstAid, required: REQ.firstAid, icon: "🏥" },
    { label: "Media Rep", current: myDistrict.media,    required: REQ.media,    icon: "🎙️" },
  ];
  const doneCount  = distChecks.filter(c => c.current >= c.required).length;
  const distPct    = Math.round((doneCount / distChecks.length) * 100);
  const missingRoles = distChecks.filter(c => c.current < c.required);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://wardsoccer.ng/join?district=ph-main");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80, background: "var(--background)" }}>

      {/* ── HEADER ── */}
      <header style={{
        padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "rgba(8,8,15,0.92)", backdropFilter: "blur(12px)", zIndex: 50,
      }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 15 }}>
            <span style={{ color: "var(--accent)" }}>Ward</span>Soccer
          </div>
          <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 1 }}>Onboarding Phase</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: myClub.color + "22",
            border: `1px solid ${myClub.color}44`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
          }}>{myClub.badge}</div>
        </div>
      </header>

      <div style={{ padding: "0 16px 20px" }}>

        {/* ── PLAYER IDENTITY CARD ── */}
        <div style={{
          margin: "16px 0",
          background: `linear-gradient(135deg, ${myClub.color}20 0%, rgba(8,8,15,0.6) 60%)`,
          border: `1px solid ${myClub.color}40`,
          borderRadius: 18, padding: "20px", position: "relative", overflow: "hidden",
        }}>
          {/* Club glow */}
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 140, height: 140, borderRadius: "50%",
            background: myClub.color + "18", pointerEvents: "none",
          }} />

          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            {/* Club badge */}
            <div style={{
              width: 60, height: 60, borderRadius: 14, flexShrink: 0,
              background: myClub.color + "22", border: `1.5px solid ${myClub.color}55`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32,
            }}>{myClub.badge}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", letterSpacing: 1, marginBottom: 4 }}>YOUR IDENTITY</div>
              <div style={{ fontWeight: 900, fontSize: 19, color: myClub.color, lineHeight: 1.1 }}>{myClub.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 5 }}>
                {ME.role} · {myLeague.flag} {myLeague.name}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                📍 {ME.area}, {ME.lga} · {ME.state}
              </div>
            </div>
          </div>

          {/* Member number */}
          <div style={{
            marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingTop: 14, borderTop: `1px solid ${myClub.color}25`,
          }}>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>
              {myClub.name} · <span style={{ color: myClub.color, fontWeight: 700 }}>Port Harcourt Camp</span>
            </div>
            <span style={{
              fontSize: 10, padding: "3px 10px", borderRadius: 8, fontWeight: 800,
              background: "rgba(34,197,94,0.12)", color: "var(--accent)", border: "1px solid rgba(34,197,94,0.3)",
            }}>ONBOARDING</span>
          </div>
        </div>

        {/* ── PRESEASON COUNTDOWN ── */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 16, padding: "18px", marginBottom: 16, textAlign: "center",
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: 1, marginBottom: 14 }}>
            PRESEASON BEGINS IN
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {[
              { v: mounted ? cd.d : launchState.daysToPreseason, l: "DAYS" },
              { v: mounted ? cd.h : 0, l: "HRS"  },
              { v: mounted ? cd.m : 0, l: "MIN"  },
              { v: mounted ? cd.s : 0, l: "SEC"  },
            ].map(({ v, l }) => (
              <div key={l} style={{
                background: "var(--surface2)", border: "1px solid var(--border)",
                borderRadius: 10, padding: "12px 10px", minWidth: 52, textAlign: "center",
              }} suppressHydrationWarning>
                <div style={{ fontSize: 24, fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>
                  {String(v).padStart(2, "0")}
                </div>
                <div style={{ fontSize: 8, color: "var(--muted)", marginTop: 4, letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 14 }}>
            Season hasn't started yet. <strong style={{ color: "var(--text)" }}>Be ready from day one.</strong>
          </div>
        </div>

        {/* ── DISTRICT ACTIVATION ── */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 16, padding: "16px", marginBottom: 16,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>Your District</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>
                {myDistrict.name} · {myDistrict.state}
              </div>
            </div>
            <div style={{
              fontWeight: 900, fontSize: 14, padding: "4px 12px", borderRadius: 8,
              background: distPct >= 100 ? "rgba(34,197,94,0.1)" : "var(--surface2)",
              color: distPct >= 100 ? "var(--accent)" : "var(--muted)",
              border: `1px solid ${distPct >= 100 ? "rgba(34,197,94,0.3)" : "var(--border)"}`,
            }}>{distPct}%</div>
          </div>

          <div style={{ height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden", marginBottom: 16 }}>
            <div style={{
              width: `${distPct}%`, height: "100%", borderRadius: 3,
              background: distPct >= 100 ? "var(--accent)" : `linear-gradient(90deg, rgba(34,197,94,0.5), var(--accent))`,
              transition: "width 0.5s",
            }} />
          </div>

          {distChecks.map(c => (
            <RequirementRow key={c.label} {...c} />
          ))}

          {missingRoles.length > 0 && (
            <div style={{
              marginTop: 12, padding: "10px 12px", borderRadius: 10,
              background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)",
              fontSize: 12, color: "var(--muted)",
            }}>
              Still needed: {missingRoles.map(r => r.label).join(", ")}. Invite people with those roles.
            </div>
          )}
        </div>

        {/* ── INVITE / ACTIVATE ── */}
        <div style={{
          background: "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(124,58,237,0.06) 100%)",
          border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: 16, padding: "18px", marginBottom: 16,
        }}>
          <div style={{ fontSize: 22, marginBottom: 10 }}>🚀</div>
          <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 6 }}>Activate your district</div>
          <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, marginBottom: 16 }}>
            Share your invite link. The more people from your area who join, the faster your district activates — and the sooner matches begin.
          </div>
          <button onClick={handleCopy} style={{
            width: "100%", background: copied ? "rgba(34,197,94,0.15)" : "var(--accent)",
            color: copied ? "var(--accent)" : "#000", fontWeight: 800, fontSize: 14,
            padding: "14px", borderRadius: 12,
            border: copied ? "1px solid rgba(34,197,94,0.4)" : "none",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "all 0.2s",
          }}>
            <Share2 size={16} />
            {copied ? "Link copied!" : "Copy Invite Link"}
          </button>
          <div style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 10 }}>
            wardsoccer.ng/join?district=ph-main
          </div>
        </div>

        {/* ── POINTS PREVIEW ── */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 16, padding: "16px", marginBottom: 16,
        }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 14 }}>How you'll score</div>
          {[
            { pts: "+1", label: `${myClub.name} wins in real life`,        color: "var(--accent)",  icon: "🏆" },
            { pts: "+1", label: `${myClub.name} PH camp wins their match`, color: "var(--accent2)", icon: "⚽" },
            { pts: "+1", label: "Port Harcourt hits 25%+ win rate",         color: "#f59e0b",        icon: "⚡" },
          ].map(p => (
            <div key={p.label} style={{
              display: "flex", alignItems: "center", gap: 12, marginBottom: 10,
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{p.icon}</span>
              <div style={{ flex: 1, fontSize: 12, color: "var(--muted)" }}>{p.label}</div>
              <span style={{ fontWeight: 900, fontSize: 16, color: p.color, flexShrink: 0 }}>{p.pts}</span>
            </div>
          ))}
          <div style={{
            marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)",
            fontSize: 11, color: "var(--muted)",
          }}>Max 3 points per match day · Points track from preseason onwards</div>
        </div>

        {/* ── WHAT HAPPENS NEXT ── */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 16, padding: "16px", marginBottom: 16,
        }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 16 }}>What happens next</div>
          {[
            { icon: "✓", label: "You joined",               sub: "Done! You're in.",                                  done: true  },
            { icon: "2", label: "District activates",        sub: `${distPct}% · Need all roles filled`,              done: false },
            { icon: "3", label: "Preseason begins",          sub: `April 8 · Elimination matches in your ward`,       done: false },
            { icon: "4", label: "Full season starts",        sub: "League table, standings, real glory",              done: false },
          ].map((s, i, arr) => (
            <div key={s.label} style={{ display: "flex", gap: 12, marginBottom: i < arr.length - 1 ? 16 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: s.done ? "var(--accent)" : "var(--surface2)",
                  border: `1px solid ${s.done ? "var(--accent)" : "var(--border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 900, color: s.done ? "#000" : "var(--muted)",
                }}>{s.icon}</div>
                {i < arr.length - 1 && (
                  <div style={{ width: 1, flex: 1, background: "var(--border)", margin: "4px 0" }} />
                )}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 12 : 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: s.done ? "var(--accent)" : "var(--text)" }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── RECENT JOINERS ── */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 16, padding: "16px",
        }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 14 }}>Joining your district</div>
          {recentJoiners.slice(0, 4).map(j => (
            <div key={j.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 800, color: "var(--accent)",
              }}>{j.name[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{j.name}</div>
                <div style={{ fontSize: 10, color: "var(--muted)" }}>
                  {j.role} {j.club !== "—" ? `· ${j.club}` : ""}
                </div>
              </div>
              <span style={{ fontSize: 10, color: "var(--muted)", flexShrink: 0 }}>{j.time}</span>
            </div>
          ))}
          <button style={{
            width: "100%", background: "none", border: "1px solid var(--border)",
            color: "var(--muted)", fontSize: 13, fontWeight: 600, padding: "10px",
            borderRadius: 10, cursor: "pointer", marginTop: 4,
          }}>See all joiners</button>
        </div>

      </div>

      {/* ── BOTTOM NAV ── */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "var(--surface)", borderTop: "1px solid var(--border)",
        display: "flex", zIndex: 100, paddingBottom: "env(safe-area-inset-bottom)",
      }}>
        {[
          { href: "/dashboard", label: "Home",    icon: "🏠" },
          { href: "/clubs",     label: "Clubs",   icon: myClub.badge },
          { href: "/vendors",   label: "Vendors", icon: "🛍️" },
          { href: "/kit",       label: "Kit",     icon: "👕" },
          { href: "/profile",   label: "Profile", icon: "👤" },
        ].map(t => (
          <Link key={t.href} href={t.href} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", padding: "10px 0 8px",
            color: t.href === "/dashboard" ? "var(--accent)" : "var(--muted)",
            textDecoration: "none", fontSize: 10, gap: 4,
          }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            {t.label}
          </Link>
        ))}
      </nav>

    </main>
  );
}
