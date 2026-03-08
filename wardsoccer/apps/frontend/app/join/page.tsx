"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { roles, clubs, leagues, nigeriaStates, lgasByState, wardsByLga } from "@/lib/mockData";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const stepTitles: Record<Step, string> = {
  1: "Phone Verification",
  2: "Confirm OTP",
  3: "Your Role",
  4: "Choose Your Club",
  5: "Your Location",
  6: "Welcome",
};

const inputStyle: React.CSSProperties = {
  width: "100%", background: "var(--surface2)", border: "1px solid var(--border)",
  borderRadius: 12, padding: "13px 16px", color: "var(--text)", fontSize: 15,
  outline: "none", boxSizing: "border-box",
};
const selectStyle: React.CSSProperties = {
  ...{
    width: "100%", background: "var(--surface2)", border: "1px solid var(--border)",
    borderRadius: 12, padding: "13px 16px", color: "var(--text)", fontSize: 15,
    outline: "none", boxSizing: "border-box", appearance: "none" as const, cursor: "pointer",
  },
};
const labelStyle: React.CSSProperties = {
  fontSize: 12, color: "var(--muted)", marginBottom: 8, display: "block", fontWeight: 600,
};
const btnPrimary: React.CSSProperties = {
  width: "100%", background: "var(--accent)", color: "#000", fontWeight: 800,
  fontSize: 16, padding: "15px", borderRadius: 14, border: "none", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 20,
};

export default function JoinPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    phone: "", otp: "",
    role: "",
    leagueId: "",
    clubId: "",
    country: "Nigeria",
    state: "",
    lga: "",
    area: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const selectedRole   = roles.find(r => r.id === form.role);
  const selectedLeague = leagues.find(l => l.id === form.leagueId);
  const selectedClub   = clubs.find(c => c.id === form.clubId);
  const lgaOptions     = form.state ? (lgasByState[form.state] ?? []) : [];
  const wardOptions    = form.lga   ? (wardsByLga[form.lga]   ?? []) : [];
  const leagueClubs    = form.leagueId ? clubs.filter(c => c.leagueId === form.leagueId) : [];

  const canNext: Record<Step, boolean> = {
    1: form.phone.length >= 10,
    2: form.otp.length >= 4,
    3: form.role !== "",
    4: (form.leagueId !== "" && form.clubId !== "") || !["player","coach","scout","trainer","firstaid","referee"].includes(form.role),
    5: form.state !== "" && form.lga !== "" && form.area !== "",
  };

  const next = () => {
    if (step === 6) { router.push("/dashboard"); return; }
    setStep((step + 1) as Step);
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--background)" }}>

      {/* Header */}
      <header style={{
        padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
        borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <button onClick={() => step > 1 ? setStep((step - 1) as Step) : router.push("/")}
          style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", display: "flex" }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>
            <span style={{ color: "var(--accent)" }}>Ward</span>Soccer
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>{stepTitles[step]}</div>
        </div>
        <span style={{ fontSize: 11, color: "var(--muted)" }}>{step < 6 ? `${step}/5` : "Done!"}</span>
      </header>

      {/* Progress — hidden on celebration step */}
      {step < 6 && (
        <div style={{ padding: "12px 16px 0" }}>
          <div style={{ display: "flex", gap: 5 }}>
            {([1,2,3,4,5] as (1|2|3|4|5)[]).map(s => (
              <div key={s} style={{
                flex: 1, height: 3, borderRadius: 2,
                background: s <= step ? "var(--accent)" : "var(--border)",
                transition: "background 0.3s",
              }} />
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: "24px 16px", flex: 1 }}>

        {/* ── STEP 1: Phone ── */}
        {step === 1 && (
          <div>
            <div style={{ fontSize: 40, marginBottom: 14 }}>📲</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>Enter your phone number</h1>
            <p style={{ fontSize: 14, color: "var(--muted)", margin: "0 0 24px" }}>
              We&apos;ll send you a one-time code. No password needed.
            </p>
            <label style={labelStyle}>Phone Number</label>
            <input value={form.phone} onChange={e => set("phone", e.target.value)}
              placeholder="+234 800 000 0000" type="tel" style={inputStyle} />
            <button onClick={next} disabled={!canNext[1]} style={{
              ...btnPrimary, opacity: canNext[1] ? 1 : 0.4, cursor: canNext[1] ? "pointer" : "not-allowed",
            }}>
              Send OTP <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === 2 && (
          <div>
            <div style={{ fontSize: 40, marginBottom: 14 }}>🔐</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>Enter OTP</h1>
            <p style={{ fontSize: 14, color: "var(--muted)", margin: "0 0 24px" }}>
              Code sent to <strong style={{ color: "var(--text)" }}>{form.phone}</strong>
            </p>
            <input value={form.otp} onChange={e => set("otp", e.target.value)}
              placeholder="123456" type="number" maxLength={6}
              style={{ ...inputStyle, fontSize: 28, fontWeight: 900, letterSpacing: 10, textAlign: "center" }} />
            <button onClick={next} disabled={!canNext[2]} style={{
              ...btnPrimary, opacity: canNext[2] ? 1 : 0.4, cursor: canNext[2] ? "pointer" : "not-allowed",
            }}>
              Verify <ArrowRight size={18} />
            </button>
            <button onClick={() => setStep(1)} style={{
              width: "100%", background: "none", color: "var(--muted)",
              fontWeight: 600, fontSize: 13, padding: "10px", border: "none", cursor: "pointer", marginTop: 6,
            }}>Change number</button>
          </div>
        )}

        {/* ── STEP 3: Role ── */}
        {step === 3 && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>What&apos;s your role?</h1>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 20px" }}>
              Choose how you&apos;ll be part of WardSoccer. You can only pick one.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 20 }}>
              {roles.map(r => (
                <button key={r.id} onClick={() => set("role", r.id)} style={{
                  background: form.role === r.id ? "rgba(34,197,94,0.1)" : "var(--surface)",
                  border: `1px solid ${form.role === r.id ? "rgba(34,197,94,0.4)" : "var(--border)"}`,
                  borderRadius: 12, padding: "11px 14px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 12, textAlign: "left", transition: "all 0.15s",
                }}>
                  <span style={{ fontSize: 22, width: 30, textAlign: "center" }}>{r.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: form.role === r.id ? "var(--accent)" : "var(--text)" }}>
                      {r.label}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{r.description}</div>
                  </div>
                  {form.role === r.id && <span style={{ color: "var(--accent)", fontSize: 18 }}>✓</span>}
                </button>
              ))}
            </div>
            <button onClick={next} disabled={!canNext[3]} style={{
              ...btnPrimary, marginTop: 0, opacity: canNext[3] ? 1 : 0.4, cursor: canNext[3] ? "pointer" : "not-allowed",
            }}>
              Continue as {selectedRole?.label ?? "..."} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── STEP 4: League → Club ── */}
        {step === 4 && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>Choose your club</h1>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 16px" }}>
              First pick a league, then choose which club you want to represent.
            </p>

            {/* Non-player notice */}
            {!["player","coach","scout","trainer","firstaid","referee"].includes(form.role) && (
              <div style={{
                background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "var(--muted)",
              }}>
                As a <strong style={{ color: "var(--text)" }}>{selectedRole?.label}</strong>, club selection is optional — you serve all districts in your area.
              </div>
            )}

            {/* League selection */}
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: 0.8, marginBottom: 8 }}>SELECT LEAGUE</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
              {leagues.map(lg => (
                <button key={lg.id} onClick={() => { set("leagueId", lg.id); set("clubId", ""); }} style={{
                  background: form.leagueId === lg.id ? `${lg.color}18` : "var(--surface)",
                  border: `2px solid ${form.leagueId === lg.id ? lg.color : "var(--border)"}`,
                  borderRadius: 10, padding: "10px 14px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 12, textAlign: "left", transition: "all 0.15s",
                }}>
                  <span style={{ fontSize: 20 }}>{lg.flag}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: form.leagueId === lg.id ? lg.color : "var(--text)" }}>{lg.name}</div>
                    <div style={{ fontSize: 10, color: "var(--muted)" }}>{lg.country} · {clubs.filter(c => c.leagueId === lg.id).length} clubs available</div>
                  </div>
                  {form.leagueId === lg.id && <span style={{ color: "var(--accent)", fontSize: 16 }}>✓</span>}
                </button>
              ))}
            </div>

            {/* Club selection — only shown after league is picked */}
            {form.leagueId && (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: 0.8, marginBottom: 8 }}>
                  CLUBS IN {selectedLeague?.name.toUpperCase()}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                  {leagueClubs.map(c => (
                    <button key={c.id} onClick={() => set("clubId", c.id)} style={{
                      background: form.clubId === c.id ? "rgba(34,197,94,0.08)" : "var(--surface)",
                      border: `2px solid ${form.clubId === c.id ? c.color : "var(--border)"}`,
                      borderRadius: 12, padding: "12px 14px", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 14, textAlign: "left", transition: "all 0.15s",
                    }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                        background: c.color + "22", border: `1px solid ${c.color}44`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                      }}>{c.badge}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 15 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                          District: {c.ownerDistrict} · {c.squadSize} joined · {c.openSlots} slots open
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                          <div style={{ flex: 1, height: 3, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                            <div style={{
                              width: `${(c.squadSize / (c.squadSize + c.openSlots)) * 100}%`,
                              height: "100%", background: c.color, borderRadius: 2,
                            }} />
                          </div>
                          <span style={{ fontSize: 9, color: "var(--muted)" }}>{c.squadSize}/{c.squadSize + c.openSlots}</span>
                        </div>
                      </div>
                      {form.clubId === c.id && <span style={{ color: "var(--accent)", fontSize: 20 }}>✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button onClick={next} disabled={!canNext[4]} style={{
              ...btnPrimary, marginTop: 0, opacity: canNext[4] ? 1 : 0.4, cursor: canNext[4] ? "pointer" : "not-allowed",
            }}>
              {selectedClub ? `I represent ${selectedClub.name}` : form.leagueId ? "Pick a club above" : "Select a league first"} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── STEP 5: Location ── */}
        {step === 5 && (
          <div>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📍</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>Your Location</h1>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 24px", lineHeight: 1.6 }}>
              This determines your district. You play where you live — no travel needed. Be honest — it affects which community you represent.
            </p>

            {/* Country */}
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Country</label>
              <select value={form.country} onChange={e => set("country", e.target.value)} style={selectStyle}>
                <option value="Nigeria">Nigeria 🇳🇬</option>
              </select>
            </div>

            {/* State */}
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>State</label>
              <select
                value={form.state}
                onChange={e => { set("state", e.target.value); set("lga", ""); set("area", ""); }}
                style={{ ...selectStyle, color: form.state ? "var(--text)" : "var(--muted)" }}
              >
                <option value="" disabled>Select your state</option>
                {nigeriaStates.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* LGA */}
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Local Government Area (LGA)</label>
              {lgaOptions.length > 0 ? (
                <select
                  value={form.lga}
                  onChange={e => { set("lga", e.target.value); set("area", ""); }}
                  style={{ ...selectStyle, color: form.lga ? "var(--text)" : "var(--muted)" }}
                >
                  <option value="" disabled>Select your LGA</option>
                  {lgaOptions.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              ) : (
                <input
                  value={form.lga} onChange={e => set("lga", e.target.value)}
                  placeholder={form.state ? "Type your LGA" : "Select a state first"}
                  disabled={!form.state}
                  style={{ ...inputStyle, opacity: form.state ? 1 : 0.5 }}
                />
              )}
            </div>

            {/* Area / Ward */}
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Area / Ward / Neighbourhood</label>
              {wardOptions.length > 0 ? (
                <select
                  value={form.area}
                  onChange={e => set("area", e.target.value)}
                  disabled={!form.lga}
                  style={{ ...selectStyle, color: form.area ? "var(--text)" : "var(--muted)", opacity: form.lga ? 1 : 0.5 }}
                >
                  <option value="" disabled>Select your area / ward</option>
                  {wardOptions.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              ) : (
                <input
                  value={form.area} onChange={e => set("area", e.target.value)}
                  placeholder={form.lga ? "e.g. GRA Phase 2, Diobu" : "Select LGA first"}
                  disabled={!form.lga}
                  style={{ ...inputStyle, opacity: form.lga ? 1 : 0.5 }}
                />
              )}
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>
                Your area determines your exact district and stadium location.
              </div>
            </div>

            {/* Selected summary */}
            {form.state && form.lga && form.area && (
              <div style={{
                background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: 12, padding: "12px 14px", marginBottom: 16,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", marginBottom: 6 }}>Your District</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>
                  {form.area}, {form.lga}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{form.state}, {form.country}</div>
                {selectedClub && (
                  <div style={{ fontSize: 12, color: selectedClub.color, marginTop: 6, fontWeight: 600 }}>
                    Representing {selectedClub.badge} {selectedClub.name}
                  </div>
                )}
              </div>
            )}

            <button onClick={next} disabled={!canNext[5]} style={{
              ...btnPrimary, marginTop: 0, opacity: canNext[5] ? 1 : 0.4, cursor: canNext[5] ? "pointer" : "not-allowed",
            }}>
              Enter Dashboard <ArrowRight size={18} />
            </button>
            <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 12 }}>
              Free to join. ₦7,499 registration fee + kit required before preseason.
            </p>
          </div>
        )}

        {/* ── STEP 6: CELEBRATION ── */}
        {step === 6 && (
          <div style={{ textAlign: "center", paddingTop: 20 }}>
            {/* Club glow backdrop */}
            <div style={{
              width: 120, height: 120, borderRadius: "50%", margin: "0 auto 24px",
              background: selectedClub ? selectedClub.color + "20" : "rgba(34,197,94,0.1)",
              border: `2px solid ${selectedClub ? selectedClub.color + "40" : "rgba(34,197,94,0.3)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 64, boxShadow: selectedClub ? `0 0 60px ${selectedClub.color}30` : "none",
            }}>
              {selectedClub?.badge ?? "⚽"}
            </div>

            <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
              YOU&apos;RE OFFICIALLY IN
            </div>
            <h1 style={{
              fontSize: 28, fontWeight: 900, margin: "0 0 8px", lineHeight: 1.1,
              color: selectedClub?.color ?? "var(--accent)",
            }}>
              {selectedClub?.name ?? "WardSoccer"}
            </h1>
            <div style={{ fontSize: 15, color: "var(--muted)", marginBottom: 6 }}>
              {selectedRole?.label ?? "Member"} · {selectedLeague?.flag} {selectedLeague?.name}
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 32 }}>
              📍 {form.area || form.lga}, {form.lga} · {form.state}
            </div>

            {/* Identity card */}
            <div style={{
              background: selectedClub ? selectedClub.color + "12" : "rgba(34,197,94,0.08)",
              border: `1px solid ${selectedClub ? selectedClub.color + "35" : "rgba(34,197,94,0.25)"}`,
              borderRadius: 16, padding: "16px", marginBottom: 28, textAlign: "left",
            }}>
              {[
                { label: "Club",     value: selectedClub?.name ?? "—"                                       },
                { label: "League",   value: `${selectedLeague?.flag ?? ""} ${selectedLeague?.name ?? "—"}`  },
                { label: "Role",     value: selectedRole?.label ?? "—"                                       },
                { label: "District", value: `${form.area || form.lga}, ${form.lga}`                         },
                { label: "State",    value: form.state                                                        },
              ].map(f => (
                <div key={f.label} style={{
                  display: "flex", justifyContent: "space-between",
                  paddingBottom: 8, marginBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>{f.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{f.value}</span>
                </div>
              ))}
              <div style={{
                marginTop: 4, display: "flex", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>Status</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)" }}>✓ Registered · Onboarding</span>
              </div>
            </div>

            <div style={{
              background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: 12, padding: "12px 14px", marginBottom: 24, fontSize: 13, color: "var(--muted)", lineHeight: 1.6,
            }}>
              Season hasn't started. <strong style={{ color: "var(--text)" }}>Preseason begins April 8.</strong> Invite friends from your area to activate {form.lga} before time runs out.
            </div>

            <button onClick={next} style={{
              ...btnPrimary, marginTop: 0,
              background: selectedClub?.color ?? "var(--accent)",
              color: "#fff",
            }}>
              Enter My Dashboard <ArrowRight size={18} />
            </button>
            <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 14, lineHeight: 1.6 }}>
              Your district needs players, a coach, referees, a scout, trainer, first aid & media rep to activate.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
