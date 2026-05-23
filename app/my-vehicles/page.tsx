import Link from "next/link";

const vehicles = [
  {
    name: "Toyota Hilux",
    type: "Bakkie",
    reg: "N 12345 W",
    capacity: "1 ton",
    route: "Windhoek / Okahandja / Swakopmund",
    status: "Pending Approval",
  },
  {
    name: "MAN Truck",
    type: "Truck",
    reg: "N 67890 WH",
    capacity: "10 tons",
    route: "Windhoek to Walvis Bay",
    status: "Active",
  },
];

export default function MyVehiclesPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>TRANSPORTER DASHBOARD</p>
        <h1 style={titleStyle}>My Registered Vehicles</h1>
        <p style={descStyle}>
          View and manage vehicles registered for cargo, passenger transport,
          delivery, and logistics services.
        </p>
      </section>

      <section style={containerStyle}>
        <div style={topBarStyle}>
          <h2 style={sectionTitleStyle}>Vehicle Fleet</h2>

          <Link href="/vehicle-register" style={primaryButtonStyle}>
            + Register New Vehicle
          </Link>
        </div>

        <div style={gridStyle}>
          {vehicles.map((vehicle) => (
            <div key={vehicle.reg} style={cardStyle}>
              <div style={statusStyle}>{vehicle.status}</div>

              <h3 style={cardTitleStyle}>{vehicle.name}</h3>

              <p style={cardTextStyle}>
                <strong>Type:</strong> {vehicle.type}
              </p>

              <p style={cardTextStyle}>
                <strong>Registration:</strong> {vehicle.reg}
              </p>

              <p style={cardTextStyle}>
                <strong>Capacity:</strong> {vehicle.capacity}
              </p>

              <p style={cardTextStyle}>
                <strong>Route:</strong> {vehicle.route}
              </p>

              <div style={buttonRowStyle}>
                <Link href="/vehicle-register" style={secondaryButtonStyle}>
                  Edit
                </Link>

                <Link href="/trip-offers" style={outlineButtonStyle}>
                  Create Trip
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const pageStyle = {
  background: "#f8fafc",
  minHeight: "100vh",
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
};

const descStyle = {
  maxWidth: 760,
  margin: "0 auto",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  fontSize: 18,
};

const containerStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "60px 24px",
};

const topBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 18,
  flexWrap: "wrap" as const,
  marginBottom: 30,
};

const sectionTitleStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
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

const buttonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap" as const,
  marginTop: 22,
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
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const outlineButtonStyle = {
  background: "#f8fafc",
  color: "#0f172a",
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
  border: "1px solid #cbd5e1",
};