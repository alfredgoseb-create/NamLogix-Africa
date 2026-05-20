// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import {
  PremiumInput,
  PremiumSubmitButton,
  formGridStyle,
} from "@/app/components/PremiumForm";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required.");
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

    window.location.href = "/admin/dashboard";
  }

  return (
    <PremiumPageShell
      badge="NAMLOGIX ACCESS"
      title="Login"
      description="Access your NamLogix Africa dashboard to manage cargo, products, warehouses, transport bookings, drivers, and inquiries."
      actions={[
        { label: "Home", href: "/", variant: "white" },
        { label: "Store", href: "/store", variant: "blue" },
        { label: "Contact Support", href: "/contact", variant: "orange" },
      ]}
    >
      <PremiumCard>
        <h2 style={formTitleStyle}>🔐 Sign in to your account</h2>

        <p style={formDescStyle}>
          Enter your email and password to continue to the NamLogix control
          center.
        </p>

        <form onSubmit={handleLogin} style={formGridStyle}>
          <PremiumInput
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PremiumInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PremiumSubmitButton disabled={saving}>
            {saving ? "Signing in..." : "Login"}
          </PremiumSubmitButton>
        </form>

        <p style={bottomTextStyle}>
          No account yet?{" "}
          <Link href="/register" style={inlineLinkStyle}>
            Create account
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