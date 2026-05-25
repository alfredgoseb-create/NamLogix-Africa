"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TrackingCreatePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    tracking_number: "",
    customer_name: "",
    route: "",
    progress: "0%",
    status: "preparing",
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

    if (!form.tracking_number || !form.customer_name || !form.route) {
      setMessage("Please fill in tracking number, customer name, and route.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("tracking_updates").insert([
      {
        tracking_number: form.tracking_number,
        customer_name: form.customer_name,
        route: form.route,
        progress: form.progress,
        status: form.status,
        notes: form.notes,
      },
    ]);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Tracking record created successfully.");
      setForm({
        tracking_number: "",
        customer_name: "",
        route: "",
        progress: "0%",
        status: "preparing",
        notes: "",
      });
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>CREATE TRACKING</p>
        <h1 style={titleStyle}>Create Tracking Record</h1>
        <p style={descStyle}>
          Add live tracking records for cargo, bookings, warehouse deliveries,
          and transport jobs.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/live-tracking" style={primaryButtonStyle}>
            Live Tracking
          </Link>

          <Link href="/admin/tracking-management" style={secondaryButtonStyle}>
            Admin Tracking
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <form style={formStyle}>
          <div style={gridStyle}>
            <label style={labelStyle}>
              Tracking Number
              <input
                style={inputStyle}
                value={form.tracking_number}
                onChange={(e) => updateField("tracking_number", e.target.value)}
                placeholder="NLA-2026-001"
              />
            </label>

            <label style={labelStyle}>
              Customer Name
              <input
                style={inputStyle}
                value={form.customer_name}
                onChange={(e) => updateField("customer_name", e.target.value)}
                placeholder="Customer or company"
              />
            </label>

            <label style={labelStyle}>
              Route
              <input
                style={inputStyle}
                value={form.route}
                onChange={(e) => updateField("route", e.target.value)}
                placeholder="Windhoek → Walvis Bay"
              />
            </label>

            <label style={labelStyle}>
              Progress
              <input
                style={inputStyle}
                value={form.progress}
                onChange={(e) => updateField("progress", e.target.value)}
                placeholder="65%"
              />
            </label>
          </div>

          <label style={labelStyle}>
            Status
            <select
              style={inputStyle}
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
            >
              <option value="preparing">Preparing</option>
              <option value="departed">Departed</option>
              <option value="on_route">On Route</option>
              <option value="delivered">Delivered</option>
              <option value="delayed">Delayed</option>
            </select>
          </label>

          <label style={labelStyle}>
            Notes
            <textarea
              style={textareaStyle}
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Add delivery notes, driver updates, or customer information."
            />
          </label>

          {message && <div style={messageStyle}>{message}</div>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={submitButtonStyle}
          >
            {loading ? "Saving..." : "Create Tracking Record"}
          </button>
        </form>
      </section>
    </main>
  );
}

const pageStyle = { minHeight: "100vh", background: "#f8fafc" };

const heroStyle = {
  padding: "90px 24px",
  textAlign: "center" as const,
  color: "white",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.92), rgba(249,115,22,0.88))",
};

const badgeStyle = { color: "#fdba74", fontWeight: 900, letterSpacing: 1 };

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