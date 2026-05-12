"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function ShipmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Shipment Control"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Shipment Intelligence"
        description="Track cargo movement, deliveries, routes, vehicles, and logistics operations across Namibia and Southern Africa."
        actions={[
          {
            label: "🚚 New Shipment",
            href: "#shipments",
            primary: true,
          },
          {
            label: "📦 Orders",
            href: "/admin/orders",
          },
          {
            label: "🏭 Warehouses",
            href: "/admin/warehouses",
          },
          {
            label: "📊 Dashboard",
            href: "/admin/dashboard",
          },
        ]}
        stats={[
          {
            value: 0,
            label: "Shipments",
          },
          {
            value: 0,
            label: "In transit",
          },
          {
            value: 0,
            label: "Delivered",
          },
          {
            value: 0,
            label: "Delayed",
          },
        ]}
        infoCards={[
          {
            title: "Tracking",
            text: "Cargo movement",
          },
          {
            title: "Routes",
            text: "Regional delivery",
          },
          {
            title: "Vehicles",
            text: "Fleet coordination",
          },
          {
            title: "Trade",
            text: "Logistics backbone",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Shipments"
            value={0}
            subtitle="Total cargo movements"
            color="blue"
          />

          <DashboardCard
            title="In Transit"
            value={0}
            subtitle="Currently moving"
            color="orange"
          />

          <DashboardCard
            title="Delivered"
            value={0}
            subtitle="Completed shipments"
            color="green"
          />

          <DashboardCard
            title="Delayed"
            value={0}
            subtitle="Needs attention"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Shipment Actions"
            subtitle="Quickly manage delivery and cargo movement operations."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/cargo-requests" variant="primary" fullWidth>
              🚚 Cargo Requests
            </Button>

            <Button href="/trip-offers" variant="secondary" fullWidth>
              🚛 Trip Offers
            </Button>

            <Button href="/admin/orders" variant="outline" fullWidth>
              📦 Orders
            </Button>

            <Button href="/admin/warehouses" variant="outline" fullWidth>
              🏭 Warehouses
            </Button>
          </div>
        </AppCard>

        <AppCard id="shipments">
          <SectionHeader
            title="🚚 Shipment Network"
            subtitle="All shipment records and cargo movements will appear here."
          />

          <EmptyState
            icon="🚚"
            title="No shipments yet"
            message="Shipment tracking records will appear here once cargo movement and delivery operations begin."
          />
        </AppCard>
      </div>
    </div>
  );
}