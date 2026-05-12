"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Live Tracking"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Shipment Tracking"
        description="Track cargo, deliveries, orders, routes, and logistics movement from one central NamLogix Africa tracking page."
        actions={[
          {
            label: "📍 Track Shipment",
            href: "#tracking",
            primary: true,
          },
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
          },
          {
            label: "🚚 Cargo Requests",
            href: "/cargo-requests",
          },
          {
            label: "🚛 Trip Offers",
            href: "/trip-offers",
          },
        ]}
        stats={[
          {
            value: "Live",
            label: "Tracking ready",
          },
          {
            value: "Cargo",
            label: "Shipment support",
          },
          {
            value: "Routes",
            label: "Regional logistics",
          },
          {
            value: "SADC",
            label: "Coverage",
          },
        ]}
        infoCards={[
          {
            title: "Cargo",
            text: "Shipment movement",
          },
          {
            title: "Orders",
            text: "Customer tracking",
          },
          {
            title: "Routes",
            text: "Delivery corridors",
          },
          {
            title: "Status",
            text: "Progress updates",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Tracking"
            value="Ready"
            subtitle="Shipment visibility"
            color="blue"
          />

          <DashboardCard
            title="Cargo"
            value="Supported"
            subtitle="Movement tracking"
            color="green"
          />

          <DashboardCard
            title="Orders"
            value="Future"
            subtitle="Marketplace tracking"
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
            title="⚡ Tracking Actions"
            subtitle="Move between cargo, orders, routes, and transport services."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/order-status" variant="primary" fullWidth>
              📍 Order Status
            </Button>

            <Button href="/request-cargo" variant="secondary" fullWidth>
              📦 Post Cargo
            </Button>

            <Button href="/cargo-requests" variant="outline" fullWidth>
              🚚 Cargo Requests
            </Button>

            <Button href="/routes" variant="outline" fullWidth>
              🛣️ Routes
            </Button>
          </div>
        </AppCard>

        <AppCard id="tracking">
          <SectionHeader
            title="📍 Tracking Center"
            subtitle="Tracking search, order lookup, and shipment progress can be connected here next."
          />

          <EmptyState
            icon="📍"
            title="Tracking system ready"
            message="This section is prepared for tracking numbers, shipment progress, driver updates, and delivery visibility."
          />
        </AppCard>
      </div>
    </div>
  );
}