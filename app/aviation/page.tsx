"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function RequestCargoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Cargo Request"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Post Cargo"
        description="Create cargo requests and connect with transporters, logistics operators, warehouses, and trade partners across Southern Africa."
        actions={[
          {
            label: "📦 Start Request",
            href: "#cargo-form",
            primary: true,
          },
          {
            label: "🚚 Find Cargo",
            href: "/cargo-requests",
          },
          {
            label: "🚛 Trip Offers",
            href: "/trip-offers",
          },
          {
            label: "🛣️ Trade Routes",
            href: "/trade-routes",
          },
        ]}
        stats={[
          {
            value: "Cargo",
            label: "Request type",
          },
          {
            value: "Bids",
            label: "Transport quotes",
          },
          {
            value: "SADC",
            label: "Regional coverage",
          },
          {
            value: "NAD",
            label: "Local currency",
          },
        ]}
        infoCards={[
          {
            title: "Post",
            text: "Cargo request",
          },
          {
            title: "Receive",
            text: "Transport bids",
          },
          {
            title: "Select",
            text: "Best offer",
          },
          {
            title: "Track",
            text: "Delivery flow",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Cargo"
            value="Open"
            subtitle="Request posting ready"
            color="blue"
          />

          <DashboardCard
            title="Transporters"
            value="Bids"
            subtitle="Future quote system"
            color="green"
          />

          <DashboardCard
            title="Coverage"
            value="SADC"
            subtitle="Regional trade network"
            color="orange"
          />

          <DashboardCard
            title="Status"
            value="Ready"
            subtitle="Page foundation active"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Cargo Quick Actions"
            subtitle="Use these links to move through the cargo workflow."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/cargo-requests" variant="primary" fullWidth>
              🚚 Available Cargo
            </Button>

            <Button href="/trip-offers" variant="secondary" fullWidth>
              🚛 Trip Offers
            </Button>

            <Button href="/trade-routes" variant="outline" fullWidth>
              🛣️ Trade Routes
            </Button>

            <Button href="/order-status" variant="outline" fullWidth>
              📍 Track Order
            </Button>
          </div>
        </AppCard>

        <AppCard id="cargo-form">
          <SectionHeader
            title="📦 Cargo Request Form"
            subtitle="The real Supabase cargo request form can be connected here next."
          />

          <EmptyState
            icon="📦"
            title="Cargo form ready for connection"
            message="This section is prepared for pickup location, delivery location, cargo weight, budget, cargo type, and transporter bidding."
          />
        </AppCard>
      </div>
    </div>
  );
}