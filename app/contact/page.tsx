// @ts-nocheck
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PageHero from "@/app/components/PageHero";

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
        description="Contact us for products, cargo, transport bookings, suppliers, warehouses, aviation, trade routes, and marketplace support."
        actions={[
          { label: "📩 Send Inquiry", href: "#contact-form", primary: true },
          { label: "🛒 Store", href: "/store" },
          { label: "🚕 Transport", href: "/transport" },
          { label: "📦 Post Cargo", href: "/request-cargo" },
        ]}
        stats={[
          { value: "24/7", label: "Online requests" },
          { value: "Trade", label: "Business support" },
          { value: "Cargo", label: "Logistics help" },
          { value: "Live", label: "Inquiry system" },
        ]}
        infoCards={[
          { title: "Products", text: "Marketplace inquiries" },
          { title: "Cargo", text: "Shipping support" },
          { title: "Transport", text: "Booking help" },
          { title: "Warehouses", text: "Storage support" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[0.9fr_1.4fr] gap-8 items-start">
          <div className="space-y-6">
            <div className="bg-slate-950 text-white rounded-3xl p-8 shadow-xl">
              <p className="text-orange-300 font-black uppercase text-sm">
                Get in touch
              </p>

              <h2 className="text-3xl font-black mt-3">
                We are ready to help your trade move.
              </h2>

              <p className="text-white/70 leading-7 mt-4">
                Send your request and the NamLogix team can assist with cargo,
                suppliers, products, transport, warehouse services, and trade
                support.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="text-3xl mb-3">📦</div>
                <h3 className="font-black text-lg">Cargo & Logistics</h3>
                <p className="text-gray-500 text-sm mt-2 leading-6">
                  Ask about cargo requests, transport routes, deliveries, and
                  logistics support.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="text-3xl mb-3">🛒</div>
                <h3 className="font-black text-lg">Products & Marketplace</h3>
                <p className="text-gray-500 text-sm mt-2 leading-6">
                  Request product information, supplier details, pricing, and
                  marketplace support.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="text-3xl mb-3">🏭</div>
                <h3 className="font-black text-lg">Warehouses & Storage</h3>
                <p className="text-gray-500 text-sm mt-2 leading-6">
                  Contact us for storage, stock movement, inventory, and
                  warehouse-related support.
                </p>
              </div>
            </div>
          </div>

          <div
            id="contact-form"
            className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-950 to-orange-500 text-white p-8">
              <p className="text-orange-100 font-bold uppercase text-sm">
                Inquiry Form
              </p>

              <h2 className="text-3xl font-black mt-2">
                Send us a message
              </h2>

              <p className="text-white/75 mt-3">
                Fill in your details below. Your message will be saved in the
                NamLogix admin inquiry system.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    placeholder="What is this about?"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full min-h-[170px] rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    placeholder="Write your message here..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-6 py-4 font-black shadow-lg shadow-orange-200 transition"
              >
                {saving ? "Sending Inquiry..." : "📩 Send Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}