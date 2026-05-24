"use client";

import Link from "next/link";

const shortcuts = [
  { label: "📊 Dashboard", href: "/admin/dashboard", color: "#1d4ed8" },
  { label: "👤 Users", href: "/admin/users", color: "#16a34a" },
  { label: "🚚 Vehicles", href: "/admin/vehicles", color: "#f97316" },
  { label: "🏢 Companies", href: "/admin/companies", color: "#7c3aed" },
  { label: "📄 Documents", href: "/admin/documents", color: "#0f766e" },
  { label: "🚌 Trips", href: "/admin/trips", color: "#be123c" },
  { label: "📈 Analytics", href: "/admin/analytics", color: "#2563eb" },
  { label: "📤 Uploads", href: "/admin/uploads", color: "#ea580c" },
];

export default function SettingsPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>PLATFORM SETTINGS</p>

        <h1 style={titleStyle}>System Settings</h1>

        <p style={descStyle}>
          Manage platform configuration, business details, approval rules,
          upload options, notifications, security, and future admin controls.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/admin/dashboard" style={primaryButtonStyle}>
            📊 Dashboard
          </Link>

          <Link href="/admin/users" style={secondaryButtonStyle}>
            👤 Users
          </Link>

          <Link href="/admin/analytics" style={whiteButtonStyle}>
            📈 Analytics
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Mode</p>
            <h3 style={statValueStyle}>Admin</h3>
            <p style={statTextStyle}>Current access level</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Security</p>
            <h3 style={statValueStyle}>Active</h3>
            <p style={statTextStyle}>Supabase auth ready</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Notifications</p>
            <h3 style={statValueStyle}>Future</h3>
            <p style={statTextStyle}>Alerts and emails</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>System</p>
            <h3 style={statValueStyle}>Ready</h3>
            <p style={statTextStyle}>Platform configuration</p>
          </div>
        </div>

        <section style={cardStyle}>
          <div style={sectionHeaderStyle}>
            <p style={sectionBadgeStyle}>SETTINGS SHORTCUTS</p>

            <h2 style={sectionTitleStyle}>Manage Important Platform Areas</h2>

            <p style={sectionTextStyle}>
              Quickly jump to the most important admin tools and control pages.
            </p>
          </div>

          <div style={shortcutGridStyle}>
            {shortcuts.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  ...shortcutButtonStyle,
                  background: item.color,
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section style={settingsGridStyle}>
          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>Approval Settings</h2>

            <p style={cardTextStyle}>
              Control what needs admin approval before becoming public on the
              platform.
            </p>

            <div style={checkListStyle}>
              <label style={checkStyle}>
                <input type="checkbox" defaultChecked /> Require vehicle
                approval
              </label>

              <label style={checkStyle}>
                <input type="checkbox" defaultChecked /> Require company
                approval
              </label>

              <label style={checkStyle}>
                <input type="checkbox" defaultChecked /> Require document
                verification
              </label>

              <label style={checkStyle}>
                <input type="checkbox" defaultChecked /> Require trip review
              </label>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>Upload Settings</h2>

            <p style={cardTextStyle}>
              Manage upload permissions for logos, banners, vehicle images, and
              documents.
            </p>

            <div style={checkListStyle}>
              <label style={checkStyle}>
                <input type="checkbox" defaultChecked /> Allow logo uploads
              </label>

              <label style={checkStyle}>
                <input type="checkbox" defaultChecked /> Allow banner uploads
              </label>

              <label style={checkStyle}>
                <input type="checkbox" defaultChecked /> Allow vehicle image
                uploads
              </label>

              <label style={checkStyle}>
                <input type="checkbox" defaultChecked /> Allow document uploads
              </label>
            </div>
          </div>
        </section>

        <section style={comingSoonStyle}>
          <div style={comingSoonIconStyle}>⚙️</div>

          <h2 style={comingSoonTitleStyle}>Advanced Settings Coming Soon</h2>

          <p style={comingSoonTextStyle}>
            Future updates will include notifications, AI moderation, analytics,
            escrow settings, payment controls, and platform automation.
          </p>
        </section>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
};

const heroStyle = {
  padding: "80px 24px",
  textAlign: "center" as const,
  color: "white",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.92), rgba(249,115,22,0.88))",
};

const badgeStyle = {
  color: "#fdba74",
  fontWeight: 900,
  letterSpacing: 1,
  marginBottom: 10,
};

const titleStyle = {
  fontSize: 54,
  fontWeight: 900,
  margin: "0 0 14px",
};

const descStyle = {
  maxWidth: 820,
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
  background: "#1d4ed8",
  color: "white",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const whiteButtonStyle = {
  background: "white",
  color: "#0f172a",
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

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
  marginBottom: 32,
};

const statCardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 24,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const statLabelStyle = {
  color: "#64748b",
  fontWeight: 900,
  margin: 0,
};

const statValueStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0",
};

const statTextStyle = {
  color: "#64748b",
  margin: 0,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 30,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
};

const sectionHeaderStyle = {
  marginBottom: 24,
};

const sectionBadgeStyle = {
  color: "#f97316",
  fontWeight: 900,
  letterSpacing: 1,
  margin: 0,
};

const sectionTitleStyle = {
  fontSize: 32,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0",
};

const sectionTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
  margin: 0,
};

const shortcutGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: 14,
};

const shortcutButtonStyle = {
  color: "white",
  padding: "14px 16px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
  textAlign: "center" as const,
};

const settingsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 24,
  marginTop: 32,
};

const cardTitleStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
  marginBottom: 12,
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
};

const checkListStyle = {
  display: "grid",
  gap: 14,
  marginTop: 20,
};

const checkStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "#334155",
  fontWeight: 800,
  background: "#f8fafc",
  padding: "13px 14px",
  borderRadius: 14,
  border: "1px solid #e2e8f0",
};

const comingSoonStyle = {
  marginTop: 32,
  background: "white",
  borderRadius: 28,
  padding: "50px 24px",
  textAlign: "center" as const,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
};

const comingSoonIconStyle = {
  fontSize: 52,
  marginBottom: 18,
};

const comingSoonTitleStyle = {
  fontSize: 30,
  fontWeight: 900,
  color: "#0f172a",
  marginBottom: 12,
};

const comingSoonTextStyle = {
  maxWidth: 760,
  margin: "0 auto",
  color: "#64748b",
  lineHeight: 1.8,
};