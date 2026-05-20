// @ts-nocheck
"use client";

import { useState } from "react";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import {
  PremiumInput,
  PremiumSubmitButton,
  formGridStyle,
} from "@/app/components/PremiumForm";
import { supabase } from "@/lib/supabaseClient";

const emptyForm = {
  offer_number: "",
  origin: "",
  destination: "",
  price_per_seat: "",
  departure_time: "",
  available_seats: "",
};

export default function CreateTripPage() {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.origin || !form.destination) {
      alert("Origin and destination are required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("trip_offers").insert([
      {
        offer_number: form.offer_number,
        origin: form.origin,
        destination: form.destination,
        price_per_seat: Number(form.price_per_seat) || 0,
        departure_time: form.departure_time || null,
        available_seats: Number(form.available_seats) || 0,
        status: "active",
      },
    ]);

    setSaving(false);

    if (error) {
      alert("Failed to create trip offer: " + error.message);
      return;
    }

    alert("Trip offer created successfully.");
    setForm(emptyForm);
  }

  return (
    <PremiumPageShell
      badge="NAMLOGIX TRIPS"
      title="Create Trip Offer"
      description="Add available transport routes so customers can book seats, request cargo movement, or contact your service."
      actions={[
        { label: "View Trip Offers", href: "/trip-offers", variant: "blue" },
        { label: "Book Transport", href: "/transport", variant: "orange" },
        { label: "Back Home", href: "/", variant: "white" },
      ]}
    >
      <PremiumCard>
        <h2 style={formTitleStyle}>🚐 Trip Offer Form</h2>

        <p style={formDescStyle}>
          Add your available route, departure time, seats, and price.
        </p>

        <form onSubmit={handleSubmit} style={formGridStyle}>
          <PremiumInput
            placeholder="Offer Number"
            value={form.offer_number}
            onChange={(e) =>
              setForm({ ...form, offer_number: e.target.value })
            }
          />

          <PremiumInput
            placeholder="Origin *"
            value={form.origin}
            onChange={(e) => setForm({ ...form, origin: e.target.value })}
          />

          <PremiumInput
            placeholder="Destination *"
            value={form.destination}
            onChange={(e) =>
              setForm({ ...form, destination: e.target.value })
            }
          />

          <PremiumInput
            type="number"
            placeholder="Price Per Seat NAD"
            value={form.price_per_seat}
            onChange={(e) =>
              setForm({ ...form, price_per_seat: e.target.value })
            }
          />

          <PremiumInput
            type="datetime-local"
            value={form.departure_time}
            onChange={(e) =>
              setForm({ ...form, departure_time: e.target.value })
            }
          />

          <PremiumInput
            type="number"
            placeholder="Available Seats"
            value={form.available_seats}
            onChange={(e) =>
              setForm({ ...form, available_seats: e.target.value })
            }
          />

          <PremiumSubmitButton disabled={saving}>
            {saving ? "Creating Trip..." : "Create Trip Offer"}
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