"use client";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, CheckCircle, Shield } from "lucide-react";
import { vendorList } from "@/lib/mockData";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
type PayMode = "full" | "instalment";

export default function KitPage() {
  const [selected, setSelected] = useState("M");
  const [payMode, setPayMode]   = useState<PayMode>("full");
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [step, setStep]         = useState<"select" | "vendor" | "pay" | "done">("select");

  const chosenVendor = vendorList.find(v => v.id === vendorId);
  const kitPrice     = chosenVendor?.products.find(p => p.category === "kit")?.price ?? 8500;
  const delivery     = 500;
  const total        = kitPrice + delivery;
  const instalment1  = Math.ceil(total / 3);

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "16px", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: 10,
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <ShoppingBag size={18} color="var(--accent)" />
        <span style={{ fontWeight: 800, fontSize: 16 }}>Official Kit</span>
        {step !== "select" && (
          <button onClick={() => setStep("select")} style={{
            marginLeft: "auto", background: "none", border: "none",
            color: "var(--muted)", fontSize: 13, cursor: "pointer",
          }}>← Back</button>
        )}
      </header>

      {/* Progress steps */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)" }}>
        {(["select","vendor","pay","done"] as const).map((s, i) => (
          <div key={s} style={{
            flex: 1, padding: "8px 0", textAlign: "center",
            fontSize: 10, fontWeight: 700,
            color: step === s ? "var(--accent)" : i < ["select","vendor","pay","done"].indexOf(step) ? "var(--accent)" : "var(--muted)",
            borderBottom: step === s ? "2px solid var(--accent)" : "2px solid transparent",
          }}>
            {i + 1}. {s.charAt(0).toUpperCase() + s.slice(1)}
          </div>
        ))}
      </div>

      <div style={{ padding: "20px 16px" }}>

        {/* ── STEP: SELECT ── */}
        {step === "select" && (
          <>
            {/* Kit preview */}
            <div style={{
              background: "linear-gradient(135deg, #111128, #1a1a35)",
              border: "1px solid var(--border)", borderRadius: 20,
              padding: "36px 20px", textAlign: "center", marginBottom: 24,
            }}>
              <div style={{ fontSize: 80, marginBottom: 12 }}>👕</div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>WardSoccer Official Kit</div>
              <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>Port Harcourt League · Season 2026</div>
              <div style={{
                marginTop: 14, display: "inline-block",
                background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 700, color: "var(--accent)",
              }}>Required to play in official matches</div>
            </div>

            {/* Kit includes */}
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 14, padding: "16px", marginBottom: 20,
            }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Kit includes</div>
              {["Official jersey with name & number", "Shorts", "Socks", "Player eligibility badge", "District registration sticker"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <span style={{ color: "var(--accent)" }}>✓</span>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Size selector */}
            <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>SELECT SIZE</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {sizes.map(s => (
                <button key={s} onClick={() => setSelected(s)} style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: selected === s ? "var(--accent)" : "var(--surface)",
                  border: `2px solid ${selected === s ? "var(--accent)" : "var(--border)"}`,
                  color: selected === s ? "#000" : "var(--text)",
                  fontWeight: 800, fontSize: 13, cursor: "pointer", transition: "all 0.15s",
                }}>{s}</button>
              ))}
            </div>

            {/* Pay mode */}
            <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>PAYMENT PLAN</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              {(["full","instalment"] as PayMode[]).map(m => (
                <button key={m} onClick={() => setPayMode(m)} style={{
                  flex: 1, padding: "12px 8px", borderRadius: 12, cursor: "pointer",
                  background: payMode === m ? "rgba(34,197,94,0.1)" : "var(--surface)",
                  border: `1px solid ${payMode === m ? "rgba(34,197,94,0.4)" : "var(--border)"}`,
                  textAlign: "center",
                }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: payMode === m ? "var(--accent)" : "var(--text)" }}>
                    {m === "full" ? "Pay in Full" : "Instalments"}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}>
                    {m === "full" ? "Single payment, immediate eligibility" : "3 parts · get kit on 1st payment"}
                  </div>
                </button>
              ))}
            </div>

            <button onClick={() => setStep("vendor")} style={{
              width: "100%", background: "var(--accent)", color: "#000",
              fontWeight: 800, fontSize: 16, padding: "15px",
              borderRadius: 14, border: "none", cursor: "pointer",
            }}>
              Choose Vendor — Size {selected}
            </button>
          </>
        )}

        {/* ── STEP: VENDOR ── */}
        {step === "vendor" && (
          <>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Choose Your Vendor</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16, lineHeight: 1.5 }}>
              Select an approved vendor near you. Anyone can be a vendor — gender does not matter. Lend vendors act as middlemen for accountability.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              {vendorList.map(v => {
                const kitProduct = v.products.find(p => p.category === "kit");
                return (
                  <button key={v.id} onClick={() => setVendorId(v.id)} style={{
                    background: vendorId === v.id ? "rgba(34,197,94,0.1)" : "var(--surface)",
                    border: `1px solid ${vendorId === v.id ? "rgba(34,197,94,0.4)" : "var(--border)"}`,
                    borderRadius: 12, padding: "14px 16px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12, textAlign: "left",
                    transition: "all 0.15s",
                  }}>
                    <span style={{ fontSize: 24 }}>{v.type === "sell" ? "🛍️" : "🔄"}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: vendorId === v.id ? "var(--accent)" : "var(--text)" }}>
                        {v.name}
                        {v.verified && <span style={{ fontSize: 9, marginLeft: 6, color: "var(--accent)" }}>✓</span>}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                        {v.district} · {"★".repeat(Math.round(v.rating))} {v.rating}
                      </div>
                    </div>
                    {kitProduct && (
                      <div style={{ fontWeight: 800, fontSize: 15, color: "var(--accent)", flexShrink: 0 }}>
                        ₦{kitProduct.price.toLocaleString()}
                      </div>
                    )}
                    {vendorId === v.id && (
                      <span style={{ color: "var(--accent)", fontSize: 18 }}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            <Link href="/vendors" style={{ textDecoration: "none" }}>
              <div style={{ fontSize: 12, color: "var(--accent)", textAlign: "center", marginBottom: 16, cursor: "pointer" }}>
                View full vendor profiles →
              </div>
            </Link>

            <button onClick={() => vendorId && setStep("pay")} style={{
              width: "100%", background: vendorId ? "var(--accent)" : "var(--surface2)",
              color: vendorId ? "#000" : "var(--muted)",
              fontWeight: 800, fontSize: 16, padding: "15px",
              borderRadius: 14, border: "none", cursor: vendorId ? "pointer" : "not-allowed",
            }}>
              {vendorId ? `Continue with ${chosenVendor?.name}` : "Select a vendor to continue"}
            </button>
          </>
        )}

        {/* ── STEP: PAY ── */}
        {step === "pay" && (
          <>
            {/* Order summary */}
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 14, padding: "18px", marginBottom: 16,
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Order Summary</div>
              {[
                { label: "WardSoccer Official Kit (Size " + selected + ")", value: `₦${kitPrice.toLocaleString()}` },
                { label: "Vendor: " + (chosenVendor?.name ?? "—"),           value: "" },
                { label: "Delivery",                                           value: `₦${delivery}` },
                { label: "Platform fee (3.75%)",                               value: `₦${Math.round(total * 0.0375).toLocaleString()}` },
              ].map(r => r.value ? (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{r.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{r.value}</span>
                </div>
              ) : (
                <div key={r.label} style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>{r.label}</div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700 }}>
                  {payMode === "instalment" ? "First instalment (1/3)" : "Total"}
                </span>
                <span style={{ fontWeight: 900, fontSize: 18, color: "var(--accent)" }}>
                  ₦{payMode === "instalment" ? instalment1.toLocaleString() : total.toLocaleString()}
                </span>
              </div>
              {payMode === "instalment" && (
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 8 }}>
                  Remaining: 2 × ₦{instalment1.toLocaleString()} · Kit delivered on first payment
                </div>
              )}
            </div>

            {/* Card fields */}
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 14, padding: "18px", marginBottom: 16,
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Card Details</div>
              {[
                { label: "Card Number", placeholder: "0000 0000 0000 0000" },
                { label: "Expiry",      placeholder: "MM/YY"               },
                { label: "CVV",         placeholder: "•••"                 },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>{f.label}</div>
                  <input placeholder={f.placeholder} style={{
                    width: "100%", background: "var(--surface2)", border: "1px solid var(--border)",
                    borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 14,
                    outline: "none", boxSizing: "border-box",
                  }} />
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, color: "var(--muted)", fontSize: 11 }}>
              <Shield size={13} color="var(--accent)" />
              Secured by Paystack · 256-bit SSL encryption
            </div>

            <button onClick={() => setStep("done")} style={{
              width: "100%", background: "var(--accent)", color: "#000",
              fontWeight: 800, fontSize: 16, padding: "15px",
              borderRadius: 14, border: "none", cursor: "pointer",
            }}>
              Pay ₦{payMode === "instalment" ? instalment1.toLocaleString() : total.toLocaleString()}
            </button>
          </>
        )}

        {/* ── STEP: DONE ── */}
        {step === "done" && (
          <div style={{ textAlign: "center", paddingTop: 40 }}>
            <CheckCircle size={64} color="var(--accent)" style={{ margin: "0 auto 20px", display: "block" }} />
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>You&apos;re Eligible! ⚽</div>
            <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 28, lineHeight: 1.6 }}>
              Your WardSoccer kit (Size {selected}) from {chosenVendor?.name} is confirmed.<br />
              {payMode === "instalment" ? "First instalment paid — 2 remaining." : "Full payment complete."}
            </div>
            <div style={{
              background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 14, padding: "16px", textAlign: "left", marginBottom: 24,
            }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "var(--accent)", marginBottom: 10 }}>What happens next</div>
              {[
                "Kit delivered by your vendor",
                "Show up to your district match in full kit",
                "You are now eligible to represent your district",
                payMode === "instalment" ? "Remaining 2 instalments deducted automatically" : "",
              ].filter(Boolean).map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{s}</span>
                </div>
              ))}
            </div>
            <Link href="/" style={{ textDecoration: "none" }}>
              <button style={{
                width: "100%", background: "var(--accent)", color: "#000",
                fontWeight: 800, fontSize: 15, padding: "14px",
                borderRadius: 14, border: "none", cursor: "pointer",
              }}>Go to Home</button>
            </Link>
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
