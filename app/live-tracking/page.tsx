import Link from "next/link";

const trips = [
  {
    vehicle: "MAN TGS Truck",
    driver: "Demo Driver",
    route: "Windhoek → Walvis Bay",
    progress: "65%",
    status: "On Route",
  },
  {
    vehicle: "Toyota Hilux",
    driver: "Local Delivery Partner",
    route: "Okahandja → Swakopmund",
    progress: "25%",
    status: "Departed",
  },
];

export default function LiveTrackingPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>LIVE OPERATIONS</p>
        <h1 style={titleStyle}>Live Trip Tracking</h1>
        <p style={descStyle}>
          Track active trips, cargo movement, transporter progress, and delivery
          status across Namibia and Southern Africa.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/fleet-dashboard" style={primaryButtonStyle}>
            Fleet Dashboard
          </Link>

          <Link href="/trip-offers" style={secondaryButtonStyle}>
            View Trips
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>ACTIVE MOVEMENTS</p>
          <h2 style={sectionTitleStyle}>Trips Currently In Progress</h2>
          <p style={sectionTextStyle}>
            Later this can connect to GPS, driver check-ins, delivery updates,
            and customer tracking links.
          </p>
        </div>

        <div style={gridStyle}>
          {trips.map((trip) => (
            <article key={trip.vehicle} style={cardStyle}>
              <div style={statusStyle}>{trip.status}</div>

              <h3 style={cardTitleStyle}>{trip.vehicle}</h3>

              <p style={cardTextStyle}>
                <strong>Driver:</strong> {trip.driver}
              </p>

              <p style={cardTextStyle}>
                <strong>Route:</strong> {trip.route}
              </p>

              <p style={cardTextStyle}>
                <strong>Progress:</strong> {trip.progress}
              </p>

              <div style={progressWrapStyle}>
                <div
                  style={{
                    ...progressBarStyle,
                    width: trip.progress,
                  }}
                />
              </div>

              <div style={cardActionsStyle}>
                <Link href="/booking-requests" style={darkButtonStyle}>
                  View Booking
                </Link>

                <Link href="/cargo-matching" style={lightButtonStyle}>
                  Cargo Match
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
  maxWidth: 1100,
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
  background: "#dcfce7",
  color: "#166534",
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

const progressWrapStyle = {
  width: "100%",
  height: 12,
  background: "#e5e7eb",
  borderRadius: 999,
  overflow: "hidden",
  marginTop: 14,
};

const progressBarStyle = {
  height: "100%",
  background: "#f97316",
  borderRadius: 999,
};

const cardActionsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap" as const,
  marginTop: 24,
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