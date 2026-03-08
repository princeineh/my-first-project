"use client";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

const stages = [
  {
    id: 1,
    open: true,
    icon: "⚽",
    color: "#22c55e",
    label: "Stage 1",
    status: "Open Now",
    title: "Join your ward",
    desc: "Pick your role. Pick your club. Enter your ward. Two minutes. Free.",
    cta: "Join Free",
    href: "/join",
  },
  {
    id: 2,
    open: false,
    icon: "🏘️",
    color: "#f59e0b",
    label: "Stage 2",
    status: "Locked",
    title: "Your ward activates",
    desc: "When enough players, a coach, refs and support staff join — matches unlock.",
    cta: null,
    href: null,
  },
  {
    id: 3,
    open: false,
    icon: "🏆",
    color: "#7c3aed",
    label: "Stage 3",
    status: "Locked",
    title: "Preseason kicks off",
    desc: "Active wards enter elimination rounds. No travel — played right where you are.",
    cta: null,
    href: null,
  },
  {
    id: 4,
    open: false,
    icon: "🌍",
    color: "#ef4444",
    label: "Stage 4",
    status: "Locked",
    title: "The full season",
    desc: "League tables. Standings. Promotion. Real glory.",
    cta: null,
    href: null,
  },
];

const roles = [
  { icon: "🦾", label: "Player",   desc: "Play in your ward"   },
  { icon: "📋", label: "Coach",    desc: "Build your squad"    },
  { icon: "📣", label: "Media",    desc: "Cover the league"    },
  { icon: "👁️", label: "Fan",      desc: "Follow & support"   },
];

/* ─── pitch SVG (top-down view) ─────────────────────────────────────────── */
function PitchArt() {
  const G = "rgba(34,197,94,";
  return (
    <svg
      viewBox="0 0 320 200"
      width="100%"
      style={{ display: "block", maxWidth: 360, margin: "0 auto" }}
      aria-hidden
    >
      {/* pitch surface */}
      <rect x="4" y="4" width="312" height="192" rx="10"
        fill={G + "0.03)"} stroke={G + "0.12)"} strokeWidth="1.2" />

      {/* half-way line */}
      <line x1="160" y1="4" x2="160" y2="196"
        stroke={G + "0.08)"} strokeWidth="1" />

      {/* centre circle */}
      <circle cx="160" cy="100" r="36"
        fill="none" stroke={G + "0.1)"} strokeWidth="1" />
      <circle cx="160" cy="100" r="2.5"
        fill={G + "0.25)"} />

      {/* left penalty box */}
      <rect x="4" y="62" width="52" height="76" rx="3"
        fill="none" stroke={G + "0.08)"} strokeWidth="1" />
      {/* left goal */}
      <rect x="4" y="84" width="12" height="32" rx="2"
        fill={G + "0.06)"} stroke={G + "0.14)"} strokeWidth="1" />

      {/* right penalty box */}
      <rect x="264" y="62" width="52" height="76" rx="3"
        fill="none" stroke={G + "0.08)"} strokeWidth="1" />
      {/* right goal */}
      <rect x="304" y="84" width="12" height="32" rx="2"
        fill={G + "0.06)"} stroke={G + "0.14)"} strokeWidth="1" />

      {/* the ball — glowing */}
      <circle cx="160" cy="100" r="16"
        fill={G + "0.08)"} stroke={G + "0.3)"} strokeWidth="1.5" />
      <text x="160" y="107" textAnchor="middle" fontSize="18">⚽</text>

      {/* glow under ball */}
      <circle cx="160" cy="100" r="28"
        fill="none" stroke={G + "0.07)"} strokeWidth="14" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#08080f", color: "#f1f5f9" }}>

      {/* ── NAV ───────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(8,8,15,0.96)", backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: "-0.3px" }}>
          <span style={{ color: "#22c55e" }}>Ward</span>Soccer
          <span style={{ color: "#22c55e" }}>.ng</span>
        </span>
        <Link href="/join" style={{ textDecoration: "none" }}>
          <button style={{
            background: "#22c55e", color: "#000", fontWeight: 800,
            fontSize: 13, padding: "8px 18px", borderRadius: 10,
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            Join Free <ArrowRight size={13} />
          </button>
        </Link>
      </nav>

      {/* ── HERO ──────────────────────────────────────── */}
      <section style={{
        padding: "40px 20px 36px",
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 70%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>

        {/* Pitch illustration */}
        <div style={{ marginBottom: 32 }}>
          <PitchArt />
        </div>

        {/* "Just started" badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: 20, padding: "5px 14px", marginBottom: 22,
          fontSize: 11, color: "#22c55e", fontWeight: 700, letterSpacing: 0.4,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
            display: "inline-block", boxShadow: "0 0 0 3px rgba(34,197,94,0.25)",
          }} />
          We just started · Be first in your ward
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 42, fontWeight: 900, margin: "0 0 16px",
          lineHeight: 1.05, letterSpacing: "-1px",
        }}>
          Your ward.<br />
          <span style={{ color: "#22c55e" }}>Your league.</span>
        </h1>

        <p style={{
          fontSize: 15, color: "#64748b",
          margin: "0 0 32px", maxWidth: 330, lineHeight: 1.72,
        }}>
          Nigeria's first grassroots football league built around{" "}
          <strong style={{ color: "#94a3b8" }}>where you already live.</strong>{" "}
          No travel. No numbers made up. Just real football in your own ward.
        </p>

        <Link href="/join" style={{ textDecoration: "none", display: "block", marginBottom: 10 }}>
          <button style={{
            width: "100%", background: "#22c55e", color: "#000",
            fontWeight: 900, fontSize: 17, padding: "17px",
            borderRadius: 14, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            boxShadow: "0 0 32px rgba(34,197,94,0.25)",
          }}>
            Join for Free <ArrowRight size={18} />
          </button>
        </Link>
        <p style={{ textAlign: "center", fontSize: 11, color: "#334155", margin: 0 }}>
          Free to join · No credit card · No travel
        </p>
      </section>

      {/* ── HOW IT GROWS ──────────────────────────────── */}
      <section style={{ padding: "44px 20px 32px" }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: "#334155",
          letterSpacing: 1.6, marginBottom: 10,
        }}>
          HOW IT GROWS
        </div>
        <h2 style={{
          fontSize: 26, fontWeight: 900, margin: "0 0 10px", lineHeight: 1.2,
        }}>
          Every stage unlocks<br />as we grow together.
        </h2>
        <p style={{ fontSize: 13, color: "#475569", margin: "0 0 34px", lineHeight: 1.7 }}>
          We don't fake it. No made-up numbers. Stage&nbsp;1 is open right now —
          everything else unlocks when your community builds it.
        </p>

        {stages.map((s, i) => (
          <div key={s.id} style={{ display: "flex", marginBottom: 0 }}>

            {/* Icon column + connector line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 16 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 13, flexShrink: 0,
                background: s.open ? s.color + "18" : "rgba(255,255,255,0.02)",
                border: `1.5px solid ${s.open ? s.color + "55" : "rgba(255,255,255,0.06)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
                boxShadow: s.open ? `0 0 18px ${s.color}22` : "none",
              }}>
                {s.open ? s.icon : <Lock size={14} color="#1e293b" strokeWidth={2.5} />}
              </div>
              {i < stages.length - 1 && (
                <div style={{
                  width: 1, flex: 1, minHeight: 20,
                  background: s.open
                    ? `linear-gradient(to bottom, ${s.color}30, transparent)`
                    : "rgba(255,255,255,0.04)",
                  margin: "6px 0",
                }} />
              )}
            </div>

            {/* Text */}
            <div style={{ flex: 1, paddingBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: 1.3,
                  color: s.open ? s.color : "#1e293b",
                }}>
                  {s.label.toUpperCase()}
                </span>
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: 0.8,
                  background: s.open ? s.color + "18" : "rgba(255,255,255,0.04)",
                  color: s.open ? s.color : "#1e293b",
                  borderRadius: 6, padding: "2px 7px",
                }}>
                  {s.status.toUpperCase()}
                </span>
              </div>
              <div style={{
                fontWeight: 800, fontSize: 15, marginBottom: 6,
                color: s.open ? "#f1f5f9" : "#1e293b",
              }}>
                {s.title}
              </div>
              <div style={{
                fontSize: 12, lineHeight: 1.68, marginBottom: s.cta ? 16 : 0,
                color: s.open ? "#475569" : "#1e293b",
              }}>
                {s.desc}
              </div>
              {s.cta && s.href && (
                <Link href={s.href} style={{ textDecoration: "none" }}>
                  <button style={{
                    background: s.color, color: "#000", fontWeight: 800,
                    fontSize: 13, padding: "10px 22px", borderRadius: 11,
                    border: "none", cursor: "pointer",
                    display: "inline-flex", alignItems: "center", gap: 6,
                    boxShadow: `0 0 20px ${s.color}30`,
                  }}>
                    {s.cta} <ArrowRight size={13} />
                  </button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* ── WHO'S THIS FOR ────────────────────────────── */}
      <section style={{ padding: "4px 20px 40px" }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: "#334155",
          letterSpacing: 1.6, marginBottom: 18,
        }}>
          WHO'S THIS FOR
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {roles.map(r => (
            <div key={r.label} style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16, padding: "20px 14px",
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{r.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 5 }}>{r.label}</div>
              <div style={{ fontSize: 11, color: "#475569" }}>{r.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14 }}>
          <Link href="/join" style={{ fontSize: 12, color: "#334155", textDecoration: "none" }}>
            Also: Referee · Scout · Trainer · Vendor · Club Official →
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────── */}
      <section style={{
        margin: "0 20px 72px",
        background: "rgba(34,197,94,0.04)",
        border: "1px solid rgba(34,197,94,0.1)",
        borderRadius: 20, padding: "32px 20px",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-block",
          fontSize: 10, fontWeight: 700, color: "#22c55e", letterSpacing: 1.5,
          background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: 20, padding: "4px 14px", marginBottom: 18,
        }}>
          STAGE 1 IS OPEN
        </div>
        <h2 style={{ fontSize: 30, fontWeight: 900, lineHeight: 1.12, margin: "0 0 12px" }}>
          Be first<br />in your ward.
        </h2>
        <p style={{ fontSize: 13, color: "#475569", margin: "0 0 28px", lineHeight: 1.7 }}>
          The earlier you join, the more you shape how your district builds.
          This is your league to build.
        </p>
        <Link href="/join" style={{ textDecoration: "none", display: "block", marginBottom: 14 }}>
          <button style={{
            width: "100%", background: "#22c55e", color: "#000",
            fontWeight: 900, fontSize: 16, padding: "17px",
            borderRadius: 14, border: "none", cursor: "pointer",
            boxShadow: "0 0 28px rgba(34,197,94,0.3)",
          }}>
            Join WardSoccer — It's Free
          </button>
        </Link>
        <Link href="/fan" style={{ fontSize: 13, color: "#334155", textDecoration: "none" }}>
          Just a fan? Follow for updates →
        </Link>
      </section>

    </main>
  );
}
