// @ts-nocheck
"use client";

import { useState } from "react";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import {
  PremiumInput,
  PremiumSelect,
  PremiumTextarea,
  PremiumSubmitButton,
  formGridStyle,
} from "@/app/components/PremiumForm";
import { supabase } from "@/lib/supabaseClient";

const emptyForm = {
  customer_name: "",
  phone: "",
  email: "",
  pickup_location: "",
  dropoff_location: "",
  booking_type: "people",
  trip_reason: "",
  preferred_date: "",
  preferred_time: "",
  passengers: "1",
  cargo_description: "",
};

export default function TransportPage() {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.pickup_location || !form.dropoff_location) {
      alert("Pickup and drop-off locations are required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("transport_bookings").insert([
      {
        ...form,
        passengers: Number(form.passengers) || 1,
        status: "pending",
      },
    ]);

    setSaving(false);

    if (error) {
      alert("Failed to create booking: " + error.message);
      return;
    }

    alert("Transport booking submitted successfully.");
    setForm(emptyForm);
  }

  return (
    <PremiumPageShell
      badge="NAMLOGIX TRANSPORT"
      title="Book Local Transport"
      description="Request transport for hospital trips, home-to-work travel, town rides, goods delivery, cargo pickup, and business movement."
      actions={[
        { label: "Post Cargo", href: "/request-cargo", variant: "blue" },
        { label: "Trip Offers", href: "/trip-offers", variant: "white" },
        { label: "Contact Support", href: "/contact", variant: "orange" },
      ]}
    >
      <PremiumCard>
        <h2 style={formTitleStyle}>🚕 Transport Request Form</h2>

        <p style={formDescStyle}>
          Submit a transport booking request for people, goods, hospital trips,
          work trips, or business movement.
        </p>

        <form onSubmit={handleSubmit} style={formGridStyle}>
          <PremiumInput
            placeholder="Customer Name"
            value={form.customer_name}
            onChange={(e) =>
              setForm({ ...form, customer_name: e.target.value })
            }
          />

          <PremiumInput
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <PremiumInput
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <PremiumSelect
            value={form.booking_type}
            onChange={(e) =>
              setForm({ ...form, booking_type: e.target.value })
            }
          >
            <option value="people">People Transport</option>
            <option value="goods">Goods Transport</option>
            <option value="medical">Hospital / Medical Trip</option>
            <option value="work">Home to Work</option>
            <option value="business">Business Transport</option>
          </PremiumSelect>

          <PremiumInput
            placeholder="Pickup Location *"
            value={form.pickup_location}
            onChange={(e) =>
              setForm({ ...form, pickup_location: e.target.value })
            }
          />

          <PremiumInput
            placeholder="Drop-off Location *"
            value={form.dropoff_location}
            onChange={(e) =>
              setForm({ ...form, dropoff_location: e.target.value })
            }
          />

          <PremiumInput
            type="date"
            value={form.preferred_date}
            onChange={(e) =>
              setForm({ ...form, preferred_date: e.target.value })
            }
          />

          <PremiumInput
            placeholder="Preferred Time"
            value={form.preferred_time}
            onChange={(e) =>
              setForm({ ...form, preferred_time: e.target.value })
            }
          />

          <PremiumInput
            type="number"
            placeholder="Passengers"
            value={form.passengers}
            onChange={(e) =>
              setForm({ ...form, passengers: e.target.value })
            }
          />

          <PremiumInput
            placeholder="Trip Reason"
            value={form.trip_reason}
            onChange={(e) =>
              setForm({ ...form, trip_reason: e.target.value })
            }
          />

          <PremiumTextarea
            placeholder="Cargo / Goods Description"
            value={form.cargo_description}
            onChange={(e) =>
              setForm({ ...form, cargo_description: e.target.value })
            }
          />

          <PremiumSubmitButton disabled={saving}>
            {saving ? "Submitting..." : "🚕 Submit Transport Booking"}
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