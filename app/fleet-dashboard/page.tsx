import Link from "next/link";

const metrics = [
  { label: "Registered Vehicles", value: "24", text: "Fleet assets" },
  { label: "Available Drivers", value: "12", text: "Ready operators" },
  { label: "Active Routes", value: "8", text: "Transport corridors" },
  { label: "Pending Documents", value: "5", text: "Need review" },
];

const activities = [
  {
    title: "MAN Truck assigned to cargo request",
    route: "Windhoek → Walvis Bay",
    status: "In Progress",
  },
  {
    title: "Toyota Hilux awaiting document approval",
    route: "Okahandja → Swakopmund",
    status: "Pending",
  },
  {
    title: "Driver profile needs license upload",
    route: "Windhoek Local",
    status: "Action Required",
  },
];

export default function FleetDashboardPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>FLEET OPERATIONS</p>
        <h1 style={titleStyle}>Fleet Dashboard</h1>
        <p style={descStyle}>
          Monitor vehicles, drivers, documents, routes, bookings, and cargo
          assignments from one professional operations dashboard.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/my-vehicles" style={primaryButtonStyle}>
            My Vehicles
          </Link>

          <Link href="/booking-requests" style={secondaryButtonStyle}>
            Booking Requests
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={statsGridStyle}>
          {metrics.map((item) => (
            <article key={item.label} style={statCardStyle}>
              <p style={statLabelStyle}>{item.label}</p>
              <h2 style={statValueStyle}>{item.value}</h2>
              <p style={statTextStyle}>{item.text}</p>
            </article>
          ))}
        </div>

        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>OPERATIONS ACTIVITY</p>
          <h2 style={sectionTitleStyle}>Recent Fleet Activity</h2>
          <p style={sectionTextStyle}>
            This section will later show real-time updates from Supabase:
            approvals, assigned trips, cargo matches, and driver actions.
          </p>
        </div>

        <div style={gridStyle}>
          {activities.map((item) => (
            <article key={item.title} style={cardStyle}>
              <div style={statusStyle}>{item.status}</div>

              <h3 style={cardTitleStyle}>{item.title}</h3>

              <p style={cardTextStyle}>
                <strong>Route:</strong> {item.route}
              </p>

              <div style={cardActionsStyle}>
                <Link href="/cargo-matching" style={darkButtonStyle}>
                  View Match
                </Link>

                <Link href="/vehicle-documents" style={lightButtonStyle}>
                  Documents
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

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
  marginBottom: 42,
};

const statCardStyle = {
  background: "white",
  borderRadius: 26,
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
  margin: "10px 0",
};

const statTextStyle = {
  color: "#64748b",
  margin: 0,
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
  maxWidth: 760,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
  background: "#fff7ed",
  color: "#c2410c",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
  marginBottom: 18,
};

const cardTitleStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
  lineHeight: 1.3,
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