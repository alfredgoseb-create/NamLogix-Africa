// @ts-nocheck
"use client";

import Link from "next/link";

export default function ProfilePage() {
  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>NAMLOGIX PROFILE</p>

          <h1 style={titleStyle}>User Dashboard</h1>

          <p style={descStyle}>
            Manage your NamLogix account, cargo activity, transport requests,
            products, and marketplace participation.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/store" style={buttonWhite}>
              Store
            </Link>

            <Link href="/request-cargo" style={buttonBlue}>
              Post Cargo
            </Link>

            <Link href="/transport" style={buttonOrange}>
              Transport
            </Link>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={formTitleStyle}>👤 Profile Overview</h2>

          <p style={formDescStyle}>
            This area can later include user statistics, bookings, products,
            cargo requests, and marketplace activity.
          </p>

          <div style={statsGridStyle}>
            <div style={statCardStyle}>
              <p style={statLabelStyle}>Cargo</p>
              <h3 style={statValueStyle}>0</h3>
              <p style={statTextStyle}>Posted requests</p>
            </div>

            <div style={statCardStyle}>
              <p style={statLabelStyle}>Trips</p>
              <h3 style={statValueStyle}>0</h3>
              <p style={statTextStyle}>Transport bookings</p>
            </div>

            <div style={statCardStyle}>
              <p style={statLabelStyle}>Products</p>
              <h3 style={statValueStyle}>0</h3>
              <p style={statTextStyle}>Marketplace listings</p>
            </div>

            <div style={statCardStyle}>
              <p style={statLabelStyle}>Status</p>
              <h3 style={statValueStyle}>Live</h3>
              <p style={statTextStyle}>NamLogix account</p>
            </div>
          </div>
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
  marginBottom: 24,
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
};

const statCardStyle = {
  background: "#f8fafc",
  borderRadius: 20,
  padding: 22,
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