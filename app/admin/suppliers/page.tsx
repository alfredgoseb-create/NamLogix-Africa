// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

const emptyForm = {
  name: "",
  contact_name: "",
  email: "",
  phone: "",
  category: "",
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  async function fetchSuppliers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setSuppliers(data || []);
    }

    setLoading(false);
  }

  async function handleCreate(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Supplier name required");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("suppliers").insert([
      {
        name: form.name,
        contact_name: form.contact_name,
        email: form.email,
        phone: form.phone,
        category: form.category,
      },
    ]);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    setForm(emptyForm);
    fetchSuppliers();
  }

  async function handleDelete(id) {
    if (!confirm("Delete supplier?")) return;

    const { error } = await supabase
      .from("suppliers")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchSuppliers();
    }
  }

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Supplier Network"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Supplier Management"
        description="Manage suppliers, procurement networks, warehouse providers, and marketplace businesses across Southern Africa."
        actions={[
          {
            label: "➕ Add Supplier",
            href: "#supplier-form",
            primary: true,
          },
          {
            label: "🛒 Marketplace",
            href: "/store",
          },
          {
            label: "🏭 Warehouses",
            href: "/admin/warehouses",
          },
          {
            label: "📦 Inventory",
            href: "/admin/dashboard",
          },
        ]}
        stats={[
          {
            value: suppliers.length,
            label: "Suppliers",
          },
          {
            value: "B2B",
            label: "Business Network",
          },
          {
            value: "Live",
            label: "Connected",
          },
          {
            value: "SADC",
            label: "Coverage",
          },
        ]}
        infoCards={[
          {
            title: "Suppliers",
            text: "Business partners",
          },
          {
            title: "Products",
            text: "Inventory sourcing",
          },
          {
            title: "Warehouses",
            text: "Storage support",
          },
          {
            title: "Trade",
            text: "Regional commerce",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Suppliers"
            value={suppliers.length}
            subtitle="Registered businesses"
            color="blue"
          />

          <DashboardCard
            title="Marketplace"
            value="Live"
            subtitle="Store integration"
            color="green"
          />

          <DashboardCard
            title="Warehouses"
            value="Connected"
            subtitle="Inventory support"
            color="orange"
          />

          <DashboardCard
            title="Coverage"
            value="SADC"
            subtitle="Regional suppliers"
            color="red"
          />
        </div>

        <AppCard
          id="supplier-form"
          className="mb-8"
          variant="blue"
        >
          <SectionHeader
            title="➕ Add Supplier"
            subtitle="Register suppliers and businesses into the NamLogix network."
          />

          <form
            onSubmit={handleCreate}
            className="grid md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Supplier Name *"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Contact Person"
              value={form.contact_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  contact_name: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Business Category"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3 md:col-span-2"
            />

            <div className="md:col-span-2">
              <Button
                type="submit"
                variant="orange"
                fullWidth
              >
                {saving
                  ? "Saving Supplier..."
                  : "➕ Create Supplier"}
              </Button>
            </div>
          </form>
        </AppCard>

        <AppCard variant="green">
          <SectionHeader
            title="🏢 Registered Suppliers"
            subtitle="Businesses currently connected to the NamLogix trade network."
          />

          {loading ? (
            <p>Loading suppliers...</p>
          ) : suppliers.length === 0 ? (
            <EmptyState
              icon="🏢"
              title="No suppliers yet"
              message="Supplier businesses will appear here once added."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map((supplier) => (
                <AppCard key={supplier.id} hover>
                  <div className="flex justify-between mb-4">
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {supplier.category || "General"}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg">
                    {supplier.name}
                  </h3>

                  <div className="mt-4 space-y-2 text-sm text-gray-500">
                    <p>
                      Contact:{" "}
                      {supplier.contact_name || "N/A"}
                    </p>

                    <p>
                      Email: {supplier.email || "N/A"}
                    </p>

                    <p>
                      Phone: {supplier.phone || "N/A"}
                    </p>
                  </div>

                  <div className="mt-5">
                    <Button
                      type="button"
                      variant="danger"
                      fullWidth
                      onClick={() =>
                        handleDelete(supplier.id)
                      }
                    >
                      Delete Supplier
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