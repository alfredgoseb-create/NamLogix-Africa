"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function OrderStatusPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Order Tracking"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Track Your Order"
        description="Track cargo, store orders, shipments, deliveries, and logistics movement across the NamLogix Africa platform."
        actions={[
          {
            label: "📍 Track Order",
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
            label: "Shipment type",
          },
          {
            value: "Store",
            label: "Order support",
          },
          {
            value: "SADC",
            label: "Regional reach",
          },
        ]}
        infoCards={[
          {
            title: "Tracking",
            text: "Order visibility",
          },
          {
            title: "Cargo",
            text: "Shipment status",
          },
          {
            title: "Store",
            text: "Customer orders",
          },
          {
            title: "Delivery",
            text: "Movement updates",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Tracking"
            value="Ready"
            subtitle="Order visibility page"
            color="blue"
          />

          <DashboardCard
            title="Cargo"
            value="Supported"
            subtitle="Shipment tracking"
            color="green"
          />

          <DashboardCard
            title="Store"
            value="Orders"
            subtitle="Customer order flow"
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
            subtitle="Move between orders, cargo, and transport services."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/store" variant="primary" fullWidth>
              🛒 Browse Store
            </Button>

            <Button href="/request-cargo" variant="secondary" fullWidth>
              📦 Post Cargo
            </Button>

            <Button href="/cargo-requests" variant="outline" fullWidth>
              🚚 Cargo Requests
            </Button>

            <Button href="/trip-offers" variant="outline" fullWidth>
              🚛 Trip Offers
            </Button>
          </div>
        </AppCard>

        <AppCard id="tracking">
          <SectionHeader
            title="📍 Order Tracking"
            subtitle="Order tracking search and shipment visibility will be connected here."
          />

          <EmptyState
            icon="📍"
            title="Tracking system coming soon"
            message="This section is prepared for order ID search, cargo tracking, delivery status updates, and shipment progress."
          />
        </AppCard>
      </div>
    </div>
  );
}