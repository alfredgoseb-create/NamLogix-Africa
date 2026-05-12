"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function VehiclesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Fleet Management"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Fleet Intelligence"
        description="Manage logistics vehicles, transport fleets, delivery trucks, and future cargo movement infrastructure across Namibia and Southern Africa."
        actions={[
          {
            label: "🚛 Add Vehicle",
            href: "#vehicles",
            primary: true,
          },
          {
            label: "🚚 Shipments",
            href: "/admin/shipments",
          },
          {
            label: "🛣️ Trade Routes",
            href: "/admin/trade-routes",
          },
          {
            label: "📊 Dashboard",
            href: "/admin/dashboard",
          },
        ]}
        stats={[
          {
            value: 0,
            label: "Vehicles",
          },
          {
            value: 0,
            label: "Active fleet",
          },
          {
            value: 0,
            label: "Drivers",
          },
          {
            value: 0,
            label: "Cargo capacity",
          },
        ]}
        infoCards={[
          {
            title: "Fleet",
            text: "Vehicle network",
          },
          {
            title: "Drivers",
            text: "Transport operators",
          },
          {
            title: "Cargo",
            text: "Delivery movement",
          },
          {
            title: "Tracking",
            text: "Future GPS support",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ANALYTICS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Vehicles"
            value={0}
            subtitle="Fleet vehicles"
            color="blue"
          />

          <DashboardCard
            title="Active Fleet"
            value={0}
            subtitle="Operational units"
            color="green"
          />

          <DashboardCard
            title="Drivers"
            value={0}
            subtitle="Transport operators"
            color="orange"
          />

          <DashboardCard
            title="Capacity"
            value={0}
            subtitle="Cargo transport"
            color="red"
          />
        </div>

        {/* QUICK ACTIONS */}
        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Fleet Operations"
            subtitle="Manage transportation and cargo movement."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              href="/admin/shipments"
              variant="primary"
              fullWidth
            >
              🚚 Shipments
            </Button>

            <Button
              href="/cargo-requests"
              variant="secondary"
              fullWidth
            >
              📦 Cargo Requests
            </Button>

            <Button
              href="/admin/trade-routes"
              variant="outline"
              fullWidth
            >
              🛣️ Trade Routes
            </Button>

            <Button
              href="/admin/dashboard"
              variant="outline"
              fullWidth
            >
              📊 Dashboard
            </Button>
          </div>
        </AppCard>

        {/* VEHICLES */}
        <AppCard id="vehicles">
          <SectionHeader
            title="🚛 Fleet Vehicles"
            subtitle="All transport vehicles and cargo units will appear here."
          />

          <EmptyState
            icon="🚛"
            title="No vehicles yet"
            message="Fleet management and logistics transport vehicles will appear here once your operations scale."
          />
        </AppCard>
      </div>
    </div>
  );
}