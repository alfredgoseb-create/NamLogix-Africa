"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Warehouse = {
  id: string;
  warehouse_name: string;
  owner_name: string;
  location: string;
  capacity: string;
  services: string;
  description: string;
  status: string;
};

export default function WarehouseNetworkPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  async function fetchWarehouses() {
    const { data, error } = await supabase
      .from("warehouses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setWarehouses(data);
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>WAREHOUSE NETWORK</p>

        <h1 style={titleStyle}>
          Storage & Distribution Infrastructure
        </h1>

        <p style={descStyle}>
          Discover warehouse partners, storage hubs,
          fulfillment centers, and inventory facilities
          across Namibia and Southern Africa.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/warehouse-register" style={primaryButtonStyle}>
            Register Warehouse
          </Link>

          <Link href="/inventory-management" style={secondaryButtonStyle}>
            Inventory Management
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>LIVE DATABASE</p>

          <h2 style={sectionTitleStyle}>
            Registered Warehouses
          </h2>

          <p style={sectionTextStyle}>
            Warehouses registered through the platform
            automatically appear here using Supabase live data.
          </p>
        </div>

        {loading ? (
          <div style={loadingStyle}>
            Loading warehouses...
          </div>
        ) : warehouses.length === 0 ? (
          <div style={emptyStyle}>
            No warehouses registered yet.
          </div>
        ) : (
          <div style={gridStyle}>
            {warehouses.map((warehouse) => (
              <article
                key={warehouse.id}
                style={cardStyle}
              >
                <div style={statusStyle}>
                  {warehouse.status || "pending"}
                </div>

                <h3 style={cardTitleStyle}>
                  {warehouse.warehouse_name}
                </h3>

                <p style={cardTextStyle}>
                  <strong>Owner:</strong>{" "}
                  {warehouse.owner_name || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Location:</strong>{" "}
                  {warehouse.location || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Capacity:</strong>{" "}
                  {warehouse.capacity || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Services:</strong>{" "}
                  {warehouse.services || "N/A"}
                </p>

                <p style={descriptionStyle}>
                  {warehouse.description || "No description"}
                </p>

                <div style={cardActionsStyle}>
                  <Link
                    href="/inventory-management"
                    style={darkButtonStyle}
                  >
                    View Inventory
                  </Link>

                  <Link
                    href="/contact"
                    style={lightButtonStyle}
                  >
                    Contact
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
  maxWidth: 850,
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
  maxWidth: 760,
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
  gridTemplateColumns:
    "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow:
    "0 12px 30px rgba(15,23,42,0.06)",
};

const statusStyle = {
  display: "inline-block",
  background: "#dcfce7",
  color: "#166534",
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