// @ts-nocheck
"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function ContactPage() {
  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="NamLogix Support"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Contact Center"
        description="Connect with the NamLogix Africa team for logistics support, supplier onboarding, warehouse partnerships, cargo movement, trade operations, and platform assistance."
        actions={[
          {
            label: "📞 Contact Team",
            href: "#contact-form",
            primary: true,
          },
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
          },
          {
            label: "🏭 Warehouses",
            href: "/warehouses",
          },
          {
            label: "🛒 Store",
            href: "/store",
          },
        ]}
        stats={[
          {
            value: "24/7",
            label: "Support",
          },
          {
            value: "SADC",
            label: "Coverage",
          },
          {
            value: "Trade",
            label: "Infrastructure",
          },
          {
            value: "Live",
            label: "Platform status",
          },
        ]}
        infoCards={[
          {
            title: "Cargo",
            text: "Transport support",
          },
          {
            title: "Warehouses",
            text: "Storage network",
          },
          {
            title: "Suppliers",
            text: "Marketplace support",
          },
          {
            title: "Trade",
            text: "Regional logistics",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Support"
            value="24/7"
            subtitle="Customer assistance"
            color="blue"
          />

          <DashboardCard
            title="Coverage"
            value="SADC"
            subtitle="Southern Africa"
            color="green"
          />

          <DashboardCard
            title="Platform"
            value="Live"
            subtitle="Operations active"
            color="orange"
          />

          <DashboardCard
            title="Response"
            value="Fast"
            subtitle="Business support"
            color="red"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AppCard id="contact-form" variant="blue">
              <SectionHeader
                title="📞 Contact NamLogix Africa"
                subtitle="Send inquiries about cargo, suppliers, logistics, warehousing, partnerships, or platform operations."
              />

              <form className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Company Name"
                  className="border rounded-xl px-4 py-3"
                />

                <select className="border rounded-xl px-4 py-3 md:col-span-2">
                  <option>General Inquiry</option>
                  <option>Cargo Transport</option>
                  <option>Warehouse Partnership</option>
                  <option>Supplier Registration</option>
                  <option>Marketplace Support</option>
                  <option>Trade Routes</option>
                </select>

                <textarea
                  placeholder="Your Message"
                  className="border rounded-xl px-4 py-3 md:col-span-2 min-h-40"
                />

                <div className="md:col-span-2">
                  <Button type="submit" variant="orange" fullWidth>
                    📨 Send Message
                  </Button>
                </div>
              </form>
            </AppCard>
          </div>

          <div className="space-y-6">
            <AppCard hover variant="green">
              <h3 className="text-xl font-bold mb-4">
                📍 Office Information
              </h3>

              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-900">
                    NamLogix Africa
                  </p>
                  <p>Windhoek, Namibia</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p>+264 XX XXX XXXX</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p>support@namlogixafrica.com</p>
                </div>
              </div>
            </AppCard>

            <AppCard hover variant="orange">
              <h3 className="text-xl font-bold mb-4">
                🚛 Logistics Services
              </h3>

              <ul className="space-y-3 text-sm text-gray-600">
                <li>• Cargo transport coordination</li>
                <li>• Warehouse partnerships</li>
                <li>• Supplier onboarding</li>
                <li>• Inventory management</li>
                <li>• Trade route support</li>
                <li>• Marketplace operations</li>
              </ul>
            </AppCard>

            <AppCard hover variant="default">
              <h3 className="text-xl font-bold mb-4">
                ⚡ Quick Navigation
              </h3>

              <div className="space-y-3">
                <Button href="/request-cargo" variant="primary" fullWidth>
                  📦 Post Cargo
                </Button>

                <Button href="/cargo-requests" variant="secondary" fullWidth>
                  🚚 Cargo Requests
                </Button>

                <Button href="/warehouses" variant="outline" fullWidth>
                  🏭 Warehouses
                </Button>

                <Button href="/store" variant="outline" fullWidth>
                  🛒 Marketplace
                </Button>
              </div>
            </AppCard>
          </div>
        </div>
      </div>
    </div>
  );
}