import Link from "next/link";

const requests = [
  {
    customer: "Cargo Owner",
    service: "Freight Transport",
    route: "Windhoek → Walvis Bay",
    date: "Flexible",
    status: "Awaiting Transporter",
  },
  {
    customer: "Passenger Client",
    service: "Town Ride",
    route: "Hospital → Home",
    date: "Today",
    status: "Pending Confirmation",
  },
  {
    customer: "Warehouse Client",
    service: "Product Delivery",
    route: "Warehouse → Customer",
    date: "Tomorrow",
    status: "New Request",
  },
];

export default function BookingRequestsPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>BOOKING MANAGEMENT</p>
        <h1 style={titleStyle}>Booking Requests</h1>
        <p style={descStyle}>
          Manage cargo bookings, ride requests, warehouse deliveries, and
          transport jobs from one central place.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/request-cargo" style={primaryButtonStyle}>
            Request Cargo
          </Link>

          <Link href="/request-ride" style={secondaryButtonStyle}>
            Request Ride
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>LIVE REQUEST QUEUE</p>
          <h2 style={sectionTitleStyle}>Incoming Booking Requests</h2>
          <p style={sectionTextStyle}>
            Later this page will connect to Supabase and become the main
            booking operations center for NamLogix Africa.
          </p>
        </div>

        <div style={gridStyle}>
          {requests.map((request) => (
            <article key={`${request.customer}-${request.service}`} style={cardStyle}>
              <div style={statusStyle}>{request.status}</div>

              <h3 style={cardTitleStyle}>{request.service}</h3>

              <p style={cardTextStyle}>
                <strong>Customer:</strong> {request.customer}
              </p>

              <p style={cardTextStyle}>
                <strong>Route:</strong> {request.route}
              </p>

              <p style={cardTextStyle}>
                <strong>Date:</strong> {request.date}
              </p>

              <div style={cardActionsStyle}>
                <Link href="/cargo-matching" style={darkButtonStyle}>
                  Match Transport
                </Link>

                <Link href="/trip-offers" style={lightButtonStyle}>
                  View Trips
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
  maxWidth: 720,
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