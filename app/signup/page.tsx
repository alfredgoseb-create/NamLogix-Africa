// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [saving, setSaving] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Email and password are required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          name: form.name,
          role: form.role,
        },
      },
    });

    setSaving(false);

    if (error) {
      alert("Signup failed: " + error.message);
      return;
    }

    alert("Account created. Please check your email if confirmation is required.");
  }

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Create Account"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Join The Platform"
        description="Register as a customer, supplier, warehouse, transporter, or platform operator."
        actions={[
          {
            label: "Login",
            href: "/login",
            primary: true,
          },
          {
            label: "Back Home",
            href: "/",
          },
        ]}
        stats={[
          { value: "5", label: "User roles" },
          { value: "B2B", label: "Trade users" },
          { value: "SADC", label: "Regional vision" },
          { value: "Secure", label: "Access" },
        ]}
        infoCards={[
          { title: "Customers", text: "Post cargo" },
          { title: "Transporters", text: "Submit bids" },
          { title: "Suppliers", text: "List products" },
          { title: "Warehouses", text: "Manage stock" },
        ]}
      />

      <div className="max-w-xl mx-auto px-6 py-10">
        <AppCard variant="orange">
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            Create NamLogix Account
          </h2>

          <p className="text-gray-500 mb-6">
            Choose your role and create your account.
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name / Business Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-3"
            />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="customer">Customer / Cargo Owner</option>
              <option value="transporter">Transporter</option>
              <option value="supplier">Supplier</option>
              <option value="warehouse">Warehouse</option>
              <option value="admin">Admin</option>
            </select>

            <Button type="submit" variant="orange" fullWidth>
              {saving ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-700 font-bold">
              Login here
            </Link>
          </p>
        </AppCard>
      </div>
    </div>
  );
}