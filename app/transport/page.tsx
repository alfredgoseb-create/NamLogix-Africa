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
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>NAMLOGIX TRANSPORT</p>

          <h1 style={titleStyle}>Book Local Transport</h1>

          <p style={descStyle}>
            Request transport for hospital trips, home-to-work travel, town
            rides, goods delivery, cargo pickup, and business movement.
          </p>

          <div style={buttonRowStyle}>
            <Link href="#transport-form" style={buttonOrange}>
              🚕 Book Transport
            </Link>

            <Link href="/request-cargo" style={buttonBlue}>
              📦 Post Cargo
            </Link>

            <Link href="/contact" style={buttonWhite}>
              📩 Contact Support
            </Link>
          </div>
        </section>

        <section style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>People</p>
            <h3 style={statValueStyle}>Rides</h3>
            <p style={statTextStyle}>Passenger transport</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Medical</p>
            <h3 style={statValueStyle}>Trips</h3>
            <p style={statTextStyle}>Hospital transport</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Goods</p>
            <h3 style={statValueStyle}>Delivery</h3>
            <p style={statTextStyle}>Small cargo movement</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Business</p>
            <h3 style={statValueStyle}>Support</h3>
            <p style={statTextStyle}>Company transport</p>
          </div>
        </section>

        <section id="transport-form" style={cardStyle}>
          <h2 style={formTitleStyle}>🚕 Transport Request Form</h2>

          <p style={formDescStyle}>
            Submit a transport booking request for people, goods, hospital
            trips, work trips, or business movement.
          </p>

          <form onSubmit={handleSubmit} style={formGridStyle}>
            <input
              type="text"
              placeholder="Customer Name"
              value={form.customer_name}
              onChange={(e) =>
                setForm({ ...form, customer_name: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />

            <select
              value={form.booking_type}
              onChange={(e) =>
                setForm({ ...form, booking_type: e.target.value })
              }
              style={inputStyle}
            >
              <option value="people">People Transport</option>
              <option value="goods">Goods Transport</option>
              <option value="medical">Hospital / Medical Trip</option>
              <option value="work">Home to Work</option>
              <option value="business">Business Transport</option>
            </select>

            <input
              type="text"
              placeholder="Pickup Location *"
              value={form.pickup_location}
              onChange={(e) =>
                setForm({ ...form, pickup_location: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Drop-off Location *"
              value={form.dropoff_location}
              onChange={(e) =>
                setForm({ ...form, dropoff_location: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="date"
              value={form.preferred_date}
              onChange={(e) =>
                setForm({ ...form, preferred_date: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Preferred Time"
              value={form.preferred_time}
              onChange={(e) =>
                setForm({ ...form, preferred_time: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Passengers"
              value={form.passengers}
              onChange={(e) =>
                setForm({ ...form, passengers: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Trip Reason"
              value={form.trip_reason}
              onChange={(e) =>
                setForm({ ...form, trip_reason: e.target.value })
              }
              style={inputStyle}
            />

            <textarea
              placeholder="Cargo / Goods Description"
              value={form.cargo_description}
              onChange={(e) =>
                setForm({ ...form, cargo_description: e.target.value })
              }
              style={textareaStyle}
            />

            <button type="submit" disabled={saving} style={submitButtonStyle}>
              {saving ? "Submitting..." : "🚕 Submit Transport Booking"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f8fc",
  padding: "40px 24px",
};

const containerStyle = {
  maxWidth: 1000,
  margin: "0 auto",
};

const heroStyle = {
  background: "linear-gradient(135deg, #0b1220, #1e3a8a, #f97316)",
  color: "white",
  borderRadius: 28,
  padding: 36,
  marginBottom: 24,
  boxShadow: "0 20px 40px rgba(15,23,42,0.22)",
};

const badgeStyle = {
  color: "#fed7aa",
  fontWeight: 900,
  letterSpacing: 1,
  margin: 0,
};

const titleStyle = {
  fontSize: 42,
  fontWeight: 900,
  margin: "10px 0",
};

const descStyle = {
  maxWidth: 720,
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.85)",
};

const buttonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 24,
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
  marginBottom: 24,
};

const statCardStyle = {
  background: "white",
  borderRadius: 22,
  padding: 22,
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
};

const statLabelStyle = {
  color: "#64748b",
  fontWeight: 800,
  margin: 0,
};

const statValueStyle = {
  fontSize: 30,
  fontWeight: 900,
  margin: "8px 0",
  color: "#0f172a",
};

const statTextStyle = {
  color: "#64748b",
  margin: 0,
};

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.10)",
};

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

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 16,
  marginTop: 24,
};

const inputStyle = {
  width: "100%",
  border: "1px solid #d1d5db",
  borderRadius: 14,
  padding: "14px 15px",
  fontSize: 15,
  background: "#f8fafc",
  outline: "none",
};

const textareaStyle = {
  ...inputStyle,
  gridColumn: "1 / -1",
  minHeight: 160,
  resize: "vertical",
};

const buttonBlue = {
  background: "#1d4ed8",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonWhite = {
  background: "white",
  color: "#1d4ed8",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonOrange = {
  background: "#f97316",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const submitButtonStyle = {
  ...buttonOrange,
  border: "none",
  cursor: "pointer",
  gridColumn: "1 / -1",
  fontSize: 16,
};