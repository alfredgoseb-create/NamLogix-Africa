export default function BusinessMetrics() {
  const metrics = [
    {
      value: "150+",
      label: "Cargo Requests",
      text: "Shipments and logistics inquiries submitted.",
    },
    {
      value: "40+",
      label: "Transporters",
      text: "Drivers and logistics operators on the platform.",
    },
    {
      value: "12",
      label: "Trade Routes",
      text: "Regional cargo and transport corridors.",
    },
    {
      value: "24/7",
      label: "Operations",
      text: "Platform availability across Namibia and SADC.",
    },
  ];

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <p style={badgeStyle}>PLATFORM GROWTH</p>

          <h2 style={titleStyle}>
            Building Africa’s Digital Logistics Infrastructure
          </h2>

          <p style={descStyle}>
            NamLogix Africa is designed to scale into a regional cargo,
            transport, trade, warehousing, and aviation ecosystem.
          </p>
        </div>

        <div style={gridStyle}>
          {metrics.map((metric) => (
            <div key={metric.label} style={cardStyle}>
              <h3 style={valueStyle}>{metric.value}</h3>

              <p style={labelStyle}>{metric.label}</p>

              <p style={textStyle}>{metric.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const sectionStyle = {
  padding: "90px 20px",
  background: "white",
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
  color: "#16a34a",
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
  maxWidth: 760,
  margin: "0 auto",
  color: "#64748b",
  lineHeight: 1.8,
  fontSize: 17,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "#f8fafc",
  borderRadius: 28,
  padding: 32,
  textAlign: "center" as const,
  border: "1px solid #e2e8f0",
};

const valueStyle = {
  fontSize: 52,
  fontWeight: 900,
  color: "#1d4ed8",
  marginBottom: 10,
};

const labelStyle = {
  fontSize: 22,
  fontWeight: 900,
  color: "#0f172a",
  marginBottom: 12,
};

const textStyle = {
  color: "#64748b",
  lineHeight: 1.7,
};