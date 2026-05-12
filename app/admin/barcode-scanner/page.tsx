"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function BarcodeScannerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Inventory Scanning"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Barcode Scanner"
        description="Prepare barcode scanning for inventory tracking, warehouse stock control, product verification, and movement history."
        actions={[
          {
            label: "📷 Scanner",
            href: "#scanner",
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
            label: "📍 Locations",
            href: "/admin/stock-locations",
          },
        ]}
        stats={[
          {
            value: "Scan",
            label: "Barcode ready",
          },
          {
            value: 0,
            label: "Products scanned",
          },
          {
            value: 0,
            label: "Stock movements",
          },
          {
            value: "Future",
            label: "Mobile support",
          },
        ]}
        infoCards={[
          {
            title: "Barcode",
            text: "Product scanning",
          },
          {
            title: "Stock",
            text: "Inventory checks",
          },
          {
            title: "Warehouse",
            text: "Location control",
          },
          {
            title: "Audit",
            text: "Movement history",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Scanner"
            value="Ready"
            subtitle="Barcode foundation"
            color="blue"
          />

          <DashboardCard
            title="Products"
            value={0}
            subtitle="Scanned items"
            color="green"
          />

          <DashboardCard
            title="Movements"
            value={0}
            subtitle="Stock transactions"
            color="orange"
          />

          <DashboardCard
            title="Mobile"
            value="Future"
            subtitle="Phone scanning"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Scanner Actions"
            subtitle="Move between inventory, warehouses, and stock locations."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/admin/dashboard" variant="primary" fullWidth>
              📦 Inventory
            </Button>

            <Button href="/admin/warehouses" variant="secondary" fullWidth>
              🏭 Warehouses
            </Button>

            <Button href="/admin/stock-locations" variant="outline" fullWidth>
              📍 Stock Locations
            </Button>

            <Button href="/admin/stock-transactions" variant="outline" fullWidth>
              🔄 Transactions
            </Button>
          </div>
        </AppCard>

        <AppCard id="scanner">
          <SectionHeader
            title="📷 Barcode Scanner"
            subtitle="Camera scanning and product lookup can be connected here."
          />

          <EmptyState
            icon="📷"
            title="Scanner interface coming soon"
            message="This page is prepared for barcode scanning, product lookup, stock counting, and warehouse movement tracking."
          />
        </AppCard>
      </div>
    </div>
  );
}