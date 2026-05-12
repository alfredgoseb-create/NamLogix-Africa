"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "📊",
  },
  {
    label: "Suppliers",
    href: "/admin/suppliers",
    icon: "👥",
  },
  {
    label: "Warehouses",
    href: "/admin/warehouses",
    icon: "🏭",
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: "📦",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 bg-white border-r min-h-screen">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          NamLogix
          <span className="text-orange-500"> AFRICA</span>
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Admin Control Panel
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
                  ? "bg-blue-700 text-white"
                  : "hover:bg-gray-100 text-gray-700"
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
  );
}