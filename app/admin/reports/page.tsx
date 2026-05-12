"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Business Reports"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Reports Center"
        description="Generate reports for inventory, suppliers, shipments, orders, warehouse activity, stock movement, and trade performance."
        actions={[
          {
            label: "📑 View Reports",
            href: "#reports",
            primary: true,
          },
          {
            label: "📈 Analytics",
            href: "/admin/analytics",
          },
          {
            label: "📦 Orders",
            href: "/admin/orders",
          },
          {
            label: "🚚 Shipments",
            href: "/admin/shipments",
          },
        ]}
        stats={[
          {
            value: 0,
            label: "Reports",
          },
          {
            value: 0,
            label: "Inventory reports",
          },
          {
            value: 0,
            label: "Shipment reports",
          },
          {
            value: "Future",
            label: "Export support",
          },
        ]}
        infoCards={[
          {
            title: "Inventory",
            text: "Stock reports",
          },
          {
            title: "Suppliers",
            text: "Partner reports",
          },
          {
            title: "Orders",
            text: "Sales reports",
          },
          {
            title: "Logistics",
            text: "Movement reports",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Reports"
            value={0}
            subtitle="Generated reports"
            color="blue"
          />

          <DashboardCard
            title="Inventory"
            value={0}
            subtitle="Stock report files"
            color="green"
          />

          <DashboardCard
            title="Shipments"
            value={0}
            subtitle="Logistics reports"
            color="orange"
          />

          <DashboardCard
            title="Exports"
            value="PDF"
            subtitle="Future report output"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Report Shortcuts"
            subtitle="Jump to operational data sources."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/admin/dashboard" variant="primary" fullWidth>
              📦 Inventory
            </Button>

            <Button href="/admin/analytics" variant="secondary" fullWidth>
              📈 Analytics
            </Button>

            <Button href="/admin/orders" variant="outline" fullWidth>
              📦 Orders
            </Button>

            <Button href="/admin/shipments" variant="outline" fullWidth>
              🚚 Shipments
            </Button>
          </div>
        </AppCard>

        <AppCard id="reports">
          <SectionHeader
            title="📑 Reports"
            subtitle="Exportable business reports will appear here."
          />

          <EmptyState
            icon="📑"
            title="No reports yet"
            message="This section is prepared for inventory reports, shipment reports, supplier reports, order reports, and PDF/CSV exports."
          />
        </AppCard>
      </div>
    </div>
  );
}