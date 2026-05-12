"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function StockLocationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Stock Location Control"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Stock Locations"
        description="Manage warehouse zones, shelf locations, storage areas, stock rooms, and inventory placement across the NamLogix Africa platform."
        actions={[
          {
            label: "📍 Add Location",
            href: "#locations",
            primary: true,
          },
          {
            label: "📦 Inventory",
            href: "/admin/dashboard",
          },
          {
            label: "🏭 Warehouses",
            href: "/admin/warehouses",
          },
          {
            label: "🔄 Transactions",
            href: "/admin/stock-transactions",
          },
        ]}
        stats={[
          {
            value: 0,
            label: "Locations",
          },
          {
            value: 0,
            label: "Warehouses",
          },
          {
            value: 0,
            label: "Stock zones",
          },
          {
            value: "Ready",
            label: "Location system",
          },
        ]}
        infoCards={[
          {
            title: "Warehouses",
            text: "Storage facilities",
          },
          {
            title: "Zones",
            text: "Stock areas",
          },
          {
            title: "Shelves",
            text: "Item placement",
          },
          {
            title: "Tracking",
            text: "Inventory visibility",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Locations"
            value={0}
            subtitle="Registered stock locations"
            color="blue"
          />

          <DashboardCard
            title="Warehouses"
            value={0}
            subtitle="Storage facilities"
            color="green"
          />

          <DashboardCard
            title="Zones"
            value={0}
            subtitle="Stock control areas"
            color="orange"
          />

          <DashboardCard
            title="Status"
            value="Ready"
            subtitle="Location foundation"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Stock Location Actions"
            subtitle="Manage inventory placement and warehouse visibility."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/admin/dashboard" variant="primary" fullWidth>
              📦 Inventory
            </Button>

            <Button href="/admin/warehouses" variant="secondary" fullWidth>
              🏭 Warehouses
            </Button>

            <Button href="/admin/barcode-scanner" variant="outline" fullWidth>
              📷 Barcode Scanner
            </Button>

            <Button href="/admin/stock-transactions" variant="outline" fullWidth>
              🔄 Transactions
            </Button>
          </div>
        </AppCard>

        <AppCard id="locations">
          <SectionHeader
            title="📍 Stock Location Directory"
            subtitle="Warehouse locations, shelves, rooms, and stock zones will appear here."
          />

          <EmptyState
            icon="📍"
            title="No stock locations yet"
            message="Create stock locations to organize inventory by warehouse, shelf, room, storage zone, or bin number."
          />
        </AppCard>
      </div>
    </div>
  );
}