"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function VehicleRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    vehicle_name: "",
    vehicle_type: "",
    registration_number: "",
    capacity: "",
    route_area: "",
    owner_name: "",
    contact_number: "",
    status: "pending",
  });

  function updateField(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    setMessage("");

    if (!form.vehicle_name || !form.registration_number || !form.contact_number) {
      setMessage("Please fill in vehicle name, registration number, and contact number.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("vehicles").insert([
      {
        vehicle_name: form.vehicle_name,
        vehicle_type: form.vehicle_type,
        registration_number: form.registration_number,
        capacity: form.capacity,
        route_area: form.route_area,
        owner_name: form.owner_name,
        contact_number: form.contact_number,
        status: form.status,
      },
    ]);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Vehicle registered successfully. Pending admin review.");
      setForm({
        vehicle_name: "",
        vehicle_type: "",
        registration_number: "",
        capacity: "",
        route_area: "",
        owner_name: "",
        contact_number: "",
        status: "pending",
      });
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>VEHICLE REGISTRATION</p>
        <h1 style={titleStyle}>Register a Vehicle</h1>
        <p style={descStyle}>
          Add trucks, bakkies, delivery vehicles, passenger vehicles, and cargo
          transport units to the NamLogix Africa fleet network.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/my-vehicles" style={primaryButtonStyle}>
            My Vehicles
          </Link>

          <Link href="/admin/vehicle-approvals" style={secondaryButtonStyle}>
            Vehicle Approvals
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <form style={formStyle}>
          <div style={gridStyle}>
            <label style={labelStyle}>
              Vehicle Name
              <input
                style={inputStyle}
                value={form.vehicle_name}
                onChange={(e) => updateField("vehicle_name", e.target.value)}
                placeholder="Example: Toyota Hilux"
              />
            </label>

            <label style={labelStyle}>
              Vehicle Type
              <input
                style={inputStyle}
                value={form.vehicle_type}
                onChange={(e) => updateField("vehicle_type", e.target.value)}
                placeholder="Truck, bakkie, van, bus..."
              />
            </label>

            <label style={labelStyle}>
              Registration Number
              <input
                style={inputStyle}
                value={form.registration_number}
                onChange={(e) =>
                  updateField("registration_number", e.target.value)
                }
                placeholder="N 12345 W"
              />
            </label>

            <label style={labelStyle}>
              Capacity
              <input
                style={inputStyle}
                value={form.capacity}
                onChange={(e) => updateField("capacity", e.target.value)}
                placeholder="1 ton, 10 tons, 7 passengers..."
              />
            </label>

            <label style={labelStyle}>
              Route / Service Area
              <input
                style={inputStyle}
                value={form.route_area}
                onChange={(e) => updateField("route_area", e.target.value)}
                placeholder="Windhoek, Walvis Bay, Trans Kalahari..."
              />
            </label>

            <label style={labelStyle}>
              Owner / Company Name
              <input
                style={inputStyle}
                value={form.owner_name}
                onChange={(e) => updateField("owner_name", e.target.value)}
                placeholder="Owner or company"
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

            <label style={labelStyle}>
              Status
              <select
                style={inputStyle}
                value={form.status}
                onChange={(e) => updateField("status", e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="approved">Approved</option>
                <option value="suspended">Suspended</option>
              </select>
            </label>
          </div>

          {message && <div style={messageStyle}>{message}</div>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={submitButtonStyle}
          >
            {loading ? "Saving..." : "Register Vehicle"}
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