import Link from "next/link";

const plans = [
  {
    name: "Cargo Owner",
    price: "Free to Start",
    description: "Post cargo requests and receive transporter interest.",
    features: ["Post cargo", "Track bookings", "Compare transporters"],
  },
  {
    name: "Transporter",
    price: "Commission Based",
    description: "Register vehicles, receive jobs, and grow your transport business.",
    features: ["List vehicles", "Receive bookings", "Build trust profile"],
  },
  {
    name: "Warehouse / Supplier",
    price: "Marketplace Plan",
    description: "List products, manage stock, and sell from warehouse inventory.",
    features: ["List products", "Manage inventory", "Receive orders"],
  },
];

export default function PricingPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>BUSINESS MODEL</p>
        <h1 style={titleStyle}>Pricing & Platform Fees</h1>
        <p style={descStyle}>
          NamLogix Africa can earn from bookings, transporter commissions,
          warehouse listings, supplier sales, premium profiles, and future
          enterprise logistics tools.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/transporters" style={primaryButtonStyle}>
            Find Transporters
          </Link>

          <Link href="/store" style={secondaryButtonStyle}>
            Visit Store
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={gridStyle}>
          {plans.map((plan) => (
            <article key={plan.name} style={cardStyle}>
              <div style={badgePlanStyle}>{plan.name}</div>

              <h2 style={priceStyle}>{plan.price}</h2>

              <p style={cardTextStyle}>{plan.description}</p>

              <ul style={listStyle}>
                {plan.features.map((feature) => (
                  <li key={feature} style={listItemStyle}>
                    ✅ {feature}
                  </li>
                ))}
              </ul>

              <Link href="/contact" style={darkButtonStyle}>
                Get Started
              </Link>
            </article>
          ))}
        </div>

        <div style={noticeStyle}>
          <h3 style={noticeTitleStyle}>Recommended starting model</h3>
          <p style={noticeTextStyle}>
            Start free for users, then charge transporters a small success fee
            after confirmed bookings. Later add subscriptions for verified
            companies, warehouse sellers, and premium visibility.
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
  gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 30,
  padding: 30,
  border: "1px solid #e5e7eb",
  boxShadow: "0 14px 35px rgba(15,23,42,0.07)",
};

const badgePlanStyle = {
  display: "inline-block",
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
};

const priceStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
};

const listStyle = {
  padding: 0,
  margin: "22px 0",
  listStyle: "none",
  display: "grid",
  gap: 10,
};

const listItemStyle = {
  color: "#334155",
  fontWeight: 800,
};

const darkButtonStyle = {
  display: "inline-block",
  background: "#0f172a",
  color: "white",
  padding: "13px 16px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const noticeStyle = {
  marginTop: 40,
  background: "#fff7ed",
  border: "1px solid #fed7aa",
  borderRadius: 28,
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