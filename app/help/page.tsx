"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

const helpItems = [
  {
    title: "How do I post cargo?",
    text: "Go to Post Cargo, enter pickup location, delivery location, cargo details, weight, and budget.",
  },
  {
    title: "How do cargo bids work?",
    text: "Transporters can submit quotes for cargo movement. The cargo owner can compare and choose the best offer.",
  },
  {
    title: "What is the store for?",
    text: "The store is for listing products from warehouses, suppliers, and traders.",
  },
  {
    title: "What is inventory?",
    text: "Inventory means the products or goods a business already has in stock and needs to manage.",
  },
  {
    title: "What are suppliers?",
    text: "Suppliers are businesses or people who provide products, materials, equipment, or services.",
  },
  {
    title: "What are trade routes?",
    text: "Trade routes are transport corridors used to move goods between towns, countries, ports, and markets.",
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Help Center"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Platform Help"
        description="Learn how to use NamLogix Africa for cargo, bids, suppliers, inventory, warehouses, routes, store, and logistics operations."
        actions={[
          {
            label: "❓ View Help",
            href: "#help",
            primary: true,
          },
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
          },
          {
            label: "💰 Bids",
            href: "/bids",
          },
          {
            label: "📩 Contact",
            href: "/contact",
          },
        ]}
        stats={[
          {
            value: "Help",
            label: "Support center",
          },
          {
            value: "Cargo",
            label: "Guides",
          },
          {
            value: "Store",
            label: "Marketplace",
          },
          {
            value: "Admin",
            label: "Platform tools",
          },
        ]}
        infoCards={[
          {
            title: "Cargo",
            text: "Posting help",
          },
          {
            title: "Bids",
            text: "Quote support",
          },
          {
            title: "Store",
            text: "Marketplace help",
          },
          {
            title: "Admin",
            text: "Dashboard help",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Help Topics"
            value={helpItems.length}
            subtitle="Platform guidance"
            color="blue"
          />

          <DashboardCard
            title="Cargo"
            value="Guide"
            subtitle="Posting support"
            color="green"
          />

          <DashboardCard
            title="Bids"
            value="Guide"
            subtitle="Quote support"
            color="orange"
          />

          <DashboardCard
            title="Admin"
            value="Guide"
            subtitle="Dashboard support"
            color="red"
          />
        </div>

        <AppCard id="help" className="mb-8">
          <SectionHeader
            title="❓ Help Topics"
            subtitle="Common questions about using NamLogix Africa."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpItems.map((item) => (
              <AppCard key={item.title} hover>
                <h3 className="font-semibold text-lg">{item.title}</h3>

                <p className="text-sm text-gray-500 mt-3 leading-6">
                  {item.text}
                </p>
              </AppCard>
            ))}
          </div>
        </AppCard>

        <AppCard>
          <SectionHeader
            title="🚀 Need More Help?"
            subtitle="Use these quick links to continue using the platform."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/request-cargo" variant="primary" fullWidth>
              📦 Post Cargo
            </Button>

            <Button href="/bids" variant="secondary" fullWidth>
              💰 Bids
            </Button>

            <Button href="/admin/dashboard" variant="outline" fullWidth>
              📊 Admin
            </Button>

            <Button href="/contact" variant="outline" fullWidth>
              📩 Contact
            </Button>
          </div>
        </AppCard>
      </div>
    </div>
  );
}