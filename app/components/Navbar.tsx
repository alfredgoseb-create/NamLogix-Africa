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
      { label: "✈️ Aviation Services", href: "/aviation" },
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
      { label: "📈 Admin", href: "/admin/dashboard" },
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
      <nav
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled ? "bg-white/95 shadow-md backdrop-blur-sm" : "bg-white shadow-sm"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="text-2xl font-bold">
              NamLogix <span className="text-blue-700">AFRICA</span>
            </Link>
          </div>

          {/* Desktop menus */}
          <div className="hidden items-center gap-1 md:flex">
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
                  <div className="absolute left-0 mt-1 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                    {items.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => {
                          router.push(item.href);
                          setOpenDropdown(null);
                        }}
                        className={cn(
                          "block w-full px-4 py-2 text-left text-sm",
                          pathname === item.href ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
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

          <div className="hidden items-center gap-3 md:flex">
            <span className="text-sm text-gray-500">Trader</span>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 transform bg-black/50 transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="h-full w-64 bg-white p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-end">
            <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
          {Object.entries(navGroups).map(([groupName, items]) => (
            <div key={groupName} className="mt-4">
              <div className="text-xs font-semibold uppercase text-gray-400">{groupName}</div>
              {items.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    router.push(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm",
                    pathname === item.href ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
          <button
            onClick={handleLogout}
            className="mt-6 w-full rounded-lg border border-red-200 px-4 py-2 text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="h-16" /> {/* spacer for fixed navbar */}
    </>
  );
}