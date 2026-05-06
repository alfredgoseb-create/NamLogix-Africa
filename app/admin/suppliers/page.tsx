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
      {/* Hero Section - same style as homepage */}
      <div
        style={{
          background: "#0a1628",
          color: "#fff",
          borderRadius: "0 0 24px 24px",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "3rem 2.5rem 2rem", position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.3)",
              color: "#93c5fd",
              fontSize: "12px",
              fontWeight: 500,
              padding: "4px 12px",
              borderRadius: "100px",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                background: "#3b82f6",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
            Supplier Network
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: "0 0 1rem",
            }}
          >
            NamLogix{" "}
            <span style={{ color: "#f97316" }}>AFRICA</span>
            <br />
            Supplier Intelligence
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#94a3b8",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 0 2rem",
            }}
          >
            Manage trusted suppliers for inventory, warehouses, cargo movement,
            aviation support, and Southern African trade operations.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            <a
              href="#supplier-form"
              style={{
                background: "#f97316",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "100px",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              👥 Add Supplier
            </a>

            <Link
              href="/admin/dashboard"
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "12px 24px",
                borderRadius: "100px",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              📈 Dashboard
            </Link>

            <Link
              href="/store"
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "12px 24px",
                borderRadius: "100px",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              🛒 Store
            </Link>

            <Link
              href="/warehouses"
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "12px 24px",
                borderRadius: "100px",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              🏭 Warehouses
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[
              [totalSuppliers, "Total suppliers"],
              [suppliersWithEmail, "With email"],
              [suppliersWithPhone, "With phone"],
              [activeCategories, "Categories"],
            ].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: "24px", fontWeight: 700 }}>{num}</div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginTop: "2px",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#0f1f38",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "1.5rem 2rem 2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                flexShrink: 0,
              }}
            >
              ✦
            </div>

            <span
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#e2e8f0",
              }}
            >
              Supplier Control Center
            </span>

            <span style={{ fontSize: "12px", color: "#64748b" }}>
              Manage procurement, contacts, and trade partners
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-xl border border-white/10 bg-[#0a1628] p-4">
              <p className="text-xs text-slate-500">Procurement</p>
              <p className="text-sm text-slate-200 mt-1">
                Supplier database
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0a1628] p-4">
              <p className="text-xs text-slate-500">Inventory</p>
              <p className="text-sm text-slate-200 mt-1">
                Stock partners
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0a1628] p-4">
              <p className="text-xs text-slate-500">Logistics</p>
              <p className="text-sm text-slate-200 mt-1">
                Trade support
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0a1628] p-4">
              <p className="text-xs text-slate-500">SADC</p>
              <p className="text-sm text-slate-200 mt-1">
                Regional network
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div
          id="supplier-form"
          className="bg-white rounded-xl shadow p-6 mb-8"
        >
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