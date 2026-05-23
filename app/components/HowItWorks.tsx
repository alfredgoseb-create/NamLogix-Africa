export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Post Cargo",
      text: "Customers and businesses create cargo requests with pickup, destination, and shipment details.",
      icon: "📦",
    },
    {
      number: "02",
      title: "Receive Bids",
      text: "Transporters and logistics companies submit competitive transport bids.",
      icon: "💰",
    },
    {
      number: "03",
      title: "Assign Transporter",
      text: "Admin or cargo owners review and accept the best transport offer.",
      icon: "🚚",
    },
    {
      number: "04",
      title: "Track Delivery",
      text: "Cargo gets transported while customers monitor progress and delivery.",
      icon: "📍",
    },
  ];

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <p style={badgeStyle}>HOW IT WORKS</p>

          <h2 style={titleStyle}>The Smart Logistics Workflow</h2>

          <p style={descStyle}>
            NamLogix Africa simplifies cargo movement, transporter bidding,
            transport booking, and logistics coordination into one digital
            platform.
          </p>
        </div>

        <div style={gridStyle}>
          {steps.map((step) => (
            <div key={step.number} style={cardStyle}>
              <div style={topStyle}>
                <div style={iconStyle}>{step.icon}</div>
                <div style={numberStyle}>{step.number}</div>
              </div>

              <h3 style={cardTitleStyle}>{step.title}</h3>

              <p style={cardTextStyle}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const sectionStyle = {
  padding: "90px 20px",
  background: "#ffffff",
};

const containerStyle = {
  maxWidth: 1300,
  margin: "0 auto",
};

const headerStyle = {
  textAlign: "center" as const,
  marginBottom: 60,
};

const badgeStyle = {
  color: "#1d4ed8",
  fontWeight: 900,
  letterSpacing: 1,
  marginBottom: 10,
};

const titleStyle = {
  fontSize: 44,
  fontWeight: 900,
  color: "#0f172a",
  marginBottom: 18,
};

const descStyle = {
  color: "#64748b",
  lineHeight: 1.8,
  maxWidth: 760,
  margin: "0 auto",
  fontSize: 17,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "#f8fafc",
  borderRadius: 28,
  padding: 30,
  border: "1px solid #e2e8f0",
};

const topStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 24,
};

const iconStyle = {
  fontSize: 42,
};

const numberStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#cbd5e1",
};

const cardTitleStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
  marginBottom: 14,
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.8,
};