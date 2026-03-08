"use client";
export default function LiveBadge({ minute }: { minute?: number }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: "var(--live)", color: "#fff",
      fontSize: 10, fontWeight: 700, borderRadius: 4,
      padding: "2px 7px", letterSpacing: 0.5,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: "#fff", display: "inline-block",
        animation: "pulse 1.2s infinite",
      }} />
      {minute ? `${minute}'` : "LIVE"}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </span>
  );
}
