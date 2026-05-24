"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const tickets = [
  {
    subject: "Cargo owner needs help with posting cargo",
    customer: "Customer User",
    category: "Cargo",
    status: "Open",
  },
  {
    subject: "Transporter cannot upload vehicle document",
    customer: "Transport Partner",
    category: "Vehicle Documents",
    status: "Pending",
  },
  {
    subject: "Supplier wants to update company logo",
    customer: "Supplier Partner",
    category: "Company Profile",
    status: "Resolved",
  },
];

export default function AdminSupportPage() {
  return (
    <div style={pageStyle}>
      <Navbar />

      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN SUPPORT</p>
        <h1 style={titleStyle}>Help Desk</h1>
        <p style={descStyle}>
          Manage customer questions, transporter issues, supplier requests,
          upload problems, and platform support tickets.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/admin/dashboard" style={primaryButtonStyle}>
            Back to Admin
          </Link>

          <Link href="/contact" style={secondaryButtonStyle}>
            Contact Page
          </Link>
        </div>
      </section>

      <main style={containerStyle}>
        <div style={gridStyle}>
          {tickets.map((ticket) => (
            <article key={ticket.subject} style={cardStyle}>
              <div style={topStyle}>
                <span style={typeStyle}>{ticket.category}</span>
                <span style={statusStyle}>{ticket.status}</span>
              </div>

              <h2 style={cardTitleStyle}>{ticket.subject}</h2>

              <p style={cardTextStyle}>
                <strong>Customer:</strong> {ticket.customer}
              </p>

              <div style={buttonSmallRowStyle}>
                <button style={replyButtonStyle}>Reply</button>
                <button style={resolveButtonStyle}>Mark Resolved</button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
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
};

const descStyle = {
  maxWidth: 760,
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
  maxWidth: 1100,
  margin: "0 auto",
  padding: "60px 24px",
};

const gridStyle = {
  display: "grid",
  gap: 18,
};

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 26,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const topStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  marginBottom: 16,
  flexWrap: "wrap" as const,
};

const typeStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
};

const statusStyle = {
  background: "#f97316",
  color: "white",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
};

const cardTitleStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
};

const buttonSmallRowStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap" as const,
  marginTop: 18,
};

const replyButtonStyle = {
  background: "#1d4ed8",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const resolveButtonStyle = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};