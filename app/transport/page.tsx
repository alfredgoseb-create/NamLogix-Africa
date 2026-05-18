// @ts-nocheck
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PageHero from "@/app/components/PageHero";
import AppCard from "@/app/components/AppCard";
import SectionHeader from "@/app/components/SectionHeader";
import Button from "@/app/components/Button";

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
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Local Transport"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Transport Booking"
        description="Book local transport for hospital trips, home-to-work movement, town rides, goods delivery, cargo pickup, and business transport."
        actions={[
          {
            label: "🚕 Book Transport",
            href: "#transport-form",
            primary: true,
          },
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
          },
          {
            label: "🛒 Store",
            href: "/store",
          },
          {
            label: "📩 Contact",
            href: "/contact",
          },
        ]}
        stats={[
          {
            value: "24/7",
            label: "Request access",
          },
          {
            value: "Local",
            label: "Town transport",
          },
          {
            value: "Medical",
            label: "Hospital trips",
          },
          {
            value: "Goods",
            label: "Small deliveries",
          },
        ]}
        infoCards={[
          {
            title: "People",
            text: "Passenger rides",
          },
          {
            title: "Medical",
            text: "Hospital transport",
          },
          {
            title: "Goods",
            text: "Local deliveries",
          },
          {
            title: "Business",
            text: "Company movement",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <AppCard id="transport-form" variant="blue">
          <SectionHeader
            title="🚕 Transport Request Form"
            subtitle="Submit a transport booking request for people, goods, hospital trips, work trips, or business movement."
          />

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input
              className="border rounded-xl px-4 py-3"
              placeholder="Customer Name"
              value={form.customer_name}
              onChange={(e) =>
                setForm({ ...form, customer_name: e.target.value })
              }
            />

            <input
              className="border rounded-xl px-4 py-3"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              className="border rounded-xl px-4 py-3"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <select
              className="border rounded-xl px-4 py-3"
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
            </select>

            <input
              className="border rounded-xl px-4 py-3"
              placeholder="Pickup Location *"
              value={form.pickup_location}
              onChange={(e) =>
                setForm({ ...form, pickup_location: e.target.value })
              }
            />

            <input
              className="border rounded-xl px-4 py-3"
              placeholder="Drop-off Location *"
              value={form.dropoff_location}
              onChange={(e) =>
                setForm({ ...form, dropoff_location: e.target.value })
              }
            />

            <input
              type="date"
              className="border rounded-xl px-4 py-3"
              value={form.preferred_date}
              onChange={(e) =>
                setForm({ ...form, preferred_date: e.target.value })
              }
            />

            <input
              className="border rounded-xl px-4 py-3"
              placeholder="Preferred Time"
              value={form.preferred_time}
              onChange={(e) =>
                setForm({ ...form, preferred_time: e.target.value })
              }
            />

            <input
              type="number"
              className="border rounded-xl px-4 py-3"
              placeholder="Passengers"
              value={form.passengers}
              onChange={(e) =>
                setForm({ ...form, passengers: e.target.value })
              }
            />

            <input
              className="border rounded-xl px-4 py-3"
              placeholder="Trip Reason"
              value={form.trip_reason}
              onChange={(e) =>
                setForm({ ...form, trip_reason: e.target.value })
              }
            />

            <textarea
              className="border rounded-xl px-4 py-3 md:col-span-2 min-h-32"
              placeholder="Cargo / Goods Description"
              value={form.cargo_description}
              onChange={(e) =>
                setForm({ ...form, cargo_description: e.target.value })
              }
            />

            <div className="md:col-span-2">
              <Button type="submit" variant="orange" fullWidth>
                {saving ? "Submitting..." : "🚕 Submit Transport Booking"}
              </Button>
            </div>
          </form>
        </AppCard>
      </div>
    </div>
  );
}