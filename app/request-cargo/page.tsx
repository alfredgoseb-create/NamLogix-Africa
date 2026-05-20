// @ts-nocheck
"use client";

import { useState } from "react";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import {
  PremiumInput,
  PremiumTextarea,
  PremiumSubmitButton,
  formGridStyle,
} from "@/app/components/PremiumForm";
import { supabase } from "@/lib/supabaseClient";

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
    <PremiumPageShell
      badge="NAMLOGIX CARGO"
      title="Post Cargo Request"
      description="Submit cargo details and connect with transporters, logistics operators, warehouses, and trade partners across Namibia and Southern Africa."
      actions={[
        {
          label: "View Cargo Requests",
          href: "/cargo-requests",
          variant: "blue",
        },
        {
          label: "Trip Offers",
          href: "/trip-offers",
          variant: "white",
        },
        {
          label: "Contact Support",
          href: "/contact",
          variant: "orange",
        },
      ]}
    >
      <PremiumCard>
        <h2 style={formTitleStyle}>📦 Cargo Request Form</h2>

        <p style={formDescStyle}>
          Fill in the cargo details below. Your request will be saved in
          NamLogix and can be used for transport bidding.
        </p>

        <form onSubmit={handleSubmit} style={formGridStyle}>
          <PremiumInput
            placeholder="Pickup Location *"
            value={form.pickup_location}
            onChange={(e) =>
              setForm({ ...form, pickup_location: e.target.value })
            }
          />

          <PremiumInput
            placeholder="Delivery Location *"
            value={form.delivery_location}
            onChange={(e) =>
              setForm({ ...form, delivery_location: e.target.value })
            }
          />

          <PremiumInput
            placeholder="Cargo Type"
            value={form.cargo_type}
            onChange={(e) =>
              setForm({ ...form, cargo_type: e.target.value })
            }
          />

          <PremiumInput
            type="number"
            placeholder="Weight KG"
            value={form.weight_kg}
            onChange={(e) =>
              setForm({ ...form, weight_kg: e.target.value })
            }
          />

          <PremiumInput
            type="number"
            placeholder="Budget NAD"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          />

          <PremiumInput
            placeholder="Contact Name"
            value={form.contact_name}
            onChange={(e) =>
              setForm({ ...form, contact_name: e.target.value })
            }
          />

          <PremiumInput
            placeholder="Contact Phone"
            value={form.contact_phone}
            onChange={(e) =>
              setForm({ ...form, contact_phone: e.target.value })
            }
          />

          <PremiumInput
            type="email"
            placeholder="Contact Email"
            value={form.contact_email}
            onChange={(e) =>
              setForm({ ...form, contact_email: e.target.value })
            }
          />

          <PremiumTextarea
            placeholder="Cargo Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <PremiumSubmitButton disabled={saving}>
            {saving ? "Posting Cargo..." : "📦 Post Cargo Request"}
          </PremiumSubmitButton>
        </form>
      </PremiumCard>
    </PremiumPageShell>
  );
}

const formTitleStyle = {
  fontSize: 30,
  fontWeight: 900,
  margin: 0,
  color: "#0f172a",
};

const formDescStyle = {
  color: "#64748b",
  marginTop: 8,
  marginBottom: 0,
};