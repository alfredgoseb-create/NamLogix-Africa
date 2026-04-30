"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navGroups = {
    Marketplace: [
      { label: "📦 Find Cargo", href: "/cargo-requests" },
      { label: "🚛 Find Trips", href: "/trip-offers" },
      { label: "💰 Bids", href: "/bids" },
      { label: "📊 Trade Routes", href: "/trade-routes" },
      { label: "✈️ Aviation", href: "/aviation" },
    ],
    "My Activity": [
      { label: "My Cargo", href: "/my/cargo-requests" },
      { label: "My Trips", href: "/my/trip-offers" },
      { label: "My Bookings", href: "/my/bookings" },
      { label: "My Bids", href: "/my/bids" },
    ],
    Infrastructure: [
      { label: "🏭 Warehouses", href: "/warehouses" },
      { label: "🚚 Vehicles", href: "/vehicles" },
      { label: "📍 Stock Locations", href: "/stock-locations" },
    ],
    Admin: [
      { label: "📈 Dashboard", href: "/admin/dashboard" },
      { label: "👥 Users", href: "/admin/users" },
      { label: "🚛 Shipments", href: "/admin/shipments" },
    ],
  };

  function toggleDropdown(name: string) {
    setOpenDropdown(openDropdown === name ? null : name);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <>
      {/* 🔥 NAVBAR */}
      <nav
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-md"
            : "bg-white shadow-sm"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

          {/* LOGO */}
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-gray-900">NamLogix</span>{" "}
            <span className="text-blue-700">Africa</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-2 md:flex">
            {Object.entries(navGroups).map(([groupName, items]) => (
              <div key={groupName} className="relative">

                <button
                  onClick={() => toggleDropdown(groupName)}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  {groupName}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>

                {openDropdown === groupName && (
                  <div className="absolute left-0 mt-2 w-56 rounded-xl border bg-white shadow-lg overflow-hidden">

                    {items.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => {
                          router.push(item.href);
                          setOpenDropdown(null);
                        }}
                        className={cn(
                          "block w-full px-4 py-2 text-left text-sm transition",
                          pathname === item.href
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {item.label}
                      </button>
                    ))}

                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden items-center gap-3 md:flex">

            {/* CTA BUTTON */}
            <Link
              href="/request-cargo"
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition"
            >
              + Post Cargo
            </Link>

            <span className="text-sm text-gray-500">Trader</span>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* 🔥 MOBILE DRAWER */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 transition md:hidden",
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={cn(
            "h-full w-64 bg-white p-4 shadow-xl transform transition",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-gray-800">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {Object.entries(navGroups).map(([groupName, items]) => (
            <div key={groupName} className="mt-4">
              <div className="text-xs font-semibold uppercase text-gray-400">
                {groupName}
              </div>

              {items.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    router.push(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm",
                    pathname === item.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}

          <Link
            href="/request-cargo"
            className="mt-6 block w-full text-center rounded-lg bg-orange-500 px-4 py-2 text-white"
          >
            + Post Cargo
          </Link>

          <button
            onClick={handleLogout}
            className="mt-3 w-full rounded-lg border border-red-200 px-4 py-2 text-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* SPACER */}
      <div className="h-16" />
    </>
  );
}