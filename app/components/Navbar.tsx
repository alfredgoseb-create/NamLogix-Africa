"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/cargo-requests", label: "Cargo" },
  { href: "/request-cargo", label: "Post Cargo" },
  { href: "/booking-create", label: "Bookings" },
  { href: "/my-vehicles", label: "Vehicles" },
  { href: "/vehicle-register", label: "Register Vehicle" },
  { href: "/driver-profiles", label: "Drivers" },
  { href: "/driver-register", label: "Register Driver" },
  { href: "/transporters", label: "Transporters" },
  { href: "/fleet-dashboard", label: "Fleet" },
  { href: "/live-tracking", label: "Tracking" },
  { href: "/track-shipment", label: "Track Shipment" },
  { href: "/tracking-history", label: "Tracking History" },
  { href: "/delivery-status", label: "Delivery Status" },
  { href: "/shipment-receipt", label: "Shipment Receipt" },
  { href: "/warehouse-network", label: "Warehouses" },
  { href: "/inventory-management", label: "Inventory" },
  { href: "/supplier-dashboard", label: "Suppliers" },
  { href: "/store", label: "Store" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/drivers", label: "Drivers" },
  { href: "/admin/vehicles", label: "Vehicles" },
  { href: "/admin/vehicle-approvals", label: "Vehicle Approvals" },
  { href: "/admin/vehicle-documents", label: "Vehicle Docs" },
  { href: "/admin/transporter-management", label: "Transporters" },
  { href: "/admin/warehouse-management", label: "Warehouses" },
  { href: "/admin/supplier-management", label: "Suppliers" },
  { href: "/admin/inventory-management", label: "Inventory" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/shipments", label: "Shipments" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/booking-management", label: "Bookings" },
  { href: "/admin/tracking-management", label: "Tracking" },
  { href: "/admin/shipment-tracking", label: "Shipment Tracking" },
 { href: "/admin/shipment-assignments", label: "Shipment Assignments" },
 { href: "/admin/delivery-proofs", label: "Delivery Proofs" },
  { href: "/admin/trips", label: "Trips" },
  { href: "/admin/trip-bookings", label: "Trip Bookings" },
  { href: "/admin/cargo-requests", label: "Cargo Requests" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/companies", label: "Companies" },
  { href: "/admin/documents", label: "Documents" },
  { href: "/admin/customs-documents", label: "Customs Docs" },
  { href: "/admin/stock-locations", label: "Stock Locations" },
  { href: "/admin/stock-transactions", label: "Stock Transactions" },
  { href: "/admin/barcode-scanner", label: "Barcode Scanner" },
  { href: "/admin/shipment-invoices", label: "Shipment Invoices" },
  { href: "/admin/support", label: "Support" },
  { href: "/admin/settings", label: "Settings" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link href="/" style={logoStyle}>
          NamLogix Africa
        </Link>

        <div style={desktopNavStyle}>
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} style={linkStyle}>
              {link.label}
            </Link>
          ))}

          <div style={adminWrapperStyle}>
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              style={adminButtonStyle}
            >
              Admin ▾
            </button>

            {adminOpen && (
              <div style={adminDropdownStyle}>
                {adminLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={dropdownLinkStyle}
                    onClick={() => setAdminOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        </div>

        <button
          style={mobileButtonStyle}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {mobileOpen && (
        <div style={mobileMenuStyle}>
          {mainLinks.map((link) => (
            <Link
              key={`mobile-${link.href}`}
              href={link.href}
              style={mobileLinkStyle}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div style={mobileAdminTitleStyle}>Admin Menu</div>

          <div style={mobileAdminScrollStyle}>
            {adminLinks.map((link) => (
              <Link
                key={`admin-mobile-${link.href}`}
                href={link.href}
                style={mobileLinkStyle}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button onClick={handleLogout} style={mobileLogoutStyle}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

const headerStyle = {
  position: "sticky" as const,
  top: 0,
  zIndex: 999,
  background: "#0f172a",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

const containerStyle = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "14px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 20,
};

const logoStyle = {
  color: "white",
  fontSize: 24,
  fontWeight: 900,
  textDecoration: "none",
  whiteSpace: "nowrap" as const,
};

const desktopNavStyle = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  flexWrap: "wrap" as const,
};

const linkStyle = {
  color: "rgba(255,255,255,0.88)",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 14,
};

const adminWrapperStyle = {
  position: "relative" as const,
};

const adminButtonStyle = {
  background: "#1e293b",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 800,
};

const adminDropdownStyle = {
  position: "absolute" as const,
  top: 52,
  right: 0,
  width: 280,
  maxHeight: 420,
  overflowY: "auto" as const,
  background: "white",
  borderRadius: 18,
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  padding: 12,
  display: "flex",
  flexDirection: "column" as const,
  gap: 6,
};

const dropdownLinkStyle = {
  padding: "12px 14px",
  borderRadius: 12,
  textDecoration: "none",
  color: "#0f172a",
  fontWeight: 700,
  background: "#f8fafc",
};

const logoutButtonStyle = {
  background: "#f97316",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 800,
};

const mobileButtonStyle = {
  background: "#1e293b",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 900,
};

const mobileMenuStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 10,
  padding: 20,
  background: "#111827",
};

const mobileLinkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "12px 14px",
  background: "#1e293b",
  borderRadius: 12,
  fontWeight: 700,
};

const mobileAdminTitleStyle = {
  color: "#f97316",
  fontWeight: 900,
  marginTop: 10,
};

const mobileAdminScrollStyle = {
  maxHeight: 300,
  overflowY: "auto" as const,
  display: "flex",
  flexDirection: "column" as const,
  gap: 8,
};

const mobileLogoutStyle = {
  background: "#f97316",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};