// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  async function fetchWarehouses() {
    setLoading(true);

    const { data, error } = await supabase
      .from("warehouses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load warehouses: " + error.message);
    } else {
      setWarehouses(data || []);
    }

    setLoading(false);
  }

  const activeWarehouses = warehouses.filter(
    (item) => item.status === "active"
  ).length;

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>NAMLOGIX STORAGE NETWORK</p>

          <h1 style={titleStyle}>Warehouses</h1>

          <p style={descStyle}>
            Discover warehouse partners, storage facilities, inventory locations,
            and logistics hubs that support trade movement across Namibia and
            Southern Africa.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/contact" style={buttonOrange}>
              🏭 List Warehouse
            </Link>

            <Link href="/store" style={buttonBlue}>
              🛒 Store
            </Link>

            <Link href="/request-cargo" style={buttonWhite}>
              📦 Post Cargo
            </Link>
          </div>
        </section>

        <section style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Warehouses</p>
            <h3 style={statValueStyle}>{warehouses.length}</h3>
            <p style={statTextStyle}>Total listed facilities</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Active</p>
            <h3 style={statValueStyle}>{activeWarehouses}</h3>
            <p style={statTextStyle}>Available storage partners</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Inventory</p>
            <h3 style={statValueStyle}>Stock</h3>
            <p style={statTextStyle}>Product storage support</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Coverage</p>
            <h3 style={statValueStyle}>SADC</h3>
            <p style={statTextStyle}>Regional logistics</p>
          </div>
        </section>

        <section style={cardStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={formTitleStyle}>🏭 Warehouse Listings</h2>
              <p style={formDescStyle}>
                Storage facilities and warehouse partners connected to the
                NamLogix platform.
              </p>
            </div>

            <button onClick={fetchWarehouses} style={smallButtonStyle}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={emptyTextStyle}>Loading warehouses...</p>
          ) : warehouses.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={{ fontSize: 44 }}>🏭</div>
              <h3 style={{ margin: "12px 0 6px", fontSize: 24 }}>
                No warehouses yet
              </h3>
              <p style={{ color: "#64748b", margin: 0 }}>
                Warehouse listings will appear here once added to Supabase.
              </p>
            </div>
          ) : (
            <div style={gridStyle}>
              {warehouses.map((warehouse) => (
                <article key={warehouse.id} style={itemCardStyle}>
                  <div style={cardTopStyle}>
                    <div>
                      <h3 style={itemTitleStyle}>
                        {warehouse.name || "Warehouse"}
                      </h3>

                      <p style={itemSubStyle}>
                        {warehouse.location || "Location not added"}
                      </p>
                    </div>

                    <span
                      style={
                        warehouse.status === "active"
                          ? activeBadgeStyle
                          : inactiveBadgeStyle
                      }
                    >
                      {warehouse.status || "active"}
                    </span>
                  </div>

                  <div style={detailGridStyle}>
                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>City</p>
                      <p style={detailValueStyle}>{warehouse.city || "-"}</p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Capacity</p>
                      <p style={detailValueStyle}>
                        {warehouse.capacity || "-"}
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Contact</p>
                      <p style={detailValueStyle}>
                        {warehouse.contact_name || "-"}
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Phone</p>
                      <p style={detailValueStyle}>
                        {warehouse.phone || "-"}
                      </p>
                    </div>
                  </div>

                  {warehouse.description && (
                    <p style={descriptionBoxStyle}>{warehouse.description}</p>
                  )}

                  <div style={actionsStyle}>
                    <Link href="/contact" style={buttonOrangeSmall}>
                      Request Storage
                    </Link>

                    <Link href="/store" style={buttonBlueSmall}>
                      View Products
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f8fc",
  padding: "40px 24px",
};

const containerStyle = {
  maxWidth: 1100,
  margin: "0 auto",
};

const heroStyle = {
  background: "linear-gradient(135deg, #0b1220, #1e3a8a, #f97316)",
  color: "white",
  borderRadius: 28,
  padding: 36,
  marginBottom: 24,
  boxShadow: "0 20px 40px rgba(15,23,42,0.22)",
};

const badgeStyle = {
  color: "#fed7aa",
  fontWeight: 900,
  letterSpacing: 1,
  margin: 0,
};

const titleStyle = {
  fontSize: 42,
  fontWeight: 900,
  margin: "10px 0",
};

const descStyle = {
  maxWidth: 760,
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.85)",
};

const buttonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 24,
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
  marginBottom: 24,
};

const statCardStyle = {
  background: "white",
  borderRadius: 22,
  padding: 22,
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
};

const statLabelStyle = {
  color: "#64748b",
  fontWeight: 800,
  margin: 0,
};

const statValueStyle = {
  fontSize: 30,
  fontWeight: 900,
  margin: "8px 0",
  color: "#0f172a",
};

const statTextStyle = {
  color: "#64748b",
  margin: 0,
};

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.10)",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  alignItems: "center",
  marginBottom: 24,
  flexWrap: "wrap",
};

const formTitleStyle = {
  fontSize: 30,
  fontWeight: 900,
  margin: 0,
  color: "#0f172a",
};

const formDescStyle = {
  color: "#64748b",
  marginTop: 8,
  marginBottom: 0,
};

const smallButtonStyle = {
  background: "#1d4ed8",
  color: "white",
  padding: "11px 16px",
  borderRadius: 14,
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
};

const emptyTextStyle = {
  color: "#64748b",
};

const emptyStateStyle = {
  textAlign: "center",
  padding: 50,
  background: "#f8fafc",
  borderRadius: 20,
  border: "1px dashed #cbd5e1",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 18,
};

const itemCardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: 22,
  padding: 22,
  background: "#ffffff",
  boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
};

const cardTopStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 14,
  marginBottom: 18,
};

const itemTitleStyle = {
  fontSize: 20,
  fontWeight: 900,
  margin: 0,
  color: "#0f172a",
};

const itemSubStyle = {
  margin: "6px 0 0",
  color: "#64748b",
};

const activeBadgeStyle = {
  background: "#dcfce7",
  color: "#15803d",
  borderRadius: 999,
  padding: "6px 10px",
  height: "fit-content",
  fontSize: 12,
  fontWeight: 900,
};

const inactiveBadgeStyle = {
  background: "#fee2e2",
  color: "#b91c1c",
  borderRadius: 999,
  padding: "6px 10px",
  height: "fit-content",
  fontSize: 12,
  fontWeight: 900,
};

const detailGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 10,
};

const detailBoxStyle = {
  background: "#f8fafc",
  borderRadius: 16,
  padding: 12,
};

const detailLabelStyle = {
  color: "#94a3b8",
  fontSize: 12,
  margin: 0,
};

const detailValueStyle = {
  color: "#0f172a",
  fontWeight: 800,
  margin: "4px 0 0",
};

const descriptionBoxStyle = {
  marginTop: 14,
  background: "#f8fafc",
  borderRadius: 16,
  padding: 14,
  color: "#475569",
  lineHeight: 1.6,
};

const actionsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginTop: 18,
};

const buttonBlue = {
  background: "#1d4ed8",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonWhite = {
  background: "white",
  color: "#1d4ed8",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonOrange = {
  background: "#f97316",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonBlueSmall = {
  ...buttonBlue,
  padding: "10px 14px",
  fontSize: 14,
};

const buttonOrangeSmall = {
  ...buttonOrange,
  padding: "10px 14px",
  fontSize: 14,
};