"use client";

import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Platform Settings"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="System Settings"
        description="Manage platform configuration, business details, preferences, notifications, security, and future admin controls."
        actions={[
          {
            label: "⚙️ Settings",
            href: "#settings",
            primary: true,
          },
          {
            label: "📊 Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "👤 Users",
            href: "/admin/users",
          },
          {
            label: "📈 Analytics",
            href: "/admin/analytics",
          },
        ]}
        stats={[
          {
            value: "Admin",
            label: "Control mode",
          },
          {
            value: "Secure",
            label: "Protected access",
          },
          {
            value: "Ready",
            label: "Settings page",
          },
          {
            value: "SaaS",
            label: "Platform model",
          },
        ]}
        infoCards={[
          {
            title: "Profile",
            text: "Business settings",
          },
          {
            title: "Security",
            text: "Access control",
          },
          {
            title: "Alerts",
            text: "Notifications",
          },
          {
            title: "System",
            text: "Platform config",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Mode"
            value="Admin"
            subtitle="Current access level"
            color="blue"
          />

          <DashboardCard
            title="Security"
            value="Active"
            subtitle="Supabase auth ready"
            color="green"
          />

          <DashboardCard
            title="Notifications"
            value="Future"
            subtitle="Alerts and emails"
            color="orange"
          />

          <DashboardCard
            title="System"
            value="Ready"
            subtitle="Platform configuration"
            color="red"
          />
        </div>

        <AppCard className="mb-8">
          <SectionHeader
            title="⚡ Settings Shortcuts"
            subtitle="Manage important parts of the platform."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/admin/dashboard" variant="primary" fullWidth>
              📊 Dashboard
            </Button>

            <Button href="/admin/users" variant="secondary" fullWidth>
              👤 Users
            </Button>

            <Button href="/admin/vehicles" variant="outline" fullWidth>
              🚚 Vehicles
            </Button>

            <Button href="/admin/companies" variant="outline" fullWidth>
              🏢 Companies
            </Button>

            <Button href="/admin/documents" variant="outline" fullWidth>
              📄 Documents
            </Button>

            <Button href="/admin/trips" variant="outline" fullWidth>
              🚌 Trips
            </Button>

            <Button href="/admin/analytics" variant="outline" fullWidth>
              📈 Analytics
            </Button>

            <Button href="/login" variant="outline" fullWidth>
              🔐 Login
            </Button>
          </div>
        </AppCard>

        <AppCard id="settings">
          <SectionHeader
            title="⚙️ Platform Settings"
            subtitle="Business profile, notifications, roles, and security settings will appear here."
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-2xl p-5 bg-gray-50">
              <h3 className="text-lg font-bold mb-4 text-gray-900">
                Approval Settings
              </h3>

              <div className="space-y-3 text-sm font-medium text-gray-700">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  Require vehicle approval
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  Require company approval
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  Require document verification
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  Require trip review
                </label>
              </div>
            </div>

            <div className="border rounded-2xl p-5 bg-gray-50">
              <h3 className="text-lg font-bold mb-4 text-gray-900">
                Upload Settings
              </h3>

              <div className="space-y-3 text-sm font-medium text-gray-700">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  Allow logo uploads
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  Allow banner uploads
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  Allow vehicle image uploads
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  Allow document uploads
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <EmptyState
              icon="⚙️"
              title="Advanced settings coming soon"
              message="Future updates will include notifications, AI moderation, analytics, escrow settings, payment controls, and platform automation."
            />
          </div>
        </AppCard>
      </div>
    </div>
  );
}