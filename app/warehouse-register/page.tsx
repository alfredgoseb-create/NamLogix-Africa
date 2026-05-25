import Link from "next/link";

export default function WarehouseRegisterPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>WAREHOUSE PARTNER</p>
        <h1 style={titleStyle}>Register Your Warehouse</h1>
        <p style={descStyle}>
          Allow warehouse owners to join NamLogix Africa, list storage space,
          manage inventory, sell products, and connect with transport services.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/warehouse-network" style={primaryButtonStyle}>
            Warehouse Network
          </Link>

          <Link href="/store" style={secondaryButtonStyle}>
            View Store
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <form style={formStyle}>
          <div style={gridStyle}>
            <label style={labelStyle}>
              Warehouse Name
              <input style={inputStyle} placeholder="Example: Windhoek Storage Hub" />
            </label>

            <label style={labelStyle}>
              Owner / Company Name
              <input style={inputStyle} placeholder="Company or owner name" />
            </label>

            <label style={labelStyle}>
              Location
              <input style={inputStyle} placeholder="Windhoek, Walvis Bay, Oshakati..." />
            </label>

            <label style={labelStyle}>
              Contact Number
              <input style={inputStyle} placeholder="+264..." />
            </label>

            <label style={labelStyle}>
              Warehouse Capacity
              <input style={inputStyle} placeholder="Small, medium, large, square meters..." />
            </label>

            <label style={labelStyle}>
              Services Offered
              <input style={inputStyle} placeholder="Storage, dispatch, cold storage, fulfillment..." />
            </label>
          </div>

          <label style={labelStyle}>
            Description
            <textarea
              style={textareaStyle}
              placeholder="Describe the warehouse, products, storage type, handling services, and trade support."
            />
          </label>

          <div style={noticeStyle}>
            <h3 style={noticeTitleStyle}>Next upgrade</h3>
            <p style={noticeTextStyle}>
              Later we will connect this form to Supabase so warehouse owners
              can create real profiles, upload photos, list products, and manage
              inventory from their dashboard.
            </p>
          </div>

          <button type="button" style={submitButtonStyle}>
            Register Warehouse
          </button>
        </form>
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
  maxWidth: 1000,
  margin: "0 auto",
  padding: "60px 24px",
};

const formStyle = {
  background: "white",
  borderRadius: 30,
  padding: 30,
  border: "1px solid #e5e7eb",
  boxShadow: "0 14px 35px rgba(15,23,42,0.07)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 20,
};

const labelStyle = {
  display: "grid",
  gap: 8,
  color: "#0f172a",
  fontWeight: 900,
  marginBottom: 20,
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  fontSize: 15,
};

const textareaStyle = {
  width: "100%",
  minHeight: 130,
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  fontSize: 15,
};

const noticeStyle = {
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  borderRadius: 24,
  padding: 22,
  marginTop: 10,
  marginBottom: 22,
};

const noticeTitleStyle = {
  color: "#1d4ed8",
  fontSize: 22,
  fontWeight: 900,
  margin: "0 0 8px",
};

const noticeTextStyle = {
  color: "#1e3a8a",
  lineHeight: 1.7,
  margin: 0,
};

const submitButtonStyle = {
  background: "#f97316",
  color: "white",
  border: "none",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};