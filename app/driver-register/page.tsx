"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DriverRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    license_number: "",
    experience_years: "",
    phone: "",
    route_region: "",
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

    if (!form.full_name || !form.license_number || !form.phone) {
      setMessage("Please fill in full name, license number, and phone.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("drivers").insert([
      {
        full_name: form.full_name,
        license_number: form.license_number,
        experience_years: form.experience_years,
        phone: form.phone,
        route_region: form.route_region,
        status: form.status,
      },
    ]);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Driver registered successfully.");
      setForm({
        full_name: "",
        license_number: "",
        experience_years: "",
        phone: "",
        route_region: "",
        status: "pending",
      });
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>DRIVER REGISTRATION</p>
        <h1 style={titleStyle}>Register a Driver</h1>
        <p style={descStyle}>
          Add transport drivers, delivery operators, cargo drivers, and regional
          logistics professionals to the NamLogix Africa network.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/driver-profiles" style={primaryButtonStyle}>
            Driver Profiles
          </Link>

          <Link href="/fleet-dashboard" style={secondaryButtonStyle}>
            Fleet Dashboard
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <form style={formStyle}>
          <div style={gridStyle}>
            <label style={labelStyle}>
              Full Name
              <input
                style={inputStyle}
                value={form.full_name}
                onChange={(e) => updateField("full_name", e.target.value)}
                placeholder="Driver full name"
              />
            </label>

            <label style={labelStyle}>
              License Number
              <input
                style={inputStyle}
                value={form.license_number}
                onChange={(e) => updateField("license_number", e.target.value)}
                placeholder="License number"
              />
            </label>

            <label style={labelStyle}>
              Experience Years
              <input
                style={inputStyle}
                value={form.experience_years}
                onChange={(e) => updateField("experience_years", e.target.value)}
                placeholder="Example: 5"
              />
            </label>

            <label style={labelStyle}>
              Phone Number
              <input
                style={inputStyle}
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+264..."
              />
            </label>

            <label style={labelStyle}>
              Route / Region
              <input
                style={inputStyle}
                value={form.route_region}
                onChange={(e) => updateField("route_region", e.target.value)}
                placeholder="Windhoek, Walvis Bay, Northern Routes..."
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
                <option value="verified">Verified</option>
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
            {loading ? "Saving..." : "Register Driver"}
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