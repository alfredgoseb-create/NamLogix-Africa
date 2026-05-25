import Link from "next/link";

const inventoryItems = [
  {
    product: "Cement Bags",
    warehouse: "Windhoek Storage Hub",
    stock: "250 units",
    status: "In Stock",
  },
  {
    product: "Retail Goods",
    warehouse: "Walvis Bay Port Warehouse",
    stock: "84 boxes",
    status: "Ready for Dispatch",
  },
  {
    product: "Building Materials",
    warehouse: "Northern Trade Storage",
    stock: "Low Stock",
    status: "Restock Needed",
  },
];

export default function InventoryManagementPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>INVENTORY CONTROL</p>
        <h1 style={titleStyle}>Inventory Management</h1>
        <p style={descStyle}>
          Track warehouse stock, product availability, dispatch readiness,
          supplier goods, and marketplace inventory from one central system.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/warehouse-dashboard" style={primaryButtonStyle}>
            Warehouse Dashboard
          </Link>

          <Link href="/store" style={secondaryButtonStyle}>
            View Store
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>STOCK OVERVIEW</p>
          <h2 style={sectionTitleStyle}>Warehouse Inventory Items</h2>
          <p style={sectionTextStyle}>
            Later this page will connect to Supabase so warehouses can add,
            edit, reduce, restock, and sell real products from their inventory.
          </p>
        </div>

        <div style={gridStyle}>
          {inventoryItems.map((item) => (
            <article key={item.product} style={cardStyle}>
              <div style={statusStyle}>{item.status}</div>

              <h3 style={cardTitleStyle}>{item.product}</h3>

              <p style={cardTextStyle}>
                <strong>Warehouse:</strong> {item.warehouse}
              </p>

              <p style={cardTextStyle}>
                <strong>Stock:</strong> {item.stock}
              </p>

              <div style={cardActionsStyle}>
                <Link href="/store" style={darkButtonStyle}>
                  View Product
                </Link>

                <Link href="/cargo-matching" style={lightButtonStyle}>
                  Arrange Delivery
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div style={noticeStyle}>
          <h3 style={noticeTitleStyle}>What inventory means here</h3>
          <p style={noticeTextStyle}>
            Inventory means the products and stock already stored inside a
            warehouse. NamLogix Africa can help warehouses list those products,
            manage quantities, sell items online, and arrange transport after a
            customer orders.
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
  maxWidth: 760,
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
  fontSize: 25,
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