export default function TrustSection() {
  const items = [
    {
      icon: "✅",
      title: "Verified Workflows",
      text: "Cargo requests, bids, bookings, and inquiries are managed through structured platform processes.",
    },
    {
      icon: "🔐",
      title: "Admin Control",
      text: "The admin dashboard gives oversight over cargo, bids, transport bookings, and customer messages.",
    },
    {
      icon: "🌍",
      title: "Regional Growth",
      text: "Built for Namibia with future expansion potential across Southern Africa and SADC trade routes.",
    },
  ];

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={leftStyle}>
          <p style={badgeStyle}>WHY TRUST NAMLOGIX</p>

          <h2 style={titleStyle}>
            Built for Real Logistics, Trade, and Transport Operations
          </h2>

          <p style={descStyle}>
            NamLogix Africa is designed as more than a website. It is becoming
            a digital operating system for cargo movement, transporter bidding,
            local transport, aviation services, warehouses, and trade.
          </p>
        </div>

        <div style={gridStyle}>
          {items.map((item) => (
            <div key={item.title} style={cardStyle}>
              <div style={iconStyle}>{item.icon}</div>
              <h3 style={cardTitleStyle}>{item.title}</h3>
              <p style={cardTextStyle}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const sectionStyle = {
  padding: "90px 20px",
  background: "#0f172a",
};

const containerStyle = {
  maxWidth: 1300,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 1.2fr",
  gap: 40,
  alignItems: "center",
};

const leftStyle = {
  color: "white",
};

const badgeStyle = {
  color: "#fdba74",
  fontWeight: 900,
  letterSpacing: 1,
};

const titleStyle = {
  fontSize: 44,
  fontWeight: 900,
  lineHeight: 1.1,
};

const descStyle = {
  color: "rgba(255,255,255,0.78)",
  lineHeight: 1.8,
  fontSize: 17,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
};

const cardStyle = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 24,
  padding: 26,
};

const iconStyle = {
  fontSize: 38,
  marginBottom: 18,
};

const cardTitleStyle = {
  color: "white",
  fontSize: 22,
  fontWeight: 900,
};

const cardTextStyle = {
  color: "rgba(255,255,255,0.72)",
  lineHeight: 1.7,
};