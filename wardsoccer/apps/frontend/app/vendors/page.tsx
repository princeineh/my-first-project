"use client";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { vendorList } from "@/lib/mockData";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";

type Category = "all" | "kit" | "shoes" | "accessories";

export default function VendorsPage() {
  const [filter, setFilter] = useState<Category>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "sell" | "lend">("all");

  const filtered = vendorList.filter(v => {
    const typeOk = typeFilter === "all" || v.type === typeFilter;
    const catOk  = filter === "all" || v.products.some(p => p.category === filter);
    return typeOk && catOk;
  });

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "16px", borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <ShoppingBag size={18} color="var(--accent)" />
          <span style={{ fontWeight: 800, fontSize: 16 }}>Vendor Marketplace</span>
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)" }}>Approved vendors · Sell or Lend · Anyone can be a vendor</div>
      </header>

      <div style={{ padding: "14px 16px" }}>

        {/* Become a vendor CTA */}
        <div style={{
          background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: 14, padding: "14px 16px", marginBottom: 16,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "var(--accent)" }}>Become a Vendor</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
              Anyone can sell or lend kits. Register as a Vendor role.
            </div>
          </div>
          <Link href="/register" style={{ textDecoration: "none" }}>
            <button style={{
              background: "var(--accent)", color: "#000", fontWeight: 700,
              fontSize: 12, padding: "7px 12px", borderRadius: 8, border: "none", cursor: "pointer",
            }}>Apply</button>
          </Link>
        </div>

        {/* Type filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {(["all", "sell", "lend"] as const).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} style={{
              flex: 1, padding: "8px", borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: "pointer",
              background: typeFilter === t ? "var(--accent2)" : "var(--surface)",
              border: `1px solid ${typeFilter === t ? "var(--accent2)" : "var(--border)"}`,
              color: typeFilter === t ? "#fff" : "var(--muted)",
            }}>
              {t === "all" ? "All" : t === "sell" ? "🛍️ Sell" : "🔄 Lend"}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto" }}>
          {(["all", "kit", "shoes", "accessories"] as Category[]).map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              flexShrink: 0, padding: "6px 14px", borderRadius: 20, fontWeight: 600, fontSize: 11, cursor: "pointer",
              background: filter === c ? "var(--accent)" : "var(--surface2)",
              border: `1px solid ${filter === c ? "var(--accent)" : "var(--border)"}`,
              color: filter === c ? "#000" : "var(--muted)",
            }}>
              {c === "all" ? "All Products" : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        {/* Vendor list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(v => (
            <Link key={v.id} href={`/vendors/${v.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 14, padding: "16px",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                    background: v.type === "sell" ? "rgba(34,197,94,0.1)" : "rgba(124,58,237,0.1)",
                    border: `1px solid ${v.type === "sell" ? "rgba(34,197,94,0.3)" : "rgba(124,58,237,0.3)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                  }}>{v.type === "sell" ? "🛍️" : "🔄"}</div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: 15 }}>{v.name}</span>
                      {v.verified && (
                        <span style={{
                          fontSize: 9, padding: "2px 7px", borderRadius: 4,
                          background: "rgba(34,197,94,0.1)", color: "var(--accent)", fontWeight: 700,
                        }}>✓ VERIFIED</span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                      {v.district} · {v.type === "sell" ? "Sells" : "Lends"} equipment
                    </div>

                    {/* Star rating */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
                      {"★".repeat(Math.round(v.rating)).split("").map((_, i) => (
                        <span key={i} style={{ color: "#f59e0b", fontSize: 12 }}>★</span>
                      ))}
                      <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: 2 }}>{v.rating}</span>
                    </div>

                    {/* Product tags */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                      {v.products.slice(0, 3).map(p => (
                        <span key={p.name} style={{
                          fontSize: 10, padding: "3px 8px", borderRadius: 6,
                          background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--muted)",
                        }}>{p.name} — ₦{p.price.toLocaleString()}</span>
                      ))}
                      {v.products.length > 3 && (
                        <span style={{ fontSize: 10, color: "var(--accent)", fontWeight: 600 }}>+{v.products.length - 3} more</span>
                      )}
                    </div>
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
