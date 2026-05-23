import Link from "next/link";

export default function VehicleRegisterPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>TRANSPORTER VEHICLE REGISTRATION</p>

        <h1 style={titleStyle}>Register Your Vehicle</h1>

        <p style={descStyle}>
          Add your truck, bakkie, bus, taxi, trailer, or delivery vehicle so it
          can be used for cargo, passenger transport, and logistics jobs on
          NamLogix Africa.
        </p>
      </section>

      <section style={containerStyle}>
        <form style={formStyle}>
          <div style={gridStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Vehicle Owner Name</label>
              <input style={inputStyle} placeholder="Enter owner name" />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Vehicle Type</label>
              <select style={inputStyle}>
                <option>Select vehicle type</option>
                <option>Truck</option>
                <option>Bakkie</option>
                <option>Taxi</option>
                <option>Bus</option>
                <option>Trailer</option>
                <option>Delivery Van</option>
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Vehicle Make</label>
              <input style={inputStyle} placeholder="Toyota, Nissan, MAN..." />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Vehicle Model</label>
              <input style={inputStyle} placeholder="Enter model" />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Registration Number</label>
              <input style={inputStyle} placeholder="N 12345 W" />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Load Capacity</label>
              <input style={inputStyle} placeholder="Example: 3 tons / 15 seats" />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Operating Route</label>
              <input style={inputStyle} placeholder="Windhoek to Walvis Bay" />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Contact Number</label>
              <input style={inputStyle} placeholder="+264..." />
            </div>

            <div style={fullFieldStyle}>
              <label style={labelStyle}>Vehicle Description</label>
              <textarea
                style={textareaStyle}
                placeholder="Describe the vehicle condition, services, cargo type, or passenger capacity..."
              />
            </div>

            <div style={fullFieldStyle}>
              <label style={labelStyle}>Vehicle Photo Upload</label>
              <input type="file" style={inputStyle} />
            </div>
          </div>

          <div style={buttonRowStyle}>
            <button type="submit" style={primaryButtonStyle}>
              Register Vehicle
            </button>

            <Link href="/" style={secondaryButtonStyle}>
              Back Home
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

const pageStyle = {
  background: "#f8fafc",
  minHeight: "100vh",
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
};

const descStyle = {
  maxWidth: 760,
  margin: "0 auto",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  fontSize: 18,
};

const containerStyle = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "60px 24px",
};

const formStyle = {
  background: "white",
  borderRadius: 28,
  padding: 34,
  boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
  border: "1px solid #e5e7eb",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 22,
};

const fieldStyle = {
  display: "grid",
  gap: 8,
};

const fullFieldStyle = {
  display: "grid",
  gap: 8,
  gridColumn: "1 / -1",
};

const labelStyle = {
  fontWeight: 900,
  color: "#0f172a",
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  fontSize: 15,
};

const textareaStyle = {
  ...inputStyle,
  minHeight: 140,
};

const buttonRowStyle = {
  display: "flex",
  gap: 14,
  flexWrap: "wrap" as const,
  marginTop: 30,
};

const primaryButtonStyle = {
  background: "#f97316",
  color: "white",
  border: "none",
  padding: "15px 22px",
  borderRadius: 16,
  fontWeight: 900,
  cursor: "pointer",
};

const secondaryButtonStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "15px 22px",
  borderRadius: 16,
  fontWeight: 900,
  textDecoration: "none",
};