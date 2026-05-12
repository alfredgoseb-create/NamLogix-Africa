"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="About NamLogix Africa"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Trade Infrastructure Platform"
        description="NamLogix Africa is being built as a logistics, trade, inventory, warehouse, aviation, and marketplace platform for Namibia and Southern Africa."
        actions={[
          {
            label: "🚀 Explore Platform",
            href: "#platform",
            primary: true,
          },
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
          },
          {
            label: "🛒 Store",
            href: "/store",
          },
          {
            label: "🛣️ Routes",
            href: "/trade-routes",
          },
        ]}
        stats={[
          {
            value: "Namibia",
            label: "Starting market",
          },
          {
            value: "SADC",
            label: "Expansion region",
          },
          {
            value: "Trade",
            label: "Core focus",
          },
          {
            value: "Logistics",
            label: "Infrastructure layer",
          },
        ]}
        infoCards={[
          {
            title: "Cargo",
            text: "Transport requests",
          },
          {
            title: "Inventory",
            text: "Stock control",
          },
          {
            title: "Marketplace",
            text: "Trade products",
          },
          {
            title: "Aviation",
            text: "Air logistics",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Platform"
            value="SaaS"
            subtitle="Trade infrastructure system"
            color="blue"
          />

          <DashboardCard
            title="Market"
            value="Namibia"
            subtitle="Local-first strategy"
            color="green"
          />

          <DashboardCard
            title="Region"
            value="SADC"
            subtitle="Southern Africa expansion"
            color="orange"
          />

          <DashboardCard
            title="Model"
            value="B2B"
            subtitle="Business logistics network"
            color="red"
          />
        </div>

        <AppCard id="platform" className="mb-8">
          <SectionHeader
            title="🌍 What NamLogix Africa Is"
            subtitle="A digital trade backbone for logistics, warehouses, suppliers, cargo, and regional movement."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Cargo Marketplace",
                text: "Cargo owners can post transport requests and receive bids from transporters.",
              },
              {
                title: "Inventory Dashboard",
                text: "Businesses can manage products, stock levels, suppliers, and warehouse readiness.",
              },
              {
                title: "Supplier Network",
                text: "Suppliers can be listed, categorized, contacted, and later connected to products.",
              },
              {
                title: "Warehouse Infrastructure",
                text: "Warehouses can manage stock locations, movements, and future storage services.",
              },
              {
                title: "Trade Routes",
                text: "Regional logistics routes can help connect Namibia with SADC trade corridors.",
              },
              {
                title: "Aviation Services",
                text: "Future aviation logistics can support urgent cargo, charters, and remote deliveries.",
              },
            ].map((item) => (
              <AppCard key={item.title} hover>
                <h3 className="font-semibold text-lg">{item.title}</h3>

                <p className="text-sm text-gray-500 mt-3 leading-6">
                  {item.text}
                </p>
              </AppCard>
            ))}
          </div>
        </AppCard>

        <AppCard>
          <SectionHeader
            title="🚀 Platform Vision"
            subtitle="NamLogix Africa can grow into a regional marketplace for logistics, trade, storage, and movement."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/cargo-requests" variant="primary" fullWidth>
              🚚 Cargo
            </Button>

            <Button href="/store" variant="secondary" fullWidth>
              🛒 Store
            </Button>

            <Button href="/admin/dashboard" variant="outline" fullWidth>
              📊 Dashboard
            </Button>

            <Button href="/aviation" variant="outline" fullWidth>
              ✈️ Aviation
            </Button>
          </div>
        </AppCard>
      </div>
    </div>
  );
}