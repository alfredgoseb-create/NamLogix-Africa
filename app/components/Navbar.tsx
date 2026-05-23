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
          <Link href="/" style={linkStyle}>Home</Link>
          <Link href="/cargo-requests" style={linkStyle}>Cargo</Link>
          <Link href="/trip-offers" style={linkStyle}>Trips</Link>
          <Link href="/store" style={linkStyle}>Store</Link>
          <Link href="/bids" style={linkStyle}>Bids</Link>
          <Link href="/aviation" style={linkStyle}>Aviation</Link>
          <Link href="/contact" style={linkStyle}>Contact</Link>
          <Link href="/admin/dashboard" style={linkStyle}>Admin</Link>
        </div>

        <div style={rightSectionStyle}>
          <Link href="/login" style={loginStyle}>
            Login
          </Link>

          <button onClick={handleLogout} style={logoutStyle}>
            Logout
          </button>

          <button onClick={() => setOpen(!open)} style={mobileButtonStyle}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div style={mobileMenuStyle}>
          <Link href="/" style={mobileLinkStyle} onClick={() => setOpen(false)}>Home</Link>
          <Link href="/cargo-requests" style={mobileLinkStyle} onClick={() => setOpen(false)}>Cargo</Link>
          <Link href="/trip-offers" style={mobileLinkStyle} onClick={() => setOpen(false)}>Trips</Link>
          <Link href="/store" style={mobileLinkStyle} onClick={() => setOpen(false)}>Store</Link>
          <Link href="/bids" style={mobileLinkStyle} onClick={() => setOpen(false)}>Bids</Link>
          <Link href="/aviation" style={mobileLinkStyle} onClick={() => setOpen(false)}>Aviation</Link>
          <Link href="/contact" style={mobileLinkStyle} onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/admin/dashboard" style={mobileLinkStyle} onClick={() => setOpen(false)}>Admin</Link>
        </div>
      )}
    </header>
  );
}

const headerStyle = {
  position: "sticky" as const,
  top: 0,
  zIndex: 50,
  background: "rgba(255,255,255,0.96)",
  backdropFilter: "blur(14px)",
  borderBottom: "1px solid #e5e7eb",
};

const navStyle = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "14px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 18,
};

const logoStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
  textDecoration: "none",
  whiteSpace: "nowrap" as const,
};

const desktopLinksStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const linkStyle = {
  color: "#334155",
  textDecoration: "none",
  fontWeight: 800,
  padding: "10px 14px",
  borderRadius: 12,
  transition: "all 0.2s ease",
  background: "transparent",
};

const rightSectionStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const loginStyle = {
  color: "#1d4ed8",
  fontWeight: 900,
  textDecoration: "none",
  background: "#eff6ff",
  padding: "10px 14px",
  borderRadius: 12,
};

const logoutStyle = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const mobileButtonStyle = {
  display: "none",
  background: "#1d4ed8",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const mobileMenuStyle = {
  padding: 20,
  display: "grid",
  gap: 12,
  borderTop: "1px solid #e5e7eb",
  background: "white",
};

const mobileLinkStyle = {
  color: "#334155",
  textDecoration: "none",
  fontWeight: 800,
  background: "#f8fafc",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #e2e8f0",
};