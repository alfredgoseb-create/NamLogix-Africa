import Link from "next/link";

const warehouses = [
  {
    name: "Windhoek Storage Hub",
    location: "Windhoek",
    services: "General storage, inventory holding, product dispatch",
    capacity: "Medium warehouse",
    status: "Demo Partner",
  },
  {
    name: "Walvis Bay Port Warehouse",
    location: "Walvis Bay",
    services: "Port cargo, import/export storage, freight handling",
    capacity: "Large warehouse",
    status: "High Value Route",
  },
  {
    name: "Northern Trade Storage",
    location: "Oshakati",
    services: "Regional stock holding, supplier goods, rural distribution",
    capacity: "Growing Hub",
    status: "Future Expansion",
  },
];

export default function WarehouseNetworkPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>WAREHOUSE INFRASTRUCTURE</p>

        <h1 style={titleStyle}>Warehouse Network</h1>

        <p style={descStyle}>
          Connect warehouses, suppliers, storage providers, inventory hubs, and
          fulfillment centers into one NamLogix Africa trade infrastructure
          system.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/store" style={primaryButtonStyle}>
            View Store
          </Link>

          <Link href="/inventory" style={secondaryButtonStyle}>
            Inventory Dashboard
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>STORAGE & FULFILLMENT</p>

          <h2 style={sectionTitleStyle}>Available Warehouse Partners</h2>

          <p style={sectionTextStyle}>
            Later this page can connect to Supabase so warehouse owners can list
            available space, services, storage prices, products, and inventory
            availability.
          </p>
        </div>

        <div style={gridStyle}>
          {warehouses.map((warehouse) => (
            <article key={warehouse.name} style={cardStyle}>
              <div style={iconStyle}>🏬</div>

              <div style={statusStyle}>{warehouse.status}</div>

              <h3 style={cardTitleStyle}>{warehouse.name}</h3>

              <p style={cardTextStyle}>
                <strong>Location:</strong> {warehouse.location}
              </p>

              <p style={cardTextStyle}>
                <strong>Services:</strong> {warehouse.services}
              </p>

              <p style={cardTextStyle}>
                <strong>Capacity:</strong> {warehouse.capacity}
              </p>

              <div style={cardActionsStyle}>
                <Link href="/store" style={darkButtonStyle}>
                  View Products
                </Link>

                <Link href="/contact" style={lightButtonStyle}>
                  Contact Warehouse
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div style={noticeStyle}>
          <h3 style={noticeTitleStyle}>Why this page matters</h3>

          <p style={noticeTextStyle}>
            This makes NamLogix Africa more than a transport site. It becomes a
            real trade infrastructure platform where goods can be stored,
            listed, sold, dispatched, and transported through one connected
            system.
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
  maxWidth: 880,
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

const sectionHeaderStyle = {
  marginBottom: 30,
};

const sectionBadgeStyle = {
  color: "#f97316",
  fontWeight: 900,
  letterSpacing: 1,
};

const sectionTitleStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0",
};

const sectionTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
  maxWidth: 800,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const iconStyle = {
  width: 72,
  height: 72,
  borderRadius: 22,
  display: "grid",
  placeItems: "center",
  fontSize: 36,
  background: "#eff6ff",
  marginBottom: 18,
};

const statusStyle = {
  display: "inline-block",
  background: "#fff7ed",
  color: "#c2410c",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
  marginBottom: 16,
};

const cardTitleStyle = {
  fontSize: 25,
  fontWeight: 900,
  color: "#0f172a",
  margin: "0 0 12px",
};

const cardTextStyle = {
  color: "#475569",
  lineHeight: 1.7,
};

const cardActionsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap" as const,
  marginTop: 22,
};

const darkButtonStyle = {
  background: "#0f172a",
  color: "white",
  padding: "12px 15px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const lightButtonStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "12px 15px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const noticeStyle = {
  marginTop: 40,
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  borderRadius: 28,
  padding: 28,
};

const noticeTitleStyle = {
  color: "#1d4ed8",
  fontSize: 24,
  fontWeight: 900,
  margin: "0 0 8px",
};

const noticeTextStyle = {
  color: "#1e3a8a",
  lineHeight: 1.7,
  margin: 0,
};