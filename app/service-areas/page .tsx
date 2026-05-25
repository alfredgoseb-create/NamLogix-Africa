import Link from "next/link";

const areas = [
  { city: "Windhoek", services: "Cargo, rides, warehouse delivery" },
  { city: "Walvis Bay", services: "Port cargo, freight, logistics" },
  { city: "Swakopmund", services: "Deliveries, passenger transport" },
  { city: "Okahandja", services: "Town delivery, bakkie transport" },
  { city: "Oshakati", services: "Northern route logistics" },
  { city: "Keetmanshoop", services: "Southern route transport" },
];

export default function ServiceAreasPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>NAMIBIA LOGISTICS NETWORK</p>
        <h1 style={titleStyle}>Service Areas</h1>
        <p style={descStyle}>
          NamLogix Africa connects cargo owners, transporters, warehouses, and
          customers across major towns, routes, and trade corridors.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/transporters" style={primaryButtonStyle}>
            Find Transporters
          </Link>

          <Link href="/request-cargo" style={secondaryButtonStyle}>
            Post Cargo
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>ROUTE COVERAGE</p>
          <h2 style={sectionTitleStyle}>Active Transport Regions</h2>
          <p style={sectionTextStyle}>
            Later this page can show real route availability, transporter
            coverage, delivery prices, and trip schedules.
          </p>
        </div>

        <div style={gridStyle}>
          {areas.map((area) => (
            <article key={area.city} style={cardStyle}>
              <div style={iconStyle}>📍</div>
              <h3 style={cardTitleStyle}>{area.city}</h3>
              <p style={cardTextStyle}>{area.services}</p>

              <Link href="/booking-requests" style={darkButtonStyle}>
                Request Service
              </Link>
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
  margin: "10px 0 14px",
};

const descStyle = {
  maxWidth: 820,
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

const sectionHeaderStyle = {
  marginBottom: 30,
};

const sectionBadgeStyle = {
  color: "#f97316",
  fontWeight: 900,
  letterSpacing: 1,
};

const sectionTitleStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0",
};

const sectionTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
  maxWidth: 760,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const iconStyle = {
  width: 64,
  height: 64,
  borderRadius: 20,
  display: "grid",
  placeItems: "center",
  fontSize: 32,
  background: "#eff6ff",
  marginBottom: 18,
};

const cardTitleStyle = {
  fontSize: 25,
  fontWeight: 900,
  color: "#0f172a",
};

const cardTextStyle = {
  color: "#475569",
  lineHeight: 1.7,
  minHeight: 54,
};

const darkButtonStyle = {
  display: "inline-block",
  marginTop: 16,
  background: "#0f172a",
  color: "white",
  padding: "12px 15px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};