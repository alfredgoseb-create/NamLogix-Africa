// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";

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
      alert("Failed to fetch: " + error.message);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  async function handleImageUpload(file) {
    const fileName =
      Date.now() +
      "-" +
      file.name.replace(/[^a-zA-Z0-9.-]/g, "_");

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

    const { error } = await supabase
      .from("products")
      .insert([toInsert]);

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

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

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

  const activeProducts = products.filter(
    (p) => p.status === "active"
  ).length;

  const outOfStock = products.filter(
    (p) => Number(p.stock_level || 0) === 0
  ).length;

  const lowStockProducts = products.filter(
    (p) =>
      Number(p.stock_level || 0) <= 10 &&
      Number(p.stock_level || 0) > 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        badge="Inventory Control Center"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Inventory Intelligence"
        description="Manage products, stock levels, suppliers, warehouse readiness, and trade operations from one central dashboard."
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
            label: "🛒 Store",
            href: "/store",
          },
          {
            label: "🏭 Warehouses",
            href: "/warehouses",
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
            value: outOfStock,
            label: "Out of stock",
          },
        ]}
        infoCards={[
          {
            title: "Inventory",
            text: "Stock control",
          },
          {
            title: "Procurement",
            text: "Supplier ready",
          },
          {
            title: "Alerts",
            text: `${lowStockProducts.length} low stock`,
          },
          {
            title: "Platform",
            text: "Admin only",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ANALYTICS CARDS */}
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
            title="Active Products"
            value={activeProducts}
            subtitle="Operational inventory"
            color="orange"
          />

          <DashboardCard
            title="Out of Stock"
            value={outOfStock}
            subtitle="Needs replenishment"
            color="red"
          />
        </div>

        {/* ADD PRODUCT */}
        <div
          id="add-product"
          className="bg-white rounded-xl shadow p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-2">
            Add New Product
          </h2>

          <p className="text-gray-500 mb-5">
            Add products into your NamLogix inventory and
            connect them to suppliers, stock levels, and
            future marketplace orders.
          </p>

          <form
            className="space-y-3"
            onSubmit={handleCreate}
          >
            <input
              type="text"
              placeholder="Product Name *"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2"
            />

            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
                className="border rounded-lg px-3 py-2"
              />

              <input
                type="text"
                placeholder="Unit (kg, box...)"
                value={form.unit}
                onChange={(e) =>
                  setForm({
                    ...form,
                    unit: e.target.value,
                  })
                }
                className="border rounded-lg px-3 py-2"
              />
            </div>

            <textarea
              placeholder="Description"
              value={form.description || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2"
            />

            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Stock Level"
                value={form.stock_level}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stock_level: e.target.value,
                  })
                }
                className="border rounded-lg px-3 py-2"
              />

              <input
                type="text"
                placeholder="Supplier"
                value={form.supplier}
                onChange={(e) =>
                  setForm({
                    ...form,
                    supplier: e.target.value,
                  })
                }
                className="border rounded-lg px-3 py-2"
              />
            </div>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out_of_stock">
                Out of Stock
              </option>
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
                    const url =
                      await handleImageUpload(file);

                    if (url) {
                      setForm({
                        ...form,
                        image_url: url,
                      });
                    }
                  }
                }}
                className="w-full border rounded-lg px-3 py-2"
              />

              {uploading && (
                <p className="text-sm text-blue-500 mt-1">
                  Uploading...
                </p>
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
      </div>
    </div>
  );
}