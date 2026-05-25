import Link from "next/link";

const approvals = [
  {
    vehicle: "MAN TGS Truck",
    owner: "NamLogix Transport Partner",
    registration: "N 12345 W",
    status: "Pending Approval",
  },
  {
    vehicle: "Toyota Hilux",
    owner: "Local Delivery Partner",
    registration: "N 67890 WH",
    status: "Documents Needed",
  },
];

export default function VehicleApprovalsPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN CONTROL</p>
        <h1 style={titleStyle}>Vehicle Approvals</h1>
        <p style={descStyle}>
          Review transporter vehicles, documents, registration numbers, and
          approval status before they become active on NamLogix Africa.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/fleet-dashboard" style={primaryButtonStyle}>
            Fleet Dashboard
          </Link>

          <Link href="/vehicle-documents" style={secondaryButtonStyle}>
            View Documents
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>APPROVAL QUEUE</p>
          <h2 style={sectionTitleStyle}>Vehicles Awaiting Review</h2>
          <p style={sectionTextStyle}>
            Later this page will connect to Supabase so admins can approve,
            reject, or request more documents from transporters.
          </p>
        </div>

        <div style={gridStyle}>
          {approvals.map((item) => (
            <article key={item.registration} style={cardStyle}>
              <div style={statusStyle}>{item.status}</div>

              <h3 style={cardTitleStyle}>{item.vehicle}</h3>

              <p style={cardTextStyle}>
                <strong>Owner:</strong> {item.owner}
              </p>

              <p style={cardTextStyle}>
                <strong>Registration:</strong> {item.registration}
              </p>

              <div style={cardActionsStyle}>
                <Link href="/vehicle-documents" style={darkButtonStyle}>
                  Review Docs
                </Link>

                <Link href="/my-vehicles" style={lightButtonStyle}>
                  View Vehicle
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
  maxWidth: 800,
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