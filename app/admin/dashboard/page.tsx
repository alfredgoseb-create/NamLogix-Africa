// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";

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
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyProductForm);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkUser();
    fetchProducts();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login");
    }
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

    const toInsert = {
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

  const outOfStock = products.filter(
    (p) => Number(p.stock_level || 0) === 0
  ).length;

  const lowStockProducts = products.filter(
    (p) => Number(p.stock_level || 0) <= 10 && Number(p.stock_level || 0) > 0
  );

  const totalValue = products.reduce(
    (acc, p) => acc + Number(p.price || 0) * Number(p.stock_level || 0),
    0
  );

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Inventory Control Center"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Inventory Intelligence"
        description="Manage products, prices, stock levels, suppliers, warehouses, and marketplace inventory from one central dashboard."
        actions={[
          {
            label: "📦 Add Product",
            href: "#add-product",
            primary: true,
          },
          {
            label: "👥 Suppliers",
            href: "/admin/suppliers",
          },
          {
            label: "🏭 Warehouses",
            href: "/admin/warehouses",
          },
          {
            label: "🛒 Store",
            href: "/store",
          },
        ]}
        stats={[
          {
            value: products.length,
            label: "Products listed",
          },
          {
            value: totalStock,
            label: "Total stock",
          },
          {
            value: activeProducts,
            label: "Active products",
          },
          {
            value: `N$${totalValue}`,
            label: "Stock value",
          },
        ]}
        infoCards={[
          {
            title: "Inventory",
            text: "Stock control",
          },
          {
            title: "Marketplace",
            text: "Store listings",
          },
          {
            title: "Suppliers",
            text: "Product sourcing",
          },
          {
            title: "Warehouses",
            text: "Storage tracking",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Products"
            value={products.length}
            subtitle="Registered inventory items"
            color="blue"
          />

          <DashboardCard
            title="Total Stock"
            value={totalStock}
            subtitle="Units in inventory"
            color="green"
          />

          <DashboardCard
            title="Low Stock"
            value={lowStockProducts.length}
            subtitle="Needs attention"
            color="orange"
          />

          <DashboardCard
            title="Stock Value"
            value={`N$${totalValue}`}
            subtitle="Estimated inventory value"
            color="red"
          />
        </div>

        <AppCard id="add-product" className="mb-8" variant="blue">
          <SectionHeader
            title="📦 Add New Product"
            subtitle="Add products into your NamLogix inventory, connect them to suppliers and warehouses, and show them in the public store."
          />

          <form className="grid md:grid-cols-2 gap-4" onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Product Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border rounded-xl px-4 py-3 md:col-span-2"
            />

            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Unit (kg, box, item...)"
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Stock Level"
              value={form.stock_level}
              onChange={(e) =>
                setForm({ ...form, stock_level: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Price NAD"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Supplier"
              value={form.supplier}
              onChange={(e) => setForm({ ...form, supplier: e.target.value })}
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Warehouse"
              value={form.warehouse}
              onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
              className="border rounded-xl px-4 py-3"
            />

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="border rounded-xl px-4 py-3 md:col-span-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            <textarea
              placeholder="Product Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border rounded-xl px-4 py-3 md:col-span-2 min-h-32"
            />

            <div className="md:col-span-2">
              <label className="text-sm text-gray-500 mb-2 block">
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
                      setForm({
                        ...form,
                        image_url: url,
                      });
                    }
                  }
                }}
                className="w-full border rounded-xl px-4 py-3 bg-white"
              />

              {uploading && (
                <p className="text-sm text-blue-600 mt-2">Uploading...</p>
              )}

              {form.image_url && (
                <img
                  src={form.image_url}
                  alt="Preview"
                  className="mt-3 h-24 w-24 object-cover rounded-xl"
                />
              )}
            </div>

            <div className="md:col-span-2">
              <Button type="submit" variant="orange" fullWidth>
                {saving ? "Creating Product..." : "📦 Create Product"}
              </Button>
            </div>
          </form>
        </AppCard>

        <AppCard className="mb-8" variant="orange">
          <SectionHeader
            title="⚠️ Low Stock Monitor"
            subtitle="Products with 10 units or fewer will appear here."
          />

          {lowStockProducts.length === 0 ? (
            <EmptyState
              icon="✅"
              title="No low stock products"
              message="Your inventory is currently healthy."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockProducts.map((p) => (
                <AppCard key={p.id} hover>
                  <p className="font-bold text-lg">{p.name}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {p.stock_level} units left
                  </p>
                </AppCard>
              ))}
            </div>
          )}
        </AppCard>

        <AppCard variant="green">
          <SectionHeader
            title="📦 Product Inventory"
            subtitle="Products currently registered in your NamLogix platform."
            action={
              <button
                onClick={fetchProducts}
                className="bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800"
              >
                Refresh
              </button>
            }
          />

          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <EmptyState
              icon="📦"
              title="No products yet"
              message="Add your first product above to start building your NamLogix inventory and marketplace store."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <AppCard key={product.id} hover>
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-44 w-full object-cover rounded-xl mb-4"
                    />
                  ) : (
                    <div className="h-44 w-full rounded-xl mb-4 bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center text-5xl">
                      📦
                    </div>
                  )}

                  <div className="flex justify-between gap-4 mb-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {product.category || "General"}
                    </span>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        product.status === "active"
                          ? "bg-green-100 text-green-700"
                          : product.status === "out_of_stock"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {product.status || "active"}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg">{product.name}</h3>

                  <p className="text-sm text-gray-500 mt-2 leading-6">
                    {product.description || "No description added."}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Stock</p>
                      <p className="font-semibold">
                        {product.stock_level || 0}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Price</p>
                      <p className="font-semibold">N${product.price || 0}</p>
                    </div>
                  </div>

                  {product.supplier && (
                    <p className="text-xs text-gray-400 mt-3">
                      Supplier: {product.supplier}
                    </p>
                  )}

                  {product.warehouse && (
                    <p className="text-xs text-gray-400 mt-1">
                      Warehouse: {product.warehouse}
                    </p>
                  )}

                  {selectedProduct && selectedProduct.id === product.id ? (
                    <div className="mt-5 border-t pt-4 space-y-3">
                      <input
                        type="text"
                        value={selectedProduct.name || ""}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            name: e.target.value,
                          })
                        }
                        className="w-full border rounded-xl px-4 py-3"
                      />

                      <textarea
                        value={selectedProduct.description || ""}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            description: e.target.value,
                          })
                        }
                        className="w-full border rounded-xl px-4 py-3"
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
                          className="border rounded-xl px-4 py-3"
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
                          className="border rounded-xl px-4 py-3"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={selectedProduct.supplier || ""}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              supplier: e.target.value,
                            })
                          }
                          className="border rounded-xl px-4 py-3"
                        />

                        <input
                          type="text"
                          value={selectedProduct.warehouse || ""}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              warehouse: e.target.value,
                            })
                          }
                          className="border rounded-xl px-4 py-3"
                        />
                      </div>

                      <select
                        value={selectedProduct.status || "active"}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            status: e.target.value,
                          })
                        }
                        className="w-full border rounded-xl px-4 py-3"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="out_of_stock">Out of Stock</option>
                      </select>

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="primary"
                          onClick={() => handleUpdate(selectedProduct)}
                        >
                          Save
                        </Button>

                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setSelectedProduct(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 mt-5">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setSelectedProduct(product)}
                      >
                        Edit
                      </Button>

                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </AppCard>
              ))}
            </div>
          )}
        </AppCard>
      </div>
    </div>
  );
}