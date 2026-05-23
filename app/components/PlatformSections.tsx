import Link from "next/link";

const sections = [
  {
    icon: "📦",
    title: "Cargo & Freight",
    text: "Post cargo requests, compare transporter bids, and assign shipments.",
    href: "/cargo-requests",
  },
  {
    icon: "💰",
    title: "Bidding Marketplace",
    text: "Transporters compete for cargo jobs with transparent pricing.",
    href: "/bids",
  },
  {
    icon: "🚐",
    title: "Passenger Transport",
    text: "Book local and regional transport for people, workers, and goods.",
    href: "/transport",
  },
  {
    icon: "✈️",
    title: "Aviation Services",
    text: "Support charter flights, cargo flights, tourism routes, and urgent air movement.",
    href: "/aviation",
  },
  {
    icon: "🏬",
    title: "Warehouses",
    text: "Future warehouse dashboards for stock, inventory, storage, and fulfillment.",
    href: "/store",
  },
  {
    icon: "🛒",
    title: "Trade Store",
    text: "Suppliers and warehouses can list products and sell inventory.",
    href: "/store",
  },
];

export default function PlatformSections() {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <p style={badgeStyle}>PLATFORM MODULES</p>
          <h2 style={titleStyle}>One Platform, Many Revenue Streams</h2>
          <p style={descStyle}>
            NamLogix Africa can grow into a logistics, trade, transport,
            aviation, warehousing, and marketplace ecosystem.
          </p>
        </div>

        <div style={gridStyle}>
          {sections.map((item) => (
            <Link key={item.title} href={item.href} style={cardStyle}>
              <div style={iconStyle}>{item.icon}</div>
              <h3 style={cardTitleStyle}>{item.title}</h3>
              <p style={cardTextStyle}>{item.text}</p>
              <span style={linkStyle}>Explore →</span>
            </Link>
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
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 26,
  padding: 30,
  textDecoration: "none",
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const iconStyle = {
  fontSize: 42,
  marginBottom: 18,
};

const cardTitleStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.8,
};

const linkStyle = {
  color: "#1d4ed8",
  fontWeight: 900,
};