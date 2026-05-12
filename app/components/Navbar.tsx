"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import {
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Package,
  Truck,
  Warehouse,
  Store,
  Users,
  Plane,
  FileText,
  Mail,
  ScanLine,
  BarChart3,
  Map,
  MapPin,
  Repeat,
  HelpCircle,
  Info,
  Phone,
  Briefcase,
} from "lucide-react";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function toggleDropdown(name: string) {
    setOpenDropdown(openDropdown === name ? null : name);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const navGroups = {
    Marketplace: [
      {
        label: "Services",
        href: "/services",
        icon: Briefcase,
      },
      {
        label: "Find Cargo",
        href: "/cargo-requests",
        icon: Package,
      },
      {
        label: "Trip Offers",
        href: "/trip-offers",
        icon: Truck,
      },
      {
        label: "Cargo Bids",
        href: "/bids",
        icon: BarChart3,
      },
      {
        label: "Trade Routes",
        href: "/trade-routes",
        icon: Map,
      },
      {
        label: "Aviation",
        href: "/aviation",
        icon: Plane,
      },
      {
        label: "Store",
        href: "/store",
        icon: Store,
      },
    ],

    Infrastructure: [
      {
        label: "Public Suppliers",
        href: "/suppliers",
        icon: Users,
      },
      {
        label: "Public Warehouses",
        href: "/warehouses",
        icon: Warehouse,
      },
      {
        label: "Admin Warehouses",
        href: "/admin/warehouses",
        icon: Warehouse,
      },
      {
        label: "Admin Suppliers",
        href: "/admin/suppliers",
        icon: Users,
      },
      {
        label: "Stock Locations",
        href: "/admin/stock-locations",
        icon: MapPin,
      },
      {
        label: "Stock Transactions",
        href: "/admin/stock-transactions",
        icon: Repeat,
      },
      {
        label: "Customs Documents",
        href: "/admin/customs-documents",
        icon: FileText,
      },
      {
        label: "Inquiries",
        href: "/admin/inquiries",
        icon: Mail,
      },
      {
        label: "Barcode Scanner",
        href: "/admin/barcode-scanner",
        icon: ScanLine,
      },
    ],

    Admin: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
      },
      {
        label: "Orders",
        href: "/admin/orders",
        icon: Package,
      },
      {
        label: "Shipments",
        href: "/admin/shipments",
        icon: Truck,
      },
      {
        label: "Users",
        href: "/admin/users",
        icon: Users,
      },
    ],

    Support: [
      {
        label: "About",
        href: "/about",
        icon: Info,
      },
      {
        label: "Help",
        href: "/help",
        icon: HelpCircle,
      },
      {
        label: "Contact",
        href: "/contact",
        icon: Phone,
      },
    ],
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md"
            : "bg-white shadow-sm"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-gray-900">NamLogix</span>{" "}
            <span className="text-blue-700">Africa</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {Object.entries(navGroups).map(([groupName, items]) => (
              <div key={groupName} className="relative">
                <button
                  onClick={() => toggleDropdown(groupName)}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                  {groupName}
                  <ChevronDown className="h-4 w-4" />
                </button>

                {openDropdown === groupName && (
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                    {items.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.href}
                          onClick={() => {
                            router.push(item.href);
                            setOpenDropdown(null);
                          }}
                          className={cn(
                            "flex items-center gap-3 w-full px-4 py-3 text-left text-sm transition",
                            pathname === item.href
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700 hover:bg-gray-50"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/request-cargo"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition"
            >
              + Post Cargo
            </Link>

            <button
              onClick={handleLogout}
              className="border border-red-200 px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 transition md:hidden",
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={cn(
            "h-full w-72 bg-white p-5 shadow-xl transform transition overflow-y-auto",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg">Navigation</h2>

            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {Object.entries(navGroups).map(([groupName, items]) => (
            <div key={groupName} className="mb-6">
              <div className="text-xs font-semibold uppercase text-gray-400 mb-2">
                {groupName}
              </div>

              <div className="space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.href}
                      onClick={() => {
                        router.push(item.href);
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-3 w-full rounded-lg px-3 py-2 text-left text-sm transition",
                        pathname === item.href
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <Link
            href="/request-cargo"
            className="block w-full text-center rounded-lg bg-orange-500 px-4 py-3 text-white font-medium"
          >
            + Post Cargo
          </Link>

          <button
            onClick={handleLogout}
            className="mt-3 w-full rounded-lg border border-red-200 px-4 py-3 text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}