// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setSaving(false);

    if (error) {
      alert("Registration failed: " + error.message);
      return;
    }

    alert("Account created. Please check your email if confirmation is required.");
    window.location.href = "/login";
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>NAMLOGIX ACCOUNT</p>

          <h1 style={titleStyle}>Create Account</h1>

          <p style={descStyle}>
            Register to access NamLogix Africa tools for cargo, products,
            transport, warehouses, suppliers, and marketplace operations.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/" style={buttonWhite}>
              Home
            </Link>

            <Link href="/login" style={buttonBlue}>
              Login
            </Link>

            <Link href="/contact" style={buttonOrange}>
              Contact Support
            </Link>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={formTitleStyle}>📝 Register your account</h2>

          <p style={formDescStyle}>
            Create your NamLogix account using your email and password.
          </p>

          <form onSubmit={handleRegister} style={formGridStyle}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <button type="submit" disabled={saving} style={submitButtonStyle}>
              {saving ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p style={bottomTextStyle}>
            Already have an account?{" "}
            <Link href="/login" style={inlineLinkStyle}>
              Login here
            </Link>
          </p>
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
  maxWidth: 900,
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

const submitButtonStyle = {
  background: "#f97316",
  color: "white",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  border: "none",
  cursor: "pointer",
  fontSize: 16,
};

const bottomTextStyle = {
  color: "#64748b",
  marginTop: 18,
};

const inlineLinkStyle = {
  color: "#1d4ed8",
  fontWeight: 900,
  textDecoration: "none",
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