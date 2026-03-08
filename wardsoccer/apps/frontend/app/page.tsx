"use client";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

const stages = [
  {
    id: 1, open: true,
    icon: "⚽", color: "#22c55e",
    stage: "Stage 1 · Open Now",
    title: "Join your district",
    desc: "Pick a league, pick a club, choose your role, enter your ward. Two minutes. Free.",
    cta: "Join Free", href: "/join",
  },
  {
    id: 2, open: false,
    icon: "🏘️", color: "#f59e0b",
    stage: "Stage 2 · Locked",
    title: "Your district activates",
    desc: "When 18 players + coach + refs + support staff join your ward, matches unlock.",
    cta: null, href: null,
  },
  {
    id: 3, open: false,
    icon: "🏆", color: "#7c3aed",
    stage: "Stage 3 · Locked",
    title: "Preseason begins",
    desc: "Active districts enter elimination rounds — no travel, played in your ward.",
    cta: null, href: null,
  },
  {
    id: 4, open: false,
    icon: "🌍", color: "#ef4444",
    stage: "Stage 4 · Locked",
    title: "Full season launches",
    desc: "League tables. Standings. Promotion. Real glory.",
    cta: null, href: null,
  },
];

const roles = [
  { icon: "🦾", label: "Player",  desc: "Play in your ward"    },
  { icon: "📋", label: "Coach",   desc: "Build your squad"     },
  { icon: "📣", label: "Media",   desc: "Cover the league"     },
  { icon: "👁️", label: "Fan",     desc: "Watch & earn points" },
];

export default function LandingPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#08080f", color: "#f1f5f9" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(8,8,15,0.95)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ fontWeight: 900, fontSize: 17, letterSpacing: "-0.3px" }}>
          <span style={{ color: "#22c55e" }}>Ward</span>Soccer<span style={{ color: "#22c55e" }}>.ng</span>
        </div>
        <Link href="/join" style={{ textDecoration: "none" }}>
          <button style={{
            background: "#22c55e", color: "#000", fontWeight: 800,
            fontSize: 13, padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            Join Free <ArrowRight size={13} />
          </button>
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        padding: "44px 20px 40px",
        background: "linear-gradient(180deg, rgba(34,197,94,0.05) 0%, transparent 80%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>

        {/* Pitch art */}
        <div style={{
          position: "relative", width: "100%", height: 188,
          marginBottom: 36, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Field boundary */}
          <div style={{
            position: "absolute", inset: 0,
            border: "1px solid rgba(34,197,94,0.08)",
            borderRadius: 14,
            background: "rgba(34,197,94,0.015)",
          }} />
          {/* Half-way line */}
          <div style={{
            position: "absolute", left: 24, right: 24,
            top: "50%", height: 1,
            background: "rgba(34,197,94,0.07)",
            transform: "translateY(-50%)",
          }} />
          {/* Vertical centre line */}
          <div style={{
            position: "absolute", top: 24, bottom: 24,
            left: "50%", width: 1,
            background: "rgba(34,197,94,0.05)",
            transform: "translateX(-50%)",
          }} />
          {/* Centre circle */}
          <div style={{
            position: "absolute",
            width: 88, height: 88, borderRadius: "50%",
            border: "1px solid rgba(34,197,94,0.1)",
          }} />
          {/* Top penalty arc */}
          <div style={{
            position: "absolute", top: 0, left: "50%",
            transform: "translateX(-50%)",
            width: 56, height: 28,
            borderBottomLeftRadius: 56, borderBottomRightRadius: 56,
            border: "1px solid rgba(34,197,94,0.06)", borderTop: "none",
          }} />
          {/* Bottom penalty arc */}
          <div style={{
            position: "absolute", bottom: 0, left: "50%",
            transform: "translateX(-50%)",
            width: 56, height: 28,
            borderTopLeftRadius: 56, borderTopRightRadius: 56,
            border: "1px solid rgba(34,197,94,0.06)", borderBottom: "none",
          }} />
          {/* The ball */}
          <div style={{
            position: "relative", zIndex: 2,
            width: 68, height: 68, borderRadius: "50%",
            background: "radial-gradient(circle at 33% 33%, rgba(34,197,94,0.22), rgba(34,197,94,0.03))",
            border: "1px solid rgba(34,197,94,0.18)",
            boxShadow: "0 0 48px rgba(34,197,94,0.2), 0 0 100px rgba(34,197,94,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32,
          }}>
            ⚽
          </div>
        </div>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)",
          borderRadius: 20, padding: "5px 14px", marginBottom: 20,
          fontSize: 11, color: "#22c55e", fontWeight: 700, letterSpacing: 0.5,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
            display: "inline-block",
            boxShadow: "0 0 0 2px rgba(34,197,94,0.3)",
          }} />
          We just started · Be the first in your ward
        </div>

        {/* Tagline */}
        <h1 style={{
          fontSize: 40, fontWeight: 900, margin: "0 0 16px",
          lineHeight: 1.06, letterSpacing: "-0.8px",
        }}>
          Your ward.<br />
          <span style={{ color: "#22c55e" }}>Your league.</span>
        </h1>

        <p style={{
          fontSize: 15, color: "#64748b",
          margin: "0 0 32px", maxWidth: 340, lineHeight: 1.7,
        }}>
          Nigeria's first grassroots league built around <strong style={{ color: "#94a3b8" }}>where you already are.</strong> No travel. Play in your own ward and represent a global club.
        </p>

        <Link href="/join" style={{ textDecoration: "none", display: "block", marginBottom: 10 }}>
          <button style={{
            width: "100%", background: "#22c55e", color: "#000",
            fontWeight: 900, fontSize: 17, padding: "17px",
            borderRadius: 14, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            Join for Free <ArrowRight size={18} />
          </button>
        </Link>
        <p style={{ textAlign: "center", fontSize: 11, color: "#334155", margin: 0 }}>
          Free to join · No credit card · No travel
        </p>
      </section>

      {/* ── STAGE UNLOCK ── */}
      <section style={{ padding: "40px 20px 28px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#334155", letterSpacing: 1.5, marginBottom: 8 }}>
          HOW IT GROWS
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 900, margin: "0 0 8px", lineHeight: 1.2 }}>
          Every stage unlocks<br />as we grow together.
        </h2>
        <p style={{ fontSize: 13, color: "#334155", margin: "0 0 30px", lineHeight: 1.65 }}>
          We don't fake it. No invented numbers. Stage 1 is open right now — everything else unlocks when your community builds it.
        </p>

        {stages.map((s, i) => (
          <div key={s.id} style={{ display: "flex", gap: 0, marginBottom: 0 }}>
            {/* Icon + connector */}
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", marginRight: 14,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 11, flexShrink: 0,
                background: s.open ? s.color + "14" : "rgba(255,255,255,0.025)",
                border: `1.5px solid ${s.open ? s.color + "50" : "rgba(255,255,255,0.06)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 17,
              }}>
                {s.open ? s.icon : <Lock size={13} color="#1e293b" strokeWidth={2.5} />}
              </div>
              {i < stages.length - 1 && (
                <div style={{
                  width: 1, flex: 1, minHeight: 24,
                  background: s.open ? s.color + "25" : "rgba(255,255,255,0.04)",
                  margin: "5px 0",
                }} />
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, paddingBottom: 24 }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: 1.2, marginBottom: 3,
                color: s.open ? s.color : "#1e293b",
              }}>
                {s.stage.toUpperCase()}
              </div>
              <div style={{
                fontWeight: 800, fontSize: 15, marginBottom: 5,
                color: s.open ? "#f1f5f9" : "#1e293b",
              }}>
                {s.title}
              </div>
              <div style={{
                fontSize: 12, lineHeight: 1.65, marginBottom: s.cta ? 14 : 0,
                color: s.open ? "#475569" : "#1e293b",
              }}>
                {s.desc}
              </div>
              {s.cta && s.href && (
                <Link href={s.href} style={{ textDecoration: "none" }}>
                  <button style={{
                    background: s.color, color: "#000", fontWeight: 800,
                    fontSize: 13, padding: "10px 20px", borderRadius: 10,
                    border: "none", cursor: "pointer",
                    display: "inline-flex", alignItems: "center", gap: 6,
                  }}>
                    {s.cta} <ArrowRight size={13} />
                  </button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* ── POINTS ── */}
      <section style={{ padding: "4px 20px 36px" }}>
        <div style={{
          background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.1)",
          borderRadius: 16, padding: "22px 18px",
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#334155", letterSpacing: 1.5, marginBottom: 16 }}>
            HOW YOU EARN POINTS
          </div>
          {[
            { icon: "🏆", text: "Your real club wins in the actual league",           pts: "+1" },
            { icon: "⚽", text: "Your club's camp wins the district match",           pts: "+1" },
            { icon: "⚡", text: "Your district hits 25%+ win rate on matchday",      pts: "+1" },
          ].map((p, i, arr) => (
            <div key={p.text} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 0",
              borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              <span style={{ fontSize: 19, flexShrink: 0 }}>{p.icon}</span>
              <span style={{ flex: 1, fontSize: 12, color: "#475569", lineHeight: 1.55 }}>{p.text}</span>
              <span style={{ fontWeight: 900, fontSize: 18, color: "#22c55e", flexShrink: 0 }}>{p.pts}</span>
            </div>
          ))}
          <div style={{ fontSize: 11, color: "#1e293b", marginTop: 12, textAlign: "center" }}>
            Max 3 points per matchday · Unlocks at Stage 3
          </div>
        </div>
      </section>

      {/* ── WHO CAN JOIN ── */}
      <section style={{ padding: "4px 20px 36px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#334155", letterSpacing: 1.5, marginBottom: 18 }}>
          WHO'S THIS FOR
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {roles.map(r => (
            <div key={r.label} style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14, padding: "18px 14px",
            }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{r.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{r.label}</div>
              <div style={{ fontSize: 11, color: "#334155" }}>{r.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14 }}>
          <Link href="/join" style={{ fontSize: 12, color: "#334155", textDecoration: "none" }}>
            Also: Referee · Scout · Trainer · Vendor · Club Official →
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        padding: "36px 20px 72px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-block",
          fontSize: 10, fontWeight: 700, color: "#22c55e", letterSpacing: 1.5,
          background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)",
          borderRadius: 20, padding: "4px 12px", marginBottom: 16,
        }}>
          STAGE 1 IS OPEN
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.12, margin: "0 0 14px" }}>
          Be first<br />in your ward.
        </h2>
        <p style={{ fontSize: 14, color: "#334155", margin: "0 0 30px", lineHeight: 1.65 }}>
          The earlier you join, the more you shape how your district builds. This is your league to build.
        </p>
        <Link href="/join" style={{ textDecoration: "none", display: "block", marginBottom: 16 }}>
          <button style={{
            width: "100%", background: "#22c55e", color: "#000",
            fontWeight: 900, fontSize: 16, padding: "17px",
            borderRadius: 14, border: "none", cursor: "pointer",
          }}>
            Join WardSoccer — It's Free
          </button>
        </Link>
        <Link href="/fan" style={{ fontSize: 13, color: "#1e293b", textDecoration: "none" }}>
          Just a fan? Follow for updates →
        </Link>
      </section>

    </main>
  );
}
