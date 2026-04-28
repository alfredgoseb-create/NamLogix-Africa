// app/aviation/register/page.tsx
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AviationVendorRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    registration_number: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Namibia",
    license_number: "",
    years_in_business: "",
    description: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("aviation_vendors").insert([{
      ...form,
      years_in_business: form.years_in_business ? parseInt(form.years_in_business) : null,
      user_id: user.id,
      status: "pending",
    }]);

    if (error) {
      alert("Registration failed: " + error.message);
    } else {
      alert("Registration submitted! We'll review your application within 48 hours.");
      router.push("/aviation");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/aviation" className="text-blue-600 mb-4 inline-block">← Back to Aviation Services</Link>
        
        <div className="bg-white rounded-xl shadow p-8">
          <h1 className="text-2xl font-bold mb-2">Register as Aviation Service Provider</h1>
          <p className="text-gray-600 mb-6">Join our platform and connect with aircraft operators, pilots, and charter companies across Namibia.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Company Name *</label>
                <input type="text" required value={form.company_name} onChange={(e) => setForm({...form, company_name: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Registration Number</label>
                <input type="text" value={form.registration_number} onChange={(e) => setForm({...form, registration_number: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone *</label>
                <input type="tel" required value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input type="text" value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} className="w-full border rounded px-3 py-2" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input type="text" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <input type="text" value={form.country} onChange={(e) => setForm({...form, country: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">License/Operating Number</label>
                <input type="text" value={form.license_number} onChange={(e) => setForm({...form, license_number: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Years in Business</label>
                <input type="number" value={form.years_in_business} onChange={(e) => setForm({...form, years_in_business: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Company Description</label>
              <textarea rows={4} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full border rounded px-3 py-2" placeholder="Describe your services, experience, and what makes your company unique..." />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
              {loading ? "Submitting..." : "Register as Service Provider"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}