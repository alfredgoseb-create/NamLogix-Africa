import Link from "next/link";

export default function AdminDocumentsPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN DOCUMENTS</p>
        <h1 style={titleStyle}>Document Center</h1>
        <p style={descStyle}>
          Review company documents, vehicle documents, licenses, certificates,
          and verification files.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/admin/vehicle-documents" style={primaryButtonStyle}>
            Vehicle Documents
          </Link>

          <Link href="/admin/companies" style={secondaryButtonStyle}>
            Company Approvals
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={gridStyle}>
          <article style={cardStyle}>
            <div style={iconStyle}>🚚</div>
            <h2 style={cardTitleStyle}>Vehicle Documents</h2>
            <p style={cardTextStyle}>
              Roadworthy certificates, registration papers, insurance, and
              vehicle compliance files.
            </p>
            <Link href="/admin/vehicle-documents" style={darkButtonStyle}>
              Open Vehicle Docs
            </Link>
          </article>

          <article style={cardStyle}>
            <div style={iconStyle}>🏢</div>
            <h2 style={cardTitleStyle}>Company Documents</h2>
            <p style={cardTextStyle}>
              Business registration, company profiles, tax documents, logos, and
              approval files.
            </p>
            <Link href="/admin/companies" style={darkButtonStyle}>
              Open Companies
            </Link>
          </article>

          <article style={cardStyle}>
            <div style={iconStyle}>👤</div>
            <h2 style={cardTitleStyle}>Driver Documents</h2>
            <p style={cardTextStyle}>
              Driver licenses, IDs, permits, verification records, and safety
              compliance.
            </p>
            <Link href="/admin/drivers" style={darkButtonStyle}>
              Open Drivers
            </Link>
          </article>
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

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 30,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
};

const iconStyle = {
  fontSize: 42,
  marginBottom: 16,
};

const cardTitleStyle = {
  fontSize: 25,
  fontWeight: 900,
  color: "#0f172a",
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
};

const darkButtonStyle = {
  display: "inline-block",
  marginTop: 18,
  background: "#0f172a",
  color: "white",
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};