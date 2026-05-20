// @ts-nocheck
"use client";

import { useState } from "react";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import {
  PremiumInput,
  PremiumSelect,
  PremiumTextarea,
  PremiumSubmitButton,
  formGridStyle,
} from "@/app/components/PremiumForm";
import { supabase } from "@/lib/supabaseClient";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  inquiry_type: "general",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.message) {
      alert("Name and message are required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("inquiries").insert([
      {
        ...form,
        status: "new",
      },
    ]);

    setSaving(false);

    if (error) {
      alert("Failed to send inquiry: " + error.message);
      return;
    }

    alert("Inquiry sent successfully.");
    setForm(emptyForm);
  }

  return (
    <PremiumPageShell
      badge="NAMLOGIX SUPPORT"
      title="Contact NamLogix Africa"
      description="Send inquiries about cargo, transport, aviation, warehouse products, suppliers, partnerships, support, and platform onboarding."
      actions={[
        { label: "Post Cargo", href: "/request-cargo", variant: "blue" },
        { label: "Book Transport", href: "/transport", variant: "orange" },
        { label: "Back Home", href: "/", variant: "white" },
      ]}
    >
      <PremiumCard>
        <h2 style={formTitleStyle}>📩 Send Inquiry</h2>

        <p style={formDescStyle}>
          Use this form for customer support, supplier onboarding, aviation
          requests, warehouse listings, cargo help, or partnership discussions.
        </p>

        <form onSubmit={handleSubmit} style={formGridStyle}>
          <PremiumInput
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <PremiumInput
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <PremiumInput
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <PremiumSelect
            value={form.inquiry_type}
            onChange={(e) =>
              setForm({ ...form, inquiry_type: e.target.value })
            }
          >
            <option value="general">General Inquiry</option>
            <option value="cargo">Cargo / Logistics</option>
            <option value="transport">Transport Booking</option>
            <option value="aviation">Aviation Service</option>
            <option value="warehouse">Warehouse / Store</option>
            <option value="supplier">Supplier Onboarding</option>
            <option value="partnership">Partnership</option>
          </PremiumSelect>

          <PremiumTextarea
            placeholder="Write your message here *"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <PremiumSubmitButton disabled={saving}>
            {saving ? "Sending..." : "Send Inquiry"}
          </PremiumSubmitButton>
        </form>
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