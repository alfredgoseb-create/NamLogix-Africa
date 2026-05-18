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

const emptyBidForm = {
  cargo_request_id: "",
  transporter_name: "",
  transporter_phone: "",
  transporter_email: "",
  bid_amount: "",
  estimated_delivery_time: "",
  notes: "",
};

export default function BidsPage() {
  const [cargoRequests, setCargoRequests] = useState([]);
  const [bids, setBids] = useState([]);
  const [form, setForm] = useState(emptyBidForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    const { data: cargoData, error: cargoError } = await supabase
      .from("cargo_requests")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: bidsData, error: bidsError } = await supabase
      .from("bids")
      .select(
        `
        *,
        cargo_requests (
          pickup_location,
          delivery_location,
          request_number
        )
      `
      )
      .order("created_at", { ascending: false });

    if (cargoError) {
      alert("Failed to load cargo requests: " + cargoError.message);
    } else {
      setCargoRequests(cargoData || []);
    }

    if (bidsError) {
      alert("Failed to load bids: " + bidsError.message);
    } else {
      setBids(bidsData || []);
    }

    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.cargo_request_id || !form.transporter_name) {
      alert("Please select cargo and enter transporter name.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("bids").insert([
      {
        cargo_request_id: form.cargo_request_id,
        transporter_name: form.transporter_name,
        transporter_phone: form.transporter_phone,
        transporter_email: form.transporter_email,
        bid_amount: Number(form.bid_amount) || 0,
        estimated_delivery_time: form.estimated_delivery_time,
        notes: form.notes,
        status: "pending",
      },
    ]);

    setSaving(false);

    if (error) {
      alert("Failed to submit bid: " + error.message);
      return;
    }

    alert("Bid submitted successfully.");
    setForm(emptyBidForm);
    fetchData();
  }

  const pendingBids = bids.filter((b) => b.status === "pending").length;
  const acceptedBids = bids.filter((b) => b.status === "accepted").length;
  const totalBidValue = bids.reduce(
    (acc, bid) => acc + Number(bid.bid_amount || 0),
    0
  );

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Transport Bidding"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Cargo Bids"
        description="Submit and manage transport bids, cargo quotes, logistics pricing, and transporter offers for cargo movement across Southern Africa."
        actions={[
          {
            label: "💰 Submit Bid",
            href: "#bid-form",
            primary: true,
          },
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
          },
          {
            label: "🚚 Cargo Requests",
            href: "/cargo-requests",
          },
          {
            label: "🚛 Trip Offers",
            href: "/trip-offers",
          },
        ]}
        stats={[
          {
            value: bids.length,
            label: "Total bids",
          },
          {
            value: pendingBids,
            label: "Pending bids",
          },
          {
            value: cargoRequests.length,
            label: "Cargo requests",
          },
          {
            value: "NAD",
            label: "Pricing",
          },
        ]}
        infoCards={[
          {
            title: "Quotes",
            text: "Transport offers",
          },
          {
            title: "Cargo",
            text: "Load bidding",
          },
          {
            title: "Pricing",
            text: "Best offers",
          },
          {
            title: "Transport",
            text: "Operator network",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Total Bids"
            value={bids.length}
            subtitle="Submitted transporter offers"
            color="blue"
          />

          <DashboardCard
            title="Pending"
            value={pendingBids}
            subtitle="Awaiting decision"
            color="orange"
          />

          <DashboardCard
            title="Accepted"
            value={acceptedBids}
            subtitle="Confirmed transporters"
            color="green"
          />

          <DashboardCard
            title="Bid Value"
            value={`N$${totalBidValue}`}
            subtitle="Total quoted value"
            color="red"
          />
        </div>

        <AppCard className="mb-8" variant="orange">
          <SectionHeader
            title="⚡ Bidding Actions"
            subtitle="Connect cargo owners and transporters through competitive offers."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/cargo-requests" variant="primary" fullWidth>
              🚚 Find Cargo
            </Button>

            <Button href="/request-cargo" variant="orange" fullWidth>
              📦 Post Cargo
            </Button>

            <Button href="/trip-offers" variant="outline" fullWidth>
              🚛 Trip Offers
            </Button>

            <Button href="/trade-routes" variant="outline" fullWidth>
              🛣️ Trade Routes
            </Button>
          </div>
        </AppCard>

        <AppCard id="bid-form" className="mb-8" variant="blue">
          <SectionHeader
            title="💰 Submit Transport Bid"
            subtitle="Select a cargo request and submit your transporter quote."
          />

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <select
              value={form.cargo_request_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  cargo_request_id: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3 md:col-span-2"
            >
              <option value="">Select Cargo Request *</option>

              {cargoRequests.map((cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.request_number || cargo.id} — {cargo.pickup_location} to{" "}
                  {cargo.delivery_location}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Transporter Name *"
              value={form.transporter_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  transporter_name: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Transporter Phone"
              value={form.transporter_phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  transporter_phone: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Transporter Email"
              value={form.transporter_email}
              onChange={(e) =>
                setForm({
                  ...form,
                  transporter_email: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Bid Amount NAD"
              value={form.bid_amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  bid_amount: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Estimated Delivery Time"
              value={form.estimated_delivery_time}
              onChange={(e) =>
                setForm({
                  ...form,
                  estimated_delivery_time: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3 md:col-span-2"
            />

            <textarea
              placeholder="Notes"
              value={form.notes}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3 md:col-span-2 min-h-32"
            />

            <div className="md:col-span-2">
              <Button type="submit" variant="orange" fullWidth>
                {saving ? "Submitting Bid..." : "💰 Submit Bid"}
              </Button>
            </div>
          </form>
        </AppCard>

        <AppCard id="bids" variant="green">
          <SectionHeader
            title="💰 Cargo Bids"
            subtitle="Transporter bids and cargo quotes submitted on the platform."
            action={
              <button
                onClick={fetchData}
                className="bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800"
              >
                Refresh
              </button>
            }
          />

          {loading ? (
            <p>Loading bids...</p>
          ) : bids.length === 0 ? (
            <EmptyState
              icon="💰"
              title="No bids yet"
              message="When transporters submit quotes for cargo movement, those bids will appear here."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bids.map((bid) => (
                <AppCard key={bid.id} hover>
                  <div className="flex justify-between gap-4 mb-4">
                    <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                      {bid.status || "pending"}
                    </span>

                    <span className="text-xs text-gray-400">
                      N${bid.bid_amount || 0}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg">
                    {bid.transporter_name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    {bid.cargo_requests?.pickup_location || "Unknown origin"} →{" "}
                    {bid.cargo_requests?.delivery_location ||
                      "Unknown destination"}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Amount</p>
                      <p className="font-semibold">N${bid.bid_amount || 0}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Delivery</p>
                      <p className="font-semibold">
                        {bid.estimated_delivery_time || "Not set"}
                      </p>
                    </div>
                  </div>

                  {bid.notes && (
                    <p className="text-sm text-gray-500 mt-4 leading-6">
                      {bid.notes}
                    </p>
                  )}

                  <div className="mt-5">
                    <Button href="/cargo-requests" variant="outline" fullWidth>
                      View Cargo Request
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