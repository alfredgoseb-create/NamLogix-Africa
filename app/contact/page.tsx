// @ts-nocheck
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PageHero from "@/app/components/PageHero";
import AppCard from "@/app/components/AppCard";
import SectionHeader from "@/app/components/SectionHeader";
import Button from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import TextAreaField from "@/app/components/TextAreaField";

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
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Contact NamLogix"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Support Center"
        description="Contact NamLogix Africa about products, cargo, transport, suppliers, warehouses, aviation, or trade routes."
        actions={[
          {
            label: "📩 Send Inquiry",
            href: "#contact-form",
            primary: true,
          },
          {
            label: "🛒 Marketplace",
            href: "/store",
          },
          {
            label: "🏢 Companies",
            href: "/companies",
          },
          {
            label: "📦 Post Cargo",
            href: "/request-cargo",
          },
        ]}
        stats={[
          {
            value: "Support",
            label: "Customer help",
          },
          {
            value: "Trade",
            label: "Business inquiries",
          },
          {
            value: "Cargo",
            label: "Logistics support",
          },
          {
            value: "Live",
            label: "Inquiry system",
          },
        ]}
        infoCards={[
          {
            title: "Products",
            text: "Marketplace requests",
          },
          {
            title: "Cargo",
            text: "Shipping support",
          },
          {
            title: "Transport",
            text: "Booking help",
          },
          {
            title: "Warehouses",
            text: "Storage inquiries",
          },
        ]}
      />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <AppCard id="contact-form" variant="blue">
          <SectionHeader
            title="📩 Inquiry Form"
            subtitle="Fill in your details and message. Your inquiry will be saved inside the NamLogix system."
          />

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <InputField
              placeholder="Your Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <InputField
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <InputField
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <InputField
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />

            <div className="md:col-span-2">
              <TextAreaField
                placeholder="Message *"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" variant="orange" fullWidth>
                {saving ? "Sending Inquiry..." : "📩 Send Inquiry"}
              </Button>
            </div>
          </form>
        </AppCard>
      </div>
    </div>
  );
}