// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";
import { supabase } from "@/lib/supabaseClient";

export default function PublicWarehousesPage() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  async function fetchWarehouses() {
    setLoading(true);

    const { data, error } = await supabase
      .from("warehouses")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load warehouses: " + error.message);
    } else {
      setWarehouses(data || []);
    }

    setLoading(false);
  }

  const warehouseLocations = new Set(
    warehouses.map((w) => w.location).filter(Boolean)
  ).size;

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Warehouse Marketplace"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Warehouse Network"
        description="Find warehouse space, storage partners, inventory support, distribution facilities, and logistics infrastructure across Namibia and Southern Africa."
        actions={[
          {
            label: "🏭 View Warehouses",
            href: "#warehouses",
            primary: true,
          },
          {
            label: "🛒 Store",
            href: "/store",
          },
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
          },
          {
            label: "👥 Suppliers",
            href: "/suppliers",
          },
        ]}
        stats={[
          {
            value: warehouses.length,
            label: "Active warehouses",
          },
          {
            value: warehouseLocations,
            label: "Locations",
          },
          {
            value: "Inventory",
            label: "Stock control",
          },
          {
            value: "Live",
            label: "Warehouse network",
          },
        ]}
        infoCards={[
          {
            title: "Storage",
            text: "Space listing",
          },
          {
            title: "Inventory",
            text: "Stock support",
          },
          {
            title: "Distribution",
            text: "Cargo movement",
          },
          {
            title: "Trade",
            text: "Supply chain",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Warehouses"
            value={warehouses.length}
            subtitle="Public warehouse listings"
            color="blue"
          />

          <DashboardCard
            title="Storage"
            value="Ready"
            subtitle="Storage marketplace"
            color="green"
          />

          <DashboardCard
            title="Locations"
            value={warehouseLocations}
            subtitle="Coverage areas"
            color="orange"
          />

          <DashboardCard
            title="Region"
            value="SADC"
            subtitle="Southern Africa"
            color="red"
          />
        </div>

        <AppCard className="mb-8" variant="orange">
          <SectionHeader
            title="⚡ Warehouse Actions"
            subtitle="Connect warehouse capacity with suppliers, store products, and logistics."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/store" variant="primary" fullWidth>
              🛒 Browse Store
            </Button>

            <Button href="/suppliers" variant="secondary" fullWidth>
              👥 Suppliers
            </Button>

            <Button href="/request-cargo" variant="outline" fullWidth>
              📦 Post Cargo
            </Button>

            <Button href="/trade-routes" variant="outline" fullWidth>
              🛣️ Trade Routes
            </Button>
          </div>
        </AppCard>

        <AppCard id="warehouses" variant="blue">
          <SectionHeader
            title="🏭 Warehouse Listings"
            subtitle="Public warehouse listings, storage capacity, and service providers."
            action={
              <button
                onClick={fetchWarehouses}
                className="bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800"
              >
                Refresh
              </button>
            }
          />

          {loading ? (
            <p>Loading warehouses...</p>
          ) : warehouses.length === 0 ? (
            <EmptyState
              icon="🏭"
              title="No public warehouses yet"
              message="Warehouse listings will appear here once active warehouses are added in the admin dashboard."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {warehouses.map((warehouse) => (
                <AppCard key={warehouse.id} hover>
                  <div className="flex justify-between gap-4 mb-4">
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {warehouse.status || "active"}
                    </span>

                    <span className="text-xs text-gray-400">
                      Warehouse
                    </span>
                  </div>

                  <h3 className="font-bold text-lg">
                    {warehouse.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    {warehouse.location || "No location added"}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Capacity</p>
                      <p className="font-semibold">
                        {warehouse.capacity || "Not set"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Manager</p>
                      <p className="font-semibold">
                        {warehouse.manager_name || "Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Button href="/contact" variant="outline" fullWidth>
                      Contact Warehouse
                    </Button>
                  </div>
                </AppCard>
              ))}
            </div>
          )}
        </AppCard>
      </div>
    </div>
  );
}