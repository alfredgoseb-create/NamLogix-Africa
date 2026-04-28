// app/aviation/dashboard/services/new/page.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function NewServicePage() {
  const router = useRouter();
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category_id: "",
    price: "",
    price_type: "fixed",
    estimated_duration: "",
  });

  useEffect(() => {
    fetchVendorAndCategories();
  }, []);

  async function fetchVendorAndCategories() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    const { data: vendor } = await supabase
      .from("aviation_vendors")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (vendor) setVendorId(vendor.id);
    else router.push("/aviation/register");

    const { data: cats } = await supabase.from("aviation_service_categories").select("*").order("display_order");
    setCategories(cats || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!vendorId) return;
    setLoading(true);

    const { error } = await supabase.from("aviation_services").insert([{
      vendor_id: vendorId,
      name: form.name,
      description: form.description,
      category_id: form.category_id,
      price: form.price ? parseFloat(form.price) : null,
      price_type: form.price_type,
      estimated_duration: form.estimated_duration,
      is_active: true,
    }]);

    if (error) alert("Failed to add service: " + error.message);
    else {
      alert("Service added successfully!");
      router.push("/aviation/dashboard");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Add New Service</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Service Name *</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select required value={form.category_id} onChange={(e) => setForm({...form, category_id: e.target.value})} className="w-full border rounded px-3 py-2">
              <option value="">Select category</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (N$)</label>
              <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price Type</label>
              <select value={form.price_type} onChange={(e) => setForm({...form, price_type: e.target.value})} className="w-full border rounded px-3 py-2">
                <option value="fixed">Fixed Price</option>
                <option value="per_hour">Per Hour</option>
                <option value="quote_based">Quote Based</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Estimated Duration</label>
            <input type="text" placeholder="e.g., 2-4 hours, 24 hours" value={form.estimated_duration} onChange={(e) => setForm({...form, estimated_duration: e.target.value})} className="w-full border rounded px-3 py-2" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
            {loading ? "Adding..." : "Add Service"}
          </button>
        </form>
      </div>
    </div>
  );
}