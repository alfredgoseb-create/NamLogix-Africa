"use client";

import Link from "next/link";

const reports = [
  {
    title: "Inventory Report",
    text: "Track warehouse stock, products, suppliers, and inventory movement.",
    icon: "📦",
    href: "/store",
  },
  {
    title: "Orders Report",
    text: "Review customer orders, order statuses, delivery addresses, and sales activity.",
    icon: "🧾",
    href: "/admin/orders",
  },
  {
    title: "Shipment Report",
    text: "Monitor cargo movements, transport routes, deliveries, and shipment progress.",
    icon: "🚚",
    href: "/admin/shipments",
  },
  {
    title: "Company Report",
    text: "View suppliers, warehouses, transporters, aviation operators, and partners.",
    icon: "🏢",
    href: "/companies",
  },
];

export default function ReportsPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>BUSINESS REPORTS</p>

        <h1 style={titleStyle}>Reports Center</h1>

        <p style={descStyle}>
          Generate reports for inventory, suppliers, shipments, orders,
          warehouse activity, stock movement, and trade performance.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/admin/analytics" style={primaryButtonStyle}>
            📈 Analytics
          </Link>

          <Link href="/admin/orders" style={secondaryButtonStyle}>
            📦 Orders
          </Link>

          <Link href="/admin/shipments" style={whiteButtonStyle}>
            🚚 Shipments
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Reports</p>
            <h3 style={statValueStyle}>0</h3>
            <p style={statTextStyle}>Generated reports</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Inventory</p>
            <h3 style={statValueStyle}>0</h3>
            <p style={statTextStyle}>Stock report files</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Shipments</p>
            <h3 style={statValueStyle}>0</h3>
            <p style={statTextStyle}>Logistics reports</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Exports</p>
            <h3 style={statValueStyle}>PDF</h3>
            <p style={statTextStyle}>Future report output</p>
          </div>
        </div>

        <div style={sectionHeaderStyle}>
          <div>
            <p style={sectionBadgeStyle}>REPORT SHORTCUTS</p>

            <h2 style={sectionTitleStyle}>Operational Report Sources</h2>

            <p style={sectionTextStyle}>
              Jump directly to the most important data areas of the platform.
            </p>
          </div>

          <Link href="/admin/dashboard" style={smallButtonStyle}>
            📊 Dashboard
          </Link>
        </div>

        <div style={gridStyle}>
          {reports.map((report) => (
            <article key={report.title} style={cardStyle}>
              <div style={iconStyle}>{report.icon}</div>

              <h3 style={cardTitleStyle}>{report.title}</h3>

              <p style={cardTextStyle}>{report.text}</p>

              <Link href={report.href} style={cardButtonStyle}>
                Open Report →
              </Link>
            </article>
          ))}
        </div>

        <section style={emptySectionStyle}>
          <div style={emptyIconStyle}>📑</div>

          <h2 style={emptyTitleStyle}>Exportable Reports Coming Soon</h2>

          <p style={emptyTextStyle}>
            This section is prepared for inventory reports, shipment reports,
            supplier reports, order reports, and PDF/CSV exports.
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
  padding: "80px 24px",
  textAlign: "center" as const,
  color: "white",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.92), rgba(249,115,22,0.88))",
};

const badgeStyle = {
  color: "#fdba74",
  fontWeight: 900,
  letterSpacing: 1,
  marginBottom: 10,
};

const titleStyle = {
  fontSize: 54,
  fontWeight: 900,
  margin: "0 0 14px",
};

const descStyle = {
  maxWidth: 780,
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
  background: "#1d4ed8",
  color: "white",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const whiteButtonStyle = {
  background: "white",
  color: "#0f172a",
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

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
  marginBottom: 42,
};

const statCardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 24,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const statLabelStyle = {
  color: "#64748b",
  fontWeight: 900,
  margin: 0,
};

const statValueStyle = {
  fontSize: 38,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0",
};

const statTextStyle = {
  color: "#64748b",
  margin: 0,
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 18,
  flexWrap: "wrap" as const,
  marginBottom: 28,
};

const sectionBadgeStyle = {
  color: "#f97316",
  fontWeight: 900,
  letterSpacing: 1,
  margin: 0,
};

const sectionTitleStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0",
};

const sectionTextStyle = {
  color: "#64748b",
  margin: 0,
  lineHeight: 1.7,
};

const smallButtonStyle = {
  background: "#1d4ed8",
  color: "white",
  padding: "13px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
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
  boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
};

const iconStyle = {
  fontSize: 44,
  marginBottom: 18,
};

const cardTitleStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
  marginBottom: 12,
};

const cardTextStyle = {
  color: "#475569",
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

const emptySectionStyle = {
  marginTop: 40,
  background: "white",
  borderRadius: 28,
  padding: "50px 24px",
  textAlign: "center" as const,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
};

const emptyIconStyle = {
  fontSize: 52,
  marginBottom: 18,
};

const emptyTitleStyle = {
  fontSize: 30,
  fontWeight: 900,
  color: "#0f172a",
  marginBottom: 12,
};

const emptyTextStyle = {
  maxWidth: 720,
  margin: "0 auto",
  color: "#64748b",
  lineHeight: 1.8,
};