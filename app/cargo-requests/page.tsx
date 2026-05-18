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

export default function CargoRequestsPage() {
  const [cargoRequests, setCargoRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCargoRequests();
  }, []);

  async function fetchCargoRequests() {
    setLoading(true);

    const { data, error } = await supabase
      .from("cargo_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load cargo requests: " + error.message);
    } else {
      setCargoRequests(data || []);
    }

    setLoading(false);
  }

  const openCargo = cargoRequests.filter((c) => c.status === "pending").length;

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Cargo Marketplace"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Available Cargo"
        description="Browse cargo requests, discover transport opportunities, and connect cargo owners with logistics operators across Southern Africa."
        actions={[
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
            primary: true,
          },
          {
            label: "💰 Cargo Bids",
            href: "/bids",
          },
          {
            label: "🚛 Trip Offers",
            href: "/trip-offers",
          },
          {
            label: "🛣️ Trade Routes",
            href: "/trade-routes",
          },
        ]}
        stats={[
          {
            value: cargoRequests.length,
            label: "Cargo requests",
          },
          {
            value: openCargo,
            label: "Open cargo",
          },
          {
            value: "SADC",
            label: "Coverage",
          },
          {
            value: "Live",
            label: "Marketplace",
          },
        ]}
        infoCards={[
          {
            title: "Cargo",
            text: "Available loads",
          },
          {
            title: "Bidding",
            text: "Transport quotes",
          },
          {
            title: "Routes",
            text: "Regional lanes",
          },
          {
            title: "Tracking",
            text: "Delivery visibility",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Cargo Requests"
            value={cargoRequests.length}
            subtitle="Total posted cargo"
            color="blue"
          />

          <DashboardCard
            title="Open Cargo"
            value={openCargo}
            subtitle="Ready for bidding"
            color="orange"
          />

          <DashboardCard
            title="Routes"
            value="SADC"
            subtitle="Regional network"
            color="green"
          />

          <DashboardCard
            title="Status"
            value="Live"
            subtitle="Supabase connected"
            color="red"
          />
        </div>

        <AppCard className="mb-8" variant="orange">
          <SectionHeader
            title="⚡ Cargo Marketplace Actions"
            subtitle="Move cargo requests through the logistics workflow."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/request-cargo" variant="orange" fullWidth>
              📦 Post Cargo
            </Button>

            <Button href="/bids" variant="primary" fullWidth>
              💰 View Bids
            </Button>

            <Button href="/trip-offers" variant="outline" fullWidth>
              🚛 Find Trips
            </Button>

            <Button href="/trade-routes" variant="outline" fullWidth>
              🛣️ Trade Routes
            </Button>
          </div>
        </AppCard>

        <AppCard id="cargo" variant="blue">
          <SectionHeader
            title="📦 Available Cargo Requests"
            subtitle="Cargo requests from traders, warehouses, businesses, and customers."
            action={
              <button
                onClick={fetchCargoRequests}
                className="bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800"
              >
                Refresh
              </button>
            }
          />

          {loading ? (
            <p>Loading cargo requests...</p>
          ) : cargoRequests.length === 0 ? (
            <EmptyState
              icon="📦"
              title="No cargo requests yet"
              message="Cargo requests will appear here once users post goods that need transportation."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cargoRequests.map((cargo) => (
                <AppCard key={cargo.id} hover variant="default">
                  <div className="flex justify-between gap-4 mb-4">
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {cargo.status || "pending"}
                    </span>

                    <span className="text-xs text-gray-400">
                      {cargo.request_number}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg">
                    {cargo.pickup_location} → {cargo.delivery_location}
                  </h3>

                  <p className="text-sm text-gray-500 mt-3 leading-6">
                    {cargo.description || "No description provided."}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Weight</p>
                      <p className="font-semibold">{cargo.weight_kg || 0} kg</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Budget</p>
                      <p className="font-semibold">N${cargo.budget || 0}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Button href="/bids" variant="primary" fullWidth>
                      💰 View / Submit Bid
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