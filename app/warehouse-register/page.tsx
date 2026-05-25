"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function WarehouseRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    warehouse_name: "",
    owner_name: "",
    location: "",
    contact_number: "",
    capacity: "",
    services: "",
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

    if (!form.warehouse_name || !form.location || !form.contact_number) {
      setMessage("Please fill in warehouse name, location, and contact number.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("warehouses").insert([
      {
        warehouse_name: form.warehouse_name,
        owner_name: form.owner_name,
        location: form.location,
        contact_number: form.contact_number,
        capacity: form.capacity,
        services: form.services,
        description: form.description,
        status: "pending",
      },
    ]);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Warehouse registered successfully. Pending admin review.");
      setForm({
        warehouse_name: "",
        owner_name: "",
        location: "",
        contact_number: "",
        capacity: "",
        services: "",
        description: "",
      });
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>WAREHOUSE PARTNER</p>
        <h1 style={titleStyle}>Register Your Warehouse</h1>
        <p style={descStyle}>
          Allow warehouse owners to join NamLogix Africa, list storage space,
          manage inventory, sell products, and connect with transport services.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/warehouse-network" style={primaryButtonStyle}>
            Warehouse Network
          </Link>

          <Link href="/warehouse-dashboard" style={secondaryButtonStyle}>
            Warehouse Dashboard
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <form style={formStyle}>
          <div style={gridStyle}>
            <label style={labelStyle}>
              Warehouse Name
              <input
                style={inputStyle}
                value={form.warehouse_name}
                onChange={(e) => updateField("warehouse_name", e.target.value)}
                placeholder="Example: Windhoek Storage Hub"
              />
            </label>

            <label style={labelStyle}>
              Owner / Company Name
              <input
                style={inputStyle}
                value={form.owner_name}
                onChange={(e) => updateField("owner_name", e.target.value)}
                placeholder="Company or owner name"
              />
            </label>

            <label style={labelStyle}>
              Location
              <input
                style={inputStyle}
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="Windhoek, Walvis Bay, Oshakati..."
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
              Warehouse Capacity
              <input
                style={inputStyle}
                value={form.capacity}
                onChange={(e) => updateField("capacity", e.target.value)}
                placeholder="Small, medium, large, square meters..."
              />
            </label>

            <label style={labelStyle}>
              Services Offered
              <input
                style={inputStyle}
                value={form.services}
                onChange={(e) => updateField("services", e.target.value)}
                placeholder="Storage, dispatch, cold storage, fulfillment..."
              />
            </label>
          </div>

          <label style={labelStyle}>
            Description
            <textarea
              style={textareaStyle}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe the warehouse, products, storage type, handling services, and trade support."
            />
          </label>

          {message && <div style={messageStyle}>{message}</div>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={submitButtonStyle}
          >
            {loading ? "Saving..." : "Register Warehouse"}
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