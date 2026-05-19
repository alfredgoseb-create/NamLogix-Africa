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
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>CONTACT NAMLOGIX</p>

          <h1 style={titleStyle}>Send Inquiry</h1>

          <p style={descStyle}>
            Contact NamLogix Africa about products, cargo, transport,
            suppliers, warehouses, aviation, or trade routes.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/store" style={buttonBlue}>
              Marketplace
            </Link>

            <Link href="/companies" style={buttonWhite}>
              Companies
            </Link>

            <Link href="/request-cargo" style={buttonOrange}>
              Post Cargo
            </Link>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={formTitleStyle}>📩 Inquiry Form</h2>

          <p style={formDescStyle}>
            Fill in your details and message. The inquiry will be saved inside
            Supabase.
          </p>

          <form onSubmit={handleSubmit} style={formGridStyle}>
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
              style={textareaStyle}
            />

            <button type="submit" disabled={saving} style={submitButtonStyle}>
              {saving ? "Sending Inquiry..." : "Send Inquiry"}
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