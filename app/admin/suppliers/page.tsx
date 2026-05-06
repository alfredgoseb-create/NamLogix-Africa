// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

    if (!data.user) {
      router.push("/login");
    }
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
      const { error } = await supabase
        .from("suppliers")
        .insert([cleanForm]);

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

    const { error } = await supabase
      .from("suppliers")
      .delete()
      .eq("id", id);

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
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0a1628] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-[#0a1628] to-orange-900/40" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200 mb-6">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Supplier Network Control
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Manage Trusted{" "}
              <span className="text-orange-400">Suppliers</span>
              <br />
              Across Southern Africa
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-slate-300 leading-8">
              Build a reliable supplier database for inventory, trade,
              warehouses, cargo movement, and regional logistics operations.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#supplier-form"
                className="rounded-full bg-orange-500 px-7 py-3 font-semibold text-white hover:bg-orange-600 transition"
              >
                + Add Supplier
              </a>

              <Link
                href="/admin/dashboard"
                className="rounded-full border border-white/20 px-7 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-5">
              <p className="text-sm text-slate-300">Total Suppliers</p>
              <h2 className="text-3xl font-bold mt-2">{totalSuppliers}</h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-5">
              <p className="text-sm text-slate-300">With Email</p>
              <h2 className="text-3xl font-bold mt-2">{suppliersWithEmail}</h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-5">
              <p className="text-sm text-slate-300">With Phone</p>
              <h2 className="text-3xl font-bold mt-2">{suppliersWithPhone}</h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-5">
              <p className="text-sm text-slate-300">Categories</p>
              <h2 className="text-3xl font-bold mt-2">{activeCategories}</h2>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE CONTENT */}
      <div className="max-w-6xl mx-auto p-6 -mt-8 relative z-10">
        <div
          id="supplier-form"
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-2">
            {editingId ? "Edit Supplier" : "Add New Supplier"}
          </h2>

          <p className="text-gray-500 mb-5">
            Add supplier information for procurement, stock planning, and
            logistics coordination.
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
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg"
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
                  className="bg-gray-100 px-6 py-2 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">All Suppliers</h2>
              <p className="text-sm text-gray-500">
                Supplier records connected to your trade infrastructure.
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
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
              <p className="text-gray-500">
                No suppliers yet. Add your first supplier above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {suppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{supplier.name}</h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {supplier.contact_name || "No contact person"}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
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
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(supplier)}
                      className="bg-gray-100 px-5 py-2 rounded-lg hover:bg-gray-200 text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(supplier.id)}
                      className="bg-red-50 text-red-600 px-5 py-2 rounded-lg hover:bg-red-100 text-sm"
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