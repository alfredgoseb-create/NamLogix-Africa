// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";
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
    <div className="min-h-screen page-soft-bg">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="rounded-[32px] bg-gradient-to-br from-slate-950 via-blue-900 to-orange-500 text-white p-8 md:p-12 mb-8">
          <p className="text-orange-200 font-bold">NAMLOGIX TRANSPORT</p>

          <h1 className="text-4xl md:text-6xl font-black mt-3">
            Book Local Transport
          </h1>

          <p className="max-w-3xl mt-5 text-white/80 leading-7">
            Request transport for hospital trips, home-to-work travel, town rides,
            goods delivery, cargo pickup, and business movement.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/contact" className="bg-white text-blue-900 px-5 py-3 rounded-xl font-bold">
              Contact Us
            </Link>

            <Link href="/request-cargo" className="bg-orange-500 text-white px-5 py-3 rounded-xl font-bold">
              Post Cargo
            </Link>

            <Link href="/store" className="bg-blue-700 text-white px-5 py-3 rounded-xl font-bold">
              Marketplace
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl border shadow-sm p-6 md:p-8">
          <h2 className="text-3xl font-black">🚕 Transport Request Form</h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 mt-6">
            <input className="border rounded-xl px-4 py-3" placeholder="Customer Name" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} />
            <input className="border rounded-xl px-4 py-3" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="border rounded-xl px-4 py-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

            <select className="border rounded-xl px-4 py-3" value={form.booking_type} onChange={(e) => setForm({ ...form, booking_type: e.target.value })}>
              <option value="people">People Transport</option>
              <option value="goods">Goods Transport</option>
              <option value="medical">Hospital / Medical Trip</option>
              <option value="work">Home to Work</option>
              <option value="business">Business Transport</option>
            </select>

            <input className="border rounded-xl px-4 py-3" placeholder="Pickup Location *" value={form.pickup_location} onChange={(e) => setForm({ ...form, pickup_location: e.target.value })} />
            <input className="border rounded-xl px-4 py-3" placeholder="Drop-off Location *" value={form.dropoff_location} onChange={(e) => setForm({ ...form, dropoff_location: e.target.value })} />

            <input type="date" className="border rounded-xl px-4 py-3" value={form.preferred_date} onChange={(e) => setForm({ ...form, preferred_date: e.target.value })} />
            <input className="border rounded-xl px-4 py-3" placeholder="Preferred Time" value={form.preferred_time} onChange={(e) => setForm({ ...form, preferred_time: e.target.value })} />

            <input type="number" className="border rounded-xl px-4 py-3" placeholder="Passengers" value={form.passengers} onChange={(e) => setForm({ ...form, passengers: e.target.value })} />
            <input className="border rounded-xl px-4 py-3" placeholder="Trip Reason" value={form.trip_reason} onChange={(e) => setForm({ ...form, trip_reason: e.target.value })} />

            <textarea
              className="border rounded-xl px-4 py-3 md:col-span-2 min-h-32"
              placeholder="Cargo / Goods Description"
              value={form.cargo_description}
              onChange={(e) => setForm({ ...form, cargo_description: e.target.value })}
            />

            <button
              type="submit"
              disabled={saving}
              className="md:col-span-2 bg-orange-500 text-white px-5 py-4 rounded-xl font-black hover:bg-orange-600"
            >
              {saving ? "Submitting..." : "Submit Transport Booking"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}