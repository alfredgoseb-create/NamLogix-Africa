"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function BidsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Transport Bidding"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Cargo Bids"
        description="Manage transport bids, cargo quotes, logistics pricing, and transporter offers for cargo movement across Southern Africa."
        actions={[
          {
            label: "💰 View Bids",
            href: "#bids",
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
            value: 0,
            label: "Active bids",
          },
          {
            value: 0,
            label: "Transporters",
          },
          {
            value: "NAD",
            label: "Pricing",
          },
          {
            value: "Ready",
            label: "Bid system",
          },
        ]}
        infoCards={[
          {
            title: "Quotes",
            text: "Transport offers",
          },
          {
            title: "Cargo",
            text: "Load bidding",
          },
          {
            title: "Pricing",
            text: "Best offers",
          },
          {
            title: "Transport",
            text: "Operator network",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Active Bids"
            value={0}
            subtitle="Open transporter offers"
            color="blue"
          />

          <DashboardCard
            title="Transporters"
            value={0}
            subtitle="Future logistics bidders"
            color="green"
          />

          <DashboardCard
            title="Currency"
            value="NAD"
            subtitle="Namibian dollar support"
            color="orange"
          />

          <DashboardCard
            title="Status"
            value="Ready"
            subtitle="Bidding page foundation"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Bidding Actions"
            subtitle="Connect cargo owners and transporters through competitive offers."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/request-cargo" variant="primary" fullWidth>
              📦 Post Cargo
            </Button>

            <Button href="/cargo-requests" variant="secondary" fullWidth>
              🚚 Find Cargo
            </Button>

            <Button href="/trip-offers" variant="outline" fullWidth>
              🚛 Trip Offers
            </Button>

            <Button href="/trade-routes" variant="outline" fullWidth>
              🛣️ Trade Routes
            </Button>
          </div>
        </AppCard>

        <AppCard id="bids">
          <SectionHeader
            title="💰 Cargo Bids"
            subtitle="Transporter bids and cargo quotes will appear here."
          />

          <EmptyState
            icon="💰"
            title="No bids yet"
            message="When transporters submit quotes for cargo movement, those bids will appear here."
          />
        </AppCard>
      </div>
    </div>
  );
}