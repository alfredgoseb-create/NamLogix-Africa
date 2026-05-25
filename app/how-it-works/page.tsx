import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Post a Request",
    text: "Cargo owners, customers, or warehouses submit a transport request with route, cargo type, date, and contact details.",
  },
  {
    number: "02",
    title: "Match Transporters",
    text: "NamLogix Africa helps connect the request with available vehicles, drivers, transport companies, and service areas.",
  },
  {
    number: "03",
    title: "Confirm Booking",
    text: "The customer and transporter agree on service details, price, pickup, and delivery expectations.",
  },
  {
    number: "04",
    title: "Track & Complete",
    text: "Trips can be tracked through updates until the delivery, ride, or transport job is completed.",
  },
];

export default function HowItWorksPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>PLATFORM GUIDE</p>
        <h1 style={titleStyle}>How NamLogix Africa Works</h1>
        <p style={descStyle}>
          A simple logistics marketplace connecting cargo owners, passengers,
          warehouses, suppliers, transporters, drivers, and aviation services.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/request-cargo" style={primaryButtonStyle}>
            Post Cargo
          </Link>

          <Link href="/transporters" style={secondaryButtonStyle}>
            Find Transporters
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={gridStyle}>
          {steps.map((step) => (
            <article key={step.number} style={cardStyle}>
              <div style={numberStyle}>{step.number}</div>
              <h2 style={cardTitleStyle}>{step.title}</h2>
              <p style={cardTextStyle}>{step.text}</p>
            </article>
          ))}
        </div>

        <div style={noticeStyle}>
          <h3 style={noticeTitleStyle}>Why this page matters</h3>
          <p style={noticeTextStyle}>
            This page helps new users quickly understand the platform. It is
            important before launch because customers and transporters must know
            what to do when they arrive on the site.
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
  maxWidth: 850,
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
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 30,
  padding: 30,
  border: "1px solid #e5e7eb",
  boxShadow: "0 14px 35px rgba(15,23,42,0.07)",
};

const numberStyle = {
  color: "#f97316",
  fontSize: 42,
  fontWeight: 900,
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

const noticeStyle = {
  marginTop: 40,
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  borderRadius: 28,
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