// @ts-nocheck

import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div style={layoutStyle}>
      <aside style={sidebarStyle}>
        <div>
          <h2 style={logoStyle}>NamLogix Admin</h2>

          <p style={subTextStyle}>
            Logistics & Marketplace Control Center
          </p>
        </div>

        <nav style={navStyle}>
          <Link href="/admin/dashboard" style={linkStyle}>
            📊 Dashboard
          </Link>

          <Link href="/cargo-requests" style={linkStyle}>
            📦 Cargo Requests
          </Link>

          <Link href="/trip-offers" style={linkStyle}>
            🚐 Trip Offers
          </Link>

          <Link href="/create-trip" style={linkStyle}>
            ➕ Create Trip
          </Link>

          <Link href="/admin/bookings" style={linkStyle}>
            🎫 Bookings
          </Link>

          <Link href="/admin/inquiries" style={linkStyle}>
            📩 Inquiries
          </Link>

          <Link href="/aviation" style={linkStyle}>
            ✈️ Aviation
          </Link>

          <Link href="/store" style={linkStyle}>
            🛒 Store
          </Link>

          <Link href="/" style={linkStyle}>
            🏠 Back Home
          </Link>
        </nav>
      </aside>

      <main style={contentStyle}>{children}</main>
    </div>
  );
}

const layoutStyle = {
  display: "flex",
  minHeight: "100vh",
  background: "#f8fafc",
};

const sidebarStyle = {
  width: 270,
  background: "#0f172a",
  color: "white",
  padding: "28px 20px",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  borderRight: "1px solid rgba(255,255,255,0.08)",
};

const logoStyle = {
  fontSize: 28,
  fontWeight: 900,
  margin: 0,
};

const subTextStyle = {
  color: "rgba(255,255,255,0.7)",
  marginTop: 8,
  lineHeight: 1.6,
};

const navStyle = {
  display: "grid",
  gap: 10,
  marginTop: 34,
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: 800,
  padding: "14px 16px",
  borderRadius: 14,
  background: "rgba(255,255,255,0.06)",
};

const contentStyle = {
  flex: 1,
  padding: 0,
  overflowX: "hidden" as const,
};