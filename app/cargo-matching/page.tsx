import Link from "next/link";

const matches = [
  {
    cargo: "Construction Materials",
    route: "Windhoek → Walvis Bay",
    vehicle: "MAN Truck",
    capacity: "10 Tons",
    status: "Possible Match",
  },
  {
    cargo: "Retail Goods",
    route: "Okahandja → Swakopmund",
    vehicle: "Toyota Hilux",
    capacity: "1 Ton",
    status: "Pending Assignment",
  },
];

export default function CargoMatchingPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>SMART LOGISTICS</p>

        <h1 style={titleStyle}>Cargo Matching Engine</h1>

        <p style={descStyle}>
          Match available cargo with nearby vehicles, routes, transporters, and
          drivers across Namibia and Southern Africa.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/cargo-requests" style={primaryButtonStyle}>
            View Cargo Requests
          </Link>

          <Link href="/my-vehicles" style={secondaryButtonStyle}>
            My Vehicles
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={sectionBadgeStyle}>AI MATCHING</p>

            <h2 style={sectionTitleStyle}>
              Suggested Cargo & Vehicle Matches
            </h2>

            <p style={sectionTextStyle}>
              Later this system can automatically match loads using route,
              weight, availability, pricing, and vehicle type.
            </p>
          </div>
        </div>

        <div style={gridStyle}>
          {matches.map((item) => (
            <article key={item.cargo} style={cardStyle}>
              <div style={statusStyle}>{item.status}</div>

              <h3 style={cardTitleStyle}>{item.cargo}</h3>

              <p style={cardTextStyle}>
                <strong>Route:</strong> {item.route}
              </p>

              <p style={cardTextStyle}>
                <strong>Vehicle:</strong> {item.vehicle}
              </p>

              <p style={cardTextStyle}>
                <strong>Capacity:</strong> {item.capacity}
              </p>

              <div style={cardActionsStyle}>
                <Link href="/cargo-requests" style={darkButtonStyle}>
                  View Cargo
                </Link>

                <Link href="/trip-offers" style={lightButtonStyle}>
                  Assign Vehicle
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div style={noticeStyle}>
          <h3 style={noticeTitleStyle}>Future AI Upgrade</h3>

          <p style={noticeTextStyle}>
            NamLogix Africa can later use AI to automatically recommend the
            best transporter based on pricing, distance, ratings, vehicle
            capacity, and route optimization.
          </p>
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

const sectionHeaderStyle = {
  marginBottom: 28,
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
  maxWidth: 720,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
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

const noticeStyle = {
  marginTop: 40,
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  borderRadius: 26,
  padding: 28,
};

const noticeTitleStyle = {
  color: "#1d4ed8",
  fontSize: 24,
  fontWeight: 900,
  margin: "0 0 8px",
};

const noticeTextStyle = {
  color: "#1e3a8a",
  lineHeight: 1.7,
  margin: 0,
};