"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function RequestRidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Local Transport"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Request a Ride"
        description="Request local transport for town movement, hospital trips, work transport, home transport, and community mobility."
        actions={[
          {
            label: "🚕 Request Ride",
            href: "#ride-request",
            primary: true,
          },
          {
            label: "🚛 Trip Offers",
            href: "/trip-offers",
          },
          {
            label: "📍 Track Order",
            href: "/order-status",
          },
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
          },
        ]}
        stats={[
          {
            value: "Town",
            label: "Local movement",
          },
          {
            value: "Home",
            label: "Personal transport",
          },
          {
            value: "Work",
            label: "Daily travel",
          },
          {
            value: "Care",
            label: "Hospital trips",
          },
        ]}
        infoCards={[
          {
            title: "Hospital",
            text: "To home transport",
          },
          {
            title: "Work",
            text: "Daily commute",
          },
          {
            title: "Town",
            text: "Local movement",
          },
          {
            title: "Community",
            text: "People transport",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Ride Type"
            value="Local"
            subtitle="Within-town transport"
            color="blue"
          />

          <DashboardCard
            title="Use Cases"
            value="Daily"
            subtitle="Work, home, hospital"
            color="green"
          />

          <DashboardCard
            title="Status"
            value="Ready"
            subtitle="Page foundation active"
            color="orange"
          />

          <DashboardCard
            title="Future"
            value="Bookings"
            subtitle="Ride scheduling"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Ride Actions"
            subtitle="Quick movement between people transport and logistics services."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/trip-offers" variant="primary" fullWidth>
              🚛 Trip Offers
            </Button>

            <Button href="/order-status" variant="secondary" fullWidth>
              📍 Track Status
            </Button>

            <Button href="/routes" variant="outline" fullWidth>
              🛣️ Routes
            </Button>

            <Button href="/request-cargo" variant="outline" fullWidth>
              📦 Post Cargo
            </Button>
          </div>
        </AppCard>

        <AppCard id="ride-request" className="mb-8">
          <SectionHeader
            title="🚕 Ride Request Form"
            subtitle="This section is ready for pickup, destination, passenger count, date, time, and ride notes."
          />

          <EmptyState
            icon="🚕"
            title="Ride request form coming next"
            message="This page is prepared for same-town transport requests such as hospital to home, home to work, or local daily transport."
          />
        </AppCard>

        <AppCard>
          <SectionHeader
            title="💡 Local Transport Opportunity"
            subtitle="This feature can create real value for communities."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Hospital to home transport",
              "Home to work rides",
              "School and family trips",
              "Elderly passenger transport",
              "Small town delivery support",
              "Scheduled community rides",
            ].map((item) => (
              <div key={item} className="bg-gray-50 border rounded-xl p-4">
                <p className="font-medium text-gray-700">✅ {item}</p>
              </div>
            ))}
          </div>
        </AppCard>
      </div>
    </div>
  );
}