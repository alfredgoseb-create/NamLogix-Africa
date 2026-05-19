// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const emptyForm = {
  name: "",
  contact_name: "",
  email: "",
  phone: "",
  location: "",
  category: "",
  status: "active",
  description: "",
};

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
      alert("Failed to load suppliers: " + error.message);
    } else {
      setSuppliers(data || []);
    }

    setLoading(false);
  }

  async function createSupplier(e) {
    e.preventDefault();

    if (!form.name) {
      alert("Supplier name is required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("suppliers").insert([form]);

    setSaving(false);

    if (error) {
      alert("Failed to create supplier: " + error.message);
      return;
    }

    alert("Supplier added successfully.");
    setForm(emptyForm);
    fetchSuppliers();
  }

  async function deleteSupplier(id) {
    if (!confirm("Delete this supplier?")) return;

    const { error } = await supabase.from("suppliers").delete().eq("id", id);

    if (error) {
      alert("Failed to delete supplier: " + error.message);
    } else {
      fetchSuppliers();
    }
  }

  const active = suppliers.filter((s) => s.status === "active").length;

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>SUPPLIER OPERATIONS</p>

          <h1 style={titleStyle}>Supplier Management</h1>

          <p style={descStyle}>
            Register suppliers, manage contact details, product categories,
            marketplace partners, and business relationships for NamLogix Africa.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/store" style={buttonOrange}>
              🛒 Store
            </Link>

            <Link href="/admin/dashboard" style={buttonBlue}>
              📦 Inventory
            </Link>

            <Link href="/companies" style={buttonWhite}>
              🏢 Companies
            </Link>
          </div>
        </section>

        <section style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Suppliers</p>
            <h3 style={statValueStyle}>{suppliers.length}</h3>
            <p style={statTextStyle}>Total partners</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Active</p>
            <h3 style={statValueStyle}>{active}</h3>
            <p style={statTextStyle}>Available suppliers</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Marketplace</p>
            <h3 style={statValueStyle}>Trade</h3>
            <p style={statTextStyle}>Product sourcing</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Network</p>
            <h3 style={statValueStyle}>SADC</h3>
            <p style={statTextStyle}>Regional supply</p>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={formTitleStyle}>🏢 Add Supplier</h2>

          <p style={formDescStyle}>
            Add supplier companies that can provide products, stock, materials,
            or marketplace goods.
          </p>

          <form onSubmit={createSupplier} style={formGridStyle}>
            <input
              type="text"
              placeholder="Supplier Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={inputStyle}
            />

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              style={{
                ...inputStyle,
                gridColumn: "1 / -1",
              }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <textarea
              placeholder="Supplier Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={textareaStyle}
            />

            <button type="submit" disabled={saving} style={submitButtonStyle}>
              {saving ? "Saving Supplier..." : "🏢 Add Supplier"}
            </button>
          </form>
        </section>

        <section style={{ ...cardStyle, marginTop: 24 }}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={formTitleStyle}>🤝 Registered Suppliers</h2>
              <p style={formDescStyle}>
                Supplier companies connected to your NamLogix marketplace.
              </p>
            </div>

            <button onClick={fetchSuppliers} style={smallButtonStyle}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={emptyTextStyle}>Loading suppliers...</p>
          ) : suppliers.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={{ fontSize: 44 }}>🏢</div>
              <h3 style={{ margin: "12px 0 6px", fontSize: 24 }}>
                No suppliers yet
              </h3>
              <p style={{ color: "#64748b", margin: 0 }}>
                Add your first supplier above to start building the marketplace
                supply network.
              </p>
            </div>
          ) : (
            <div style={gridStyle}>
              {suppliers.map((supplier) => (
                <article key={supplier.id} style={itemCardStyle}>
                  <div style={cardTopStyle}>
                    <div>
                      <h3 style={itemTitleStyle}>{supplier.name}</h3>
                      <p style={itemSubStyle}>
                        {supplier.category || "General Supplier"}
                      </p>
                    </div>

                    <span
                      style={
                        supplier.status === "active"
                          ? activeBadgeStyle
                          : inactiveBadgeStyle
                      }
                    >
                      {supplier.status || "active"}
                    </span>
                  </div>

                  <div style={detailGridStyle}>
                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Contact</p>
                      <p style={detailValueStyle}>
                        {supplier.contact_name || "-"}
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Phone</p>
                      <p style={detailValueStyle}>{supplier.phone || "-"}</p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Email</p>
                      <p style={detailValueStyle}>{supplier.email || "-"}</p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Location</p>
                      <p style={detailValueStyle}>
                        {supplier.location || "-"}
                      </p>
                    </div>
                  </div>

                  {supplier.description && (
                    <p style={descriptionBoxStyle}>{supplier.description}</p>
                  )}

                  <div style={actionsStyle}>
                    <Link href="/admin/dashboard" style={buttonBlueSmall}>
                      Add Products
                    </Link>

                    <button
                      onClick={() => deleteSupplier(supplier.id)}
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