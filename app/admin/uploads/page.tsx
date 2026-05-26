"use client";

import Link from "next/link";

const uploads = [
  {
    title: "Company Logos",
    description:
      "Review uploaded company logos before they appear publicly.",
    type: "Logo Uploads",
    count: "12",
    href: "/admin/companies",
    icon: "🏢",
  },
  {
    title: "Company Banners",
    description:
      "Manage profile banner images for companies and partners.",
    type: "Banner Uploads",
    count: "8",
    href: "/admin/companies",
    icon: "🖼️",
  },
  {
    title: "Vehicle Photos",
    description:
      "Review uploaded vehicle images for transporter profiles.",
    type: "Vehicle Uploads",
    count: "15",
    href: "/admin/vehicles",
    icon: "🚚",
  },
  {
    title: "Documents",
    description:
      "Review vehicle papers, permits, insurance, and licenses.",
    type: "Document Uploads",
    count: "21",
    href: "/admin/documents",
    icon: "📄",
  },
  {
    title: "Product Images",
    description:
      "Manage marketplace product photos from suppliers.",
    type: "Store Uploads",
    count: "34",
    href: "/store",
    icon: "📦",
  },
];

export default function AdminUploadsPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={heroOverlayStyle} />

        <div style={heroContentStyle}>
          <p style={badgeStyle}>ADMIN UPLOAD MANAGEMENT</p>

          <h1 style={titleStyle}>Uploads & Media Review</h1>

          <p style={descStyle}>
            Manage company logos, banners, vehicle photos, documents, and
            product images uploaded across NamLogix Africa.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/admin/dashboard" style={primaryButtonStyle}>
              Back to Admin
            </Link>

            <Link href="/admin/settings" style={secondaryButtonStyle}>
              Upload Settings
            </Link>
          </div>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Total Uploads</p>
            <h2 style={statValueStyle}>90+</h2>
            <p style={statTextStyle}>Across all platform sections</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Pending Review</p>
            <h2 style={warningValueStyle}>17</h2>
            <p style={statTextStyle}>Awaiting admin approval</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Approved</p>
            <h2 style={successValueStyle}>73</h2>
            <p style={statTextStyle}>Already verified</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Storage</p>
            <h2 style={statValueStyle}>2.4GB</h2>
            <p style={statTextStyle}>Used media storage</p>
          </div>
        </div>

        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>UPLOAD CATEGORIES</p>

          <h2 style={sectionTitleStyle}>
            Review Platform Media & Files
          </h2>

          <p style={sectionTextStyle}>
            Monitor uploaded content from transporters, suppliers,
            warehouses, and marketplace users.
          </p>
        </div>

        <div style={gridStyle}>
          {uploads.map((upload) => (
            <article key={upload.title} style={cardStyle}>
              <div style={topStyle}>
                <div style={iconWrapStyle}>{upload.icon}</div>

                <span style={countStyle}>{upload.count}</span>
              </div>

              <span style={typeStyle}>{upload.type}</span>

              <h2 style={cardTitleStyle}>{upload.title}</h2>

              <p style={cardTextStyle}>{upload.description}</p>

              <div style={cardFooterStyle}>
                <Link href={upload.href} style={cardButtonStyle}>
                  Review Uploads →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section style={bottomCardStyle}>
          <div style={bottomIconStyle}>☁️</div>

          <h2 style={bottomTitleStyle}>
            Future Cloud Media Features
          </h2>

          <p style={bottomTextStyle}>
            Future updates will include AI image moderation, automatic
            compression, secure cloud backups, watermarking, and advanced
            media verification tools.
          </p>
        </section>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
};

const heroStyle = {
  position: "relative" as const,
  overflow: "hidden",
  padding: "100px 24px",
  textAlign: "center" as const,
  color: "white",
  background:
    "linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #f97316 100%)",
};

const heroOverlayStyle = {
  position: "absolute" as const,
  inset: 0,
  background:
    "radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 40%)",
};

const heroContentStyle = {
  position: "relative" as const,
  zIndex: 2,
};

const badgeStyle = {
  color: "#fdba74",
  fontWeight: 900,
  letterSpacing: 1.5,
  marginBottom: 12,
};

const titleStyle = {
  fontSize: 58,
  fontWeight: 900,
  margin: "0 0 18px",
};

const descStyle = {
  maxWidth: 820,
  margin: "0 auto",
  lineHeight: 1.9,
  color: "rgba(255,255,255,0.88)",
  fontSize: 18,
};

const buttonRowStyle = {
  display: "flex",
  justifyContent: "center",
  gap: 14,
  flexWrap: "wrap" as const,
  marginTop: 34,
};

const primaryButtonStyle = {
  background: "#f97316",
  color: "white",
  padding: "14px 20px",
  borderRadius: 16,
  textDecoration: "none",
  fontWeight: 900,
  boxShadow: "0 10px 24px rgba(249,115,22,0.35)",
};

const secondaryButtonStyle = {
  background: "white",
  color: "#1d4ed8",
  padding: "14px 20px",
  borderRadius: 16,
  textDecoration: "none",
  fontWeight: 900,
};

const containerStyle = {
  maxWidth: 1250,
  margin: "0 auto",
  padding: "70px 24px",
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 22,
  marginBottom: 50,
};

const statCardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 26,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const statLabelStyle = {
  color: "#64748b",
  fontWeight: 900,
  margin: 0,
};

const statValueStyle = {
  fontSize: 40,
  fontWeight: 900,
  color: "#0f172a",
  margin: "10px 0",
};

const warningValueStyle = {
  ...statValueStyle,
  color: "#d97706",
};

const successValueStyle = {
  ...statValueStyle,
  color: "#16a34a",
};

const statTextStyle = {
  color: "#64748b",
  margin: 0,
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
  fontSize: 36,
  fontWeight: 900,
  color: "#0f172a",
  margin: "10px 0",
};

const sectionTextStyle = {
  color: "#64748b",
  lineHeight: 1.8,
  maxWidth: 760,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 26,
};

const cardStyle = {
  background: "white",
  borderRadius: 30,
  padding: 30,
  border: "1px solid #e5e7eb",
  boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
  transition: "0.3s",
};

const topStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 18,
};

const iconWrapStyle = {
  width: 62,
  height: 62,
  borderRadius: 18,
  background: "#eff6ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 30,
};

const typeStyle = {
  display: "inline-block",
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "8px 14px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
};

const countStyle = {
  background: "#f97316",
  color: "white",
  width: 50,
  height: 50,
  borderRadius: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
  fontSize: 18,
};

const cardTitleStyle = {
  fontSize: 28,
  fontWeight: 900,
  color: "#0f172a",
  marginTop: 18,
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.8,
};

const cardFooterStyle = {
  marginTop: 24,
};

const cardButtonStyle = {
  display: "inline-block",
  background: "#1d4ed8",
  color: "white",
  padding: "13px 18px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 900,
};

const bottomCardStyle = {
  marginTop: 50,
  background: "white",
  borderRadius: 32,
  padding: "50px 30px",
  textAlign: "center" as const,
  border: "1px solid #e5e7eb",
  boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
};

const bottomIconStyle = {
  fontSize: 56,
  marginBottom: 18,
};

const bottomTitleStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  marginBottom: 14,
};

const bottomTextStyle = {
  maxWidth: 820,
  margin: "0 auto",
  color: "#64748b",
  lineHeight: 1.9,
};