// @ts-nocheck
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PageHero from "@/app/components/PageHero";
import AppCard from "@/app/components/AppCard";
import SectionHeader from "@/app/components/SectionHeader";
import Button from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import TextAreaField from "@/app/components/TextAreaField";

const emptyForm = {
  pickup_location: "",
  delivery_location: "",
  cargo_type: "",
  weight_kg: "",
  budget: "",
  contact_name: "",
  contact_phone: "",
  contact_email: "",
  description: "",
};

export default function RequestCargoPage() {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.pickup_location || !form.delivery_location) {
      alert("Pickup and delivery locations are required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("cargo_requests").insert([
      {
        ...form,
        weight_kg: Number(form.weight_kg) || 0,
        budget: Number(form.budget) || 0,
        status: "pending",
      },
    ]);

    setSaving(false);

    if (error) {
      alert("Failed to post cargo request: " + error.message);
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
            href: "/trip-offers",
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
            title: "Cargo",
            text: "Post shipping needs",
          },
          {
            title: "Transporters",
            text: "Receive bids",
          },
          {
            title: "Warehouses",
            text: "Storage support",
          },
          {
            title: "Routes",
            text: "Regional trade lanes",
          },
        ]}
      />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <AppCard id="cargo-form" variant="blue">
          <SectionHeader
            title="📦 Cargo Request Form"
            subtitle="Post cargo details so transporters can view the request and submit bids."
          />

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <InputField
              placeholder="Pickup Location *"
              value={form.pickup_location}
              onChange={(e) =>
                setForm({ ...form, pickup_location: e.target.value })
              }
            />

            <InputField
              placeholder="Delivery Location *"
              value={form.delivery_location}
              onChange={(e) =>
                setForm({ ...form, delivery_location: e.target.value })
              }
            />

            <InputField
              placeholder="Cargo Type"
              value={form.cargo_type}
              onChange={(e) =>
                setForm({ ...form, cargo_type: e.target.value })
              }
            />

            <InputField
              type="number"
              placeholder="Weight KG"
              value={form.weight_kg}
              onChange={(e) =>
                setForm({ ...form, weight_kg: e.target.value })
              }
            />

            <InputField
              type="number"
              placeholder="Budget NAD"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
            />

            <InputField
              placeholder="Contact Name"
              value={form.contact_name}
              onChange={(e) =>
                setForm({ ...form, contact_name: e.target.value })
              }
            />

            <InputField
              placeholder="Contact Phone"
              value={form.contact_phone}
              onChange={(e) =>
                setForm({ ...form, contact_phone: e.target.value })
              }
            />

            <InputField
              type="email"
              placeholder="Contact Email"
              value={form.contact_email}
              onChange={(e) =>
                setForm({ ...form, contact_email: e.target.value })
              }
            />

            <div className="md:col-span-2">
              <TextAreaField
                placeholder="Cargo Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

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