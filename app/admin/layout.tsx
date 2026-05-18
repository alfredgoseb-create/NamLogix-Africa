"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthGuard from "@/app/components/AuthGuard";

const links = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
  { label: "Analytics", href: "/admin/analytics", icon: "📈" },
  { label: "Reports", href: "/admin/reports", icon: "📑" },
  { label: "Suppliers", href: "/admin/suppliers", icon: "👥" },
  { label: "Warehouses", href: "/admin/warehouses", icon: "🏭" },
  { label: "Stock Locations", href: "/admin/stock-locations", icon: "📍" },
  { label: "Stock Transactions", href: "/admin/stock-transactions", icon: "🔄" },
  { label: "Barcode Scanner", href: "/admin/barcode-scanner", icon: "📷" },
  { label: "Orders", href: "/admin/orders", icon: "📦" },
  { label: "Shipments", href: "/admin/shipments", icon: "🚚" },
  { label: "Trade Routes", href: "/admin/trade-routes", icon: "🛣️" },
  { label: "Vehicles", href: "/admin/vehicles", icon: "🚛" },
  { label: "Customs Docs", href: "/admin/customs-documents", icon: "📄" },
  { label: "Inquiries", href: "/admin/inquiries", icon: "📩" },
  { label: "Users", href: "/admin/users", icon: "👤" },
  { label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AuthGuard>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        <aside className="w-full lg:w-72 bg-[#0B1220] border-r border-blue-900 min-h-screen">
          <div className="p-6 border-b border-blue-900">
            <h2 className="text-2xl font-black text-white">
              NamLogix
              <span className="text-orange-400"> AFRICA</span>
            </h2>

            <p className="text-sm text-blue-200 mt-1">
              Logistics & Trade Command Center
            </p>
          </div>

          <div className="p-4 space-y-2">
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    active
                      ? "bg-orange-500 text-white shadow-lg"
                      : "hover:bg-blue-800 text-gray-200"
                  }`}
                >
                  <span>{link.icon}</span>

                  <span className="text-sm font-medium">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}