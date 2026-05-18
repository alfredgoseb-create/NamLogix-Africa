// @ts-nocheck
"use client";

import { useState } from "react";
import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";
import { supabase } from "@/lib/supabaseClient";

const emptyForm = {
  pickup_location: "",
  delivery_location: "",
  cargo_type: "",
  weight_kg: "",
  budget: "",
  description: "",
  contact_name: "",
  contact_phone: "",
  contact_email: "",
};

export default function RequestCargoPage() {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.pickup_location || !form.delivery_location) {
      alert("Pickup and delivery locations are required.");
      return;
    }

    setSaving(true);

    const requestNumber = `CR-${Date.now()}`;

    const { error } = await supabase.from("cargo_requests").insert([
      {
        request_number: requestNumber,
        pickup_location: form.pickup_location,
        delivery_location: form.delivery_location,
        cargo_type: form.cargo_type,
        weight_kg: Number(form.weight_kg) || 0,
        budget: Number(form.budget) || 0,
        description: form.description,
        contact_name: form.contact_name,
        contact_phone: form.contact_phone,
        contact_email: form.contact_email,
        status: "pending",
      },
    ]);

    setSaving(false);

    if (error) {
      alert("Failed to post cargo: " + error.message);
      return;
    }

    alert("Cargo request posted successfully.");
    setForm(emptyForm);
  }

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Cargo Request"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Post Cargo"
        description="Create cargo requests and connect with transporters, logistics operators, warehouses, and trade partners across Southern Africa."
        actions={[
          {
            label: "📦 Start Request",
            href: "#cargo-form",
            primary: true,
          },
          {
            label: "🚚 Find Cargo",
            href: "/cargo-requests",
          },
          {
            label: "💰 Cargo Bids",
            href: "/bids",
          },
          {
            label: "🛣️ Trade Routes",
            href: "/trade-routes",
          },
        ]}
        stats={[
          {
            value: "Cargo",
            label: "Request type",
          },
          {
            value: "Bids",
            label: "Transport quotes",
          },
          {
            value: "SADC",
            label: "Regional coverage",
          },
          {
            value: "NAD",
            label: "Local currency",
          },
        ]}
        infoCards={[
          {
            title: "Post",
            text: "Cargo request",
          },
          {
            title: "Receive",
            text: "Transport bids",
          },
          {
            title: "Select",
            text: "Best offer",
          },
          {
            title: "Track",
            text: "Delivery flow",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Cargo"
            value="Open"
            subtitle="Request posting active"
            color="blue"
          />

          <DashboardCard
            title="Transporters"
            value="Bids"
            subtitle="Quote system ready"
            color="green"
          />

          <DashboardCard
            title="Coverage"
            value="SADC"
            subtitle="Regional network"
            color="orange"
          />

          <DashboardCard
            title="Status"
            value="Live"
            subtitle="Supabase connected"
            color="red"
          />
        </div>

        <AppCard id="cargo-form" variant="blue">
          <SectionHeader
            title="📦 Cargo Request Form"
            subtitle="Post cargo details so transporters can view the request and submit bids."
          />

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Pickup Location *"
              value={form.pickup_location}
              onChange={(e) =>
                setForm({ ...form, pickup_location: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Delivery Location *"
              value={form.delivery_location}
              onChange={(e) =>
                setForm({ ...form, delivery_location: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Cargo Type"
              value={form.cargo_type}
              onChange={(e) =>
                setForm({ ...form, cargo_type: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Weight KG"
              value={form.weight_kg}
              onChange={(e) =>
                setForm({ ...form, weight_kg: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Budget NAD"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Contact Name"
              value={form.contact_name}
              onChange={(e) =>
                setForm({ ...form, contact_name: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Contact Phone"
              value={form.contact_phone}
              onChange={(e) =>
                setForm({ ...form, contact_phone: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Contact Email"
              value={form.contact_email}
              onChange={(e) =>
                setForm({ ...form, contact_email: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <textarea
              placeholder="Cargo Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border rounded-xl px-4 py-3 md:col-span-2 min-h-32"
            />

            <div className="md:col-span-2">
              <Button type="submit" variant="orange" fullWidth>
                {saving ? "Posting Cargo..." : "📦 Post Cargo Request"}
              </Button>
            </div>
          </form>
        </AppCard>
      </div>
    </div>
  );
}