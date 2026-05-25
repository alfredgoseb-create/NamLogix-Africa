import Link from "next/link";

const documents = [
  {
    title: "Vehicle Registration Certificate",
    status: "Required",
    description: "Proof that the vehicle is legally registered.",
  },
  {
    title: "Roadworthy Certificate",
    status: "Required",
    description: "Confirms that the vehicle is safe to operate.",
  },
  {
    title: "Driver License",
    status: "Required",
    description: "Valid driver license for the vehicle operator.",
  },
  {
    title: "Insurance Document",
    status: "Recommended",
    description: "Insurance cover for cargo, passengers, or transport risk.",
  },
];

export default function VehicleDocumentsPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>FLEET COMPLIANCE</p>
        <h1 style={titleStyle}>Vehicle Documents</h1>
        <p style={descStyle}>
          Upload and manage important vehicle documents for approval,
          verification, safety, and trust on NamLogix Africa.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/my-vehicles" style={primaryButtonStyle}>
            View My Vehicles
          </Link>

          <Link href="/vehicle-register" style={secondaryButtonStyle}>
            Register Vehicle
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={sectionBadgeStyle}>DOCUMENT CHECKLIST</p>
            <h2 style={sectionTitleStyle}>Required Transport Documents</h2>
            <p style={sectionTextStyle}>
              These documents help admins approve transporters and build trust
              between cargo owners, passengers, and vehicle operators.
            </p>
          </div>
        </div>

        <div style={gridStyle}>
          {documents.map((doc) => (
            <article key={doc.title} style={cardStyle}>
              <div style={statusStyle}>{doc.status}</div>

              <h3 style={cardTitleStyle}>{doc.title}</h3>

              <p style={cardTextStyle}>{doc.description}</p>

              <div style={uploadBoxStyle}>
                <p style={uploadIconStyle}>📄</p>
                <p style={uploadTextStyle}>Upload feature coming soon</p>
              </div>

              <button style={uploadButtonStyle}>Upload Document</button>
            </article>
          ))}
        </div>

        <div style={noticeStyle}>
          <h3 style={noticeTitleStyle}>Next upgrade</h3>
          <p style={noticeTextStyle}>
            Later we will connect this page to Supabase Storage so drivers can
            upload real PDFs, images, registration papers, insurance documents,
            and licenses.
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
  margin: 0,
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
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 26,
  padding: 26,
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
  marginBottom: 16,
};

const cardTitleStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
  margin: "0 0 10px",
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
};

const uploadBoxStyle = {
  marginTop: 20,
  border: "2px dashed #cbd5e1",
  borderRadius: 20,
  padding: 24,
  textAlign: "center" as const,
  background: "#f8fafc",
};

const uploadIconStyle = {
  fontSize: 36,
  margin: 0,
};

const uploadTextStyle = {
  color: "#64748b",
  fontWeight: 800,
};

const uploadButtonStyle = {
  width: "100%",
  marginTop: 18,
  background: "#0f172a",
  color: "white",
  border: "none",
  padding: "13px 16px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const noticeStyle = {
  marginTop: 40,
  background: "#fff7ed",
  border: "1px solid #fed7aa",
  borderRadius: 26,
  padding: 28,
};

const noticeTitleStyle = {
  color: "#9a3412",
  fontSize: 24,
  fontWeight: 900,
  margin: "0 0 8px",
};

const noticeTextStyle = {
  color: "#7c2d12",
  lineHeight: 1.7,
  margin: 0,
};