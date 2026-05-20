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
  customer_name: "",
  phone: "",
  email: "",
  passengers: "1",
  message: "",
};

export default function BookTripPage() {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.customer_name || !form.phone) {
      alert("Name and phone number are required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("trip_bookings").insert([
      {
        customer_name: form.customer_name,
        phone: form.phone,
        email: form.email,
        passengers: Number(form.passengers) || 1,
        message: form.message,
        status: "pending",
      },
    ]);

    setSaving(false);

    if (error) {
      alert("Failed to book trip: " + error.message);
      return;
    }

    alert("Trip booking request submitted successfully.");
    setForm(emptyForm);
  }

  return (
    <PremiumPageShell
      badge="NAMLOGIX BOOKING"
      title="Book Trip Offer"
      description="Submit your booking request for an available trip. The operator can contact you to confirm price, seats, pickup point, and travel details."
      actions={[
        { label: "View Trips", href: "/trip-offers", variant: "blue" },
        { label: "Book Transport", href: "/transport", variant: "orange" },
        { label: "Back Home", href: "/", variant: "white" },
      ]}
    >
      <PremiumCard>
        <h2 style={formTitleStyle}>🎫 Trip Booking Request</h2>

        <p style={formDescStyle}>
          Enter your contact details and number of passengers. This creates a
          booking request that can later be managed in the admin dashboard.
        </p>

        <form onSubmit={handleSubmit} style={formGridStyle}>
          <PremiumInput
            placeholder="Customer Name *"
            value={form.customer_name}
            onChange={(e) =>
              setForm({ ...form, customer_name: e.target.value })
            }
          />

          <PremiumInput
            placeholder="Phone Number *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <PremiumInput
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <PremiumInput
            type="number"
            placeholder="Passengers"
            value={form.passengers}
            onChange={(e) =>
              setForm({ ...form, passengers: e.target.value })
            }
          />

          <PremiumTextarea
            placeholder="Message / pickup details / questions"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <PremiumSubmitButton disabled={saving}>
            {saving ? "Submitting Booking..." : "Submit Booking Request"}
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