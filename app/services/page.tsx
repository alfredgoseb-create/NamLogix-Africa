"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

const services = [
  {
    title: "Cargo Requests",
    icon: "📦",
    text: "Post cargo that needs transport and receive quotes from logistics operators.",
    href: "/request-cargo",
  },
  {
    title: "Transport Bidding",
    icon: "💰",
    text: "Compare transporter offers and choose the best cargo movement price.",
    href: "/bids",
  },
  {
    title: "Trip Offers",
    icon: "🚛",
    text: "View available route offers for people, goods, and cargo movement.",
    href: "/trip-offers",
  },
  {
    title: "Marketplace Store",
    icon: "🛒",
    text: "Browse products from suppliers, warehouses, and traders.",
    href: "/store",
  },
  {
    title: "Warehouses",
    icon: "🏭",
    text: "Connect with storage providers and future inventory facilities.",
    href: "/warehouses",
  },
  {
    title: "Aviation Logistics",
    icon: "✈️",
    text: "Explore future air cargo, charter, and urgent logistics support.",
    href: "/aviation",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Platform Services"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Trade Services"
        description="Explore logistics, cargo, warehouse, supplier, marketplace, aviation, and trade infrastructure services across Namibia and Southern Africa."
        actions={[
          {
            label: "🚀 View Services",
            href: "#services",
            primary: true,
          },
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
          },
          {
            label: "🛒 Store",
            href: "/store",
          },
          {
            label: "📩 Contact",
            href: "/contact",
          },
        ]}
        stats={[
          {
            value: "6+",
            label: "Service areas",
          },
          {
            value: "B2B",
            label: "Business platform",
          },
          {
            value: "SADC",
            label: "Regional reach",
          },
          {
            value: "Trade",
            label: "Core mission",
          },
        ]}
        infoCards={[
          {
            title: "Cargo",
            text: "Transport requests",
          },
          {
            title: "Store",
            text: "Product marketplace",
          },
          {
            title: "Warehouse",
            text: "Storage network",
          },
          {
            title: "Aviation",
            text: "Air logistics",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Services"
            value={services.length}
            subtitle="Platform service areas"
            color="blue"
          />

          <DashboardCard
            title="Market"
            value="Namibia"
            subtitle="Local-first strategy"
            color="green"
          />

          <DashboardCard
            title="Region"
            value="SADC"
            subtitle="Expansion ready"
            color="orange"
          />

          <DashboardCard
            title="Model"
            value="SaaS"
            subtitle="Digital infrastructure"
            color="red"
          />
        </div>

        <AppCard id="services" className="mb-8">
          <SectionHeader
            title="🚀 NamLogix Africa Services"
            subtitle="Core platform services for trade and logistics."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <AppCard key={service.title} hover>
                <div className="text-4xl mb-4">{service.icon}</div>

                <h3 className="font-semibold text-lg">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-500 mt-3 leading-6">
                  {service.text}
                </p>

                <div className="mt-5">
                  <Button href={service.href} variant="outline">
                    Open Service →
                  </Button>
                </div>
              </AppCard>
            ))}
          </div>
        </AppCard>

        <AppCard>
          <SectionHeader
            title="🌍 Regional Trade Infrastructure"
            subtitle="NamLogix Africa is designed to grow from a simple app into a regional logistics marketplace."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/trade-routes" variant="primary" fullWidth>
              🛣️ Trade Routes
            </Button>

            <Button href="/suppliers" variant="secondary" fullWidth>
              👥 Suppliers
            </Button>

            <Button href="/warehouses" variant="outline" fullWidth>
              🏭 Warehouses
            </Button>

            <Button href="/admin/dashboard" variant="outline" fullWidth>
              📊 Admin
            </Button>
          </div>
        </AppCard>
      </div>
    </div>
  );
}