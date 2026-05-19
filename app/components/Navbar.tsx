"use client";

import Link from "next/link";
import { CSSProperties } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const links = [
    { label: "Home", href: "/" },
    { label: "Store", href: "/store" },
    { label: "Companies", href: "/companies" },
    { label: "Post Cargo", href: "/request-cargo" },
    { label: "Cargo", href: "/cargo-requests" },
    { label: "Routes", href: "/trade-routes" },
    { label: "Aviation", href: "/aviation" },
    { label: "Warehouses", href: "/warehouses" },
    { label: "Transport", href: "/transport" },
    { label: "Contact", href: "/contact" },
    { label: "Profile", href: "/profile" },
    { label: "Admin", href: "/admin/dashboard" },
    { label: "Admin Transport", href: "/admin/transport" },
    { label: "Drivers", href: "/admin/drivers" },
    { label: "Inquiries", href: "/admin/inquiries" },
  ];

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link href="/" style={brandStyle}>
          NamLogix <span style={brandAccentStyle}>AFRICA</span>
        </Link>

        <div style={linksWrapStyle}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} style={navLinkStyle}>
              {link.label}
            </Link>
          ))}

          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

const headerStyle: CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  background: "#0b1220",
  borderBottom: "1px solid #1e3a8a",
  boxShadow: "0 8px 20px rgba(15,23,42,0.25)",
};

const navStyle: CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "12px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
};

const brandStyle: CSSProperties = {
  color: "white",
  fontWeight: 900,
  fontSize: 22,
  textDecoration: "none",
  whiteSpace: "nowrap",
};

const brandAccentStyle: CSSProperties = {
  color: "#fb923c",
};

const linksWrapStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "flex-end",
};

const navLinkStyle: CSSProperties = {
  color: "#e5e7eb",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 800,
  padding: "8px 10px",
  borderRadius: 12,
};

const logoutButtonStyle: CSSProperties = {
  background: "#f97316",
  color: "white",
  border: "none",
  borderRadius: 12,
  padding: "8px 12px",
  fontWeight: 900,
  cursor: "pointer",
};