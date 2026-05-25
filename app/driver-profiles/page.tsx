import Link from "next/link";

const drivers = [
  {
    name: "Demo Driver",
    license: "Code CE",
    experience: "8 years",
    location: "Windhoek",
    status: "Verified Soon",
  },
  {
    name: "Regional Transport Driver",
    license: "Code C1",
    experience: "5 years",
    location: "Walvis Bay",
    status: "Pending Review",
  },
];

export default function DriverProfilesPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>TRANSPORTER NETWORK</p>
        <h1 style={titleStyle}>Driver Profiles</h1>
        <p style={descStyle}>
          Build trust by displaying driver experience, license information,
          service areas, and verification status.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/my-vehicles" style={primaryButtonStyle}>
            My Vehicles
          </Link>

          <Link href="/vehicle-documents" style={secondaryButtonStyle}>
            Vehicle Documents
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>DRIVER VERIFICATION</p>
          <h2 style={sectionTitleStyle}>Registered Transport Drivers</h2>
          <p style={sectionTextStyle}>
            This page will later connect to Supabase so transporters can create
            real driver profiles and upload license documents.
          </p>
        </div>

        <div style={gridStyle}>
          {drivers.map((driver) => (
            <article key={driver.name} style={cardStyle}>
              <div style={avatarStyle}>👤</div>

              <div style={statusStyle}>{driver.status}</div>

              <h3 style={cardTitleStyle}>{driver.name}</h3>

              <p style={cardTextStyle}>
                <strong>License:</strong> {driver.license}
              </p>

              <p style={cardTextStyle}>
                <strong>Experience:</strong> {driver.experience}
              </p>

              <p style={cardTextStyle}>
                <strong>Location:</strong> {driver.location}
              </p>

              <div style={cardActionsStyle}>
                <Link href="/vehicle-documents" style={darkButtonStyle}>
                  Upload License
                </Link>

                <Link href="/my-vehicles" style={lightButtonStyle}>
                  View Fleet
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

const avatarStyle = {
  width: 70,
  height: 70,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  fontSize: 34,
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
  marginBottom: 14,
};

const cardTitleStyle = {
  fontSize: 25,
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