"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function PublicTradeRoutesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Southern African Trade Network"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Regional Trade Routes"
        description="Explore major cargo corridors, logistics routes, and trade movement opportunities connecting Namibia with Southern Africa."
        actions={[
          {
            label: "🛣️ View Routes",
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
            label: "📍 Track Order",
            href: "/order-status",
          },
        ]}
        stats={[
          {
            value: "SADC",
            label: "Region coverage",
          },
          {
            value: "NAD",
            label: "Local currency",
          },
          {
            value: "Live",
            label: "Trade platform",
          },
          {
            value: "B2B",
            label: "Business network",
          },
        ]}
        infoCards={[
          {
            title: "Namibia",
            text: "Trade hub",
          },
          {
            title: "Walvis Bay",
            text: "Port gateway",
          },
          {
            title: "Windhoek",
            text: "Logistics center",
          },
          {
            title: "SADC",
            text: "Regional reach",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Trade Region"
            value="SADC"
            subtitle="Southern African corridor"
            color="blue"
          />

          <DashboardCard
            title="Gateway"
            value="Walvis Bay"
            subtitle="Port and cargo entry point"
            color="green"
          />

          <DashboardCard
            title="Main Hub"
            value="Windhoek"
            subtitle="Central logistics control"
            color="orange"
          />

          <DashboardCard
            title="Status"
            value="Growing"
            subtitle="Regional trade network"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Route Actions"
            subtitle="Start logistics activity through the NamLogix trade network."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/request-cargo" variant="primary" fullWidth>
              📦 Request Cargo
            </Button>

            <Button href="/trip-offers" variant="secondary" fullWidth>
              🚛 View Trip Offers
            </Button>

            <Button href="/cargo-requests" variant="outline" fullWidth>
              🚚 Find Cargo
            </Button>

            <Button href="/store" variant="outline" fullWidth>
              🛒 Browse Store
            </Button>
          </div>
        </AppCard>

        <AppCard id="routes" className="mb-8">
          <SectionHeader
            title="🛣️ Key Trade Corridors"
            subtitle="Important logistics routes for Namibia and Southern Africa."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                route: "Walvis Bay → Windhoek",
                desc: "Main port-to-capital corridor for imported goods, warehouse distribution, and inland logistics.",
              },
              {
                route: "Windhoek → Johannesburg",
                desc: "High-value regional trade route connecting Namibia to South Africa’s commercial center.",
              },
              {
                route: "Windhoek → Cape Town",
                desc: "Southern corridor for goods movement, retail supply, and export logistics.",
              },
              {
                route: "Walvis Bay → Botswana",
                desc: "Strategic inland route supporting landlocked regional markets.",
              },
              {
                route: "Namibia → Zambia",
                desc: "Cross-border route for regional freight, mining supplies, and agricultural trade.",
              },
              {
                route: "Namibia → Angola",
                desc: "Northern trade connection supporting construction, retail, and industrial logistics.",
              },
            ].map((item) => (
              <div
                key={item.route}
                className="border rounded-xl p-5 hover:shadow-lg transition bg-white"
              >
                <h3 className="font-semibold text-lg">{item.route}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-6">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard>
          <SectionHeader
            title="🌍 Regional Expansion"
            subtitle="Future routes, customs support, cargo bidding, and verified logistics partners."
          />

          <EmptyState
            icon="🌍"
            title="Route intelligence is expanding"
            message="As the NamLogix platform grows, live route data, transporter availability, customs documents, and pricing intelligence will appear here."
          />
        </AppCard>
      </div>
    </div>
  );
}