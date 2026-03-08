"use client";
import BottomNav from "@/components/BottomNav";
import LiveBadge from "@/components/LiveBadge";
import { refereeMatches } from "@/lib/mockData";
import { useState } from "react";

const events = ["Goal", "Assist", "Yellow Card", "Red Card", "Substitution", "Offside", "Penalty"];

export default function RefereePage() {
  const [confirming, setConfirming] = useState<string | null>(null);
  const [logged, setLogged] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState("Goal");
  const [player, setPlayer] = useState("");
  const [minute, setMinute] = useState("");

  const log = () => {
    if (!player || !minute) return;
    setLogged(l => [`${minute}' ${selectedEvent} — ${player}`, ...l]);
    setPlayer(""); setMinute("");
  };

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "16px", borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>🟨 Referee Panel</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>Log events · Confirm results · Anti-cheat</div>
      </header>

      <div style={{ padding: "16px" }}>

        {/* My matches */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>MY ASSIGNED MATCHES</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {refereeMatches.map(m => (
            <div key={m.id} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "14px 16px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                {m.status === "live" ? <LiveBadge /> : (
                  <span style={{ fontSize: 11, color: "var(--muted)", background: "var(--surface2)", padding: "2px 8px", borderRadius: 6 }}>
                    {m.date} {m.time}
                  </span>
                )}
                <span style={{ fontSize: 11, color: "var(--muted)" }}>{m.district}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{m.fixture}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 12 }}>{m.venue}</div>

              {m.status === "live" && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setConfirming(m.id)} style={{
                    flex: 1, background: "var(--accent)", color: "#000",
                    fontWeight: 700, fontSize: 12, padding: "9px",
                    borderRadius: 10, border: "none", cursor: "pointer",
                  }}>✓ Confirm Result</button>
                  <button style={{
                    flex: 1, background: "var(--surface2)", color: "var(--text)",
                    fontWeight: 700, fontSize: 12, padding: "9px",
                    borderRadius: 10, border: "1px solid var(--border)", cursor: "pointer",
                  }}>📋 Log Event</button>
                </div>
              )}

              {confirming === m.id && (
                <div style={{
                  marginTop: 12, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: 10, padding: "12px",
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", marginBottom: 8 }}>Confirm Final Result</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10 }}>
                    Once you confirm, the opposing captain must also confirm via the app before the result becomes official.
                  </div>
                  <button onClick={() => setConfirming(null)} style={{
                    width: "100%", background: "var(--accent)", color: "#000",
                    fontWeight: 800, fontSize: 13, padding: "10px", borderRadius: 10, border: "none", cursor: "pointer",
                  }}>✓ Submit Referee Confirmation</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Live event logger */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>MATCH EVENT LOGGER</div>
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 14, padding: "16px", marginBottom: 16,
        }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {events.map(e => (
              <button key={e} onClick={() => setSelectedEvent(e)} style={{
                padding: "7px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
                background: selectedEvent === e ? "var(--accent)" : "var(--surface2)",
                border: `1px solid ${selectedEvent === e ? "var(--accent)" : "var(--border)"}`,
                color: selectedEvent === e ? "#000" : "var(--text)",
              }}>{e}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input value={minute} onChange={e => setMinute(e.target.value)} placeholder="Min" type="number"
              style={{ width: 64, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px", color: "var(--text)", outline: "none" }} />
            <input value={player} onChange={e => setPlayer(e.target.value)} placeholder="Player name" style={{
              flex: 1, background: "var(--surface2)", border: "1px solid var(--border)",
              borderRadius: 8, padding: "10px", color: "var(--text)", outline: "none",
            }} />
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>
            Events logged offline are queued and synced when connection returns.
          </div>
          <button onClick={log} style={{
            width: "100%", background: "var(--accent2)", color: "#fff",
            fontWeight: 700, fontSize: 13, padding: "11px", borderRadius: 10, border: "none", cursor: "pointer",
          }}>Log {selectedEvent}</button>
        </div>

        {/* Logged events */}
        {logged.length > 0 && (
          <>
            <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>
              QUEUED ({logged.length})
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {logged.map((e, i) => (
                <div key={i} style={{
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "var(--muted)",
                  display: "flex", justifyContent: "space-between",
                }}>
                  <span>{e}</span>
                  <span style={{ fontSize: 10, color: "var(--accent)", fontWeight: 700 }}>QUEUED</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </main>
  );
}
