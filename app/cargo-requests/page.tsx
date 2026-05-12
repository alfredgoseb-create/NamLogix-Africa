"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function CargoRequestsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Cargo Marketplace"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Available Cargo"
        description="Browse cargo requests, discover transport opportunities, and connect cargo owners with logistics operators across Southern Africa."
        actions={[
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
            primary: true,
          },
          {
            label: "🚛 Trip Offers",
            href: "/trip-offers",
          },
          {
            label: "🛣️ Trade Routes",
            href: "/trade-routes",
          },
          {
            label: "📍 Track Order",
            href: "/order-status",
          },
        ]}
        stats={[
          {
            value: 0,
            label: "Open cargo",
          },
          {
            value: 0,
            label: "Pending bids",
          },
          {
            value: "SADC",
            label: "Coverage",
          },
          {
            value: "Live",
            label: "Marketplace",
          },
        ]}
        infoCards={[
          {
            title: "Cargo",
            text: "Available loads",
          },
          {
            title: "Bidding",
            text: "Transport quotes",
          },
          {
            title: "Routes",
            text: "Regional lanes",
          },
          {
            title: "Tracking",
            text: "Delivery visibility",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Open Cargo"
            value={0}
            subtitle="Available requests"
            color="blue"
          />

          <DashboardCard
            title="Pending Bids"
            value={0}
            subtitle="Transport quotes"
            color="orange"
          />

          <DashboardCard
            title="Routes"
            value="SADC"
            subtitle="Regional network"
            color="green"
          />

          <DashboardCard
            title="Status"
            value="Ready"
            subtitle="Cargo marketplace"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Cargo Marketplace Actions"
            subtitle="Move cargo requests through the logistics workflow."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/request-cargo" variant="primary" fullWidth>
              📦 Post Cargo
            </Button>

            <Button href="/trip-offers" variant="secondary" fullWidth>
              🚛 Find Trips
            </Button>

            <Button href="/trade-routes" variant="outline" fullWidth>
              🛣️ Trade Routes
            </Button>

            <Button href="/store" variant="outline" fullWidth>
              🛒 Store
            </Button>
          </div>
        </AppCard>

        <AppCard id="cargo">
          <SectionHeader
            title="📦 Available Cargo Requests"
            subtitle="Cargo requests from traders, warehouses, businesses, and customers will appear here."
          />

          <EmptyState
            icon="📦"
            title="No cargo requests yet"
            message="Cargo requests will appear here once users post goods that need transportation."
          />
        </AppCard>
      </div>
    </div>
  );
}