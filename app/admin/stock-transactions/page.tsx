"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function StockTransactionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Stock Movement History"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Stock Transactions"
        description="Track inventory movement, stock adjustments, warehouse transfers, product receiving, dispatching, and audit history."
        actions={[
          {
            label: "🔄 View Transactions",
            href: "#transactions",
            primary: true,
          },
          {
            label: "📦 Inventory",
            href: "/admin/dashboard",
          },
          {
            label: "📍 Locations",
            href: "/admin/stock-locations",
          },
          {
            label: "📷 Scanner",
            href: "/admin/barcode-scanner",
          },
        ]}
        stats={[
          {
            value: 0,
            label: "Transactions",
          },
          {
            value: 0,
            label: "Stock in",
          },
          {
            value: 0,
            label: "Stock out",
          },
          {
            value: 0,
            label: "Transfers",
          },
        ]}
        infoCards={[
          {
            title: "Stock In",
            text: "Receiving items",
          },
          {
            title: "Stock Out",
            text: "Dispatch records",
          },
          {
            title: "Transfers",
            text: "Warehouse movement",
          },
          {
            title: "Audit",
            text: "Inventory history",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Transactions"
            value={0}
            subtitle="Stock movement records"
            color="blue"
          />

          <DashboardCard
            title="Stock In"
            value={0}
            subtitle="Received inventory"
            color="green"
          />

          <DashboardCard
            title="Stock Out"
            value={0}
            subtitle="Dispatched stock"
            color="orange"
          />

          <DashboardCard
            title="Transfers"
            value={0}
            subtitle="Warehouse movement"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Stock Transaction Actions"
            subtitle="Manage stock movement, receiving, dispatching, and transfers."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/admin/dashboard" variant="primary" fullWidth>
              📦 Inventory
            </Button>

            <Button href="/admin/stock-locations" variant="secondary" fullWidth>
              📍 Stock Locations
            </Button>

            <Button href="/admin/barcode-scanner" variant="outline" fullWidth>
              📷 Barcode Scanner
            </Button>

            <Button href="/admin/warehouses" variant="outline" fullWidth>
              🏭 Warehouses
            </Button>
          </div>
        </AppCard>

        <AppCard id="transactions">
          <SectionHeader
            title="🔄 Stock Transaction History"
            subtitle="All inventory movements, receiving records, dispatches, and warehouse transfers will appear here."
          />

          <EmptyState
            icon="🔄"
            title="No stock transactions yet"
            message="Stock movements will appear here when inventory is received, dispatched, adjusted, transferred, or scanned."
          />
        </AppCard>
      </div>
    </div>
  );
}