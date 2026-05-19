// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const emptyForm = {
  pickup_location: "",
  delivery_location: "",
  cargo_type: "",
  weight_kg: "",
  budget: "",
  contact_name: "",
  contact_phone: "",
  contact_email: "",
  description: "",
};

export default function RequestCargoPage() {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.pickup_location || !form.delivery_location) {
      alert("Pickup and delivery locations are required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("cargo_requests").insert([
      {
        ...form,
        weight_kg: Number(form.weight_kg) || 0,
        budget: Number(form.budget) || 0,
        status: "pending",
      },
    ]);

    setSaving(false);

    if (error) {
      alert("Failed to post cargo request: " + error.message);
      return;
    }

    alert("Cargo request posted successfully.");
    setForm(emptyForm);
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>NAMLOGIX CARGO</p>

          <h1 style={titleStyle}>Post Cargo Request</h1>

          <p style={descStyle}>
            Submit cargo details and connect with transporters, logistics
            operators, warehouses, and trade partners across Namibia and
            Southern Africa.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/cargo-requests" style={buttonBlue}>
              View Cargo Requests
            </Link>

            <Link href="/trip-offers" style={buttonWhite}>
              Trip Offers
            </Link>

            <Link href="/contact" style={buttonOrange}>
              Contact Support
            </Link>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={formTitleStyle}>📦 Cargo Request Form</h2>

          <p style={formDescStyle}>
            Fill in the cargo details below. Your request will be saved in
            NamLogix and can be used for transport bidding.
          </p>

          <form onSubmit={handleSubmit} style={formGridStyle}>
            <input
              type="text"
              placeholder="Pickup Location *"
              value={form.pickup_location}
              onChange={(e) =>
                setForm({ ...form, pickup_location: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Delivery Location *"
              value={form.delivery_location}
              onChange={(e) =>
                setForm({ ...form, delivery_location: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Cargo Type"
              value={form.cargo_type}
              onChange={(e) =>
                setForm({ ...form, cargo_type: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Weight KG"
              value={form.weight_kg}
              onChange={(e) =>
                setForm({ ...form, weight_kg: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Budget NAD"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Contact Name"
              value={form.contact_name}
              onChange={(e) =>
                setForm({ ...form, contact_name: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Contact Phone"
              value={form.contact_phone}
              onChange={(e) =>
                setForm({ ...form, contact_phone: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Contact Email"
              value={form.contact_email}
              onChange={(e) =>
                setForm({ ...form, contact_email: e.target.value })
              }
              style={inputStyle}
            />

            <textarea
              placeholder="Cargo Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={textareaStyle}
            />

            <button type="submit" disabled={saving} style={submitButtonStyle}>
              {saving ? "Posting Cargo..." : "📦 Post Cargo Request"}
            </button>
          </form>
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
  maxWidth: 1000,
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
  maxWidth: 720,
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.85)",
};

const buttonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.10)",
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

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 16,
  marginTop: 24,
};

const inputStyle = {
  width: "100%",
  border: "1px solid #d1d5db",
  borderRadius: 14,
  padding: "14px 15px",
  fontSize: 15,
  background: "#f8fafc",
  outline: "none",
};

const textareaStyle = {
  ...inputStyle,
  gridColumn: "1 / -1",
  minHeight: 160,
  resize: "vertical",
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

const submitButtonStyle = {
  ...buttonOrange,
  border: "none",
  cursor: "pointer",
  gridColumn: "1 / -1",
  fontSize: 16,
};