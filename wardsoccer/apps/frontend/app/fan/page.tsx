"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { launchState, joinStats, formingDistricts, recentJoiners, clubs, leagues } from "@/lib/mockData";
import { ArrowRight, Bell } from "lucide-react";

export default function FanPage() {
  const [mounted, setMounted] = useState(false);
  const [cd, setCd] = useState({ d: launchState.daysToPreseason, h: 0, m: 0, s: 0 });
  const [notifOn, setNotifOn] = useState(false);

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

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 40, background: "var(--background)" }}>

      {/* ── HEADER ── */}
      <header style={{
        padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "rgba(8,8,15,0.92)", backdropFilter: "blur(12px)", zIndex: 50,
      }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 17 }}>
            <span style={{ color: "var(--accent)" }}>Ward</span>Soccer<span style={{ color: "var(--accent)" }}>.ng</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>Fan Updates · Live tracking</div>
        </div>
        <button onClick={() => setNotifOn(n => !n)} style={{
          background: notifOn ? "rgba(34,197,94,0.1)" : "var(--surface)",
          border: `1px solid ${notifOn ? "rgba(34,197,94,0.4)" : "var(--border)"}`,
          borderRadius: 10, padding: "8px 12px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6,
          color: notifOn ? "var(--accent)" : "var(--muted)", fontSize: 12, fontWeight: 600,
        }}>
          <Bell size={14} />
          {notifOn ? "On" : "Notify me"}
        </button>
      </header>

      <div style={{ padding: "16px" }}>

        {/* ── SEASON STATUS HERO ── */}
        <div style={{
          background: "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(124,58,237,0.06) 100%)",
          border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: 18, padding: "22px", marginBottom: 16, textAlign: "center",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
            borderRadius: 20, padding: "4px 12px", marginBottom: 16,
            fontSize: 11, color: "var(--accent)", fontWeight: 700,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
            Onboarding Phase Active
          </div>

          <div style={{ fontSize: 26, fontWeight: 900, marginBottom: 8, lineHeight: 1.1 }}>
            Season hasn't started.<br />
            <span style={{ color: "var(--accent)" }}>Preseason April 8.</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20, lineHeight: 1.65 }}>
            Districts are building squads right now. Follow the progress, support your area, and be ready for when matches begin.
          </div>

          {/* Countdown */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 20 }}>
            {[
              { v: mounted ? cd.d : launchState.daysToPreseason, l: "DAYS" },
              { v: mounted ? cd.h : 0, l: "HRS"  },
              { v: mounted ? cd.m : 0, l: "MIN"  },
              { v: mounted ? cd.s : 0, l: "SEC"  },
            ].map(({ v, l }) => (
              <div key={l} style={{
                background: "rgba(0,0,0,0.3)", border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: 10, padding: "10px 8px", minWidth: 52, textAlign: "center",
              }} suppressHydrationWarning>
                <div style={{ fontSize: 22, fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>
                  {String(v).padStart(2, "0")}
                </div>
                <div style={{ fontSize: 8, color: "var(--muted)", marginTop: 4, letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </div>

          <Link href="/join" style={{ textDecoration: "none", display: "block" }}>
            <button style={{
              width: "100%", background: "var(--accent)", color: "#000",
              fontWeight: 800, fontSize: 15, padding: "14px", borderRadius: 12,
              border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              Join for Free — Be Part of It <ArrowRight size={16} />
            </button>
          </Link>
        </div>

        {/* ── GLOBAL STATS ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16,
        }}>
          {[
            { v: joinStats.totalPlayers.toLocaleString(), l: "Total Players",    color: "var(--accent)"  },
            { v: joinStats.totalAgencies,                 l: "Agencies",         color: "var(--accent2)" },
            { v: joinStats.districtsForming,              l: "Districts Forming", color: "#f59e0b"        },
            { v: joinStats.totalVendors,                  l: "Vendors",           color: "var(--muted)"  },
          ].map(s => (
            <div key={s.l} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "14px 12px", textAlign: "center",
            }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: s.color }}>{s.v}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* ── POINTS SYSTEM ── */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 16, padding: "16px", marginBottom: 16,
        }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>How points work</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14 }}>Your players earn up to 3 points per match day</div>
          {[
            { pts: "+1", icon: "🏆", color: "var(--accent)",  title: "Real club wins in actual league",  desc: "Man United beats Arsenal in the EPL → all Man United WardSoccer players earn 1 point." },
            { pts: "+1", icon: "⚽", color: "var(--accent2)", title: "Club camp wins district match",     desc: "Man United's Port Harcourt camp wins their local WardSoccer fixture → +1 point."      },
            { pts: "+1", icon: "⚡", color: "#f59e0b",        title: "District hits 25%+ win rate",      desc: "Your district wins 25%+ of all matches on a matchday → bonus point for everyone in it." },
          ].map(p => (
            <div key={p.title} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: p.color + "15", border: `1px solid ${p.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
              }}>{p.icon}</div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 3 }}>
                  <span style={{ fontWeight: 900, fontSize: 16, color: p.color }}>{p.pts}</span>
                  <span style={{ fontWeight: 700, fontSize: 12 }}>{p.title}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── DISTRICTS FORMING ── */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>DISTRICTS BUILDING NOW</div>
        {formingDistricts.map(d => {
          const total   = d.players + d.coaches + d.referees + d.scouts + d.trainers + d.media + d.firstAid;
          const needed  = 25;
          const pct     = Math.round((total / needed) * 100);
          const col     = pct >= 80 ? "var(--accent)" : pct >= 50 ? "#f59e0b" : "var(--live)";
          return (
            <div key={d.id} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "14px", marginBottom: 8,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>
                    {d.state} · <span style={{ color: d.color, fontWeight: 600 }}>{d.ownerClub}</span>
                  </div>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 7,
                  background: col + "15", color: col,
                }}>{pct}% ready</span>
              </div>
              <div style={{ height: 5, background: "var(--border)", borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: col, borderRadius: 3 }} />
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[
                  { l: "Players",  v: d.players,  r: 18 },
                  { l: "Coach",    v: d.coaches,  r: 1  },
                  { l: "Refs",     v: d.referees, r: 2  },
                  { l: "Scout",    v: d.scouts,   r: 1  },
                  { l: "Trainer",  v: d.trainers, r: 1  },
                  { l: "First Aid",v: d.firstAid, r: 1  },
                  { l: "Media",    v: d.media,    r: 1  },
                ].map(c => (
                  <span key={c.l} style={{
                    fontSize: 9, padding: "2px 7px", borderRadius: 5, fontWeight: 600,
                    background: c.v >= c.r ? "rgba(34,197,94,0.1)" : "var(--surface2)",
                    color: c.v >= c.r ? "var(--accent)" : "var(--muted)",
                    border: `1px solid ${c.v >= c.r ? "rgba(34,197,94,0.25)" : "var(--border)"}`,
                  }}>{c.l}: {c.v}/{c.r}</span>
                ))}
              </div>
              {d.recentJoiners.length > 0 && (
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 10 }}>
                  Recently joined: {d.recentJoiners.join(", ")}
                </div>
              )}
            </div>
          );
        })}

        {/* ── CLUBS BUILDING ── */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1, marginTop: 20 }}>CLUB SQUADS — BUILDING</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {clubs.slice(0, 8).map(c => {
            const lg = leagues.find(l => l.id === c.leagueId);
            return (
              <div key={c.id} style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 12, padding: "12px 14px",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: c.color + "22", border: `1px solid ${c.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                }}>{c.badge}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 1 }}>
                    {lg?.flag} {lg?.name} · {c.ownerDistrict}
                  </div>
                  <div style={{ height: 3, background: "var(--border)", borderRadius: 2, overflow: "hidden", marginTop: 6 }}>
                    <div style={{
                      width: `${(c.squadSize / (c.squadSize + c.openSlots)) * 100}%`,
                      height: "100%", background: c.color, borderRadius: 2,
                    }} />
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: c.color }}>{c.squadSize}</div>
                  <div style={{ fontSize: 9, color: "var(--muted)" }}>players</div>
                  <div style={{ fontSize: 9, color: "var(--muted)" }}>{c.openSlots} open</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── WHO JUST JOINED ── */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>WHO JUST JOINED</div>
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 14, padding: "14px", marginBottom: 20,
        }}>
          {recentJoiners.map((j, i) => (
            <div key={j.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              paddingBottom: i < recentJoiners.length - 1 ? 12 : 0,
              marginBottom: i < recentJoiners.length - 1 ? 12 : 0,
              borderBottom: i < recentJoiners.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 800, color: "var(--accent)",
              }}>{j.name[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{j.name}</div>
                <div style={{ fontSize: 10, color: "var(--muted)" }}>
                  {j.role} {j.club !== "—" ? `· ${j.club}` : ""} · {j.district}
                </div>
              </div>
              <span style={{ fontSize: 10, color: "var(--muted)", flexShrink: 0 }}>{j.time}</span>
            </div>
          ))}
        </div>

        {/* ── JOIN CTA ── */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 16, padding: "20px", textAlign: "center",
        }}>
          <div style={{ fontSize: 22, marginBottom: 10 }}>🏆</div>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}>Don't just watch — play.</div>
          <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, marginBottom: 16 }}>
            Join as a player, coach, referee, or any other role. Your district needs you to activate. It's free.
          </div>
          <Link href="/join" style={{ textDecoration: "none" }}>
            <button style={{
              width: "100%", background: "var(--accent)", color: "#000",
              fontWeight: 800, fontSize: 15, padding: "14px", borderRadius: 12,
              border: "none", cursor: "pointer",
            }}>Join WardSoccer — Free</button>
          </Link>
        </div>

      </div>
    </main>
  );
}
