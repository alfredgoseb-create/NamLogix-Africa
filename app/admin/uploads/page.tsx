"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const uploads = [
  {
    title: "Company Logos",
    description: "Review uploaded company logos before they appear publicly.",
    type: "Logo Uploads",
    count: "12",
    href: "/admin/companies",
  },
  {
    title: "Company Banners",
    description: "Manage profile banner images for companies and partners.",
    type: "Banner Uploads",
    count: "8",
    href: "/admin/companies",
  },
  {
    title: "Vehicle Photos",
    description: "Review uploaded vehicle images for transporter profiles.",
    type: "Vehicle Uploads",
    count: "15",
    href: "/admin/vehicles",
  },
  {
    title: "Documents",
    description: "Review vehicle papers, permits, insurance, and licenses.",
    type: "Document Uploads",
    count: "21",
    href: "/admin/documents",
  },
  {
    title: "Product Images",
    description: "Manage marketplace product photos from suppliers.",
    type: "Store Uploads",
    count: "34",
    href: "/store",
  },
];

export default function AdminUploadsPage() {
  return (
    <div style={pageStyle}>
      <Navbar />

      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN UPLOAD MANAGEMENT</p>

        <h1 style={titleStyle}>Uploads & Media Review</h1>

        <p style={descStyle}>
          Manage company logos, banners, vehicle photos, documents, and product
          images uploaded across NamLogix Africa.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/admin/dashboard" style={primaryButtonStyle}>
            Back to Admin
          </Link>

          <Link href="/admin/settings" style={secondaryButtonStyle}>
            Upload Settings
          </Link>
        </div>
      </section>

      <main style={containerStyle}>
        <div style={gridStyle}>
          {uploads.map((upload) => (
            <article key={upload.title} style={cardStyle}>
              <div style={topStyle}>
                <span style={typeStyle}>{upload.type}</span>
                <span style={countStyle}>{upload.count}</span>
              </div>

              <h2 style={cardTitleStyle}>{upload.title}</h2>

              <p style={cardTextStyle}>{upload.description}</p>

              <Link href={upload.href} style={cardButtonStyle}>
                Review →
              </Link>
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
  maxWidth: 1200,
  margin: "0 auto",
  padding: "60px 24px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 26,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const topStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  marginBottom: 18,
};

const typeStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
};

const countStyle = {
  background: "#f97316",
  color: "white",
  width: 42,
  height: 42,
  borderRadius: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
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

const cardButtonStyle = {
  display: "inline-block",
  marginTop: 18,
  background: "#1d4ed8",
  color: "white",
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};