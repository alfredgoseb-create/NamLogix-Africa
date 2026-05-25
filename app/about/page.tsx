import Link from "next/link";

const features = [
  {
    title: "Cargo Marketplace",
    text: "Cargo owners can post transport requests and receive bids from transporters.",
    icon: "📦",
  },
  {
    title: "Inventory Dashboard",
    text: "Businesses can manage products, stock levels, suppliers, and warehouse readiness.",
    icon: "📊",
  },
  {
    title: "Supplier Network",
    text: "Suppliers can connect warehouses, products, inventory, and trade operations.",
    icon: "🏭",
  },
  {
    title: "Warehouse Infrastructure",
    text: "Warehouses can manage storage, dispatch, stock movement, and fulfillment.",
    icon: "🏬",
  },
  {
    title: "Trade Routes",
    text: "Regional logistics routes connect Namibia to Southern African trade corridors.",
    icon: "🛣️",
  },
  {
    title: "Aviation Services",
    text: "Future aviation logistics can support urgent cargo and remote deliveries.",
    icon: "✈️",
  },
];

export default function AboutPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={heroContentStyle}>
          <p style={badgeStyle}>ABOUT NAMLOGIX AFRICA</p>

          <h1 style={titleStyle}>
            NamLogix AFRICA
            <br />
            Trade Infrastructure Platform
          </h1>

          <p style={descStyle}>
            NamLogix Africa is being built as a logistics, trade, inventory,
            warehouse, aviation, and marketplace platform for Namibia and
            Southern Africa.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/request-cargo" style={primaryButtonStyle}>
              📦 Post Cargo
            </Link>

            <Link href="/store" style={secondaryButtonStyle}>
              🛒 Store
            </Link>

            <Link href="/route-planner" style={whiteButtonStyle}>
              🛣️ Routes
            </Link>
          </div>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <h3 style={statValueStyle}>Namibia</h3>
            <p style={statLabelStyle}>Starting market</p>
          </div>

          <div style={statCardStyle}>
            <h3 style={statValueStyle}>SADC</h3>
            <p style={statLabelStyle}>Expansion region</p>
          </div>

          <div style={statCardStyle}>
            <h3 style={statValueStyle}>Trade</h3>
            <p style={statLabelStyle}>Core focus</p>
          </div>

          <div style={statCardStyle}>
            <h3 style={statValueStyle}>Logistics</h3>
            <p style={statLabelStyle}>Infrastructure layer</p>
          </div>
        </div>

        <section style={sectionStyle}>
          <p style={sectionBadgeStyle}>PLATFORM OVERVIEW</p>

          <h2 style={sectionTitleStyle}>
            What NamLogix Africa Is
          </h2>

          <p style={sectionTextStyle}>
            A digital trade backbone for logistics, transport, warehouses,
            suppliers, inventory, cargo movement, and regional trade operations.
          </p>

          <div style={gridStyle}>
            {features.map((item) => (
              <article key={item.title} style={cardStyle}>
                <div style={iconStyle}>{item.icon}</div>

                <h3 style={cardTitleStyle}>{item.title}</h3>

                <p style={cardTextStyle}>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={ctaStyle}>
          <h2 style={ctaTitleStyle}>
            Building the Future of African Logistics
          </h2>

          <p style={ctaTextStyle}>
            NamLogix Africa can grow into a regional logistics, inventory,
            transport, warehouse, supplier, aviation, and trade infrastructure
            platform connecting Namibia with Southern Africa.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/register" style={primaryButtonStyle}>
              Create Account
            </Link>

            <Link href="/pricing" style={secondaryButtonStyle}>
              Pricing
            </Link>

            <Link href="/contact" style={whiteButtonStyle}>
              Contact Team
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

const pageStyle = {
  background: "#f8fafc",
  minHeight: "100vh",
};

const heroStyle = {
  minHeight: "72vh",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.92), rgba(249,115,22,0.88))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "80px 24px",
};

const heroContentStyle = {
  maxWidth: 980,
  textAlign: "center" as const,
  color: "white",
};

const badgeStyle = {
  color: "#fdba74",
  fontWeight: 900,
  letterSpacing: 1.2,
  marginBottom: 18,
};

const titleStyle = {
  fontSize: "clamp(42px, 7vw, 74px)",
  fontWeight: 900,
  lineHeight: 1.05,
  marginBottom: 22,
};

const descStyle = {
  fontSize: 18,
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  maxWidth: 760,
  margin: "0 auto",
};

const buttonRowStyle = {
  display: "flex",
  gap: 14,
  justifyContent: "center",
  flexWrap: "wrap" as const,
  marginTop: 34,
};

const primaryButtonStyle = {
  background: "#f97316",
  color: "white",
  padding: "15px 22px",
  borderRadius: 16,
  textDecoration: "none",
  fontWeight: 900,
};

const secondaryButtonStyle = {
  background: "#1d4ed8",
  color: "white",
  padding: "15px 22px",
  borderRadius: 16,
  textDecoration: "none",
  fontWeight: 900,
};

const whiteButtonStyle = {
  background: "white",
  color: "#0f172a",
  padding: "15px 22px",
  borderRadius: 16,
  textDecoration: "none",
  fontWeight: 900,
};

const containerStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "60px 24px",
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 22,
  marginBottom: 50,
};

const statCardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 26,
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
};

const statValueStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  margin: 0,
};

const statLabelStyle = {
  color: "#64748b",
  marginTop: 10,
};

const sectionStyle = {
  marginTop: 30,
};

const sectionBadgeStyle = {
  color: "#f97316",
  fontWeight: 900,
  letterSpacing: 1,
};

const sectionTitleStyle = {
  fontSize: 40,
  fontWeight: 900,
  color: "#0f172a",
  margin: "10px 0",
};

const sectionTextStyle = {
  color: "#64748b",
  lineHeight: 1.8,
  maxWidth: 760,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
  marginTop: 34,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
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
  marginBottom: 14,
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
};

const ctaStyle = {
  marginTop: 70,
  borderRadius: 30,
  padding: "60px 28px",
  background: "linear-gradient(135deg, #0f172a, #1e40af, #f97316)",
  textAlign: "center" as const,
  color: "white",
};

const ctaTitleStyle = {
  fontSize: 42,
  fontWeight: 900,
  marginBottom: 18,
};

const ctaTextStyle = {
  maxWidth: 760,
  margin: "0 auto",
  color: "rgba(255,255,255,0.86)",
  lineHeight: 1.8,
  fontSize: 17,
};