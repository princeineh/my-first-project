"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { vendorList } from "@/lib/mockData";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function VendorDetailPage() {
  const { id } = useParams();
  const vendor = vendorList.find(v => v.id === id) ?? vendorList[0];

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
        borderBottom: "1px solid var(--border)",
      }}>
        <Link href="/vendors" style={{ color: "var(--text)", display: "flex" }}><ArrowLeft size={20} /></Link>
        <span style={{ fontWeight: 800, fontSize: 15, flex: 1 }}>{vendor.name}</span>
        {vendor.verified && (
          <span style={{
            fontSize: 10, padding: "3px 8px", borderRadius: 6,
            background: "rgba(34,197,94,0.1)", color: "var(--accent)", fontWeight: 700,
          }}>✓ VERIFIED</span>
        )}
      </header>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(180deg, var(--surface2) 0%, var(--background) 100%)",
        padding: "28px 20px 20px", textAlign: "center", borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>{vendor.type === "sell" ? "🛍️" : "🔄"}</div>
        <div style={{ fontWeight: 900, fontSize: 20 }}>{vendor.name}</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{vendor.district}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 8 }}>
          {"★".repeat(Math.round(vendor.rating)).split("").map((_, i) => (
            <span key={i} style={{ color: "#f59e0b", fontSize: 16 }}>★</span>
          ))}
          <span style={{ fontSize: 13, color: "var(--muted)", marginLeft: 4, alignSelf: "center" }}>{vendor.rating}/5</span>
        </div>

        <div style={{
          display: "inline-block", marginTop: 12, padding: "5px 14px", borderRadius: 8,
          background: vendor.type === "sell" ? "rgba(34,197,94,0.1)" : "rgba(124,58,237,0.1)",
          border: `1px solid ${vendor.type === "sell" ? "rgba(34,197,94,0.3)" : "rgba(124,58,237,0.3)"}`,
          fontSize: 12, fontWeight: 700,
          color: vendor.type === "sell" ? "var(--accent)" : "var(--accent2)",
        }}>
          {vendor.type === "sell" ? "Sells (permanent)" : "Lends (accountable middleman)"}
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>

        {vendor.type === "lend" && (
          <div style={{
            background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: 12, padding: "12px 14px", marginBottom: 20,
            fontSize: 12, color: "var(--muted)", lineHeight: 1.6,
          }}>
            <strong style={{ color: "var(--accent2)" }}>Lend vendor</strong> — acts as an accountable middleman. Equipment is returned after the match. All transactions are logged on the platform for accountability.
          </div>
        )}

        {/* Products */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 12, letterSpacing: 1 }}>
          PRODUCTS & PRICING
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {vendor.products.map(p => (
            <div key={p.name} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "14px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2, textTransform: "capitalize" }}>
                  {p.category} {vendor.type === "lend" ? "· per use" : ""}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 900, fontSize: 18, color: "var(--accent)" }}>
                  ₦{p.price.toLocaleString()}
                </div>
                {vendor.type === "sell" && (
                  <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>or 3 instalments</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Platform fee notice */}
        <div style={{
          background: "var(--surface2)", border: "1px solid var(--border)",
          borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 11,
          color: "var(--muted)", lineHeight: 1.5,
        }}>
          All transactions carry a <strong style={{ color: "var(--text)" }}>3.75% platform maintenance fee</strong>.
          This supports coaches, facilities, and data analysts.
        </div>

        <Link href="/kit" style={{ textDecoration: "none" }}>
          <button style={{
            width: "100%", background: "var(--accent)", color: "#000",
            fontWeight: 800, fontSize: 16, padding: "15px",
            borderRadius: 14, border: "none", cursor: "pointer",
          }}>
            Buy from {vendor.name}
          </button>
        </Link>
      </div>
      <BottomNav />
    </main>
  );
}
