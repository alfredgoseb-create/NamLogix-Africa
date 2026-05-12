"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function InquiriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Customer Inquiries"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Inquiry Center"
        description="Manage customer questions, supplier requests, cargo inquiries, product questions, and logistics service messages."
        actions={[
          {
            label: "📩 View Inquiries",
            href: "#inquiries",
            primary: true,
          },
          {
            label: "📦 Orders",
            href: "/admin/orders",
          },
          {
            label: "👥 Suppliers",
            href: "/admin/suppliers",
          },
          {
            label: "📊 Dashboard",
            href: "/admin/dashboard",
          },
        ]}
        stats={[
          {
            value: 0,
            label: "Inquiries",
          },
          {
            value: 0,
            label: "Open",
          },
          {
            value: 0,
            label: "Resolved",
          },
          {
            value: 0,
            label: "Urgent",
          },
        ]}
        infoCards={[
          {
            title: "Customers",
            text: "Service requests",
          },
          {
            title: "Suppliers",
            text: "Partner messages",
          },
          {
            title: "Cargo",
            text: "Transport questions",
          },
          {
            title: "Store",
            text: "Product support",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Inquiries"
            value={0}
            subtitle="Total messages"
            color="blue"
          />

          <DashboardCard
            title="Open"
            value={0}
            subtitle="Needs response"
            color="orange"
          />

          <DashboardCard
            title="Resolved"
            value={0}
            subtitle="Completed support"
            color="green"
          />

          <DashboardCard
            title="Urgent"
            value={0}
            subtitle="High priority"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Inquiry Actions"
            subtitle="Manage communication across the trade platform."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/admin/orders" variant="primary" fullWidth>
              📦 Orders
            </Button>

            <Button href="/admin/suppliers" variant="secondary" fullWidth>
              👥 Suppliers
            </Button>

            <Button href="/cargo-requests" variant="outline" fullWidth>
              🚚 Cargo Requests
            </Button>

            <Button href="/store" variant="outline" fullWidth>
              🛒 Store
            </Button>
          </div>
        </AppCard>

        <AppCard id="inquiries">
          <SectionHeader
            title="📩 Inquiry Inbox"
            subtitle="Customer and business inquiries will appear here."
          />

          <EmptyState
            icon="📩"
            title="No inquiries yet"
            message="Messages from customers, suppliers, cargo owners, and traders will appear here once inquiry forms are connected."
          />
        </AppCard>
      </div>
    </div>
  );
}