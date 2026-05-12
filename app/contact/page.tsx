"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Contact NamLogix Africa"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Contact Center"
        description="Connect with NamLogix Africa for cargo, suppliers, warehouse support, marketplace questions, aviation logistics, and trade infrastructure services."
        actions={[
          {
            label: "📩 Contact Us",
            href: "#contact",
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
            label: "👥 Suppliers",
            href: "/admin/suppliers",
          },
        ]}
        stats={[
          {
            value: "Support",
            label: "Customer help",
          },
          {
            value: "Cargo",
            label: "Logistics requests",
          },
          {
            value: "Trade",
            label: "Business inquiries",
          },
          {
            value: "SADC",
            label: "Regional interest",
          },
        ]}
        infoCards={[
          {
            title: "Cargo",
            text: "Transport support",
          },
          {
            title: "Suppliers",
            text: "Partner inquiries",
          },
          {
            title: "Store",
            text: "Product questions",
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
            title="Support"
            value="Ready"
            subtitle="Contact foundation"
            color="blue"
          />

          <DashboardCard
            title="Cargo"
            value="Requests"
            subtitle="Transport inquiries"
            color="green"
          />

          <DashboardCard
            title="Suppliers"
            value="Partners"
            subtitle="Business network"
            color="orange"
          />

          <DashboardCard
            title="Region"
            value="SADC"
            subtitle="Expansion market"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Contact Shortcuts"
            subtitle="Choose the area of the platform you need help with."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/request-cargo" variant="primary" fullWidth>
              📦 Cargo Support
            </Button>

            <Button href="/store" variant="secondary" fullWidth>
              🛒 Store Support
            </Button>

            <Button href="/admin/inquiries" variant="outline" fullWidth>
              📩 Admin Inquiries
            </Button>

            <Button href="/aviation" variant="outline" fullWidth>
              ✈️ Aviation
            </Button>
          </div>
        </AppCard>

        <AppCard id="contact">
          <SectionHeader
            title="📩 Contact Form"
            subtitle="A live contact form can be connected here later."
          />

          <EmptyState
            icon="📩"
            title="Contact form coming soon"
            message="This section is ready for name, email, phone, message, service type, and Supabase inquiry storage."
          />
        </AppCard>
      </div>
    </div>
  );
}