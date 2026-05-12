"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function PublicWarehousesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Warehouse Marketplace"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Warehouse Network"
        description="Find warehouse space, storage partners, inventory support, distribution facilities, and logistics infrastructure across Namibia and Southern Africa."
        actions={[
          {
            label: "🏭 View Warehouses",
            href: "#warehouses",
            primary: true,
          },
          {
            label: "🛒 Store",
            href: "/store",
          },
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
          },
          {
            label: "👥 Suppliers",
            href: "/suppliers",
          },
        ]}
        stats={[
          {
            value: "Storage",
            label: "Warehouse support",
          },
          {
            value: "Inventory",
            label: "Stock control",
          },
          {
            value: "SADC",
            label: "Regional network",
          },
          {
            value: "Ready",
            label: "Warehouse page",
          },
        ]}
        infoCards={[
          {
            title: "Storage",
            text: "Space listing",
          },
          {
            title: "Inventory",
            text: "Stock support",
          },
          {
            title: "Distribution",
            text: "Cargo movement",
          },
          {
            title: "Trade",
            text: "Supply chain",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Warehouses"
            value="Future"
            subtitle="Public warehouse listings"
            color="blue"
          />

          <DashboardCard
            title="Storage"
            value="Ready"
            subtitle="Storage marketplace"
            color="green"
          />

          <DashboardCard
            title="Inventory"
            value="Support"
            subtitle="Stock management"
            color="orange"
          />

          <DashboardCard
            title="Region"
            value="SADC"
            subtitle="Southern Africa"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Warehouse Actions"
            subtitle="Connect warehouse capacity with suppliers, store products, and logistics."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/store" variant="primary" fullWidth>
              🛒 Browse Store
            </Button>

            <Button href="/suppliers" variant="secondary" fullWidth>
              👥 Suppliers
            </Button>

            <Button href="/request-cargo" variant="outline" fullWidth>
              📦 Post Cargo
            </Button>

            <Button href="/trade-routes" variant="outline" fullWidth>
              🛣️ Trade Routes
            </Button>
          </div>
        </AppCard>

        <AppCard id="warehouses">
          <SectionHeader
            title="🏭 Warehouse Listings"
            subtitle="Public warehouse listings, storage capacity, and service providers will appear here."
          />

          <EmptyState
            icon="🏭"
            title="Warehouse marketplace coming soon"
            message="Warehouse owners will be able to list available storage, manage stock, and connect with suppliers and traders."
          />
        </AppCard>
      </div>
    </div>
  );
}