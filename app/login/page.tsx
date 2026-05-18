// @ts-nocheck
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSaving(false);

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Secure Access"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Login Portal"
        description="Access your dashboard, manage inventory, suppliers, warehouses, cargo, and marketplace operations."
        actions={[
          {
            label: "Create Account",
            href: "/signup",
            primary: true,
          },
          {
            label: "Back Home",
            href: "/",
          },
        ]}
        stats={[
          { value: "Admin", label: "Dashboard" },
          { value: "Secure", label: "Access" },
          { value: "Live", label: "Supabase Auth" },
          { value: "B2B", label: "Platform" },
        ]}
        infoCards={[
          { title: "Inventory", text: "Manage stock" },
          { title: "Suppliers", text: "Business network" },
          { title: "Warehouses", text: "Storage control" },
          { title: "Cargo", text: "Request flow" },
        ]}
      />

      <div className="max-w-xl mx-auto px-6 py-10">
        <AppCard variant="blue">
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            Login to NamLogix
          </h2>

          <p className="text-gray-500 mb-6">
            Enter your account details to continue.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <Button type="submit" variant="orange" fullWidth>
              {saving ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            No account yet?{" "}
            <Link href="/signup" className="text-blue-700 font-bold">
              Create one here
            </Link>
          </p>
        </AppCard>
      </div>
    </div>
  );
}