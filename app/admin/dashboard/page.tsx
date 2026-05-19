// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const emptyProductForm = {
  name: "",
  category: "",
  description: "",
  unit: "",
  status: "active",
  supplier: "",
  warehouse: "",
  stock_level: "",
  price: "",
  image_url: "",
};

export default function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProductForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load products: " + error.message);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  async function createProduct(e) {
    e.preventDefault();

    if (!form.name) {
      alert("Product name is required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("products").insert([
      {
        ...form,
        stock_level: Number(form.stock_level) || 0,
        price: Number(form.price) || 0,
      },
    ]);

    setSaving(false);

    if (error) {
      alert("Failed to create product: " + error.message);
      return;
    }

    alert("Product added successfully.");
    setForm(emptyProductForm);
    fetchProducts();
  }

  async function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      alert("Failed to delete product: " + error.message);
    } else {
      fetchProducts();
    }
  }

  const activeProducts = products.filter((p) => p.status === "active").length;

  const totalStock = products.reduce(
    (sum, p) => sum + Number(p.stock_level || 0),
    0
  );

  const totalValue = products.reduce(
    (sum, p) => sum + Number(p.stock_level || 0) * Number(p.price || 0),
    0
  );

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>ADMIN CONTROL CENTER</p>

          <h1 style={titleStyle}>Inventory Dashboard</h1>

          <p style={descStyle}>
            Manage marketplace products, supplier items, warehouse inventory,
            prices, stock levels, and product visibility across NamLogix Africa.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/store" style={buttonOrange}>
              🛒 Public Store
            </Link>

            <Link href="/admin/inquiries" style={buttonBlue}>
              📩 Inquiries
            </Link>

            <Link href="/admin/transport" style={buttonWhite}>
              🚕 Transport
            </Link>
          </div>
        </section>

        <section style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Products</p>
            <h3 style={statValueStyle}>{products.length}</h3>
            <p style={statTextStyle}>Total inventory items</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Active</p>
            <h3 style={statValueStyle}>{activeProducts}</h3>
            <p style={statTextStyle}>Visible in store</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Stock</p>
            <h3 style={statValueStyle}>{totalStock}</h3>
            <p style={statTextStyle}>Total units</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Value</p>
            <h3 style={statValueStyle}>N${totalValue}</h3>
            <p style={statTextStyle}>Estimated stock value</p>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={formTitleStyle}>📦 Add Product</h2>

          <p style={formDescStyle}>
            Add products to your marketplace inventory and connect them to
            suppliers, warehouses, and store listings.
          </p>

          <form onSubmit={createProduct} style={formGridStyle}>
            <input
              type="text"
              placeholder="Product Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Unit"
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Stock Level"
              value={form.stock_level}
              onChange={(e) =>
                setForm({ ...form, stock_level: e.target.value })
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Price NAD"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Supplier"
              value={form.supplier}
              onChange={(e) => setForm({ ...form, supplier: e.target.value })}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Warehouse"
              value={form.warehouse}
              onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
              style={inputStyle}
            />

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              style={inputStyle}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            <input
              type="text"
              placeholder="Image URL"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              style={{
                ...inputStyle,
                gridColumn: "1 / -1",
              }}
            />

            <textarea
              placeholder="Product Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={textareaStyle}
            />

            <button type="submit" disabled={saving} style={submitButtonStyle}>
              {saving ? "Saving Product..." : "📦 Add Product"}
            </button>
          </form>
        </section>

        <section style={{ ...cardStyle, marginTop: 24 }}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={formTitleStyle}>🛒 Product Inventory</h2>
              <p style={formDescStyle}>
                Products currently registered on the NamLogix marketplace.
              </p>
            </div>

            <button onClick={fetchProducts} style={smallButtonStyle}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={emptyTextStyle}>Loading products...</p>
          ) : products.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={{ fontSize: 44 }}>📦</div>
              <h3 style={{ margin: "12px 0 6px", fontSize: 24 }}>
                No products yet
              </h3>
              <p style={{ color: "#64748b", margin: 0 }}>
                Add your first product above to start building your store.
              </p>
            </div>
          ) : (
            <div style={gridStyle}>
              {products.map((product) => (
                <article key={product.id} style={itemCardStyle}>
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      style={imageStyle}
                    />
                  ) : (
                    <div style={imageFallbackStyle}>📦</div>
                  )}

                  <div style={cardTopStyle}>
                    <div>
                      <h3 style={itemTitleStyle}>{product.name}</h3>
                      <p style={itemSubStyle}>
                        {product.category || "General"}
                      </p>
                    </div>

                    <span style={badgeProductStyle}>
                      {product.status || "active"}
                    </span>
                  </div>

                  <div style={detailGridStyle}>
                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Stock</p>
                      <p style={detailValueStyle}>
                        {product.stock_level || 0}
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Price</p>
                      <p style={detailValueStyle}>N${product.price || 0}</p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Supplier</p>
                      <p style={detailValueStyle}>{product.supplier || "-"}</p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Warehouse</p>
                      <p style={detailValueStyle}>
                        {product.warehouse || "-"}
                      </p>
                    </div>
                  </div>

                  {product.description && (
                    <p style={descriptionBoxStyle}>{product.description}</p>
                  )}

                  <div style={actionsStyle}>
                    <button
                      onClick={() => deleteProduct(product.id)}
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

const imageStyle = {
  width: "100%",
  height: 160,
  objectFit: "cover",
  borderRadius: 18,
  marginBottom: 16,
};

const imageFallbackStyle = {
  width: "100%",
  height: 160,
  borderRadius: 18,
  marginBottom: 16,
  background: "#f1f5f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 46,
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

const badgeProductStyle = {
  background: "#dcfce7",
  color: "#15803d",
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