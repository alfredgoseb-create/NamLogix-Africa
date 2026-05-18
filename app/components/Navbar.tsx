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

  const links = [
    { label: "Home", href: "/" },
    { label: "Store", href: "/store" },
    { label: "Companies", href: "/companies" },
    { label: "Post Cargo", href: "/request-cargo" },
    { label: "Cargo", href: "/cargo-requests" },
    { label: "Routes", href: "/trade-routes" },
    { label: "Warehouses", href: "/warehouses" },
    { label: "Contact", href: "/contact" },
    { label: "Profile", href: "/profile" },
    { label: "Admin", href: "/admin/dashboard" },
{ label: "Inquiries", href: "/admin/inquiries" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#0b1220",
        borderBottom: "1px solid #1e3a8a",
        boxShadow: "0 8px 20px rgba(15,23,42,0.25)",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          href="/"
          style={{
            color: "white",
            fontWeight: 900,
            fontSize: 20,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          NamLogix <span style={{ color: "#fb923c" }}>AFRICA</span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "#1e3a8a",
            color: "white",
            border: "none",
            borderRadius: 12,
            padding: "8px 12px",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          Menu
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "#e5e7eb",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 800,
                padding: "8px 10px",
                borderRadius: 12,
              }}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            style={{
              background: "#f97316",
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "8px 12px",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}