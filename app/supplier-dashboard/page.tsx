"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Supplier = {
  id: string;
  supplier_name: string;
  contact_person: string;
  location: string;
  contact_number: string;
  product_category: string;
  warehouse_linked: string;
  description: string;
  status: string;
};

export default function SupplierDashboardPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  async function fetchSuppliers() {
    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSuppliers(data);
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>SUPPLIER OPERATIONS</p>

        <h1 style={titleStyle}>Supplier Dashboard</h1>

        <p style={descStyle}>
          Manage supplier profiles, product categories, linked warehouses,
          contact details, and trade readiness using live Supabase data.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/supplier-register" style={primaryButtonStyle}>
            Register Supplier
          </Link>

          <Link href="/inventory-management" style={secondaryButtonStyle}>
            Inventory Management
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={statsGridStyle}>
          <article style={statCardStyle}>
            <p style={statLabelStyle}>Suppliers</p>
            <h2 style={statValueStyle}>{suppliers.length}</h2>
            <p style={statTextStyle}>Registered partners</p>
          </article>

          <article style={statCardStyle}>
            <p style={statLabelStyle}>Marketplace</p>
            <h2 style={statValueStyle}>Active</h2>
            <p style={statTextStyle}>Supplier network</p>
          </article>

          <article style={statCardStyle}>
            <p style={statLabelStyle}>Stock</p>
            <h2 style={statValueStyle}>Linked</h2>
            <p style={statTextStyle}>Warehouse inventory</p>
          </article>

          <article style={statCardStyle}>
            <p style={statLabelStyle}>Status</p>
            <h2 style={statValueStyle}>Review</h2>
            <p style={statTextStyle}>Admin approval flow</p>
          </article>
        </div>

        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>LIVE SUPPLIERS</p>

          <h2 style={sectionTitleStyle}>Registered Supplier Profiles</h2>

          <p style={sectionTextStyle}>
            Suppliers registered through the form will appear here directly from
            Supabase.
          </p>
        </div>

        {loading ? (
          <div style={loadingStyle}>Loading suppliers...</div>
        ) : suppliers.length === 0 ? (
          <div style={emptyStyle}>No suppliers registered yet.</div>
        ) : (
          <div style={gridStyle}>
            {suppliers.map((supplier) => (
              <article key={supplier.id} style={cardStyle}>
                <div style={statusStyle}>{supplier.status || "pending"}</div>

                <h3 style={cardTitleStyle}>
                  {supplier.supplier_name}
                </h3>

                <p style={cardTextStyle}>
                  <strong>Contact Person:</strong>{" "}
                  {supplier.contact_person || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Location:</strong>{" "}
                  {supplier.location || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Contact:</strong>{" "}
                  {supplier.contact_number || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Category:</strong>{" "}
                  {supplier.product_category || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Warehouse:</strong>{" "}
                  {supplier.warehouse_linked || "N/A"}
                </p>

                <p style={descriptionStyle}>
                  {supplier.description || "No description"}
                </p>

                <div style={cardActionsStyle}>
                  <Link href="/store" style={darkButtonStyle}>
                    View Products
                  </Link>

                  <Link href="/cargo-matching" style={lightButtonStyle}>
                    Arrange Transport
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

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
  marginBottom: 42,
};

const statCardStyle = {
  background: "white",
  borderRadius: 26,
  padding: 24,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const statLabelStyle = {
  color: "#64748b",
  fontWeight: 900,
  margin: 0,
};

const statValueStyle = {
  fontSize: 38,
  fontWeight: 900,
  color: "#0f172a",
  margin: "10px 0",
};

const statTextStyle = {
  color: "#64748b",
  margin: 0,
};

const sectionHeaderStyle = {
  marginBottom: 28,
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