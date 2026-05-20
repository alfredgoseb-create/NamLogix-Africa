// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import {
  PremiumInput,
  PremiumSelect,
  PremiumSubmitButton,
  formGridStyle,
} from "@/app/components/PremiumForm";
import { supabase } from "@/lib/supabaseClient";

const emptyForm = {
  full_name: "",
  email: "",
  password: "",
  company_name: "",
  role: "customer",
};

export default function RegisterPage() {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Email and password are required.");
      return;
    }

    setSaving(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.full_name,
          company_name: form.company_name,
          role: form.role,
        },
      },
    });

    setSaving(false);

    if (error) {
      alert("Registration failed: " + error.message);
      return;
    }

    alert("Account created successfully.");

    window.location.href = "/login";
  }

  return (
    <PremiumPageShell
      badge="NAMLOGIX REGISTER"
      title="Create Account"
      description="Create your NamLogix Africa account to manage cargo, transport bookings, warehouse products, aviation services, and marketplace operations."
      actions={[
        { label: "Home", href: "/", variant: "white" },
        { label: "Login", href: "/login", variant: "blue" },
        { label: "Store", href: "/store", variant: "orange" },
      ]}
    >
      <PremiumCard>
        <h2 style={formTitleStyle}>🚀 Create your account</h2>

        <p style={formDescStyle}>
          Register your logistics, warehouse, transport, aviation, or customer
          account to start using NamLogix Africa.
        </p>

        <form onSubmit={handleRegister} style={formGridStyle}>
          <PremiumInput
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
          />

          <PremiumInput
            placeholder="Company Name"
            value={form.company_name}
            onChange={(e) =>
              setForm({ ...form, company_name: e.target.value })
            }
          />

          <PremiumInput
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <PremiumInput
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <PremiumSelect
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="customer">Customer</option>
            <option value="driver">Driver</option>
            <option value="warehouse">Warehouse</option>
            <option value="supplier">Supplier</option>
            <option value="aviation">Aviation Provider</option>
          </PremiumSelect>

          <PremiumSubmitButton disabled={saving}>
            {saving ? "Creating Account..." : "Create Account"}
          </PremiumSubmitButton>
        </form>

        <p style={bottomTextStyle}>
          Already have an account?{" "}
          <Link href="/login" style={inlineLinkStyle}>
            Login
          </Link>
        </p>
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

const bottomTextStyle = {
  color: "#64748b",
  marginTop: 18,
};

const inlineLinkStyle = {
  color: "#1d4ed8",
  fontWeight: 900,
  textDecoration: "none",
};