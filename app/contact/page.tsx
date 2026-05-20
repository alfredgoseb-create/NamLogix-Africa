// @ts-nocheck
"use client";

import { useState } from "react";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import {
  PremiumInput,
  PremiumTextarea,
  PremiumSubmitButton,
  formGridStyle,
} from "@/app/components/PremiumForm";
import { supabase } from "@/lib/supabaseClient";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
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
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        status: "open",
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
      badge="CONTACT NAMLOGIX"
      title="Send Inquiry"
      description="Contact NamLogix Africa about products, cargo, transport, suppliers, warehouses, aviation, or trade routes."
      actions={[
        {
          label: "Marketplace",
          href: "/store",
          variant: "blue",
        },
        {
          label: "Companies",
          href: "/companies",
          variant: "white",
        },
        {
          label: "Post Cargo",
          href: "/request-cargo",
          variant: "orange",
        },
      ]}
    >
      <PremiumCard>
        <h2 style={formTitleStyle}>📩 Inquiry Form</h2>

        <p style={formDescStyle}>
          Fill in your details and message. The inquiry will be saved inside
          Supabase.
        </p>

        <form onSubmit={handleSubmit} style={formGridStyle}>
          <PremiumInput
            placeholder="Your Name *"
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

          <PremiumInput
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />

          <PremiumTextarea
            placeholder="Message *"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <PremiumSubmitButton disabled={saving}>
            {saving ? "Sending Inquiry..." : "Send Inquiry"}
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