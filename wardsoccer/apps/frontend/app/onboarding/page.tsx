"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { onboardingSlides } from "@/lib/mockData";

export default function OnboardingPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const slide = onboardingSlides[current];
  const isLast = current === onboardingSlides.length - 1;

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--background)" }}>
      {/* Header */}
      <header style={{
        padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
        borderBottom: "1px solid var(--border)",
      }}>
        <button onClick={() => current > 0 ? setCurrent(c => c - 1) : router.push("/register")}
          style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", display: "flex" }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 15 }}>Program Orientation</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>Read before payment unlocks</div>
        </div>
        <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>{current + 1}/{onboardingSlides.length}</span>
      </header>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 6, padding: "14px 16px 0", justifyContent: "center" }}>
        {onboardingSlides.map((_, i) => (
          <div key={i} style={{
            width: i === current ? 24 : 8, height: 8, borderRadius: 4,
            background: i <= current ? "var(--accent)" : "var(--border)",
            transition: "all 0.3s",
          }} />
        ))}
      </div>

      {/* Slide content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 72, marginBottom: 24 }}>{slide.icon}</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, margin: "0 0 16px", lineHeight: 1.2 }}>{slide.title}</h1>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{slide.body}</p>
        </div>

        {/* Agreement (last slide only) */}
        {isLast && (
          <div style={{
            background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)",
            borderRadius: 14, padding: "16px", marginBottom: 24,
          }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                style={{ width: 18, height: 18, marginTop: 2, accentColor: "var(--accent)", cursor: "pointer" }} />
              <span style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6 }}>
                I have read and understood the WardSoccer program, my responsibilities, and agree to the financial obligations. I confirm this before payment is processed.
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ padding: "16px 24px 32px", display: "flex", gap: 12 }}>
        {current > 0 && (
          <button onClick={() => setCurrent(c => c - 1)} style={{
            flex: 1, background: "var(--surface)", border: "1px solid var(--border)",
            color: "var(--text)", fontWeight: 700, fontSize: 15, padding: "14px",
            borderRadius: 14, cursor: "pointer",
          }}>Back</button>
        )}
        <button
          onClick={() => isLast ? (agreed && router.push("/")) : setCurrent(c => c + 1)}
          style={{
            flex: 2, background: isLast && !agreed ? "var(--surface2)" : "var(--accent)",
            color: isLast && !agreed ? "var(--muted)" : "#000",
            fontWeight: 800, fontSize: 15, padding: "14px",
            borderRadius: 14, border: "none", cursor: isLast && !agreed ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "all 0.2s",
          }}>
          {isLast ? "Unlock Payment" : "Next"}
          <ArrowRight size={18} />
        </button>
      </div>
    </main>
  );
}
