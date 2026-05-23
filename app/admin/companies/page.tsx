import Link from "next/link";

const companies = [
  {
    name: "NamLogix Transport Partner",
    type: "Transport Company",
    location: "Windhoek",
    services: "Cargo transport, regional delivery",
    status: "Pending Approval",
  },
  {
    name: "Walvis Bay Warehouse Hub",
    type: "Warehouse",
    location: "Walvis Bay",
    services: "Storage, inventory, distribution",
    status: "Approved",
  },
];

export default function AdminCompaniesPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN CONTROL</p>
        <h1 style={titleStyle}>Company Approvals</h1>
        <p style={descStyle}>
          Review business profiles, logos, banners, services, and approval
          status before companies appear publicly.
        </p>
      </section>

      <section style={containerStyle}>
        <div style={topBarStyle}>
          <h2 style={sectionTitleStyle}>Registered Companies</h2>

          <Link href="/admin/dashboard" style={primaryButtonStyle}>
            Back to Admin
          </Link>
        </div>

        <div style={gridStyle}>
          {companies.map((company) => (
            <div key={company.name} style={cardStyle}>
              <div style={statusStyle}>{company.status}</div>

              <h3 style={cardTitleStyle}>{company.name}</h3>

              <p style={cardTextStyle}>
                <strong>Type:</strong> {company.type}
              </p>

              <p style={cardTextStyle}>
                <strong>Location:</strong> {company.location}
              </p>

              <p style={cardTextStyle}>
                <strong>Services:</strong> {company.services}
              </p>

              <div style={buttonRowStyle}>
                <button style={approveButtonStyle}>Approve</button>
                <button style={rejectButtonStyle}>Reject</button>
                <Link href="/company-profile" style={outlineButtonStyle}>
                  View Profile
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
  background: "#1d4ed8",
  color: "white",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const approveButtonStyle = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const rejectButtonStyle = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
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