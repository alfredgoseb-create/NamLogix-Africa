"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function CustomsDocumentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Customs & Compliance"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Customs Documents"
        description="Prepare the foundation for import/export documents, customs support, permits, invoices, border paperwork, and trade compliance."
        actions={[
          {
            label: "📄 Documents",
            href: "#documents",
            primary: true,
          },
          {
            label: "🛣️ Trade Routes",
            href: "/admin/trade-routes",
          },
          {
            label: "🚚 Shipments",
            href: "/admin/shipments",
          },
          {
            label: "📊 Dashboard",
            href: "/admin/dashboard",
          },
        ]}
        stats={[
          {
            value: 0,
            label: "Documents",
          },
          {
            value: 0,
            label: "Pending review",
          },
          {
            value: 0,
            label: "Approved",
          },
          {
            value: "SADC",
            label: "Trade region",
          },
        ]}
        infoCards={[
          {
            title: "Customs",
            text: "Border support",
          },
          {
            title: "Invoices",
            text: "Trade records",
          },
          {
            title: "Permits",
            text: "Compliance files",
          },
          {
            title: "Exports",
            text: "Regional movement",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Documents"
            value={0}
            subtitle="Trade paperwork"
            color="blue"
          />

          <DashboardCard
            title="Pending"
            value={0}
            subtitle="Awaiting review"
            color="orange"
          />

          <DashboardCard
            title="Approved"
            value={0}
            subtitle="Ready for movement"
            color="green"
          />

          <DashboardCard
            title="Region"
            value="SADC"
            subtitle="Cross-border trade"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Compliance Actions"
            subtitle="Move between customs, shipments, routes, and orders."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/admin/shipments" variant="primary" fullWidth>
              🚚 Shipments
            </Button>

            <Button href="/admin/trade-routes" variant="secondary" fullWidth>
              🛣️ Trade Routes
            </Button>

            <Button href="/admin/orders" variant="outline" fullWidth>
              📦 Orders
            </Button>

            <Button href="/admin/dashboard" variant="outline" fullWidth>
              📊 Dashboard
            </Button>
          </div>
        </AppCard>

        <AppCard id="documents">
          <SectionHeader
            title="📄 Customs Document Center"
            subtitle="Import/export paperwork, invoices, permits, and compliance files will appear here."
          />

          <EmptyState
            icon="📄"
            title="No customs documents yet"
            message="This section is ready for customs documents, trade invoices, certificates, border paperwork, and compliance tracking."
          />
        </AppCard>
      </div>
    </div>
  );
}