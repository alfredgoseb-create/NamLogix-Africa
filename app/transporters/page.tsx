import Link from "next/link";

const transporters = [
  {
    name: "NamLogix Transport Partner",
    location: "Windhoek",
    service: "Cargo, freight, regional transport",
    fleet: "12 Vehicles",
    rating: "New Partner",
  },
  {
    name: "Coastal Freight Services",
    location: "Walvis Bay",
    service: "Port cargo, warehouse delivery, long-distance freight",
    fleet: "8 Vehicles",
    rating: "Demo Verified",
  },
  {
    name: "Local Delivery Partner",
    location: "Okahandja",
    service: "Town delivery, bakkie transport, urgent parcels",
    fleet: "3 Vehicles",
    rating: "Pending Review",
  },
];

export default function TransportersPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>TRANSPORTER MARKETPLACE</p>
        <h1 style={titleStyle}>Find Trusted Transporters</h1>
        <p style={descStyle}>
          Browse transport companies, delivery partners, freight operators, and
          logistics providers across Namibia and Southern Africa.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/request-cargo" style={primaryButtonStyle}>
            Post Cargo Request
          </Link>

          <Link href="/booking-requests" style={secondaryButtonStyle}>
            View Bookings
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>PUBLIC DIRECTORY</p>
          <h2 style={sectionTitleStyle}>Available Transport Partners</h2>
          <p style={sectionTextStyle}>
            Later this page can show real transporter profiles from Supabase,
            including reviews, routes, pricing, verification status, and fleet
            availability.
          </p>
        </div>

        <div style={gridStyle}>
          {transporters.map((item) => (
            <article key={item.name} style={cardStyle}>
              <div style={iconStyle}>🚚</div>
              <div style={statusStyle}>{item.rating}</div>

              <h3 style={cardTitleStyle}>{item.name}</h3>

              <p style={cardTextStyle}>
                <strong>Location:</strong> {item.location}
              </p>

              <p style={cardTextStyle}>
                <strong>Services:</strong> {item.service}
              </p>

              <p style={cardTextStyle}>
                <strong>Fleet:</strong> {item.fleet}
              </p>

              <div style={cardActionsStyle}>
                <Link href="/transport-company" style={darkButtonStyle}>
                  View Profile
                </Link>

                <Link href="/booking-requests" style={lightButtonStyle}>
                  Request Booking
                </Link>
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
  gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
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
  width: 72,
  height: 72,
  borderRadius: 22,
  display: "grid",
  placeItems: "center",
  fontSize: 36,
  background: "#eff6ff",
  marginBottom: 18,
};

const statusStyle = {
  display: "inline-block",
  background: "#fff7ed",
  color: "#c2410c",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
  marginBottom: 16,
};

const cardTitleStyle = {
  fontSize: 25,
  fontWeight: 900,
  color: "#0f172a",
  margin: "0 0 12px",
};

const cardTextStyle = {
  color: "#475569",
  lineHeight: 1.7,
};

const cardActionsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap" as const,
  marginTop: 22,
};

const darkButtonStyle = {
  background: "#0f172a",
  color: "white",
  padding: "12px 15px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const lightButtonStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "12px 15px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};