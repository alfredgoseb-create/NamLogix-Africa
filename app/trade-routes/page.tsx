// @ts-nocheck
"use client";

import Link from "next/link";

const routes = [
  {
    title: "Windhoek → Walvis Bay",
    type: "Port Corridor",
    icon: "🚢",
    description:
      "A key logistics route for cargo moving between Namibia’s inland trade center and the coastal port.",
  },
  {
    title: "Windhoek → Oshikango",
    type: "Northern Trade",
    icon: "🚚",
    description:
      "Supports trade movement toward the northern border and regional business connections.",
  },
  {
    title: "Windhoek → Johannesburg",
    type: "Cross-Border",
    icon: "🌍",
    description:
      "Regional corridor for goods moving between Namibia and South Africa.",
  },
  {
    title: "Walvis Bay → Zambia",
    type: "Regional Corridor",
    icon: "🛣️",
    description:
      "Strategic route for cargo moving from port access into inland Southern Africa.",
  },
];

export default function TradeRoutesPage() {
  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>NAMLOGIX ROUTES</p>

          <h1 style={titleStyle}>Trade Routes</h1>

          <p style={descStyle}>
            Explore important logistics corridors, cargo movement lanes, and
            regional trade routes that support Namibia and Southern Africa.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/request-cargo" style={buttonOrange}>
              📦 Post Cargo
            </Link>

            <Link href="/cargo-requests" style={buttonBlue}>
              🚚 View Cargo
            </Link>

            <Link href="/trip-offers" style={buttonWhite}>
              🛣️ Trip Offers
            </Link>
          </div>
        </section>

        <section style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Corridors</p>
            <h3 style={statValueStyle}>SADC</h3>
            <p style={statTextStyle}>Regional movement</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Port Access</p>
            <h3 style={statValueStyle}>Walvis</h3>
            <p style={statTextStyle}>Coastal trade hub</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Cargo</p>
            <h3 style={statValueStyle}>Live</h3>
            <p style={statTextStyle}>Route planning</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Network</p>
            <h3 style={statValueStyle}>Trade</h3>
            <p style={statTextStyle}>Business logistics</p>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={formTitleStyle}>🛣️ Major Logistics Routes</h2>

          <p style={formDescStyle}>
            These route examples help NamLogix organize cargo, transport offers,
            warehouse support, and marketplace movement.
          </p>

          <div style={gridStyle}>
            {routes.map((route) => (
              <article key={route.title} style={itemCardStyle}>
                <div style={iconStyle}>{route.icon}</div>

                <div style={cardTopStyle}>
                  <div>
                    <h3 style={itemTitleStyle}>{route.title}</h3>
                    <p style={itemSubStyle}>{route.type}</p>
                  </div>
                </div>

                <p style={descriptionStyle}>{route.description}</p>

                <div style={actionsStyle}>
                  <Link href="/request-cargo" style={buttonOrangeSmall}>
                    Post Cargo
                  </Link>

                  <Link href="/trip-offers" style={buttonBlueSmall}>
                    Find Trip
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={{ ...cardStyle, marginTop: 24 }}>
          <div style={splitLayoutStyle}>
            <div>
              <p style={badgeDarkStyle}>ROUTE INTELLIGENCE</p>

              <h2 style={formTitleStyle}>
                Turn trade routes into real business movement.
              </h2>

              <p style={descriptionStyle}>
                NamLogix can grow into a platform where transporters publish
                available routes, cargo owners post loads, warehouses support
                storage, and suppliers move products through trusted corridors.
              </p>
            </div>

            <div style={benefitListStyle}>
              <div style={benefitItemStyle}>✅ Route-based cargo matching</div>
              <div style={benefitItemStyle}>✅ Transporter trip offers</div>
              <div style={benefitItemStyle}>✅ Warehouse handover points</div>
              <div style={benefitItemStyle}>✅ Supplier product movement</div>
              <div style={benefitItemStyle}>✅ Regional trade visibility</div>
            </div>
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
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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

const cardTopStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 14,
  marginBottom: 12,
};

const itemTitleStyle = {
  fontSize: 20,
  fontWeight: 900,
  margin: 0,
  color: "#0f172a",
};

const itemSubStyle = {
  margin: "6px 0 0",
  color: "#64748b",
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