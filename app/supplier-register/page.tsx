"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SupplierRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    supplier_name: "",
    contact_person: "",
    location: "",
    contact_number: "",
    product_category: "",
    warehouse_linked: "",
    description: "",
  });

  function updateField(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    setMessage("");

    if (!form.supplier_name || !form.location || !form.contact_number) {
      setMessage("Please fill in supplier name, location, and contact number.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("suppliers").insert([
      {
        supplier_name: form.supplier_name,
        contact_person: form.contact_person,
        location: form.location,
        contact_number: form.contact_number,
        product_category: form.product_category,
        warehouse_linked: form.warehouse_linked,
        description: form.description,
        status: "pending",
      },
    ]);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Supplier registered successfully. Pending admin review.");

      setForm({
        supplier_name: "",
        contact_person: "",
        location: "",
        contact_number: "",
        product_category: "",
        warehouse_linked: "",
        description: "",
      });
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>SUPPLIER PARTNER</p>

        <h1 style={titleStyle}>Register as a Supplier</h1>

        <p style={descStyle}>
          Suppliers can join NamLogix Africa to list products, connect with
          warehouses, manage inventory, and arrange delivery through trusted
          transporters.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/supplier-dashboard" style={primaryButtonStyle}>
            Supplier Dashboard
          </Link>

          <Link href="/store" style={secondaryButtonStyle}>
            View Store
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <form style={formStyle}>
          <div style={gridStyle}>
            <label style={labelStyle}>
              Supplier / Company Name
              <input
                style={inputStyle}
                value={form.supplier_name}
                onChange={(e) => updateField("supplier_name", e.target.value)}
                placeholder="Example: Namibia Building Supplies"
              />
            </label>

            <label style={labelStyle}>
              Contact Person
              <input
                style={inputStyle}
                value={form.contact_person}
                onChange={(e) => updateField("contact_person", e.target.value)}
                placeholder="Full name"
              />
            </label>

            <label style={labelStyle}>
              Location
              <input
                style={inputStyle}
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="Windhoek, Walvis Bay, Okahandja..."
              />
            </label>

            <label style={labelStyle}>
              Contact Number
              <input
                style={inputStyle}
                value={form.contact_number}
                onChange={(e) => updateField("contact_number", e.target.value)}
                placeholder="+264..."
              />
            </label>

            <label style={labelStyle}>
              Product Category
              <input
                style={inputStyle}
                value={form.product_category}
                onChange={(e) => updateField("product_category", e.target.value)}
                placeholder="Construction, retail, farming, hardware..."
              />
            </label>

            <label style={labelStyle}>
              Warehouse Linked
              <input
                style={inputStyle}
                value={form.warehouse_linked}
                onChange={(e) => updateField("warehouse_linked", e.target.value)}
                placeholder="Which warehouse holds your stock?"
              />
            </label>
          </div>

          <label style={labelStyle}>
            Supplier Description
            <textarea
              style={textareaStyle}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe your products, supply capacity, delivery needs, and stock availability."
            />
          </label>

          {message && <div style={messageStyle}>{message}</div>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={submitButtonStyle}
          >
            {loading ? "Saving..." : "Register Supplier"}
          </button>
        </form>
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
  maxWidth: 1000,
  margin: "0 auto",
  padding: "60px 24px",
};

const formStyle = {
  background: "white",
  borderRadius: 30,
  padding: 30,
  border: "1px solid #e5e7eb",
  boxShadow: "0 14px 35px rgba(15,23,42,0.07)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 20,
};

const labelStyle = {
  display: "grid",
  gap: 8,
  color: "#0f172a",
  fontWeight: 900,
  marginBottom: 20,
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  fontSize: 15,
};

const textareaStyle = {
  width: "100%",
  minHeight: 130,
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  fontSize: 15,
};

const messageStyle = {
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  color: "#1d4ed8",
  padding: 16,
  borderRadius: 16,
  fontWeight: 900,
  marginBottom: 20,
};

const submitButtonStyle = {
  background: "#f97316",
  color: "white",
  border: "none",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};