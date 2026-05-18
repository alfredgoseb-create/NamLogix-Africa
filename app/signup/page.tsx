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
    full_name: "",
    company_name: "",
    phone: "",
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

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.full_name,
          role: form.role,
        },
      },
    });

    if (error) {
      setSaving(false);
      alert(error.message);
      return;
    }

    if (data.user) {
      await supabase.from("user_profiles").insert([
        {
          id: data.user.id,
          full_name: form.full_name,
          company_name: form.company_name,
          phone: form.phone,
          role: form.role,
        },
      ]);
    }

    setSaving(false);

    alert("Account created successfully.");

    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Platform Registration"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Create Account"
        description="Join the logistics, aviation, warehouse, supplier, and trade marketplace ecosystem."
        actions={[
          {
            label: "Login",
            href: "/login",
            primary: true,
          },
          {
            label: "Marketplace",
            href: "/store",
          },
        ]}
        stats={[
          {
            value: "B2B",
            label: "Trade platform",
          },
          {
            value: "SADC",
            label: "Regional vision",
          },
          {
            value: "Secure",
            label: "Authentication",
          },
          {
            value: "Multi-role",
            label: "User system",
          },
        ]}
        infoCards={[
          {
            title: "Customers",
            text: "Post cargo",
          },
          {
            title: "Transporters",
            text: "Bid on shipments",
          },
          {
            title: "Suppliers",
            text: "Sell products",
          },
          {
            title: "Warehouses",
            text: "Manage inventory",
          },
        ]}
      />

      <div className="max-w-2xl mx-auto px-6 py-10">
        <AppCard variant="orange">
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Create NamLogix Account
          </h2>

          <p className="text-gray-500 mb-8">
            Create your trade platform identity.
          </p>

          <form
            onSubmit={handleSignup}
            className="grid md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={form.full_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  full_name: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Company Name"
              value={form.company_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  company_name: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            >
              <option value="customer">
                Customer / Cargo Owner
              </option>

              <option value="supplier">
                Supplier
              </option>

              <option value="warehouse">
                Warehouse
              </option>

              <option value="transporter">
                Transporter
              </option>

              <option value="admin">
                Admin
              </option>
            </select>

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3 md:col-span-2"
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3 md:col-span-2"
            />

            <div className="md:col-span-2">
              <Button
                type="submit"
                variant="orange"
                fullWidth
              >
                {saving
                  ? "Creating Account..."
                  : "Create Platform Account"}
              </Button>
            </div>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-700 font-bold"
            >
              Login here
            </Link>
          </p>
        </AppCard>
      </div>
    </div>
  );
}