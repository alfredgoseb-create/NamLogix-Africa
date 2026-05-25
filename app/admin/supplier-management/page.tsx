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

export default function SupplierManagementPage() {
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
        <p style={badgeStyle}>ADMIN CONTROL</p>

        <h1 style={titleStyle}>Supplier Management</h1>

        <p style={descStyle}>
          Review supplier accounts, product categories, warehouse links,
          contact details, and marketplace readiness using live Supabase data.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/supplier-dashboard" style={primaryButtonStyle}>
            Supplier Dashboard
          </Link>

          <Link href="/supplier-register" style={secondaryButtonStyle}>
            Register Supplier
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>LIVE SUPPLIER DIRECTORY</p>

          <h2 style={sectionTitleStyle}>Registered Suppliers</h2>

          <p style={sectionTextStyle}>
            Supplier registrations now appear here from Supabase. Later admins
            can approve, reject, verify, or suspend supplier accounts.
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

                <h3 style={cardTitleStyle}>{supplier.supplier_name}</h3>

                <p style={cardTextStyle}>
                  <strong>Contact:</strong>{" "}
                  {supplier.contact_person || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Location:</strong> {supplier.location || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Phone:</strong> {supplier.contact_number || "N/A"}
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
                  <Link href="/supplier-dashboard" style={darkButtonStyle}>
                    Review Profile
                  </Link>

                  <Link href="/store" style={lightButtonStyle}>
                    View Products
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