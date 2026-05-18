"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Package,
  Truck,
  Store,
  Warehouse,
  Users,
  Plane,
  Map,
  LayoutDashboard,
  MessageSquare,
  HandCoins,
  Building2,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Post Cargo", href: "/request-cargo", icon: Package },
  { label: "Cargo Requests", href: "/cargo-requests", icon: Truck },
  { label: "Login", href: "/login", icon: LayoutDashboard },
{ label: "Signup", href: "/signup", icon: Users },
  { label: "Bids", href: "/bids", icon: HandCoins },
  { label: "Trip Offers", href: "/trip-offers", icon: Truck },
  { label: "Trade Routes", href: "/trade-routes", icon: Map },
  { label: "Store", href: "/store", icon: Store },
  { label: "Warehouses", href: "/warehouses", icon: Warehouse },
  { label: "Suppliers", href: "/admin/suppliers", icon: Users },
  { label: "Aviation", href: "/aviation", icon: Plane },
  { label: "Contact", href: "/contact", icon: MessageSquare },
  { label: "Admin", href: "/admin/dashboard", icon: LayoutDashboard },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1220] border-b border-blue-900 shadow-2xl">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-700 to-orange-500 flex items-center justify-center text-white shadow-lg">
            <Building2 className="h-5 w-5" />
          </div>

          <div className="leading-tight">
            <p className="font-black text-lg tracking-tight">
              <span className="text-white">NamLogix</span>{" "}
              <span className="text-orange-400">AFRICA</span>
            </p>

            <p className="text-[11px] text-blue-200 font-semibold">
              Logistics • Trade • Aviation
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon || Home;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-gray-200 hover:bg-blue-800 hover:text-white transition-all duration-200"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden p-2 rounded-xl bg-blue-900 text-white hover:bg-blue-800 transition"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="xl:hidden bg-[#0B1220] border-t border-blue-900 px-6 py-4 shadow-2xl">
          <div className="grid sm:grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon || Home;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-200 hover:bg-blue-800 hover:text-white transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}