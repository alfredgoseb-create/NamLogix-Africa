"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type InventoryItem = {
  id: string;
  product_name: string;
  category: string;
  warehouse_name: string;
  supplier_name: string;
  stock_quantity: string;
  price: number | null;
  status: string;
  image_url: string | null;
  description: string;
};

export default function InventoryManagementPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    const { data, error } = await supabase
      .from("inventory_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setItems(data);
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>INVENTORY CONTROL</p>

        <h1 style={titleStyle}>Inventory Management</h1>

        <p style={descStyle}>
          Track warehouse stock, product availability, supplier goods,
          marketplace inventory, dispatch readiness, and delivery preparation.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/warehouse-dashboard" style={primaryButtonStyle}>
            Warehouse Dashboard
          </Link>

          <Link href="/store" style={secondaryButtonStyle}>
            View Store
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>LIVE INVENTORY</p>

          <h2 style={sectionTitleStyle}>Warehouse Stock Items</h2>

          <p style={sectionTextStyle}>
            Inventory records now load from Supabase. Later warehouses and
            suppliers will add real products, images, prices, and stock levels.
          </p>
        </div>

        {loading ? (
          <div style={loadingStyle}>Loading inventory...</div>
        ) : items.length === 0 ? (
          <div style={emptyStyle}>
            No inventory items found yet. Add stock from Supabase first.
          </div>
        ) : (
          <div style={gridStyle}>
            {items.map((item) => (
              <article key={item.id} style={cardStyle}>
                <div style={statusStyle}>{item.status || "in_stock"}</div>

                <h3 style={cardTitleStyle}>{item.product_name}</h3>

                <p style={cardTextStyle}>
                  <strong>Category:</strong> {item.category || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Warehouse:</strong> {item.warehouse_name || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Supplier:</strong> {item.supplier_name || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Stock:</strong> {item.stock_quantity || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Price:</strong>{" "}
                  {item.price ? `N$ ${item.price}` : "Not set"}
                </p>

                <p style={descriptionStyle}>
                  {item.description || "No description"}
                </p>

                <div style={cardActionsStyle}>
                  <Link href="/store" style={darkButtonStyle}>
                    View Store
                  </Link>

                  <Link href="/cargo-matching" style={lightButtonStyle}>
                    Arrange Delivery
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
};

const heroStyle = {
  padding: "90px 24px",
  textAlign: "center" as const,
  color: "white",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.92), rgba(249,115,22,0.88))",
};

const badgeStyle = {
  color: "#fdba74",
  fontWeight: 900,
  letterSpacing: 1,
};

const titleStyle = {
  fontSize: 54,
  fontWeight: 900,
  margin: "10px 0 14px",
};

const descStyle = {
  maxWidth: 860,
  margin: "0 auto",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  fontSize: 18,
};

const buttonRowStyle = {
  display: "flex",
  gap: 14,
  justifyContent: "center",
  flexWrap: "wrap" as const,
  marginTop: 30,
};

const primaryButtonStyle = {
  background: "#f97316",
  color: "white",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const secondaryButtonStyle = {
  background: "white",
  color: "#1d4ed8",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const containerStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "60px 24px",
};

const sectionHeaderStyle = {
  marginBottom: 30,
};

const sectionBadgeStyle = {
  color: "#f97316",
  fontWeight: 900,
  letterSpacing: 1,
};

const sectionTitleStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0",
};

const sectionTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
  maxWidth: 780,
};

const loadingStyle = {
  background: "white",
  padding: 40,
  borderRadius: 24,
  textAlign: "center" as const,
  fontWeight: 900,
};

const emptyStyle = {
  background: "white",
  padding: 40,
  borderRadius: 24,
  textAlign: "center" as const,
  color: "#64748b",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const statusStyle = {
  display: "inline-block",
  background: "#fff7ed",
  color: "#c2410c",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
  marginBottom: 18,
};

const cardTitleStyle = {
  fontSize: 26,
  fontWeight: 900,
  color: "#0f172a",
};

const cardTextStyle = {
  color: "#475569",
  lineHeight: 1.7,
};

const descriptionStyle = {
  color: "#64748b",
  lineHeight: 1.7,
  marginTop: 12,
};

const cardActionsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap" as const,
  marginTop: 22,
};

const darkButtonStyle = {
  background: "#0f172a",
  color: "white",
  padding: "12px 15px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const lightButtonStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "12px 15px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};