"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function PostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Post to Marketplace"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Create a Listing"
        description="Choose what you want to post: cargo, transport trips, warehouse products, or future marketplace opportunities."
        actions={[
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
            primary: true,
          },
          {
            label: "🚛 Post Trip",
            href: "/trip-offers",
          },
          {
            label: "🛒 Store",
            href: "/store",
          },
          {
            label: "💰 Bids",
            href: "/bids",
          },
        ]}
        stats={[
          {
            value: "Cargo",
            label: "Post requests",
          },
          {
            value: "Trips",
            label: "Transport offers",
          },
          {
            value: "Store",
            label: "Products",
          },
          {
            value: "Bids",
            label: "Quotes",
          },
        ]}
        infoCards={[
          {
            title: "Cargo",
            text: "Request transport",
          },
          {
            title: "Trips",
            text: "Offer routes",
          },
          {
            title: "Products",
            text: "Marketplace items",
          },
          {
            title: "Trade",
            text: "Regional deals",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Cargo"
            value="Post"
            subtitle="Transport request"
            color="blue"
          />

          <DashboardCard
            title="Trips"
            value="Offer"
            subtitle="Available routes"
            color="green"
          />

          <DashboardCard
            title="Products"
            value="List"
            subtitle="Marketplace stock"
            color="orange"
          />

          <DashboardCard
            title="Bids"
            value="Quote"
            subtitle="Transport pricing"
            color="red"
          />
        </div>

        <AppCard>
          <SectionHeader
            title="🚀 What do you want to post?"
            subtitle="Choose the listing type you want to create on NamLogix Africa."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/request-cargo" variant="primary" fullWidth>
              📦 Post Cargo
            </Button>

            <Button href="/trip-offers" variant="secondary" fullWidth>
              🚛 Post Trip Offer
            </Button>

            <Button href="/store" variant="outline" fullWidth>
              🛒 List Product
            </Button>

            <Button href="/bids" variant="outline" fullWidth>
              💰 View Bids
            </Button>
          </div>
        </AppCard>
      </div>
    </div>
  );
}