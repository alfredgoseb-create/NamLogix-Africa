"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link href="/" style={logoStyle}>
          NamLogix Africa
        </Link>

        <div style={desktopLinksStyle}>
          <Link href="/" style={linkStyle}>
            Home
          </Link>

          <Link href="/cargo-requests" style={linkStyle}>
            Cargo
          </Link>

          <Link href="/trip-offers" style={linkStyle}>
            Trips
          </Link>

          <Link href="/store" style={linkStyle}>
            Store
          </Link>

          <Link href="/bids" style={linkStyle}>
            Bids
          </Link>

          <Link href="/aviation" style={linkStyle}>
            Aviation
          </Link>

          <Link href="/contact" style={linkStyle}>
            Contact
          </Link>

          <Link href="/admin/dashboard" style={linkStyle}>
            Admin
          </Link>
        </div>

        <div style={rightSectionStyle}>
          <Link href="/login" style={loginStyle}>
            Login
          </Link>

          <button onClick={handleLogout} style={logoutStyle}>
            Logout
          </button>

          <button
            onClick={() => setOpen(!open)}
            style={mobileButtonStyle}
          >
            ☰
          </button>
        </div>
      </nav>

      {open && (
        <div style={mobileMenuStyle}>
          <Link href="/" style={mobileLinkStyle}>
            Home
          </Link>

          <Link href="/cargo-requests" style={mobileLinkStyle}>
            Cargo
          </Link>

          <Link href="/trip-offers" style={mobileLinkStyle}>
            Trips
          </Link>

          <Link href="/store" style={mobileLinkStyle}>
            Store
          </Link>

          <Link href="/bids" style={mobileLinkStyle}>
            Bids
          </Link>

          <Link href="/aviation" style={mobileLinkStyle}>
            Aviation
          </Link>

          <Link href="/contact" style={mobileLinkStyle}>
            Contact
          </Link>

          <Link href="/admin/dashboard" style={mobileLinkStyle}>
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}

const headerStyle = {
  position: "sticky" as const,
  top: 0,
  zIndex: 50,
  background: "white",
  borderBottom: "1px solid #e5e7eb",
};

const navStyle = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "16px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 20,
};

const logoStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
  textDecoration: "none",
};

const desktopLinksStyle = {
  display: "flex",
  alignItems: "center",
  gap: 18,
};

const linkStyle = {
  color: "#334155",
  textDecoration: "none",
  fontWeight: 700,
};

const rightSectionStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const loginStyle = {
  color: "#1d4ed8",
  fontWeight: 800,
  textDecoration: "none",
};

const logoutStyle = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 800,
  cursor: "pointer",
};

const mobileButtonStyle = {
  display: "none",
  background: "#1d4ed8",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 900,
  cursor: "pointer",
};

const mobileMenuStyle = {
  padding: 20,
  display: "grid",
  gap: 12,
  borderTop: "1px solid #e5e7eb",
};

const mobileLinkStyle = {
  color: "#334155",
  textDecoration: "none",
  fontWeight: 700,
};