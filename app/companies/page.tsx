// @ts-nocheck
"use client";

import Link from "next/link";

const companyTypes = [
  {
    title: "Suppliers",
    icon: "🏢",
    text: "Businesses that list products, materials, and trade goods on the NamLogix marketplace.",
  },
  {
    title: "Warehouses",
    icon: "🏭",
    text: "Storage partners that support inventory, stock movement, and regional distribution.",
  },
  {
    title: "Transporters",
    icon: "🚚",
    text: "Fleet operators and logistics providers that move cargo across towns and borders.",
  },
  {
    title: "Service Providers",
    icon: "🛠️",
    text: "Companies offering customs, aviation, handling, trade support, and operational services.",
  },
];

export default function CompaniesPage() {
  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>NAMLOGIX BUSINESS NETWORK</p>

          <h1 style={titleStyle}>Companies & Partners</h1>

          <p style={descStyle}>
            Connect suppliers, warehouses, transporters, and trade service
            providers into one regional logistics and marketplace platform.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/contact" style={buttonOrange}>
              🤝 Join Network
            </Link>

            <Link href="/store" style={buttonBlue}>
              🛒 Marketplace
            </Link>

            <Link href="/warehouses" style={buttonWhite}>
              🏭 Warehouses
            </Link>
          </div>
        </section>

        <section style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Suppliers</p>
            <h3 style={statValueStyle}>Trade</h3>
            <p style={statTextStyle}>Product listings</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Warehouses</p>
            <h3 style={statValueStyle}>Stock</h3>
            <p style={statTextStyle}>Storage support</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Transport</p>
            <h3 style={statValueStyle}>Cargo</h3>
            <p style={statTextStyle}>Movement network</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Coverage</p>
            <h3 style={statValueStyle}>SADC</h3>
            <p style={statTextStyle}>Regional trade</p>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={formTitleStyle}>🌍 Company Categories</h2>

          <p style={formDescStyle}>
            NamLogix Africa is designed to support multiple company types
            working together through logistics, storage, transport, and trade.
          </p>

          <div style={gridStyle}>
            {companyTypes.map((company) => (
              <article key={company.title} style={itemCardStyle}>
                <div style={iconStyle}>{company.icon}</div>

                <h3 style={itemTitleStyle}>{company.title}</h3>

                <p style={descriptionStyle}>{company.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ ...cardStyle, marginTop: 24 }}>
          <div style={splitLayoutStyle}>
            <div>
              <p style={badgeDarkStyle}>WHY JOIN NAMLOGIX</p>

              <h2 style={formTitleStyle}>
                Build a connected trade ecosystem.
              </h2>

              <p style={descriptionStyle}>
                Companies can use NamLogix to reach buyers, connect with cargo
                owners, list products, manage inventory, and access transport
                and warehouse support.
              </p>
            </div>

            <div style={benefitListStyle}>
              <div style={benefitItemStyle}>✅ List company services</div>
              <div style={benefitItemStyle}>✅ Connect with customers</div>
              <div style={benefitItemStyle}>✅ Support cargo movement</div>
              <div style={benefitItemStyle}>✅ Join marketplace trade</div>
              <div style={benefitItemStyle}>✅ Build regional visibility</div>
            </div>
          </div>

          <div style={actionsStyle}>
            <Link href="/contact" style={buttonOrangeSmall}>
              Register Interest
            </Link>

            <Link href="/request-cargo" style={buttonBlueSmall}>
              Post Cargo
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f8fc",
  padding: "40px 24px",
};

const containerStyle = {
  maxWidth: 1100,
  margin: "0 auto",
};

const heroStyle = {
  background: "linear-gradient(135deg, #0b1220, #1e3a8a, #f97316)",
  color: "white",
  borderRadius: 28,
  padding: 36,
  marginBottom: 24,
  boxShadow: "0 20px 40px rgba(15,23,42,0.22)",
};

const badgeStyle = {
  color: "#fed7aa",
  fontWeight: 900,
  letterSpacing: 1,
  margin: 0,
};

const badgeDarkStyle = {
  color: "#f97316",
  fontWeight: 900,
  letterSpacing: 1,
  margin: "0 0 10px",
};

const titleStyle = {
  fontSize: 42,
  fontWeight: 900,
  margin: "10px 0",
};

const descStyle = {
  maxWidth: 760,
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.85)",
};

const buttonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 24,
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
  marginBottom: 24,
};

const statCardStyle = {
  background: "white",
  borderRadius: 22,
  padding: 22,
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
};

const statLabelStyle = {
  color: "#64748b",
  fontWeight: 800,
  margin: 0,
};

const statValueStyle = {
  fontSize: 30,
  fontWeight: 900,
  margin: "8px 0",
  color: "#0f172a",
};

const statTextStyle = {
  color: "#64748b",
  margin: 0,
};

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.10)",
};

const formTitleStyle = {
  fontSize: 30,
  fontWeight: 900,
  margin: 0,
  color: "#0f172a",
};

const formDescStyle = {
  color: "#64748b",
  marginTop: 8,
  marginBottom: 24,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 18,
};

const itemCardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: 22,
  padding: 22,
  background: "#ffffff",
  boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
};

const iconStyle = {
  width: 58,
  height: 58,
  borderRadius: 18,
  background: "#f8fafc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 30,
  marginBottom: 16,
};

const itemTitleStyle = {
  fontSize: 20,
  fontWeight: 900,
  margin: 0,
  color: "#0f172a",
};

const descriptionStyle = {
  color: "#64748b",
  lineHeight: 1.7,
  marginTop: 12,
};

const splitLayoutStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
  alignItems: "start",
};

const benefitListStyle = {
  display: "grid",
  gap: 10,
};

const benefitItemStyle = {
  background: "#f8fafc",
  padding: "13px 15px",
  borderRadius: 16,
  color: "#0f172a",
  fontWeight: 800,
};

const actionsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginTop: 22,
};

const buttonBlue = {
  background: "#1d4ed8",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonWhite = {
  background: "white",
  color: "#1d4ed8",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonOrange = {
  background: "#f97316",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonBlueSmall = {
  ...buttonBlue,
  padding: "10px 14px",
  fontSize: 14,
};

const buttonOrangeSmall = {
  ...buttonOrange,
  padding: "10px 14px",
  fontSize: 14,
};