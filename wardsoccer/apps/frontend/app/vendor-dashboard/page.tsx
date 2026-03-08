"use client";
import BottomNav from "@/components/BottomNav";
import { vendorList } from "@/lib/mockData";

const myVendor = vendorList[0]; // mock as logged-in vendor

const orders = [
  { id: "o1", buyer: "Chukwu Emeka",  product: "Full Kit Pack",  size: "L",  amount: 8500,  instalment: "1/3", status: "delivered" },
  { id: "o2", buyer: "Tunde Bello",   product: "Jersey Only",    size: "M",  amount: 4000,  instalment: "Full",status: "pending"   },
  { id: "o3", buyer: "Segun Lawal",   product: "Football Boots", size: "44", amount: 6500,  instalment: "Full",status: "pending"   },
];

export default function VendorDashboardPage() {
  const totalRevenue = orders.filter(o => o.status === "delivered").reduce((s, o) => s + o.amount, 0);
  const platformFee  = Math.round(totalRevenue * 0.0375);
  const myEarnings   = totalRevenue - platformFee;

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        padding: "16px", borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "var(--background)", zIndex: 50,
      }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>🛍️ Vendor Dashboard</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{myVendor.name} · {myVendor.district}</div>
      </header>

      <div style={{ padding: "16px" }}>

        {/* Earnings overview */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
          {[
            { label: "My Earnings",    value: `₦${myEarnings.toLocaleString()}`,  color: "var(--accent)"  },
            { label: "Platform Fee",   value: `₦${platformFee.toLocaleString()}`, color: "var(--muted)"   },
            { label: "Total Orders",   value: orders.length,                       color: "var(--text)"    },
            { label: "Pending",        value: orders.filter(o => o.status === "pending").length, color: "#f59e0b" },
          ].map(s => (
            <div key={s.label} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "14px", textAlign: "center",
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Orders */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>ORDERS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {orders.map(o => (
            <div key={o.id} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "12px 14px",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: o.status === "delivered" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
                border: `1px solid ${o.status === "delivered" ? "rgba(34,197,94,0.3)" : "rgba(245,158,11,0.3)"}`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              }}>{o.status === "delivered" ? "✓" : "⏳"}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{o.buyer}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                  {o.product} · Size {o.size} · {o.instalment}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: "var(--accent)" }}>₦{o.amount.toLocaleString()}</div>
                <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2, textTransform: "capitalize" }}>{o.status}</div>
              </div>
            </div>
          ))}
        </div>

        {/* My products */}
        <div style={{ fontWeight: 700, fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>MY PRODUCTS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {myVendor.products.map(p => (
            <div key={p.name} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "10px 14px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</span>
              <span style={{ fontWeight: 800, color: "var(--accent)" }}>₦{p.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
