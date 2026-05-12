"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

const categories = [
  {
    title: "Construction",
    desc: "Building materials, cement, steel, and industrial products.",
    icon: "🏗️",
  },
  {
    title: "Agriculture",
    desc: "Farm supplies, seeds, tools, and agricultural logistics.",
    icon: "🌾",
  },
  {
    title: "Mining",
    desc: "Mining equipment, machinery, and industrial support products.",
    icon: "⛏️",
  },
  {
    title: "Automotive",
    desc: "Vehicle parts, transport accessories, and fleet supplies.",
    icon: "🚛",
  },
  {
    title: "Retail",
    desc: "Consumer products, electronics, and general merchandise.",
    icon: "🛒",
  },
  {
    title: "Warehouse Goods",
    desc: "Products stored inside logistics and warehouse facilities.",
    icon: "🏭",
  },
];

export default function StorePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Marketplace Store"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Trade Marketplace"
        description="Buy, sell, and manage products across Namibia and Southern Africa using the NamLogix marketplace infrastructure."
        actions={[
          {
            label: "🛒 Browse Products",
            href: "#products",
            primary: true,
          },
          {
            label: "🏭 Warehouses",
            href: "/admin/warehouses",
          },
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
          },
          {
            label: "🚚 Cargo Requests",
            href: "/cargo-requests",
          },
        ]}
        stats={[
          {
            value: "B2B",
            label: "Marketplace model",
          },
          {
            value: "SADC",
            label: "Regional reach",
          },
          {
            value: "NAD",
            label: "Currency support",
          },
          {
            value: "Live",
            label: "Store foundation",
          },
        ]}
        infoCards={[
          {
            title: "Warehouses",
            text: "Inventory management",
          },
          {
            title: "Suppliers",
            text: "Regional businesses",
          },
          {
            title: "Trade",
            text: "Cross-border commerce",
          },
          {
            title: "Logistics",
            text: "Delivery integration",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ANALYTICS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Marketplace"
            value="B2B"
            subtitle="Business trade network"
            color="blue"
          />

          <DashboardCard
            title="Suppliers"
            value={0}
            subtitle="Future verified vendors"
            color="green"
          />

          <DashboardCard
            title="Products"
            value={0}
            subtitle="Marketplace inventory"
            color="orange"
          />

          <DashboardCard
            title="Status"
            value="Ready"
            subtitle="Store infrastructure"
            color="red"
          />
        </div>

        {/* QUICK ACTIONS */}
        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Marketplace Actions"
            subtitle="Move between products, logistics, and trade services."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/request-cargo" variant="primary" fullWidth>
              📦 Post Cargo
            </Button>

            <Button href="/cargo-requests" variant="secondary" fullWidth>
              🚚 Cargo Requests
            </Button>

            <Button href="/trade-routes" variant="outline" fullWidth>
              🛣️ Trade Routes
            </Button>

            <Button href="/trip-offers" variant="outline" fullWidth>
              🚛 Trip Offers
            </Button>
          </div>
        </AppCard>

        {/* CATEGORIES */}
        <AppCard id="products" className="mb-8">
          <SectionHeader
            title="🛒 Marketplace Categories"
            subtitle="The NamLogix store can support multiple industries and trade sectors."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((item) => (
              <AppCard key={item.title} hover>
                <div className="text-4xl mb-4">{item.icon}</div>

                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2 leading-6">
                  {item.desc}
                </p>
              </AppCard>
            ))}
          </div>
        </AppCard>

        {/* FUTURE STORE */}
        <AppCard>
          <SectionHeader
            title="🏭 Future Marketplace Features"
            subtitle="The NamLogix marketplace can become a full African trade infrastructure platform."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Supplier dashboards",
              "Warehouse inventory",
              "Product images",
              "Order management",
              "Shipment tracking",
              "Transport bidding",
              "Cross-border trade",
              "Regional pricing",
              "Customs documents",
            ].map((feature) => (
              <div
                key={feature}
                className="bg-gray-50 border rounded-xl p-4"
              >
                <p className="font-medium text-gray-700">
                  ✅ {feature}
                </p>
              </div>
            ))}
          </div>
        </AppCard>

        {/* EMPTY STATE */}
        <div className="mt-8">
          <EmptyState
            icon="🛒"
            title="Marketplace products coming soon"
            message="Suppliers, warehouses, and traders will be able to upload products, manage inventory, and connect logistics directly into the NamLogix platform."
          />
        </div>
      </div>
    </div>
  );
}