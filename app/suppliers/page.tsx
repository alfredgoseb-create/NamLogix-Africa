"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function PublicSuppliersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Supplier Marketplace"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Supplier Network"
        description="Discover suppliers, product sources, warehouse partners, and business providers across Namibia and Southern Africa."
        actions={[
          {
            label: "👥 View Suppliers",
            href: "#suppliers",
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
            label: "🏭 Warehouses",
            href: "/warehouses",
          },
        ]}
        stats={[
          {
            value: "B2B",
            label: "Supplier network",
          },
          {
            value: "SADC",
            label: "Regional reach",
          },
          {
            value: "Trade",
            label: "Business focus",
          },
          {
            value: "Ready",
            label: "Supplier foundation",
          },
        ]}
        infoCards={[
          {
            title: "Products",
            text: "Supplier stock",
          },
          {
            title: "Warehouses",
            text: "Storage partners",
          },
          {
            title: "Trade",
            text: "Business sourcing",
          },
          {
            title: "Logistics",
            text: "Delivery support",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Network"
            value="B2B"
            subtitle="Business supplier model"
            color="blue"
          />

          <DashboardCard
            title="Region"
            value="SADC"
            subtitle="Southern African supply"
            color="green"
          />

          <DashboardCard
            title="Products"
            value="Future"
            subtitle="Supplier listings"
            color="orange"
          />

          <DashboardCard
            title="Status"
            value="Ready"
            subtitle="Supplier page active"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Supplier Actions"
            subtitle="Connect suppliers with products, warehouses, cargo, and buyers."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/store" variant="primary" fullWidth>
              🛒 Browse Store
            </Button>

            <Button href="/request-cargo" variant="secondary" fullWidth>
              📦 Post Cargo
            </Button>

            <Button href="/warehouses" variant="outline" fullWidth>
              🏭 Warehouses
            </Button>

            <Button href="/contact" variant="outline" fullWidth>
              📩 Contact
            </Button>
          </div>
        </AppCard>

        <AppCard id="suppliers">
          <SectionHeader
            title="👥 Supplier Directory"
            subtitle="Public supplier listings will appear here when supplier accounts are connected."
          />

          <EmptyState
            icon="👥"
            title="Supplier marketplace coming soon"
            message="Verified suppliers, product categories, company profiles, and contact options will appear here."
          />
        </AppCard>
      </div>
    </div>
  );
}