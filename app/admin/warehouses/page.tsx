// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const emptyForm = {
  name: "",
  location: "",
  city: "",
  capacity: "",
  contact_name: "",
  phone: "",
  email: "",
  status: "active",
  description: "",
};

export default function AdminWarehousesPage() {
  const [warehouses, setWarehouses] = useState([]);
  const [form, setForm] = useState(emptyForm);
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

  async function createWarehouse(e) {
    e.preventDefault();

    if (!form.name || !form.location) {
      alert("Warehouse name and location are required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("warehouses").insert([form]);

    setSaving(false);

    if (error) {
      alert("Failed to create warehouse: " + error.message);
      return;
    }

    alert("Warehouse added successfully.");
    setForm(emptyForm);
    fetchWarehouses();
  }

  async function deleteWarehouse(id) {
    if (!confirm("Delete this warehouse?")) return;

    const { error } = await supabase.from("warehouses").delete().eq("id", id);

    if (error) {
      alert("Failed to delete warehouse: " + error.message);
    } else {
      fetchWarehouses();
    }
  }

  const active = warehouses.filter((w) => w.status === "active").length;

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>WAREHOUSE OPERATIONS</p>

          <h1 style={titleStyle}>Warehouse Management</h1>

          <p style={descStyle}>
            Add and manage warehouse facilities, storage capacity, contact
            details, locations, and inventory support partners.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/warehouses" style={buttonOrange}>
              🏭 Public Warehouses
            </Link>

            <Link href="/admin/dashboard" style={buttonBlue}>
              📦 Inventory
            </Link>

            <Link href="/admin/suppliers" style={buttonWhite}>
              🏢 Suppliers
            </Link>
          </div>
        </section>

        <section style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Warehouses</p>
            <h3 style={statValueStyle}>{warehouses.length}</h3>
            <p style={statTextStyle}>Total facilities</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Active</p>
            <h3 style={statValueStyle}>{active}</h3>
            <p style={statTextStyle}>Available partners</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Inventory</p>
            <h3 style={statValueStyle}>Stock</h3>
            <p style={statTextStyle}>Storage support</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Network</p>
            <h3 style={statValueStyle}>SADC</h3>
            <p style={statTextStyle}>Regional storage</p>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={formTitleStyle}>🏭 Add Warehouse</h2>

          <p style={formDescStyle}>
            Register warehouse facilities that can support products, storage,
            inventory movement, and trade logistics.
          </p>

          <form onSubmit={createWarehouse} style={formGridStyle}>
            <input
              type="text"
              placeholder="Warehouse Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Location *"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Capacity"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Contact Person"
              value={form.contact_name}
              onChange={(e) =>
                setForm({ ...form, contact_name: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              style={inputStyle}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <textarea
              placeholder="Warehouse Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={textareaStyle}
            />

            <button type="submit" disabled={saving} style={submitButtonStyle}>
              {saving ? "Saving Warehouse..." : "🏭 Add Warehouse"}
            </button>
          </form>
        </section>

        <section style={{ ...cardStyle, marginTop: 24 }}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={formTitleStyle}>📍 Registered Warehouses</h2>
              <p style={formDescStyle}>
                Warehouse facilities connected to the NamLogix storage network.
              </p>
            </div>

            <button onClick={fetchWarehouses} style={smallButtonStyle}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={emptyTextStyle}>Loading warehouses...</p>
          ) : warehouses.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={{ fontSize: 44 }}>🏭</div>
              <h3 style={{ margin: "12px 0 6px", fontSize: 24 }}>
                No warehouses yet
              </h3>
              <p style={{ color: "#64748b", margin: 0 }}>
                Add your first warehouse above to build the storage network.
              </p>
            </div>
          ) : (
            <div style={gridStyle}>
              {warehouses.map((warehouse) => (
                <article key={warehouse.id} style={itemCardStyle}>
                  <div style={cardTopStyle}>
                    <div>
                      <h3 style={itemTitleStyle}>{warehouse.name}</h3>
                      <p style={itemSubStyle}>
                        {warehouse.location || "No location"}
                      </p>
                    </div>

                    <span
                      style={
                        warehouse.status === "active"
                          ? activeBadgeStyle
                          : inactiveBadgeStyle
                      }
                    >
                      {warehouse.status || "active"}
                    </span>
                  </div>

                  <div style={detailGridStyle}>
                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>City</p>
                      <p style={detailValueStyle}>{warehouse.city || "-"}</p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Capacity</p>
                      <p style={detailValueStyle}>
                        {warehouse.capacity || "-"}
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Contact</p>
                      <p style={detailValueStyle}>
                        {warehouse.contact_name || "-"}
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Phone</p>
                      <p style={detailValueStyle}>{warehouse.phone || "-"}</p>
                    </div>
                  </div>

                  {warehouse.description && (
                    <p style={descriptionBoxStyle}>{warehouse.description}</p>
                  )}

                  <div style={actionsStyle}>
                    <Link href="/admin/dashboard" style={buttonBlueSmall}>
                      Manage Products
                    </Link>

                    <button
                      onClick={() => deleteWarehouse(warehouse.id)}
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

const textareaStyle = {
  ...inputStyle,
  gridColumn: "1 / -1",
  minHeight: 160,
  resize: "vertical",
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

const descriptionBoxStyle = {
  marginTop: 14,
  background: "#f8fafc",
  borderRadius: 16,
  padding: 14,
  color: "#475569",
  lineHeight: 1.6,
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
  ...buttonBlue,
  padding: "10px 14px",
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