"use client";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { clubs, eliminatedClubs } from "@/lib/mockData";
import { useState } from "react";

export default function ClubsPage() {
  const [filter, setFilter] = useState<"all" | "full_season" | "preseason">("all");
  const filtered = clubs.filter(c => filter === "all" || c.phase === filter);

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "16px", borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>
          <span style={{ color: "var(--accent)" }}>Ward</span>Soccer Clubs
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
          Each district owns a club · Select a jersey · Compete
        </div>
      </header>

      {/* Filter tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", padding: "0 16px" }}>
        {(["all", "full_season", "preseason"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            flex: 1, padding: "11px 0", fontWeight: 700, fontSize: 12,
            background: "none", border: "none", cursor: "pointer",
            color: filter === f ? "var(--accent)" : "var(--muted)",
            borderBottom: filter === f ? "2px solid var(--accent)" : "2px solid transparent",
          }}>
            {f === "all" ? "All Clubs" : f === "full_season" ? "Full Season" : "Preseason"}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px" }}>

        {/* Eliminated notice */}
        {eliminatedClubs.length > 0 && (
          <div style={{
            background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 12, padding: "12px 14px", marginBottom: 16,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--live)", marginBottom: 4 }}>Eliminated from Preseason</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>{eliminatedClubs.join(" · ")}</div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(club => (
            <Link key={club.id} href={`/clubs/${club.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 14, padding: "16px",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                {/* Badge */}
                <div style={{
                  width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                  background: club.color + "22", border: `2px solid ${club.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
                }}>{club.badge}</div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{club.name}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                    Owned by {club.ownerDistrict}
                  </div>
                  {/* Squad bar */}
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      flex: 1, height: 4, borderRadius: 2, background: "var(--border)", overflow: "hidden",
                    }}>
                      <div style={{
                        width: `${(club.squadSize / (club.squadSize + club.openSlots)) * 100}%`,
                        height: "100%", background: club.color, borderRadius: 2,
                      }} />
                    </div>
                    <span style={{ fontSize: 10, color: "var(--muted)", flexShrink: 0 }}>
                      {club.squadSize} / {club.squadSize + club.openSlots}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
                    background: club.phase === "full_season" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
                    color: club.phase === "full_season" ? "var(--accent)" : "#f59e0b",
                    border: `1px solid ${club.phase === "full_season" ? "rgba(34,197,94,0.3)" : "rgba(245,158,11,0.3)"}`,
                    marginBottom: 6,
                  }}>
                    {club.phase === "full_season" ? "Full Season" : "Preseason"}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 700 }}>
                    {club.openSlots} open
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
