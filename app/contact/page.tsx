// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.message) {
      alert("Name and message are required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("inquiries").insert([
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        status: "open",
      },
    ]);

    setSaving(false);

    if (error) {
      alert("Failed to send inquiry: " + error.message);
      return;
    }

    alert("Inquiry sent successfully.");
    setForm(emptyForm);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fc", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <section style={heroStyle}>
          <p style={{ color: "#fed7aa", fontWeight: 800 }}>CONTACT NAMLOGIX</p>

          <h1 style={{ fontSize: 42, fontWeight: 900, margin: "10px 0" }}>
            Send Inquiry
          </h1>

          <p style={{ maxWidth: 720, lineHeight: 1.7 }}>
            Contact NamLogix Africa about products, cargo, transport, suppliers, warehouses, aviation, or trade routes.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <Link href="/store" style={buttonPrimary}>Marketplace</Link>
            <Link href="/companies" style={buttonSecondary}>Companies</Link>
            <Link href="/request-cargo" style={buttonOrange}>Post Cargo</Link>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={{ fontSize: 30, fontWeight: 900, margin: 0 }}>
            📩 Inquiry Form
          </h2>

          <p style={{ color: "#64748b", marginTop: 8 }}>
            Fill in your details and message. The inquiry will be saved inside Supabase.
          </p>

          <form onSubmit={handleSubmit} style={formGrid}>
            <input
              type="text"
              placeholder="Your Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              style={inputStyle}
            />

            <textarea
              placeholder="Message *"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{
                ...inputStyle,
                gridColumn: "1 / -1",
                minHeight: 150,
                resize: "vertical",
              }}
            />

            <button
              type="submit"
              disabled={saving}
              style={{
                ...buttonOrange,
                border: "none",
                cursor: "pointer",
                gridColumn: "1 / -1",
              }}
            >
              {saving ? "Sending Inquiry..." : "Send Inquiry"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

const heroStyle = {
  background: "linear-gradient(135deg, #0b1220, #1e3a8a, #f97316)",
  color: "white",
  borderRadius: 28,
  padding: 36,
  marginBottom: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 24,
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 16,
  marginTop: 24,
};

const inputStyle = {
  width: "100%",
  border: "1px solid #d1d5db",
  borderRadius: 14,
  padding: "13px 14px",
  fontSize: 15,
  background: "white",
};

const buttonPrimary = {
  background: "#1d4ed8",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonSecondary = {
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