// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

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

export default function Dashboard() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyProductForm);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkUserAndLoad();
  }, []);

  async function checkUserAndLoad() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login");
      return;
    }

    const { data: profileData } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    setProfile(profileData);
    fetchProducts();
  }

  async function fetchProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to fetch products: " + error.message);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  async function handleImageUpload(file) {
    const fileName =
      Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.-]/g, "_");

    setUploading(true);

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    setUploading(false);

    if (error) {
      alert("Upload failed: " + error.message);
      return null;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleCreate(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Product name is required.");
      return;
    }

    setSaving(true);

    const { data: authData } = await supabase.auth.getUser();

    const toInsert = {
      owner_id: authData.user?.id,
      owner_company:
        profile?.company_name || profile?.full_name || "NamLogix Company",
      name: form.name,
      category: form.category,
      description: form.description,
      unit: form.unit,
      status: form.status || "active",
      supplier: form.supplier,
      warehouse: form.warehouse,
      stock_level: Number(form.stock_level) || 0,
      price: Number(form.price) || 0,
      image_url: form.image_url,
    };

    const { error } = await supabase.from("products").insert([toInsert]);

    setSaving(false);

    if (error) {
      alert("Failed to create product: " + error.message);
      return;
    }

    alert("Product created successfully.");
    setForm(emptyProductForm);
    fetchProducts();
  }

  async function handleUpdate(product) {
    const { error } = await supabase
      .from("products")
      .update({
        name: product.name || "",
        category: product.category || "",
        description: product.description || "",
        unit: product.unit || "",
        status: product.status || "active",
        supplier: product.supplier || "",
        warehouse: product.warehouse || "",
        stock_level: Number(product.stock_level) || 0,
        price: Number(product.price) || 0,
        image_url: product.image_url || "",
      })
      .eq("id", product.id);

    if (error) {
      alert("Failed to update product: " + error.message);
      return;
    }

    alert("Product updated.");
    setSelectedProduct(null);
    fetchProducts();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      alert("Failed to delete product: " + error.message);
    } else {
      fetchProducts();
    }
  }

  const totalStock = products.reduce(
    (acc, p) => acc + Number(p.stock_level || 0),
    0
  );

  const activeProducts = products.filter((p) => p.status === "active").length;

  const lowStockProducts = products.filter(
    (p) => Number(p.stock_level || 0) <= 10 && Number(p.stock_level || 0) > 0
  );

  const totalValue = products.reduce(
    (acc, p) => acc + Number(p.price || 0) * Number(p.stock_level || 0),
    0
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fc", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <section style={heroStyle}>
          <p style={{ color: "#fed7aa", fontWeight: 800 }}>
            INVENTORY CONTROL CENTER
          </p>

          <h1 style={{ fontSize: 42, fontWeight: 900, margin: "10px 0" }}>
            NamLogix AFRICA Inventory Intelligence
          </h1>

          <p style={{ maxWidth: 760, lineHeight: 1.7 }}>
            Manage products, prices, stock levels, suppliers, warehouses, and marketplace inventory from one central dashboard.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <a href="#add-product" style={buttonOrange}>📦 Add Product</a>
            <Link href="/admin/suppliers" style={buttonPrimary}>👥 Suppliers</Link>
            <Link href="/admin/warehouses" style={buttonSecondary}>🏭 Warehouses</Link>
            <Link href="/store" style={buttonSecondary}>🛒 Store</Link>
          </div>
        </section>

        <section style={statsGrid}>
          <StatCard title="Products" value={products.length} subtitle="Registered inventory items" />
          <StatCard title="Total Stock" value={totalStock} subtitle="Units in inventory" />
          <StatCard title="Low Stock" value={lowStockProducts.length} subtitle="Needs attention" />
          <StatCard title="Stock Value" value={`N$${totalValue}`} subtitle="Estimated inventory value" />
        </section>

        <section id="add-product" style={cardStyle}>
          <h2 style={sectionTitle}>📦 Add New Product</h2>

          <p style={{ color: "#64748b", marginTop: 8 }}>
            Products added here will belong to{" "}
            <strong>
              {profile?.company_name || profile?.full_name || "your company profile"}
            </strong>.
          </p>

          <form onSubmit={handleCreate} style={formGrid}>
            <input
              type="text"
              placeholder="Product Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ ...inputStyle, gridColumn: "1 / -1" }}
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
              placeholder="Unit (kg, box, item...)"
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Stock Level"
              value={form.stock_level}
              onChange={(e) => setForm({ ...form, stock_level: e.target.value })}
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
              style={{ ...inputStyle, gridColumn: "1 / -1" }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            <textarea
              placeholder="Product Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{
                ...inputStyle,
                gridColumn: "1 / -1",
                minHeight: 120,
                resize: "vertical",
              }}
            />

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Product Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    const url = await handleImageUpload(file);

                    if (url) {
                      setForm({ ...form, image_url: url });
                    }
                  }
                }}
                style={inputStyle}
              />

              {uploading && (
                <p style={{ color: "#2563eb", fontSize: 14 }}>
                  Uploading image...
                </p>
              )}

              {form.image_url && (
                <img
                  src={form.image_url}
                  alt="Preview"
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 16,
                    marginTop: 14,
                    border: "1px solid #e5e7eb",
                  }}
                />
              )}
            </div>

            <button
              type="submit"
              disabled={saving}
              style={{
                ...buttonOrange,
                border: "none",
                cursor: "pointer",
                gridColumn: "1 / -1",
              }}
            >
              {saving ? "Creating Product..." : "📦 Create Product"}
            </button>
          </form>
        </section>

        <section style={{ ...cardStyle, marginTop: 24 }}>
          <h2 style={sectionTitle}>⚠️ Low Stock Monitor</h2>

          <p style={{ color: "#64748b", marginTop: 8 }}>
            Products with 10 units or fewer will appear here.
          </p>

          {lowStockProducts.length === 0 ? (
            <div style={emptyBox}>
              <div style={{ fontSize: 48 }}>✅</div>
              <h3>No low stock products</h3>
              <p>Your inventory is currently healthy.</p>
            </div>
          ) : (
            <div style={productGrid}>
              {lowStockProducts.map((p) => (
                <div key={p.id} style={smallCard}>
                  <h3 style={{ margin: 0 }}>{p.name}</h3>
                  <p style={{ color: "#64748b" }}>{p.stock_level} units left</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={{ ...cardStyle, marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
            <div>
              <h2 style={sectionTitle}>📦 Product Inventory</h2>
              <p style={{ color: "#64748b", marginTop: 8 }}>
                Products currently registered in your NamLogix platform.
              </p>
            </div>

            <button onClick={fetchProducts} style={refreshButton}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <div style={emptyBox}>
              <div style={{ fontSize: 48 }}>📦</div>
              <h3>No products yet</h3>
              <p>Add your first product above to start building your inventory.</p>
            </div>
          ) : (
            <div style={productGrid}>
              {products.map((product) => (
                <div key={product.id} style={productCard}>
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: 150,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div style={placeholderImage}>📦</div>
                  )}

                  <div style={{ padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 12 }}>
                      <span style={categoryPill}>
                        {product.category || "General"}
                      </span>

                      <span style={stockPill}>
                        {product.status || "active"}
                      </span>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 900, margin: "0 0 8px" }}>
                      {product.name}
                    </h3>

                    <p style={{ color: "#64748b", fontSize: 14, lineHeight: "20px", minHeight: 40 }}>
                      {product.description || "No description added."}
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
                      <InfoBox label="Stock" value={product.stock_level || 0} />
                      <InfoBox label="Price" value={`N$${product.price || 0}`} />
                    </div>

                    <p style={{ color: "#64748b", fontSize: 13, marginTop: 12 }}>
                      Owner:{" "}
                      <strong>
                        {product.owner_company || "Company"}
                      </strong>
                    </p>

                    {selectedProduct && selectedProduct.id === product.id ? (
                      <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
                        <input
                          type="text"
                          value={selectedProduct.name || ""}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              name: e.target.value,
                            })
                          }
                          style={inputStyle}
                        />

                        <textarea
                          value={selectedProduct.description || ""}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              description: e.target.value,
                            })
                          }
                          style={inputStyle}
                        />

                        <input
                          type="number"
                          value={selectedProduct.stock_level || 0}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              stock_level: e.target.value,
                            })
                          }
                          style={inputStyle}
                        />

                        <input
                          type="number"
                          value={selectedProduct.price || 0}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              price: e.target.value,
                            })
                          }
                          style={inputStyle}
                        />

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                          <button
                            type="button"
                            onClick={() => handleUpdate(selectedProduct)}
                            style={{
                              ...buttonPrimary,
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Save
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedProduct(null)}
                            style={{
                              ...buttonSecondary,
                              border: "1px solid #bfdbfe",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(product)}
                          style={{
                            ...buttonPrimary,
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          style={{
                            ...buttonDanger,
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <div style={statCard}>
      <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>{title}</p>
      <p style={{ fontSize: 30, fontWeight: 900, margin: "6px 0 0" }}>
        {value}
      </p>
      <p style={{ color: "#94a3b8", fontSize: 13, margin: "4px 0 0" }}>
        {subtitle}
      </p>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div style={{ background: "#f8fafc", borderRadius: 14, padding: 12 }}>
      <p style={{ color: "#94a3b8", fontSize: 11, margin: 0 }}>{label}</p>
      <p style={{ fontWeight: 900, margin: "5px 0 0" }}>{value}</p>
    </div>
  );
}

const heroStyle = {
  background: "linear-gradient(135deg, #0b1220, #1e3a8a, #f97316)",
  color: "white",
  borderRadius: 28,
  padding: 36,
  marginBottom: 24,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 16,
  marginBottom: 24,
};

const statCard = {
  background: "white",
  borderRadius: 22,
  padding: 20,
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 22px rgba(15,23,42,0.06)",
};

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 24,
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
};

const smallCard = {
  background: "white",
  borderRadius: 18,
  padding: 18,
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
};

const sectionTitle = {
  fontSize: 28,
  fontWeight: 900,
  margin: 0,
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 16,
  marginTop: 24,
};

const inputStyle = {
  width: "100%",
  border: "1px solid #d1d5db",
  borderRadius: 14,
  padding: "13px 14px",
  fontSize: 15,
  background: "white",
};

const labelStyle = {
  display: "block",
  fontWeight: 800,
  color: "#374151",
  marginBottom: 8,
};

const productGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 22,
};

const productCard = {
  background: "white",
  borderRadius: 20,
  overflow: "hidden",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 22px rgba(15,23,42,0.08)",
};

const placeholderImage = {
  height: 150,
  background: "#dbeafe",
  display: "grid",
  placeItems: "center",
  fontSize: 46,
};

const emptyBox = {
  textAlign: "center",
  padding: 50,
  borderRadius: 20,
  background: "#f8fafc",
  color: "#64748b",
};

const refreshButton = {
  background: "white",
  border: "1px solid #d1d5db",
  borderRadius: 14,
  padding: "10px 16px",
  fontWeight: 800,
  cursor: "pointer",
};

const categoryPill = {
  background: "#ede9fe",
  color: "#6b21a8",
  padding: "5px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 800,
};

const stockPill = {
  background: "#dcfce7",
  color: "#166534",
  padding: "5px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 800,
};

const buttonPrimary = {
  background: "#1d4ed8",
  color: "white",
  padding: "11px 14px",
  borderRadius: 12,
  textAlign: "center",
  fontWeight: 800,
  textDecoration: "none",
  display: "block",
};

const buttonSecondary = {
  background: "white",
  color: "#1d4ed8",
  padding: "11px 14px",
  borderRadius: 12,
  textAlign: "center",
  fontWeight: 800,
  textDecoration: "none",
  display: "block",
};

const buttonOrange = {
  background: "#f97316",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  textAlign: "center",
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonDanger = {
  background: "#dc2626",
  color: "white",
  padding: "11px 14px",
  borderRadius: 12,
  textAlign: "center",
  fontWeight: 800,
  textDecoration: "none",
  display: "block",
};