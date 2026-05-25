import Link from "next/link";

const inventory = [
  {
    product: "Cement Bags",
    warehouse: "Windhoek Storage Hub",
    supplier: "Namibia Building Supplies",
    stock: "250 units",
    status: "In Stock",
  },
  {
    product: "Retail Goods",
    warehouse: "Walvis Bay Port Warehouse",
    supplier: "Coastal Trade Supplier",
    stock: "84 boxes",
    status: "Ready for Dispatch",
  },
  {
    product: "Building Materials",
    warehouse: "Northern Trade Storage",
    supplier: "Regional Hardware Supplier",
    stock: "Low Stock",
    status: "Needs Review",
  },
];

export default function AdminInventoryManagementPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN CONTROL</p>
        <h1 style={titleStyle}>Inventory Management</h1>
        <p style={descStyle}>
          Review product stock, warehouse inventory, supplier goods, dispatch
          readiness, and stock movement across NamLogix Africa.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/inventory-management" style={primaryButtonStyle}>
            Public Inventory
          </Link>

          <Link href="/warehouse-dashboard" style={secondaryButtonStyle}>
            Warehouse Dashboard
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>STOCK CONTROL</p>
          <h2 style={sectionTitleStyle}>Inventory Requiring Admin Review</h2>
          <p style={sectionTextStyle}>
            Later this page will connect to Supabase so admins can monitor
            stock levels, approve product listings, audit warehouses, and track
            inventory movement.
          </p>
        </div>

        <div style={gridStyle}>
          {inventory.map((item) => (
            <article key={item.product} style={cardStyle}>
              <div style={statusStyle}>{item.status}</div>

              <h3 style={cardTitleStyle}>{item.product}</h3>

              <p style={cardTextStyle}>
                <strong>Warehouse:</strong> {item.warehouse}
              </p>

              <p style={cardTextStyle}>
                <strong>Supplier:</strong> {item.supplier}
              </p>

              <p style={cardTextStyle}>
                <strong>Stock:</strong> {item.stock}
              </p>

              <div style={cardActionsStyle}>
                <Link href="/inventory-management" style={darkButtonStyle}>
                  Review Stock
                </Link>

                <Link href="/store" style={lightButtonStyle}>
                  View Product
                </Link>
              </div>
            </article>
          ))}
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
  maxWidth: 840,
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
  maxWidth: 1100,
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
  maxWidth: 780,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const statusStyle = {
  display: "inline-block",
  background: "#fff7ed",
  color: "#c2410c",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
  marginBottom: 18,
};

const cardTitleStyle = {
  fontSize: 26,
  fontWeight: 900,
  color: "#0f172a",
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