// @ts-nocheck
"use client";

import Link from "next/link";

const services = [
  {
    title: "Hospital Transport",
    icon: "🏥",
    text: "Safe and reliable transport for patients, clinics, hospitals, and medical appointments.",
  },
  {
    title: "Home to Work",
    icon: "🚕",
    text: "Daily staff and worker transportation services for businesses and individuals.",
  },
  {
    title: "Cargo & Goods",
    icon: "📦",
    text: "Transport goods, packages, stock, and inventory between towns, warehouses, and businesses.",
  },
  {
    title: "Regional Trips",
    icon: "🛣️",
    text: "Book transport across Namibia and Southern Africa using trusted transport operators.",
  },
];

export default function TransportPage() {
  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>NAMLOGIX TRANSPORT</p>

          <h1 style={titleStyle}>Transport Services</h1>

          <p style={descStyle}>
            Book local rides, hospital transport, goods movement, worker
            transport, and regional logistics services across Namibia and
            Southern Africa.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/contact" style={buttonOrange}>
              🚕 Request Transport
            </Link>

            <Link href="/request-cargo" style={buttonBlue}>
              📦 Post Cargo
            </Link>

            <Link href="/trip-offers" style={buttonWhite}>
              🛣️ Trip Offers
            </Link>
          </div>
        </section>

        <section style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Transport</p>
            <h3 style={statValueStyle}>Local</h3>
            <p style={statTextStyle}>City movement</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Cargo</p>
            <h3 style={statValueStyle}>Goods</h3>
            <p style={statTextStyle}>Inventory movement</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Coverage</p>
            <h3 style={statValueStyle}>SADC</h3>
            <p style={statTextStyle}>Regional support</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Support</p>
            <h3 style={statValueStyle}>24/7</h3>
            <p style={statTextStyle}>Transport coordination</p>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={formTitleStyle}>🚕 Transport Categories</h2>

          <p style={formDescStyle}>
            NamLogix transport services can support people, businesses,
            warehouses, hospitals, suppliers, and cargo operators.
          </p>

          <div style={gridStyle}>
            {services.map((service) => (
              <article key={service.title} style={itemCardStyle}>
                <div style={iconStyle}>{service.icon}</div>

                <h3 style={itemTitleStyle}>{service.title}</h3>

                <p style={descriptionStyle}>{service.text}</p>

                <div style={actionsStyle}>
                  <Link href="/contact" style={buttonOrangeSmall}>
                    Request Service
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={{ ...cardStyle, marginTop: 24 }}>
          <div style={splitLayoutStyle}>
            <div>
              <p style={badgeDarkStyle}>SMART MOVEMENT</p>

              <h2 style={formTitleStyle}>
                Connect transport with trade and logistics.
              </h2>

              <p style={descriptionStyle}>
                NamLogix transport services become stronger when connected to
                warehouses, suppliers, cargo requests, and marketplace trade.
                This creates a complete logistics ecosystem instead of only a
                transport booking page.
              </p>
            </div>

            <div style={benefitListStyle}>
              <div style={benefitItemStyle}>✅ Local ride requests</div>
              <div style={benefitItemStyle}>✅ Cargo movement support</div>
              <div style={benefitItemStyle}>✅ Hospital transportation</div>
              <div style={benefitItemStyle}>✅ Business transport services</div>
              <div style={benefitItemStyle}>✅ Regional logistics routes</div>
            </div>
          </div>

          <div style={actionsStyle}>
            <Link href="/contact" style={buttonOrangeSmall}>
              Book Transport
            </Link>

            <Link href="/admin/drivers" style={buttonBlueSmall}>
              Driver Network
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
  marginTop: 18,
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