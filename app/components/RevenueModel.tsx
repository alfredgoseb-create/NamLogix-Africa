export default function RevenueModel() {
  const items = [
    {
      icon: "💰",
      title: "Commission on Bids",
      text: "NamLogix can earn a small percentage when a cargo owner accepts a transporter bid.",
    },
    {
      icon: "🏬",
      title: "Supplier Listings",
      text: "Warehouses and suppliers can pay to list products or promote items in the store.",
    },
    {
      icon: "🚐",
      title: "Transport Bookings",
      text: "The platform can charge service fees for local and regional transport bookings.",
    },
    {
      icon: "✈️",
      title: "Aviation Leads",
      text: "Aviation companies can pay for customer leads, listings, or featured services.",
    },
  ];

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <p style={badgeStyle}>REVENUE MODEL</p>

          <h2 style={titleStyle}>How NamLogix Africa Can Make Money</h2>

          <p style={descStyle}>
            The platform can generate income from logistics transactions,
            marketplace listings, transport bookings, aviation leads, and
            future premium business tools.
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
  background: "#f8fafc",
};

const containerStyle = {
  maxWidth: 1300,
  margin: "0 auto",
};

const headerStyle = {
  textAlign: "center" as const,
  marginBottom: 56,
};

const badgeStyle = {
  color: "#f97316",
  fontWeight: 900,
  letterSpacing: 1,
};

const titleStyle = {
  fontSize: 44,
  fontWeight: 900,
  color: "#0f172a",
};

const descStyle = {
  maxWidth: 780,
  margin: "0 auto",
  color: "#64748b",
  lineHeight: 1.8,
  fontSize: 17,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 30,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const iconStyle = {
  fontSize: 42,
  marginBottom: 18,
};

const cardTitleStyle = {
  fontSize: 23,
  fontWeight: 900,
  color: "#0f172a",
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.8,
};