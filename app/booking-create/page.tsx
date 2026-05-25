"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookingCreatePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    customer_name: "",
    service_type: "",
    pickup_location: "",
    delivery_location: "",
    preferred_date: "",
    contact_number: "",
    notes: "",
  });

  function updateField(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    setMessage("");

    if (!form.customer_name || !form.service_type || !form.contact_number) {
      setMessage("Please fill in customer name, service type, and contact number.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("booking_requests").insert([
      {
        customer_name: form.customer_name,
        service_type: form.service_type,
        pickup_location: form.pickup_location,
        delivery_location: form.delivery_location,
        preferred_date: form.preferred_date,
        contact_number: form.contact_number,
        notes: form.notes,
        status: "new_request",
      },
    ]);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Booking request created successfully.");
      setForm({
        customer_name: "",
        service_type: "",
        pickup_location: "",
        delivery_location: "",
        preferred_date: "",
        contact_number: "",
        notes: "",
      });
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>CREATE BOOKING</p>
        <h1 style={titleStyle}>Request a Transport Service</h1>
        <p style={descStyle}>
          Create cargo, ride, warehouse delivery, product delivery, or logistics
          service requests and send them into the NamLogix Africa booking queue.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/booking-requests" style={primaryButtonStyle}>
            View Bookings
          </Link>

          <Link href="/cargo-matching" style={secondaryButtonStyle}>
            Cargo Matching
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <form style={formStyle}>
          <div style={gridStyle}>
            <label style={labelStyle}>
              Customer Name
              <input
                style={inputStyle}
                value={form.customer_name}
                onChange={(e) => updateField("customer_name", e.target.value)}
                placeholder="Full name or company"
              />
            </label>

            <label style={labelStyle}>
              Service Type
              <input
                style={inputStyle}
                value={form.service_type}
                onChange={(e) => updateField("service_type", e.target.value)}
                placeholder="Cargo, ride, warehouse delivery..."
              />
            </label>

            <label style={labelStyle}>
              Pickup Location
              <input
                style={inputStyle}
                value={form.pickup_location}
                onChange={(e) => updateField("pickup_location", e.target.value)}
                placeholder="Pickup point"
              />
            </label>

            <label style={labelStyle}>
              Delivery Location
              <input
                style={inputStyle}
                value={form.delivery_location}
                onChange={(e) =>
                  updateField("delivery_location", e.target.value)
                }
                placeholder="Destination"
              />
            </label>

            <label style={labelStyle}>
              Preferred Date
              <input
                style={inputStyle}
                value={form.preferred_date}
                onChange={(e) => updateField("preferred_date", e.target.value)}
                placeholder="Today, tomorrow, flexible..."
              />
            </label>

            <label style={labelStyle}>
              Contact Number
              <input
                style={inputStyle}
                value={form.contact_number}
                onChange={(e) => updateField("contact_number", e.target.value)}
                placeholder="+264..."
              />
            </label>
          </div>

          <label style={labelStyle}>
            Notes
            <textarea
              style={textareaStyle}
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Describe cargo size, delivery needs, passenger needs, or special instructions."
            />
          </label>

          {message && <div style={messageStyle}>{message}</div>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={submitButtonStyle}
          >
            {loading ? "Saving..." : "Create Booking Request"}
          </button>
        </form>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
};

const heroStyle = {
  padding: "90px 24px",
  textAlign: "center" as const,
  color: "white",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.92), rgba(249,115,22,0.88))",
};

const badgeStyle = {
  color: "#fdba74",
  fontWeight: 900,
  letterSpacing: 1,
};

const titleStyle = {
  fontSize: 54,
  fontWeight: 900,
  margin: "10px 0 14px",
};

const descStyle = {
  maxWidth: 850,
  margin: "0 auto",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  fontSize: 18,
};

const buttonRowStyle = {
  display: "flex",
  gap: 14,
  justifyContent: "center",
  flexWrap: "wrap" as const,
  marginTop: 30,
};

const primaryButtonStyle = {
  background: "#f97316",
  color: "white",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const secondaryButtonStyle = {
  background: "white",
  color: "#1d4ed8",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const containerStyle = {
  maxWidth: 1000,
  margin: "0 auto",
  padding: "60px 24px",
};

const formStyle = {
  background: "white",
  borderRadius: 30,
  padding: 30,
  border: "1px solid #e5e7eb",
  boxShadow: "0 14px 35px rgba(15,23,42,0.07)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 20,
};

const labelStyle = {
  display: "grid",
  gap: 8,
  color: "#0f172a",
  fontWeight: 900,
  marginBottom: 20,
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  fontSize: 15,
};

const textareaStyle = {
  width: "100%",
  minHeight: 130,
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  fontSize: 15,
};

const messageStyle = {
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  color: "#1d4ed8",
  padding: 16,
  borderRadius: 16,
  fontWeight: 900,
  marginBottom: 20,
};

const submitButtonStyle = {
  background: "#f97316",
  color: "white",
  border: "none",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};