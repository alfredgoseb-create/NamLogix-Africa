// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

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
  const busy = drivers.filter((d) => d.status === "busy").length;
  const inactive = drivers.filter((d) => d.status === "inactive").length;

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>FLEET OPERATIONS</p>

          <h1 style={titleStyle}>Driver Management</h1>

          <p style={descStyle}>
            Register drivers, vehicles, service areas, and driver availability
            for the NamLogix transport system.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/admin/transport" style={buttonOrange}>
              🚕 Transport Bookings
            </Link>

            <Link href="/transport" style={buttonBlue}>
              Public Transport
            </Link>

            <Link href="/admin/inquiries" style={buttonWhite}>
              📩 Inquiries
            </Link>
          </div>
        </section>

        <section style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Total</p>
            <h3 style={statValueStyle}>{drivers.length}</h3>
            <p style={statTextStyle}>Registered drivers</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Active</p>
            <h3 style={statValueStyle}>{active}</h3>
            <p style={statTextStyle}>Available drivers</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Busy</p>
            <h3 style={statValueStyle}>{busy}</h3>
            <p style={statTextStyle}>Currently assigned</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Inactive</p>
            <h3 style={statValueStyle}>{inactive}</h3>
            <p style={statTextStyle}>Unavailable drivers</p>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={formTitleStyle}>🚗 Add Driver</h2>

          <p style={formDescStyle}>
            Add drivers and vehicles that can be assigned to transport bookings.
          </p>

          <form onSubmit={createDriver} style={formGridStyle}>
            <input
              type="text"
              placeholder="Driver Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Phone Number *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Vehicle Type"
              value={form.vehicle_type}
              onChange={(e) =>
                setForm({ ...form, vehicle_type: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Vehicle Plate"
              value={form.vehicle_plate}
              onChange={(e) =>
                setForm({ ...form, vehicle_plate: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Service Area"
              value={form.service_area}
              onChange={(e) =>
                setForm({ ...form, service_area: e.target.value })
              }
              style={inputStyle}
            />

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              style={selectStyle}
            >
              <option value="active">Active</option>
              <option value="busy">Busy</option>
              <option value="inactive">Inactive</option>
            </select>

            <button type="submit" disabled={saving} style={submitButtonStyle}>
              {saving ? "Saving Driver..." : "🚗 Add Driver"}
            </button>
          </form>
        </section>

        <section style={{ ...cardStyle, marginTop: 24 }}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={formTitleStyle}>👨‍✈️ Registered Drivers</h2>
              <p style={formDescStyle}>
                Manage drivers, vehicles, availability, and service areas.
              </p>
            </div>

            <button onClick={fetchDrivers} style={smallButtonStyle}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={emptyTextStyle}>Loading drivers...</p>
          ) : drivers.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={{ fontSize: 44 }}>🚗</div>
              <h3 style={{ margin: "12px 0 6px", fontSize: 24 }}>
                No drivers yet
              </h3>
              <p style={{ color: "#64748b", margin: 0 }}>
                Add your first driver to start building transport operations.
              </p>
            </div>
          ) : (
            <div style={gridStyle}>
              {drivers.map((driver) => (
                <article key={driver.id} style={itemCardStyle}>
                  <div style={cardTopStyle}>
                    <div>
                      <h3 style={itemTitleStyle}>{driver.name}</h3>
                      <p style={itemSubStyle}>{driver.phone}</p>
                    </div>

                    <span
                      style={
                        driver.status === "active"
                          ? activeBadgeStyle
                          : driver.status === "busy"
                          ? busyBadgeStyle
                          : inactiveBadgeStyle
                      }
                    >
                      {driver.status}
                    </span>
                  </div>

                  <div style={detailGridStyle}>
                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Email</p>
                      <p style={detailValueStyle}>{driver.email || "-"}</p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Vehicle</p>
                      <p style={detailValueStyle}>
                        {driver.vehicle_type || "-"}
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Plate</p>
                      <p style={detailValueStyle}>
                        {driver.vehicle_plate || "-"}
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Area</p>
                      <p style={detailValueStyle}>
                        {driver.service_area || "-"}
                      </p>
                    </div>
                  </div>

                  <div style={actionsStyle}>
                    <button
                      onClick={() => updateStatus(driver.id, "active")}
                      style={buttonGreenSmall}
                    >
                      Active
                    </button>

                    <button
                      onClick={() => updateStatus(driver.id, "busy")}
                      style={buttonBlueSmall}
                    >
                      Busy
                    </button>

                    <button
                      onClick={() => updateStatus(driver.id, "inactive")}
                      style={buttonGraySmall}
                    >
                      Inactive
                    </button>

                    <button
                      onClick={() => deleteDriver(driver.id)}
                      style={buttonDangerSmall}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f8fc",
  padding: "40px 24px",
};

const containerStyle = {
  maxWidth: 1100,
  margin: "0 auto",
};

const heroStyle = {
  background: "linear-gradient(135deg, #0b1220, #1e3a8a, #f97316)",
  color: "white",
  borderRadius: 28,
  padding: 36,
  marginBottom: 24,
  boxShadow: "0 20px 40px rgba(15,23,42,0.22)",
};

const badgeStyle = {
  color: "#fed7aa",
  fontWeight: 900,
  letterSpacing: 1,
  margin: 0,
};

const titleStyle = {
  fontSize: 42,
  fontWeight: 900,
  margin: "10px 0",
};

const descStyle = {
  maxWidth: 760,
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.85)",
};

const buttonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 24,
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
  marginBottom: 24,
};

const statCardStyle = {
  background: "white",
  borderRadius: 22,
  padding: 22,
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
};

const statLabelStyle = {
  color: "#64748b",
  fontWeight: 800,
  margin: 0,
};

const statValueStyle = {
  fontSize: 30,
  fontWeight: 900,
  margin: "8px 0",
  color: "#0f172a",
};

const statTextStyle = {
  color: "#64748b",
  margin: 0,
};

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.10)",
};

const formTitleStyle = {
  fontSize: 30,
  fontWeight: 900,
  margin: 0,
  color: "#0f172a",
};

const formDescStyle = {
  color: "#64748b",
  marginTop: 8,
  marginBottom: 0,
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 16,
  marginTop: 24,
};

const inputStyle = {
  width: "100%",
  border: "1px solid #d1d5db",
  borderRadius: 14,
  padding: "14px 15px",
  fontSize: 15,
  background: "#f8fafc",
  outline: "none",
};

const selectStyle = {
  ...inputStyle,
  gridColumn: "1 / -1",
};

const submitButtonStyle = {
  background: "#f97316",
  color: "white",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  border: "none",
  cursor: "pointer",
  gridColumn: "1 / -1",
  fontSize: 16,
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  alignItems: "center",
  marginBottom: 24,
  flexWrap: "wrap",
};

const smallButtonStyle = {
  background: "#1d4ed8",
  color: "white",
  padding: "11px 16px",
  borderRadius: 14,
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
};

const emptyTextStyle = {
  color: "#64748b",
};

const emptyStateStyle = {
  textAlign: "center",
  padding: 50,
  background: "#f8fafc",
  borderRadius: 20,
  border: "1px dashed #cbd5e1",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 18,
};

const itemCardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: 22,
  padding: 22,
  background: "#ffffff",
  boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
};

const cardTopStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 14,
  marginBottom: 18,
};

const itemTitleStyle = {
  fontSize: 20,
  fontWeight: 900,
  margin: 0,
  color: "#0f172a",
};

const itemSubStyle = {
  margin: "6px 0 0",
  color: "#64748b",
};

const activeBadgeStyle = {
  background: "#dcfce7",
  color: "#15803d",
  borderRadius: 999,
  padding: "6px 10px",
  height: "fit-content",
  fontSize: 12,
  fontWeight: 900,
};

const busyBadgeStyle = {
  background: "#dbeafe",
  color: "#1d4ed8",
  borderRadius: 999,
  padding: "6px 10px",
  height: "fit-content",
  fontSize: 12,
  fontWeight: 900,
};

const inactiveBadgeStyle = {
  background: "#fee2e2",
  color: "#b91c1c",
  borderRadius: 999,
  padding: "6px 10px",
  height: "fit-content",
  fontSize: 12,
  fontWeight: 900,
};

const detailGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 10,
};

const detailBoxStyle = {
  background: "#f8fafc",
  borderRadius: 16,
  padding: 12,
};

const detailLabelStyle = {
  color: "#94a3b8",
  fontSize: 12,
  margin: 0,
};

const detailValueStyle = {
  color: "#0f172a",
  fontWeight: 800,
  margin: "4px 0 0",
};

const actionsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginTop: 18,
};

const buttonBlue = {
  background: "#1d4ed8",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonWhite = {
  background: "white",
  color: "#1d4ed8",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonOrange = {
  background: "#f97316",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonBlueSmall = {
  background: "#1d4ed8",
  color: "white",
  padding: "10px 14px",
  borderRadius: 14,
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
};

const buttonGreenSmall = {
  background: "#16a34a",
  color: "white",
  padding: "10px 14px",
  borderRadius: 14,
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
};

const buttonGraySmall = {
  background: "#475569",
  color: "white",
  padding: "10px 14px",
  borderRadius: 14,
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
};

const buttonDangerSmall = {
  background: "#dc2626",
  color: "white",
  padding: "10px 14px",
  borderRadius: 14,
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
};