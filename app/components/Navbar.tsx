"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/cargo-requests", label: "Cargo" },
  { href: "/request-cargo", label: "Post Cargo" },
  { href: "/trip-offers", label: "Trips" },
  { href: "/create-trip", label: "Create Trip" },
  { href: "/booking-requests", label: "Bookings" },
  { href: "/booking-create", label: "Create Booking" },
  { href: "/my-vehicles", label: "Vehicles" },
  { href: "/vehicle-register", label: "Register Vehicle" },
  { href: "/vehicle-documents", label: "Documents" },
  { href: "/driver-profiles", label: "Drivers" },
  { href: "/transporters", label: "Transporters" },
  { href: "/transport-company", label: "Company Profile" },
  { href: "/cargo-matching", label: "Cargo Match" },
  { href: "/fleet-dashboard", label: "Fleet Dashboard" },
  { href: "/live-tracking", label: "Live Tracking" },
  { href: "/tracking-create", label: "Create Tracking" },
  { href: "/customer-tracking", label: "Track Booking" },
  { href: "/warehouse-network", label: "Warehouses" },
  { href: "/warehouse-register", label: "Register Warehouse" },
  { href: "/warehouse-dashboard", label: "Warehouse Dashboard" },
  { href: "/inventory-management", label: "Inventory" },
  { href: "/inventory-add", label: "Add Inventory" },
  { href: "/supplier-dashboard", label: "Supplier Dashboard" },
  { href: "/supplier-register", label: "Register Supplier" },
  { href: "/store", label: "Store" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/route-planner", label: "Route Planner" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/aviation", label: "Aviation" },
  { href: "/contact", label: "Contact" },
];

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/vehicle-approvals", label: "Vehicle Approvals" },
  { href: "/admin/transporter-management", label: "Transporters" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/shipments", label: "Shipments" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/analytics", label: "Analytics" },
    { href: "/admin/warehouse-management", label: "Warehouses" },
  { href: "/admin/supplier-management", label: "Suppliers" },
  { href: "/admin/booking-management", label: "Bookings" },
  { href: "/admin/tracking-management", label: "Tracking" },
  { href: "/customer-tracking", label: "Customer Tracking" },
  { href: "/admin/settings", label: "Settings" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  function closeMobileMenu() {
    setOpen(false);
    setAdminOpen(false);
  }

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link href="/" style={logoStyle}>
          NamLogix Africa
        </Link>

        <div className="desktop-nav-links" style={desktopLinksStyle}>
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} style={linkStyle}>
              {link.label}
            </Link>
          ))}

          <div
            style={adminDropdownStyle}
            onMouseEnter={() => setAdminOpen(true)}
            onMouseLeave={() => setAdminOpen(false)}
          >
            <button style={adminButtonStyle}>Admin ▾</button>

            {adminOpen && (
              <div style={adminMenuStyle}>
                {adminLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={adminMenuLinkStyle}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
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
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={mobileLinkStyle}
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={() => setAdminOpen(!adminOpen)}
            style={mobileAdminButtonStyle}
          >
            Admin Menu {adminOpen ? "▲" : "▼"}
          </button>

          {adminOpen && (
            <div style={mobileAdminMenuStyle}>
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={mobileAdminLinkStyle}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}

const headerStyle = {
  position: "sticky" as const,
  top: 0,
  zIndex: 100,
  background: "rgba(255,255,255,0.96)",
  backdropFilter: "blur(14px)",
  borderBottom: "1px solid #e5e7eb",
};

const navStyle = {
  maxWidth: 1500,
  margin: "0 auto",
  padding: "14px 18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 14,
};

const logoStyle = {
  fontSize: 22,
  fontWeight: 900,
  color: "#0f172a",
  textDecoration: "none",
  whiteSpace: "nowrap" as const,
};

const desktopLinksStyle = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexWrap: "wrap" as const,
};

const linkStyle = {
  color: "#334155",
  textDecoration: "none",
  fontWeight: 800,
  padding: "9px 10px",
  borderRadius: 12,
  fontSize: 13,
};

const adminDropdownStyle = {
  position: "relative" as const,
};

const adminButtonStyle = {
  background: "#0f172a",
  color: "white",
  border: "none",
  padding: "9px 12px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const adminMenuStyle = {
  position: "absolute" as const,
  right: 0,
  top: "110%",
  minWidth: 240,
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 10,
  display: "grid",
  gap: 6,
  boxShadow: "0 18px 40px rgba(15,23,42,0.16)",
};

const adminMenuLinkStyle = {
  color: "#334155",
  textDecoration: "none",
  fontWeight: 800,
  padding: "10px 12px",
  borderRadius: 12,
  background: "#f8fafc",
};

const rightSectionStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const loginStyle = {
  color: "#1d4ed8",
  fontWeight: 900,
  textDecoration: "none",
  background: "#eff6ff",
  padding: "9px 12px",
  borderRadius: 12,
  fontSize: 13,
};

const logoutStyle = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "9px 12px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
  fontSize: 13,
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

const mobileAdminButtonStyle = {
  background: "#0f172a",
  color: "white",
  border: "none",
  padding: "12px 14px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
  textAlign: "left" as const,
};

const mobileAdminMenuStyle = {
  display: "grid",
  gap: 10,
  padding: 12,
  background: "#f8fafc",
  borderRadius: 14,
  border: "1px solid #e2e8f0",
};

const mobileAdminLinkStyle = {
  color: "#334155",
  textDecoration: "none",
  fontWeight: 800,
  background: "white",
  padding: "11px 13px",
  borderRadius: 12,
  border: "1px solid #e2e8f0",
};