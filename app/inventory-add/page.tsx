"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddInventoryPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    product_name: "",
    category: "",
    warehouse_name: "",
    supplier_name: "",
    stock_quantity: "",
    price: "",
    status: "in_stock",
    description: "",
  });

  function updateField(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    setMessage("");

    if (!form.product_name || !form.warehouse_name || !form.stock_quantity) {
      setMessage("Please fill in product name, warehouse name, and stock quantity.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("inventory_items").insert([
      {
        product_name: form.product_name,
        category: form.category,
        warehouse_name: form.warehouse_name,
        supplier_name: form.supplier_name,
        stock_quantity: form.stock_quantity,
        price: form.price ? Number(form.price) : null,
        status: form.status,
        description: form.description,
      },
    ]);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Inventory item added successfully.");
      setForm({
        product_name: "",
        category: "",
        warehouse_name: "",
        supplier_name: "",
        stock_quantity: "",
        price: "",
        status: "in_stock",
        description: "",
      });
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>ADD STOCK</p>
        <h1 style={titleStyle}>Add Inventory Item</h1>
        <p style={descStyle}>
          Add products or stock items stored in warehouses so they can later be
          sold, dispatched, and transported through NamLogix Africa.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/inventory-management" style={primaryButtonStyle}>
            Inventory Management
          </Link>

          <Link href="/warehouse-dashboard" style={secondaryButtonStyle}>
            Warehouse Dashboard
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <form style={formStyle}>
          <div style={gridStyle}>
            <label style={labelStyle}>
              Product Name
              <input
                style={inputStyle}
                value={form.product_name}
                onChange={(e) => updateField("product_name", e.target.value)}
                placeholder="Example: Cement Bags"
              />
            </label>

            <label style={labelStyle}>
              Category
              <input
                style={inputStyle}
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                placeholder="Construction, retail, hardware..."
              />
            </label>

            <label style={labelStyle}>
              Warehouse Name
              <input
                style={inputStyle}
                value={form.warehouse_name}
                onChange={(e) => updateField("warehouse_name", e.target.value)}
                placeholder="Example: Windhoek Storage Hub"
              />
            </label>

            <label style={labelStyle}>
              Supplier Name
              <input
                style={inputStyle}
                value={form.supplier_name}
                onChange={(e) => updateField("supplier_name", e.target.value)}
                placeholder="Supplier company name"
              />
            </label>

            <label style={labelStyle}>
              Stock Quantity
              <input
                style={inputStyle}
                value={form.stock_quantity}
                onChange={(e) => updateField("stock_quantity", e.target.value)}
                placeholder="250 units, 84 boxes..."
              />
            </label>

            <label style={labelStyle}>
              Price
              <input
                style={inputStyle}
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                placeholder="Example: 120"
                type="number"
              />
            </label>
          </div>

          <label style={labelStyle}>
            Status
            <select
              style={inputStyle}
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
            >
              <option value="in_stock">In Stock</option>
              <option value="ready_for_dispatch">Ready for Dispatch</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </label>

          <label style={labelStyle}>
            Description
            <textarea
              style={textareaStyle}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe the product, packaging, condition, or delivery needs."
            />
          </label>

          {message && <div style={messageStyle}>{message}</div>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={submitButtonStyle}
          >
            {loading ? "Saving..." : "Add Inventory Item"}
          </button>
        </form>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
};

const heroStyle = {
  padding: "90px 24px",
  textAlign: "center" as const,
  color: "white",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.92), rgba(249,115,22,0.88))",
};

const badgeStyle = {
  color: "#fdba74",
  fontWeight: 900,
  letterSpacing: 1,
};

const titleStyle = {
  fontSize: 54,
  fontWeight: 900,
  margin: "10px 0 14px",
};

const descStyle = {
  maxWidth: 850,
  margin: "0 auto",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  fontSize: 18,
};

const buttonRowStyle = {
  display: "flex",
  gap: 14,
  justifyContent: "center",
  flexWrap: "wrap" as const,
  marginTop: 30,
};

const primaryButtonStyle = {
  background: "#f97316",
  color: "white",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const secondaryButtonStyle = {
  background: "white",
  color: "#1d4ed8",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const containerStyle = {
  maxWidth: 1000,
  margin: "0 auto",
  padding: "60px 24px",
};

const formStyle = {
  background: "white",
  borderRadius: 30,
  padding: 30,
  border: "1px solid #e5e7eb",
  boxShadow: "0 14px 35px rgba(15,23,42,0.07)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 20,
};

const labelStyle = {
  display: "grid",
  gap: 8,
  color: "#0f172a",
  fontWeight: 900,
  marginBottom: 20,
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  fontSize: 15,
};

const textareaStyle = {
  width: "100%",
  minHeight: 130,
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  fontSize: 15,
};

const messageStyle = {
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  color: "#1d4ed8",
  padding: 16,
  borderRadius: 16,
  fontWeight: 900,
  marginBottom: 20,
};

const submitButtonStyle = {
  background: "#f97316",
  color: "white",
  border: "none",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};