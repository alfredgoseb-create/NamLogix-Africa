"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

const logisticsRoutes = [
  {
    route: "Walvis Bay → Windhoek",
    type: "Port Logistics",
    distance: "390 km",
    description:
      "Main cargo corridor connecting Namibia’s largest port to the capital city and warehouse infrastructure.",
  },
  {
    route: "Windhoek → Johannesburg",
    type: "Regional Trade",
    distance: "1,400 km",
    description:
      "High-volume Southern African trade lane supporting industrial and retail movement.",
  },
  {
    route: "Windhoek → Cape Town",
    type: "Cross-Border",
    distance: "1,500 km",
    description:
      "Important transport route for retail goods, exports, and logistics operations.",
  },
  {
    route: "Walvis Bay → Botswana",
    type: "Transit Corridor",
    distance: "Regional",
    description:
      "Strategic inland trade route supporting regional imports and exports.",
  },
  {
    route: "Namibia → Zambia",
    type: "Mining Logistics",
    distance: "Regional",
    description:
      "Supports mining, agricultural, and industrial cargo movement across borders.",
  },
  {
    route: "Namibia → Angola",
    type: "Northern Corridor",
    distance: "Regional",
    description:
      "Fast-growing trade route supporting construction and retail supply chains.",
  },
];

export default function RoutesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Regional Logistics"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Transport Routes"
        description="Explore logistics corridors, cargo movement lanes, transport routes, and regional trade infrastructure across Southern Africa."
        actions={[
          {
            label: "🛣️ Explore Routes",
            href: "#routes",
            primary: true,
          },
          {
            label: "📦 Request Cargo",
            href: "/request-cargo",
          },
          {
            label: "🚛 Trip Offers",
            href: "/trip-offers",
          },
          {
            label: "💰 Cargo Bids",
            href: "/bids",
          },
        ]}
        stats={[
          {
            value: "SADC",
            label: "Regional reach",
          },
          {
            value: "Cross-border",
            label: "Trade lanes",
          },
          {
            value: "Cargo",
            label: "Logistics support",
          },
          {
            value: "Live",
            label: "Infrastructure",
          },
        ]}
        infoCards={[
          {
            title: "Ports",
            text: "Walvis Bay gateway",
          },
          {
            title: "Road",
            text: "Regional corridors",
          },
          {
            title: "Cargo",
            text: "Trade movement",
          },
          {
            title: "Transport",
            text: "Connected routes",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* STATS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Trade Region"
            value="SADC"
            subtitle="Southern Africa"
            color="blue"
          />

          <DashboardCard
            title="Gateway"
            value="Walvis Bay"
            subtitle="Port logistics"
            color="green"
          />

          <DashboardCard
            title="Transport"
            value="Routes"
            subtitle="Connected corridors"
            color="orange"
          />

          <DashboardCard
            title="Status"
            value="Growing"
            subtitle="Regional expansion"
            color="red"
          />
        </div>

        {/* QUICK ACTIONS */}
        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Logistics Actions"
            subtitle="Navigate through the NamLogix transport ecosystem."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/request-cargo" variant="primary" fullWidth>
              📦 Request Cargo
            </Button>

            <Button href="/cargo-requests" variant="secondary" fullWidth>
              🚚 Cargo Requests
            </Button>

            <Button href="/trip-offers" variant="outline" fullWidth>
              🚛 Trip Offers
            </Button>

            <Button href="/store" variant="outline" fullWidth>
              🛒 Marketplace
            </Button>
          </div>
        </AppCard>

        {/* ROUTES */}
        <AppCard id="routes" className="mb-8">
          <SectionHeader
            title="🛣️ Logistics Corridors"
            subtitle="Major transport and cargo routes across Namibia and Southern Africa."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logisticsRoutes.map((item) => (
              <AppCard key={item.route} hover>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    {item.type}
                  </span>

                  <span className="text-xs text-gray-500">
                    {item.distance}
                  </span>
                </div>

                <h3 className="font-semibold text-lg">
                  {item.route}
                </h3>

                <p className="text-sm text-gray-500 mt-3 leading-6">
                  {item.description}
                </p>
              </AppCard>
            ))}
          </div>
        </AppCard>

        {/* FUTURE FEATURES */}
        <AppCard>
          <SectionHeader
            title="🌍 Future Route Intelligence"
            subtitle="NamLogix can become a real-time African logistics infrastructure platform."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Live vehicle tracking",
              "Real-time traffic updates",
              "Border crossing intelligence",
              "Fuel station network",
              "Customs clearance support",
              "AI logistics optimization",
              "Cargo availability mapping",
              "Warehouse route integration",
              "Regional trade analytics",
            ].map((feature) => (
              <div
                key={feature}
                className="bg-gray-50 border rounded-xl p-4"
              >
                <p className="font-medium text-gray-700">
                  🚀 {feature}
                </p>
              </div>
            ))}
          </div>
        </AppCard>
      </div>
    </div>
  );
}