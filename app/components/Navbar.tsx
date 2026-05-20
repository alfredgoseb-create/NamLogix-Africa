"use client";

import Link from "next/link";
import { CSSProperties, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const links = [
    { label: "Home", href: "/" },
    { label: "Cargo", href: "/cargo-requests" },
    { label: "Post Cargo", href: "/request-cargo" },
    { label: "Trips", href: "/trip-offers" },
    { label: "Create Trip", href: "/create-trip" },
    { label: "Transport", href: "/transport" },
    { label: "Aviation", href: "/aviation" },
    { label: "Store", href: "/store" },
    { label: "Bookings", href: "/admin/bookings" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link href="/" style={brandStyle}>
          <span style={logoStyle}>NL</span>
          <span>
            <strong>NamLogix</strong>
            <small style={smallStyle}>Africa</small>
          </span>
        </Link>

        <div style={desktopLinksStyle}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} style={linkStyle}>
              {link.label}
            </Link>
          ))}
        </div>

        <div style={desktopActionsStyle}>
          <Link href="/login" style={loginStyle}>
            Login
          </Link>

          <Link href="/register" style={registerStyle}>
            Register
          </Link>

          <button onClick={handleLogout} style={logoutStyle}>
            Logout
          </button>
        </div>

        <button onClick={() => setOpen(!open)} style={menuButtonStyle}>
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div style={mobileMenuStyle}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={mobileLinkStyle}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/login"
            style={mobileLoginStyle}
            onClick={() => setOpen(false)}
          >
            Login
          </Link>

          <Link
            href="/register"
            style={mobileRegisterStyle}
            onClick={() => setOpen(false)}
          >
            Register
          </Link>

          <button onClick={handleLogout} style={mobileLogoutStyle}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

const headerStyle: CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  background: "rgba(255,255,255,0.94)",
  backdropFilter: "blur(14px)",
  borderBottom: "1px solid #e5e7eb",
};

const navStyle: CSSProperties = {
  maxWidth: 1320,
  margin: "0 auto",
  padding: "14px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 18,
};

const brandStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "#0f172a",
  textDecoration: "none",
  fontSize: 18,
  flexShrink: 0,
};

const logoStyle: CSSProperties = {
  width: 42,
  height: 42,
  borderRadius: 14,
  background: "linear-gradient(135deg, #1d4ed8, #f97316)",
  color: "white",
  display: "grid",
  placeItems: "center",
  fontWeight: 900,
};

const smallStyle: CSSProperties = {
  display: "block",
  color: "#64748b",
  fontSize: 12,
  marginTop: -2,
};

const desktopLinksStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 14,
  flexWrap: "wrap",
};

const linkStyle: CSSProperties = {
  color: "#334155",
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 14,
};

const desktopActionsStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  flexShrink: 0,
};

const loginStyle: CSSProperties = {
  color: "#1d4ed8",
  textDecoration: "none",
  fontWeight: 900,
};

const registerStyle: CSSProperties = {
  background: "#1d4ed8",
  color: "white",
  padding: "10px 14px",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: 900,
};

const logoutStyle: CSSProperties = {
  background: "#f97316",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const menuButtonStyle: CSSProperties = {
  display: "none",
  background: "#0f172a",
  color: "white",
  border: "none",
  borderRadius: 12,
  padding: "10px 13px",
  fontSize: 18,
  cursor: "pointer",
};

const mobileMenuStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  padding: "16px 24px 22px",
  borderTop: "1px solid #e5e7eb",
  background: "white",
};

const mobileLinkStyle: CSSProperties = {
  color: "#0f172a",
  textDecoration: "none",
  fontWeight: 800,
  padding: "12px",
  borderRadius: 12,
  background: "#f8fafc",
};

const mobileLoginStyle: CSSProperties = {
  ...mobileLinkStyle,
  color: "#1d4ed8",
};

const mobileRegisterStyle: CSSProperties = {
  ...mobileLinkStyle,
  background: "#1d4ed8",
  color: "white",
};

const mobileLogoutStyle: CSSProperties = {
  background: "#f97316",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};