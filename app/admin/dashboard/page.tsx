// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    unit: "",
    status: "active",
    supplier: "",
    stock_level: "",
    image_url: "",
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    checkUser();
    fetchProducts();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) router.push("/login");
  }

  async function fetchProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to fetch: " + error.message);
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

    if (!form.name) {
      alert("Product name is required");
      return;
    }

    const toInsert = {
      ...form,
      stock_level: Number(form.stock_level) || 0,
    };

    const { error } = await supabase.from("products").insert([toInsert]);

    if (error) {
      alert("Failed to create product: " + error.message);
    } else {
      setForm({
        name: "",
        category: "",
        description: "",
        unit: "",
        status: "active",
        supplier: "",
        stock_level: "",
        image_url: "",
      });

      fetchProducts();
    }
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
        stock_level: Number(product.stock_level) || 0,
        image_url: product.image_url || "",
      })
      .eq("id", product.id);

    if (error) {
      alert("Failed to update product: " + error.message);
    } else {
      setSelectedProduct(null);
      fetchProducts();
    }
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

  const outOfStock = products.filter(
    (p) => Number(p.stock_level || 0) === 0
  ).length;

  const lowStockProducts = products.filter(
    (p) => Number(p.stock_level || 0) <= 10 && Number(p.stock_level || 0) > 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - same homepage style */}
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
            Inventory Control Center
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
            Inventory Intelligence
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
            Manage products, stock levels, suppliers, warehouse readiness, and
            trade operations from one central dashboard.
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
              href="#add-product"
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
              📦 Add Product
            </a>

            <Link
              href="/admin/suppliers"
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
              👥 Suppliers
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
              [products.length, "Products listed"],
              [totalStock, "Total stock"],
              [activeProducts, "Active products"],
              [outOfStock, "Out of stock"],
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-xl border border-white/10 bg-[#0a1628] p-4">
              <p className="text-xs text-slate-500">Inventory</p>
              <p className="text-sm text-slate-200 mt-1">Stock control</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0a1628] p-4">
              <p className="text-xs text-slate-500">Procurement</p>
              <p className="text-sm text-slate-200 mt-1">Supplier ready</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0a1628] p-4">
              <p className="text-xs text-slate-500">Alerts</p>
              <p className="text-sm text-slate-200 mt-1">
                {lowStockProducts.length} low stock
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0a1628] p-4">
              <p className="text-xs text-slate-500">Platform</p>
              <p className="text-sm text-slate-200 mt-1">Admin only</p>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Add Product Form */}
        <div id="add-product" className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Add New Product</h2>

          <p className="text-gray-500 mb-5">
            Add products into your NamLogix inventory and connect them to
            suppliers, stock levels, and future marketplace orders.
          </p>

          <form className="space-y-3" onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Product Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />

            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="border rounded-lg px-3 py-2"
              />

              <input
                type="text"
                placeholder="Unit (kg, box...)"
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="border rounded-lg px-3 py-2"
              />
            </div>

            <textarea
              placeholder="Description"
              value={form.description || ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />

            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Stock Level"
                value={form.stock_level}
                onChange={(e) =>
                  setForm({ ...form, stock_level: e.target.value })
                }
                className="border rounded-lg px-3 py-2"
              />

              <input
                type="text"
                placeholder="Supplier"
                value={form.supplier}
                onChange={(e) =>
                  setForm({ ...form, supplier: e.target.value })
                }
                className="border rounded-lg px-3 py-2"
              />
            </div>

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Product Image
              </label>

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
                className="w-full border rounded-lg px-3 py-2"
              />

              {uploading && (
                <p className="text-sm text-blue-500 mt-1">Uploading...</p>
              )}

              {form.image_url && (
                <img
                  src={form.image_url}
                  alt="Preview"
                  className="mt-2 h-20 w-20 object-cover rounded-lg"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
            >
              Create Product
            </button>
          </form>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">⚠️ Low Stock Monitor</h2>

          {lowStockProducts.length === 0 ? (
            <p className="text-gray-500">No low stock products.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-yellow-200 bg-yellow-50 p-4"
                >
                  <p className="font-semibold text-yellow-900">{p.name}</p>
                  <p className="text-sm text-yellow-700">
                    {p.stock_level} units left
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product List */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">📦 Product Inventory</h2>
              <p className="text-sm text-gray-500">
                Products currently registered in your NamLogix platform.
              </p>
            </div>

            <button
              onClick={fetchProducts}
              className="bg-gray-100 px-5 py-2 rounded-lg hover:bg-gray-200"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500 border border-dashed rounded-xl p-8">
              No products yet. Add your first product above.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-lg transition"
                >
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-40 w-full object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="h-40 w-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm mb-4">
                      No image
                    </div>
                  )}

                  <h3 className="text-lg font-semibold">{product.name}</h3>

                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {product.category && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    )}

                    {product.unit && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {product.unit}
                      </span>
                    )}

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        product.status === "active"
                          ? "bg-green-50 text-green-600"
                          : product.status === "out_of_stock"
                          ? "bg-red-50 text-red-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {product.status || "active"}
                    </span>
                  </div>

                  <div className="mt-4 text-sm text-gray-600">
                    Stock: {product.stock_level || 0}
                  </div>

                  {product.supplier && (
                    <div className="text-xs text-gray-400 mt-1">
                      Supplier: {product.supplier}
                    </div>
                  )}

                  {selectedProduct && selectedProduct.id === product.id ? (
                    <div className="mt-4 border-t pt-4 space-y-3">
                      <input
                        type="text"
                        value={selectedProduct.name || ""}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            name: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg px-3 py-2"
                      />

                      <textarea
                        value={selectedProduct.description || ""}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            description: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg px-3 py-2"
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          value={selectedProduct.stock_level || 0}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              stock_level: e.target.value,
                            })
                          }
                          className="border rounded-lg px-3 py-2"
                        />

                        <input
                          type="text"
                          value={selectedProduct.supplier || ""}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              supplier: e.target.value,
                            })
                          }
                          className="border rounded-lg px-3 py-2"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(selectedProduct)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => setSelectedProduct(null)}
                          className="bg-gray-100 px-4 py-2 rounded-lg text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 mt-5">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}