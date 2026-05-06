// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import PageHero from "@/app/components/PageHero";

const emptyForm = {
  name: "",
  contact_name: "",
  email: "",
  phone: "",
  category: "",
};

export default function SuppliersPage() {
  const router = useRouter();

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    checkUser();
    fetchSuppliers();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) router.push("/login");
  }

  async function fetchSuppliers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to fetch suppliers: " + error.message);
    } else {
      setSuppliers(data || []);
    }

    setLoading(false);
  }

  async function handleSave(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Supplier name is required");
      return;
    }

    const cleanForm = {
      name: form.name || "",
      contact_name: form.contact_name || "",
      email: form.email || "",
      phone: form.phone || "",
      category: form.category || "",
    };

    if (editingId) {
      const { error } = await supabase
        .from("suppliers")
        .update(cleanForm)
        .eq("id", editingId);

      if (error) {
        alert("Failed to update supplier: " + error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("suppliers").insert([cleanForm]);

      if (error) {
        alert("Failed to add supplier: " + error.message);
        return;
      }
    }

    setForm(emptyForm);
    setEditingId(null);
    fetchSuppliers();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this supplier?")) return;

    const { error } = await supabase.from("suppliers").delete().eq("id", id);

    if (error) {
      alert("Failed to delete supplier: " + error.message);
    } else {
      fetchSuppliers();
    }
  }

  function handleEdit(supplier) {
    setForm({
      name: supplier.name || "",
      contact_name: supplier.contact_name || "",
      email: supplier.email || "",
      phone: supplier.phone || "",
      category: supplier.category || "",
    });

    setEditingId(supplier.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const totalSuppliers = suppliers.length;
  const suppliersWithEmail = suppliers.filter((s) => s.email).length;
  const suppliersWithPhone = suppliers.filter((s) => s.phone).length;
  const activeCategories = new Set(
    suppliers.map((s) => s.category).filter(Boolean)
  ).size;

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Supplier Network"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Supplier Intelligence"
        description="Manage trusted suppliers for inventory, warehouses, cargo movement, aviation support, and Southern African trade operations."
        actions={[
          { label: "👥 Add Supplier", href: "#supplier-form", primary: true },
          { label: "📈 Dashboard", href: "/admin/dashboard" },
          { label: "🛒 Store", href: "/store" },
          { label: "🏭 Warehouses", href: "/warehouses" },
        ]}
        stats={[
          { value: totalSuppliers, label: "Total suppliers" },
          { value: suppliersWithEmail, label: "With email" },
          { value: suppliersWithPhone, label: "With phone" },
          { value: activeCategories, label: "Categories" },
        ]}
        infoCards={[
          { title: "Procurement", text: "Supplier database" },
          { title: "Inventory", text: "Stock partners" },
          { title: "Logistics", text: "Trade support" },
          { title: "SADC", text: "Regional network" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div id="supplier-form" className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">
            {editingId ? "Edit Supplier" : "Add New Supplier"}
          </h2>

          <p className="text-gray-500 mb-5">
            Add suppliers that support your inventory, store, logistics, and
            procurement operations.
          </p>

          <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Supplier Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border rounded-lg px-3 py-2 md:col-span-2"
            />

            <input
              type="text"
              placeholder="Contact Person"
              value={form.contact_name}
              onChange={(e) =>
                setForm({ ...form, contact_name: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
            />

            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />

            <input
              type="text"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
              >
                {editingId ? "Save Changes" : "Add Supplier"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                  className="bg-gray-100 px-5 py-2 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">👥 Supplier Directory</h2>
              <p className="text-sm text-gray-500">
                All registered suppliers and trade partners.
              </p>
            </div>

            <button
              onClick={fetchSuppliers}
              className="bg-gray-100 px-5 py-2 rounded-lg hover:bg-gray-200"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p>Loading suppliers...</p>
          ) : suppliers.length === 0 ? (
            <div className="text-center text-gray-500 border border-dashed rounded-xl p-8">
              No suppliers yet. Add your first supplier above.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-lg transition"
                >
                  <div className="font-semibold text-lg">{supplier.name}</div>

                  <div className="text-sm text-gray-500 mt-1">
                    {supplier.contact_name || "No contact person"}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {supplier.category && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                        {supplier.category}
                      </span>
                    )}

                    {supplier.email && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {supplier.email}
                      </span>
                    )}

                    {supplier.phone && (
                      <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                        {supplier.phone}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-5">
                    <button
                      onClick={() => handleEdit(supplier)}
                      className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(supplier.id)}
                      className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}