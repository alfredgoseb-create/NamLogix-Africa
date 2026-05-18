// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";
import { supabase } from "@/lib/supabaseClient";

const emptyForm = {
  name: "",
  location: "",
  capacity: "",
  manager_name: "",
  phone: "",
  email: "",
  status: "active",
};

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  async function fetchWarehouses() {
    setLoading(true);

    const { data, error } = await supabase
      .from("warehouses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load warehouses: " + error.message);
    } else {
      setWarehouses(data || []);
    }

    setLoading(false);
  }

  async function handleSave(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Warehouse name is required.");
      return;
    }

    setSaving(true);

    const cleanForm = {
      name: form.name || "",
      location: form.location || "",
      capacity: form.capacity || "",
      manager_name: form.manager_name || "",
      phone: form.phone || "",
      email: form.email || "",
      status: form.status || "active",
    };

    if (editingId) {
      const { error } = await supabase
        .from("warehouses")
        .update(cleanForm)
        .eq("id", editingId);

      setSaving(false);

      if (error) {
        alert("Failed to update warehouse: " + error.message);
        return;
      }
    } else {
      const { error } = await supabase
        .from("warehouses")
        .insert([cleanForm]);

      setSaving(false);

      if (error) {
        alert("Failed to create warehouse: " + error.message);
        return;
      }
    }

    alert(editingId ? "Warehouse updated." : "Warehouse created.");
    setForm(emptyForm);
    setEditingId(null);
    fetchWarehouses();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this warehouse?")) return;

    const { error } = await supabase
      .from("warehouses")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Failed to delete warehouse: " + error.message);
    } else {
      fetchWarehouses();
    }
  }

  function handleEdit(warehouse) {
    setEditingId(warehouse.id);

    setForm({
      name: warehouse.name || "",
      location: warehouse.location || "",
      capacity: warehouse.capacity || "",
      manager_name: warehouse.manager_name || "",
      phone: warehouse.phone || "",
      email: warehouse.email || "",
      status: warehouse.status || "active",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const activeWarehouses = warehouses.filter(
    (w) => w.status === "active"
  ).length;

  const warehouseLocations = new Set(
    warehouses.map((w) => w.location).filter(Boolean)
  ).size;

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Warehouse Operations"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Warehouse Intelligence"
        description="Manage warehouse operations, inventory movement, storage facilities, and distribution centers across Namibia and Southern Africa."
        actions={[
          {
            label: "🏭 Add Warehouse",
            href: "#warehouse-form",
            primary: true,
          },
          {
            label: "📦 Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "👥 Suppliers",
            href: "/admin/suppliers",
          },
          {
            label: "📍 Stock Locations",
            href: "/admin/stock-locations",
          },
        ]}
        stats={[
          {
            value: warehouses.length,
            label: "Warehouses",
          },
          {
            value: activeWarehouses,
            label: "Active facilities",
          },
          {
            value: warehouseLocations,
            label: "Locations",
          },
          {
            value: "Live",
            label: "Supabase connected",
          },
        ]}
        infoCards={[
          {
            title: "Storage",
            text: "Inventory facilities",
          },
          {
            title: "Distribution",
            text: "Regional logistics",
          },
          {
            title: "Operations",
            text: "Warehouse control",
          },
          {
            title: "Trade",
            text: "Supply chain support",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Warehouses"
            value={warehouses.length}
            subtitle="Registered facilities"
            color="blue"
          />

          <DashboardCard
            title="Active"
            value={activeWarehouses}
            subtitle="Operational warehouses"
            color="green"
          />

          <DashboardCard
            title="Locations"
            value={warehouseLocations}
            subtitle="Coverage areas"
            color="orange"
          />

          <DashboardCard
            title="Status"
            value="Live"
            subtitle="Database connected"
            color="red"
          />
        </div>

        <AppCard id="warehouse-form" className="mb-8" variant="blue">
          <SectionHeader
            title={editingId ? "✏️ Edit Warehouse" : "🏭 Add Warehouse"}
            subtitle="Create and manage warehouse facilities for storage, inventory, and logistics operations."
          />

          <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Warehouse Name *"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3 md:col-span-2"
            />

            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Capacity"
              value={form.capacity}
              onChange={(e) =>
                setForm({
                  ...form,
                  capacity: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Manager Name"
              value={form.manager_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  manager_name: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>

            <div className="md:col-span-2 flex flex-col md:flex-row gap-3">
              <Button type="submit" variant="orange" fullWidth>
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Save Warehouse Changes"
                  : "🏭 Create Warehouse"}
              </Button>

              {editingId && (
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                >
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </AppCard>

        <AppCard className="mb-8" variant="orange">
          <SectionHeader
            title="⚡ Warehouse Actions"
            subtitle="Manage logistics and warehouse operations."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/admin/dashboard" variant="primary" fullWidth>
              📦 Inventory
            </Button>

            <Button href="/admin/suppliers" variant="secondary" fullWidth>
              👥 Suppliers
            </Button>

            <Button href="/admin/stock-locations" variant="outline" fullWidth>
              📍 Stock Locations
            </Button>

            <Button href="/admin/stock-transactions" variant="outline" fullWidth>
              🔄 Transactions
            </Button>
          </div>
        </AppCard>

        <AppCard variant="green">
          <SectionHeader
            title="🏭 Warehouse Network"
            subtitle="Manage all warehouse facilities across the platform."
            action={
              <button
                onClick={fetchWarehouses}
                className="bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800"
              >
                Refresh
              </button>
            }
          />

          {loading ? (
            <p>Loading warehouses...</p>
          ) : warehouses.length === 0 ? (
            <EmptyState
              icon="🏭"
              title="No warehouses yet"
              message="Create your first warehouse to begin managing inventory storage and distribution operations."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {warehouses.map((warehouse) => (
                <AppCard key={warehouse.id} hover>
                  <div className="flex justify-between gap-4 mb-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        warehouse.status === "active"
                          ? "bg-green-100 text-green-700"
                          : warehouse.status === "maintenance"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {warehouse.status || "active"}
                    </span>

                    <span className="text-xs text-gray-400">
                      Warehouse
                    </span>
                  </div>

                  <h3 className="font-bold text-lg">
                    {warehouse.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    {warehouse.location || "No location added"}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Capacity</p>
                      <p className="font-semibold">
                        {warehouse.capacity || "Not set"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Manager</p>
                      <p className="font-semibold">
                        {warehouse.manager_name || "Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleEdit(warehouse)}
                    >
                      Edit
                    </Button>

                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleDelete(warehouse.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </AppCard>
              ))}
            </div>
          )}
        </AppCard>
      </div>
    </div>
  );
}