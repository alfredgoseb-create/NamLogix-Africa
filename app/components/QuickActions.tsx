import Link from "next/link";

const actions = [
  {
    title: "Post Cargo",
    description: "Create a cargo request and receive transporter bids.",
    href: "/request-cargo",
    icon: "📦",
    color: "#1d4ed8",
  },
  {
    title: "Find Transport",
    description: "Browse active trips and transport offers.",
    href: "/trip-offers",
    icon: "🚐",
    color: "#16a34a",
  },
  {
    title: "Transporter Bids",
    description: "View and manage cargo transport bids.",
    href: "/bids",
    icon: "💰",
    color: "#f97316",
  },
  {
    title: "Marketplace Store",
    description: "Buy, sell, and manage warehouse inventory.",
    href: "/store",
    icon: "🛒",
    color: "#7c3aed",
  },
];

export default function QuickActions() {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <p style={badgeStyle}>QUICK ACTIONS</p>
          <h2 style={titleStyle}>
            Everything You Need In One Logistics Platform
          </h2>
          <p style={descStyle}>
            NamLogix Africa connects cargo owners, transporters, suppliers,
            warehouses, and travelers into one digital marketplace.
          </p>
        </div>

        <div style={gridStyle}>
          {actions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              style={{
                ...cardStyle,
                borderTop: `5px solid ${action.color}`,
              }}
            >
              <div style={iconStyle}>{action.icon}</div>
              <h3 style={cardTitleStyle}>{action.title}</h3>
              <p style={cardTextStyle}>{action.description}</p>

              <div style={{ ...buttonStyle, background: action.color }}>
                Open →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const sectionStyle = { padding: "80px 20px" };
const containerStyle = { maxWidth: 1300, margin: "0 auto" };
const headerStyle = { textAlign: "center" as const, marginBottom: 50 };
const badgeStyle = { color: "#1d4ed8", fontWeight: 900, letterSpacing: 1 };
const titleStyle = { fontSize: 42, fontWeight: 900, color: "#0f172a" };
const descStyle = {
  color: "#64748b",
  maxWidth: 760,
  margin: "0 auto",
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
  borderRadius: 24,
  padding: 28,
  textDecoration: "none",
  boxShadow: "0 10px 35px rgba(15,23,42,0.06)",
};
const iconStyle = { fontSize: 42, marginBottom: 20 };
const cardTitleStyle = { fontSize: 24, fontWeight: 900, color: "#0f172a" };
const cardTextStyle = { color: "#64748b", lineHeight: 1.8, marginBottom: 24 };
const buttonStyle = {
  display: "inline-block",
  color: "white",
  padding: "10px 14px",
  borderRadius: 12,
  fontWeight: 800,
};