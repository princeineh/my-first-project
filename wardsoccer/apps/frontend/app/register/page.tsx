"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Phone, User, MapPin } from "lucide-react";
import { roles } from "@/lib/mockData";

const positions = ["GK", "CB", "LB", "RB", "CDM", "CM", "CAM", "LW", "RW", "ST", "CF"];
const districtOptions = ["Port Harcourt", "Lagos", "Abuja", "Warri", "Enugu", "Kano", "Calabar", "Benin City", "Delta", "Rivers"];

type Role = typeof roles[number];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [form, setForm] = useState({
    phone: "", otp: "", name: "", age: "", position: "ST",
    district: "Port Harcourt", role: "" as string,
    shopName: "", sellType: "sell", experience: "",
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const selectedRole = roles.find(r => r.id === form.role);

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "var(--surface2)", border: "1px solid var(--border)",
    borderRadius: 12, padding: "13px 16px", color: "var(--text)", fontSize: 15,
    outline: "none", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 12, color: "var(--muted)", marginBottom: 8, display: "block", fontWeight: 600,
  };
  const btnPrimary: React.CSSProperties = {
    width: "100%", background: "var(--accent)", color: "#000",
    fontWeight: 800, fontSize: 16, padding: "15px",
    borderRadius: 14, border: "none", cursor: "pointer", marginTop: 20,
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  };

  const stepLabels = ["Phone", "OTP", "Your Role", "Profile"];

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{
        padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
        borderBottom: "1px solid var(--border)",
      }}>
        <button onClick={() => step > 1 ? setStep((step - 1) as typeof step) : router.push("/")}
          style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", display: "flex" }}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16 }}>
            <span style={{ color: "var(--accent)" }}>Ward</span>Soccer
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>Create your account</div>
        </div>
      </header>

      {/* Step indicator */}
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {[1,2,3,4].map(s => (
            <div key={s} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: s <= step ? "var(--accent)" : "var(--border)",
              transition: "background 0.3s",
            }} />
          ))}
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 8 }}>
          Step {step} of 4 — {stepLabels[step - 1]}
        </div>
      </div>

      <div style={{ padding: "24px 16px", flex: 1 }}>

        {/* ── STEP 1: Phone ── */}
        {step === 1 && (
          <div>
            <Phone size={32} color="var(--accent)" style={{ marginBottom: 14 }} />
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>Enter your phone</h1>
            <p style={{ fontSize: 14, color: "var(--muted)", margin: "0 0 24px" }}>
              We&apos;ll send a one-time code to verify your number.
            </p>
            <label style={labelStyle}>Phone Number</label>
            <input value={form.phone} onChange={e => set("phone", e.target.value)}
              placeholder="+234 800 000 0000" type="tel" style={inputStyle} />
            <button onClick={() => setStep(2)} style={btnPrimary}>
              Send OTP <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === 2 && (
          <div>
            <div style={{ fontSize: 40, marginBottom: 14 }}>📱</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>Enter OTP</h1>
            <p style={{ fontSize: 14, color: "var(--muted)", margin: "0 0 24px" }}>
              Code sent to <strong style={{ color: "var(--text)" }}>{form.phone || "+234 800 000 0000"}</strong>
            </p>
            <label style={labelStyle}>6-digit code</label>
            <input value={form.otp} onChange={e => set("otp", e.target.value)}
              placeholder="123456" type="number" maxLength={6}
              style={{ ...inputStyle, fontSize: 24, fontWeight: 800, letterSpacing: 8, textAlign: "center" }} />
            <button onClick={() => setStep(3)} style={btnPrimary}>
              Verify <ArrowRight size={18} />
            </button>
            <button onClick={() => setStep(1)} style={{
              width: "100%", background: "none", color: "var(--muted)",
              fontWeight: 600, fontSize: 13, padding: "12px", border: "none", cursor: "pointer", marginTop: 4,
            }}>Change number</button>
          </div>
        )}

        {/* ── STEP 3: Role Selection ── */}
        {step === 3 && (
          <div>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🎭</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>What&apos;s your role?</h1>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 20px" }}>
              Choose how you&apos;ll participate in WardSoccer.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              {roles.map((r: Role) => (
                <button key={r.id} onClick={() => set("role", r.id)} style={{
                  background: form.role === r.id ? "rgba(34,197,94,0.1)" : "var(--surface)",
                  border: `1px solid ${form.role === r.id ? "rgba(34,197,94,0.4)" : "var(--border)"}`,
                  borderRadius: 12, padding: "12px 14px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 12, textAlign: "left",
                  transition: "all 0.15s",
                }}>
                  <span style={{ fontSize: 24, width: 32, textAlign: "center" }}>{r.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: form.role === r.id ? "var(--accent)" : "var(--text)" }}>
                      {r.label}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{r.description}</div>
                  </div>
                  {form.role === r.id && (
                    <span style={{ color: "var(--accent)", fontSize: 18 }}>✓</span>
                  )}
                </button>
              ))}
            </div>

            <button onClick={() => form.role && setStep(4)} style={{
              ...btnPrimary,
              opacity: form.role ? 1 : 0.4,
              cursor: form.role ? "pointer" : "not-allowed",
              marginTop: 0,
            }}>
              Continue as {selectedRole?.label || "..."} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ── STEP 4: Profile (role-aware) ── */}
        {step === 4 && (
          <div>
            <User size={32} color="var(--accent)" style={{ marginBottom: 14 }} />
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>
              {selectedRole?.icon} {selectedRole?.label} Profile
            </h1>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 24px" }}>
              Tell us about yourself
            </p>

            {/* Common fields */}
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Full Name</label>
              <input value={form.name} onChange={e => set("name", e.target.value)}
                placeholder="e.g. Chukwu Emeka" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Age</label>
              <input value={form.age} onChange={e => set("age", e.target.value)}
                placeholder="22" type="number" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>
                <MapPin size={11} style={{ marginRight: 4, verticalAlign: "middle" }} />District
              </label>
              <select value={form.district} onChange={e => set("district", e.target.value)}
                style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                {districtOptions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Player-specific */}
            {form.role === "player" && (
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Playing Position</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {positions.map(p => (
                    <button key={p} onClick={() => set("position", p)} style={{
                      padding: "8px 14px", borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: "pointer",
                      background: form.position === p ? "var(--accent)" : "var(--surface2)",
                      border: `1px solid ${form.position === p ? "var(--accent)" : "var(--border)"}`,
                      color: form.position === p ? "#000" : "var(--text)", transition: "all 0.15s",
                    }}>{p}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Vendor-specific */}
            {form.role === "vendor" && (
              <>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Shop / Business Name</label>
                  <input value={form.shopName} onChange={e => set("shopName", e.target.value)}
                    placeholder="e.g. Oga Kits PH" style={inputStyle} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Vendor Type</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["sell","lend"].map(t => (
                      <button key={t} onClick={() => set("sellType", t)} style={{
                        flex: 1, padding: "10px", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer",
                        background: form.sellType === t ? "var(--accent)" : "var(--surface2)",
                        border: `1px solid ${form.sellType === t ? "var(--accent)" : "var(--border)"}`,
                        color: form.sellType === t ? "#000" : "var(--text)",
                      }}>{t === "sell" ? "🛍️ Sell" : "🔄 Lend"}</button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Coach/Scout/Trainer experience */}
            {["coach","scout","trainer","analyst"].includes(form.role) && (
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Years of Experience</label>
                <input value={form.experience} onChange={e => set("experience", e.target.value)}
                  placeholder="e.g. 5" type="number" style={inputStyle} />
              </div>
            )}

            {/* Fee notice */}
            <div style={{
              background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: 12, padding: "12px 14px", marginBottom: 20,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent2)", marginBottom: 4 }}>Registration Fee</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>
                ₦7,499 — paid after completing the sensitization program.
                {form.role === "player" && " Kit purchase required separately to participate in matches."}
              </div>
            </div>

            <Link href="/onboarding" style={{ textDecoration: "none" }}>
              <button style={{ ...btnPrimary, marginTop: 0 }}>
                Proceed to Sensitization <ArrowRight size={18} />
              </button>
            </Link>
            <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 12 }}>
              You must complete the orientation before payment unlocks.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
