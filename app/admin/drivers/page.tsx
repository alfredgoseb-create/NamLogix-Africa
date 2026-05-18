// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import DashboardHeader from "@/app/components/DashboardHeader";
import AppCard from "@/app/components/AppCard";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import Button from "@/app/components/Button";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  vehicle_type: "",
  vehicle_plate: "",
  service_area: "",
  status: "active",
};

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDrivers();
  }, []);

  async function fetchDrivers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load drivers: " + error.message);
    } else {
      setDrivers(data || []);
    }

    setLoading(false);
  }

  async function createDriver(e) {
    e.preventDefault();

    if (!form.name || !form.phone) {
      alert("Driver name and phone are required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("drivers").insert([form]);

    setSaving(false);

    if (error) {
      alert("Failed to create driver: " + error.message);
      return;
    }

    alert("Driver added successfully.");
    setForm(emptyForm);
    fetchDrivers();
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("drivers")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("Failed to update driver: " + error.message);
    } else {
      fetchDrivers();
    }
  }

  async function deleteDriver(id) {
    if (!confirm("Delete this driver?")) return;

    const { error } = await supabase.from("drivers").delete().eq("id", id);

    if (error) {
      alert("Failed to delete driver: " + error.message);
    } else {
      fetchDrivers();
    }
  }

  const active = drivers.filter((d) => d.status === "active").length;
  const inactive = drivers.filter((d) => d.status === "inactive").length;
  const busy = drivers.filter((d) => d.status === "busy").length;

  return (
    <div className="min-h-screen page-soft-bg">
      <DashboardHeader
        badge="Fleet Operations"
        title="Driver Management"
        description="Register drivers, vehicles, service areas, and driver availability for the NamLogix transport system."
        actions={[
          {
            label: "🚕 Transport Bookings",
            href: "/admin/transport",
            primary: true,
          },
          {
            label: "📦 Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "📩 Inquiries",
            href: "/admin/inquiries",
          },
        ]}
        stats={[
          {
            value: drivers.length,
            label: "Total drivers",
          },
          {
            value: active,
            label: "Active",
          },
          {
            value: busy,
            label: "Busy",
          },
          {
            value: inactive,
            label: "Inactive",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <DashboardCard title="Total" value={drivers.length} subtitle="Registered drivers" color="blue" />
          <DashboardCard title="Active" value={active} subtitle="Available drivers" color="green" />
          <DashboardCard title="Busy" value={busy} subtitle="Currently assigned" color="orange" />
          <DashboardCard title="Inactive" value={inactive} subtitle="Unavailable" color="red" />
        </div>

        <AppCard id="add-driver" className="mb-8" variant="blue">
          <SectionHeader
            title="🚗 Add Driver"
            subtitle="Add drivers and vehicles that can be assigned to transport bookings."
          />

          <form onSubmit={createDriver} className="grid md:grid-cols-2 gap-4">
            <input className="border rounded-xl px-4 py-3" placeholder="Driver Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="border rounded-xl px-4 py-3" placeholder="Phone Number *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="border rounded-xl px-4 py-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="border rounded-xl px-4 py-3" placeholder="Vehicle Type" value={form.vehicle_type} onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })} />
            <input className="border rounded-xl px-4 py-3" placeholder="Vehicle Plate" value={form.vehicle_plate} onChange={(e) => setForm({ ...form, vehicle_plate: e.target.value })} />
            <input className="border rounded-xl px-4 py-3" placeholder="Service Area" value={form.service_area} onChange={(e) => setForm({ ...form, service_area: e.target.value })} />

            <select className="border rounded-xl px-4 py-3 md:col-span-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="active">Active</option>
              <option value="busy">Busy</option>
              <option value="inactive">Inactive</option>
            </select>

            <div className="md:col-span-2">
              <Button type="submit" variant="orange" fullWidth>
                {saving ? "Saving Driver..." : "Add Driver"}
              </Button>
            </div>
          </form>
        </AppCard>

        <AppCard variant="green">
          <SectionHeader
            title="👨‍✈️ Registered Drivers"
            subtitle="Manage drivers, vehicles, availability, and service areas."
            action={
              <button onClick={fetchDrivers} className="bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800">
                Refresh
              </button>
            }
          />

          {loading ? (
            <p>Loading drivers...</p>
          ) : drivers.length === 0 ? (
            <EmptyState
              icon="🚗"
              title="No drivers yet"
              message="Add your first driver to start building your transport operations."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drivers.map((driver) => (
                <AppCard key={driver.id} hover>
                  <div className="flex justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-black text-xl">{driver.name}</h3>
                      <p className="text-sm text-gray-500">{driver.phone}</p>
                    </div>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold h-fit">
                      {driver.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Email:</strong> {driver.email || "-"}</p>
                    <p><strong>Vehicle:</strong> {driver.vehicle_type || "-"}</p>
                    <p><strong>Plate:</strong> {driver.vehicle_plate || "-"}</p>
                    <p><strong>Area:</strong> {driver.service_area || "-"}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    <Button type="button" variant="primary" onClick={() => updateStatus(driver.id, "active")}>
                      Active
                    </Button>

                    <Button type="button" variant="secondary" onClick={() => updateStatus(driver.id, "busy")}>
                      Busy
                    </Button>

                    <Button type="button" variant="danger" onClick={() => deleteDriver(driver.id)}>
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