"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function TripOffersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Transport Marketplace"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Trip Offers"
        description="Browse available transport trips, cargo movement opportunities, passenger logistics, and route-based transport offers."
        actions={[
          {
            label: "🚛 View Trips",
            href: "#trips",
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
            label: "🛣️ Trade Routes",
            href: "/trade-routes",
          },
        ]}
        stats={[
          {
            value: 0,
            label: "Trip offers",
          },
          {
            value: 0,
            label: "Available seats",
          },
          {
            value: "Routes",
            label: "Transport lanes",
          },
          {
            value: "Live",
            label: "Marketplace",
          },
        ]}
        infoCards={[
          {
            title: "Trips",
            text: "Available routes",
          },
          {
            title: "Transporters",
            text: "Route operators",
          },
          {
            title: "Cargo",
            text: "Goods movement",
          },
          {
            title: "Bookings",
            text: "Future reservations",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Trip Offers"
            value={0}
            subtitle="Available transport routes"
            color="blue"
          />

          <DashboardCard
            title="Seats"
            value={0}
            subtitle="Passenger capacity"
            color="green"
          />

          <DashboardCard
            title="Cargo Space"
            value={0}
            subtitle="Future freight capacity"
            color="orange"
          />

          <DashboardCard
            title="Status"
            value="Ready"
            subtitle="Transport marketplace"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Transport Actions"
            subtitle="Connect cargo requests with available route offers."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/request-cargo" variant="primary" fullWidth>
              📦 Post Cargo
            </Button>

            <Button href="/cargo-requests" variant="secondary" fullWidth>
              🚚 Find Cargo
            </Button>

            <Button href="/trade-routes" variant="outline" fullWidth>
              🛣️ Trade Routes
            </Button>

            <Button href="/order-status" variant="outline" fullWidth>
              📍 Track Order
            </Button>
          </div>
        </AppCard>

        <AppCard id="trips">
          <SectionHeader
            title="🚛 Available Trip Offers"
            subtitle="Transport routes, available seats, cargo capacity, and route opportunities will appear here."
          />

          <EmptyState
            icon="🚛"
            title="No trip offers yet"
            message="Trip offers will appear here once transporters, drivers, or operators list available routes."
          />
        </AppCard>
      </div>
    </div>
  );
}