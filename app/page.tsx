// @ts-nocheck
"use client";

import Link from "next/link";

const features = [
  {
    title: "Cargo Requests",
    icon: "📦",
    text: "Post cargo needs and connect with transporters who can move goods across Namibia and Southern Africa.",
    href: "/request-cargo",
  },
  {
    title: "Marketplace Store",
    icon: "🛒",
    text: "Browse products from suppliers, warehouses, and trade partners in one connected marketplace.",
    href: "/store",
  },
  {
    title: "Warehouses",
    icon: "🏭",
    text: "Connect storage facilities, inventory, and product movement into the NamLogix trade network.",
    href: "/warehouses",
  },
  {
    title: "Transport Services",
    icon: "🚕",
    text: "Request local transport, hospital trips, cargo movement, and business transport services.",
    href: "/transport",
  },
];

export default function HomePage() {
  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>NAMLOGIX AFRICA</p>

          <h1 style={titleStyle}>
            Connect, Ship, Store, and Trade Across Southern Africa.
          </h1>

          <p style={descStyle}>
            NamLogix Africa connects cargo owners, suppliers, warehouses,
            transporters, drivers, and business partners into one logistics and
            trade marketplace platform.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/request-cargo" style={buttonOrange}>
              📦 Post Cargo
            </Link>

            <Link href="/store" style={buttonBlue}>
              🛒 Visit Store
            </Link>

            <Link href="/contact" style={buttonWhite}>
              Contact Team
            </Link>
          </div>
        </section>

        <section style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Platform</p>
            <h3 style={statValueStyle}>Live</h3>
            <p style={statTextStyle}>Marketplace foundation</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Coverage</p>
            <h3 style={statValueStyle}>SADC</h3>
            <p style={statTextStyle}>Regional trade focus</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Services</p>
            <h3 style={statValueStyle}>Multi</h3>
            <p style={statTextStyle}>Cargo, store, transport</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Goal</p>
            <h3 style={statValueStyle}>Trade</h3>
            <p style={statTextStyle}>Business movement</p>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={formTitleStyle}>🚀 What NamLogix Can Do</h2>

          <p style={formDescStyle}>
            The platform is being built as a connected logistics, warehouse,
            transport, supplier, and marketplace system.
          </p>

          <div style={gridStyle}>
            {features.map((feature) => (
              <article key={feature.title} style={itemCardStyle}>
                <div style={iconStyle}>{feature.icon}</div>

                <h3 style={itemTitleStyle}>{feature.title}</h3>

                <p style={descriptionStyle}>{feature.text}</p>

                <div style={actionsStyle}>
                  <Link href={feature.href} style={buttonOrangeSmall}>
                    Open
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={{ ...cardStyle, marginTop: 24 }}>
          <div style={splitLayoutStyle}>
            <div>
              <p style={badgeDarkStyle}>WHY NAMLOGIX</p>

              <h2 style={formTitleStyle}>
                One platform for logistics, trade, and transport.
              </h2>

              <p style={descriptionStyle}>
                Instead of building only a cargo website, NamLogix is becoming a
                full trade infrastructure platform where suppliers, warehouses,
                cargo owners, transporters, and customers can work together.
              </p>
            </div>

            <div style={benefitListStyle}>
              <div style={benefitItemStyle}>✅ Post cargo requests</div>
              <div style={benefitItemStyle}>✅ Browse marketplace products</div>
              <div style={benefitItemStyle}>✅ Connect warehouses</div>
              <div style={benefitItemStyle}>✅ Request transport services</div>
              <div style={benefitItemStyle}>✅ Manage business inquiries</div>
            </div>
          </div>

          <div style={actionsStyle}>
            <Link href="/companies" style={buttonBlueSmall}>
              View Companies
            </Link>

            <Link href="/aviation" style={buttonOrangeSmall}>
              Aviation Services
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
  padding: 42,
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
  fontSize: 48,
  fontWeight: 900,
  margin: "12px 0",
  maxWidth: 900,
  lineHeight: 1.1,
};

const descStyle = {
  maxWidth: 800,
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.85)",
  fontSize: 17,
};

const buttonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 26,
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

const actionsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginTop: 18,
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