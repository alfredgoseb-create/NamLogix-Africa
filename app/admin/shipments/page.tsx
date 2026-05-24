"use client";

import Link from "next/link";

const shipments = [
  {
    id: "SHP-001",
    cargo: "Building Materials",
    route: "Windhoek → Walvis Bay",
    transporter: "NamLogix Transport Partner",
    status: "In Transit",
  },
  {
    id: "SHP-002",
    cargo: "Warehouse Stock",
    route: "Okahandja → Windhoek",
    transporter: "Local Delivery Partner",
    status: "Pending Pickup",
  },
];

export default function ShipmentsPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>SHIPMENT CONTROL</p>

        <h1 style={titleStyle}>Shipment Management</h1>

        <p style={descStyle}>
          Track cargo movement, deliveries, routes, vehicles, and logistics
          operations across Namibia and Southern Africa.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/cargo-requests" style={primaryButtonStyle}>
            🚚 Cargo Requests
          </Link>

          <Link href="/admin/orders" style={secondaryButtonStyle}>
            📦 Orders
          </Link>

          <Link href="/admin/dashboard" style={whiteButtonStyle}>
            📊 Dashboard
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Shipments</p>
            <h3 style={statValueStyle}>{shipments.length}</h3>
            <p style={statTextStyle}>Total cargo movements</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>In Transit</p>
            <h3 style={statValueStyle}>1</h3>
            <p style={statTextStyle}>Currently moving</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Delivered</p>
            <h3 style={statValueStyle}>0</h3>
            <p style={statTextStyle}>Completed shipments</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Delayed</p>
            <h3 style={statValueStyle}>0</h3>
            <p style={statTextStyle}>Needs attention</p>
          </div>
        </div>

        <div style={sectionHeaderStyle}>
          <div>
            <p style={sectionBadgeStyle}>SHIPMENT NETWORK</p>
            <h2 style={sectionTitleStyle}>Cargo Movement Records</h2>
            <p style={sectionTextStyle}>
              Manage delivery status, transporters, cargo routes, and shipment
              progress.
            </p>
          </div>

          <Link href="/trip-offers" style={smallButtonStyle}>
            🚛 Trip Offers
          </Link>
        </div>

        <div style={gridStyle}>
          {shipments.map((shipment) => (
            <article key={shipment.id} style={cardStyle}>
              <div style={statusStyle}>{shipment.status}</div>

              <h3 style={cardTitleStyle}>{shipment.cargo}</h3>

              <p style={cardTextStyle}>
                <strong>Shipment ID:</strong> {shipment.id}
              </p>

              <p style={cardTextStyle}>
                <strong>Route:</strong> {shipment.route}
              </p>

              <p style={cardTextStyle}>
                <strong>Transporter:</strong> {shipment.transporter}
              </p>

              <div style={cardButtonRowStyle}>
                <button style={blueActionStyle}>View Details</button>
                <button style={greenActionStyle}>Mark Delivered</button>
                <button style={outlineActionStyle}>Update Status</button>
              </div>
            </article>
          ))}
        </div>
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
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 26,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
};

const statusStyle = {
  display: "inline-block",
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
  marginBottom: 18,
};

const cardTitleStyle = {
  fontSize: 26,
  fontWeight: 900,
  color: "#0f172a",
  marginBottom: 14,
};

const cardTextStyle = {
  color: "#475569",
  lineHeight: 1.7,
};

const cardButtonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap" as const,
  marginTop: 22,
};

const blueActionStyle = {
  background: "#1d4ed8",
  color: "white",
  border: "none",
  padding: "11px 14px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const greenActionStyle = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "11px 14px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const outlineActionStyle = {
  background: "#f8fafc",
  color: "#0f172a",
  border: "1px solid #cbd5e1",
  padding: "11px 14px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};