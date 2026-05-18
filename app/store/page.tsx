// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import PageHero from "@/app/components/PageHero";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";
import { supabase } from "@/lib/supabaseClient";

const fallbackCategories = [
  {
    title: "Construction",
    desc: "Building materials, cement, steel, and industrial products.",
    icon: "🏗️",
  },
  {
    title: "Agriculture",
    desc: "Farm supplies, seeds, tools, and agricultural logistics.",
    icon: "🌾",
  },
  {
    title: "Mining",
    desc: "Mining equipment, machinery, and industrial support products.",
    icon: "⛏️",
  },
  {
    title: "Automotive",
    desc: "Vehicle parts, transport accessories, and fleet supplies.",
    icon: "🚛",
  },
  {
    title: "Retail",
    desc: "Consumer products, electronics, and general merchandise.",
    icon: "🛒",
  },
  {
    title: "Warehouse Goods",
    desc: "Products stored inside logistics and warehouse facilities.",
    icon: "🏭",
  },
];

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load products: " + error.message);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  const totalStock = products.reduce(
    (acc, product) => acc + Number(product.stock_level || 0),
    0
  );

  const categories = new Set(
    products.map((product) => product.category).filter(Boolean)
  ).size;

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Marketplace Store"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Trade Marketplace"
        description="Buy, sell, and manage products across Namibia and Southern Africa using the NamLogix marketplace infrastructure."
        actions={[
          { label: "🛒 Browse Products", href: "#products", primary: true },
          { label: "🏢 Companies", href: "/companies" },
          { label: "🏭 Warehouses", href: "/warehouses" },
          { label: "📦 Post Cargo", href: "/request-cargo" },
        ]}
        stats={[
          { value: products.length, label: "Products" },
          { value: totalStock, label: "Stock units" },
          { value: categories, label: "Categories" },
          { value: "Live", label: "Store status" },
        ]}
        infoCards={[
          { title: "Companies", text: "Business sellers" },
          { title: "Warehouses", text: "Inventory management" },
          { title: "Suppliers", text: "Regional businesses" },
          { title: "Logistics", text: "Delivery integration" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Products"
            value={products.length}
            subtitle="Active marketplace items"
            color="blue"
          />

          <DashboardCard
            title="Total Stock"
            value={totalStock}
            subtitle="Available inventory units"
            color="green"
          />

          <DashboardCard
            title="Categories"
            value={categories}
            subtitle="Product groups"
            color="orange"
          />

          <DashboardCard
            title="Status"
            value="Live"
            subtitle="Supabase connected"
            color="red"
          />
        </div>

        <AppCard className="mb-8" variant="orange">
          <SectionHeader
            title="⚡ Marketplace Actions"
            subtitle="Move between products, companies, logistics, and trade services."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button href="/companies" variant="orange" fullWidth>
              🏢 Companies
            </Button>

            <Button href="/request-cargo" variant="primary" fullWidth>
              📦 Post Cargo
            </Button>

            <Button href="/cargo-requests" variant="outline" fullWidth>
              🚚 Cargo Requests
            </Button>

            <Button href="/trade-routes" variant="outline" fullWidth>
              🛣️ Trade Routes
            </Button>
          </div>
        </AppCard>

        <AppCard id="products" className="mb-8" variant="blue">
          <SectionHeader
            title="🛒 Marketplace Products"
            subtitle="Products listed from company profiles, suppliers, inventory, and warehouse stock."
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
              icon="🛒"
              title="No products yet"
              message="Products added from the admin inventory dashboard will appear here in the public marketplace."
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
                      🛒
                    </div>
                  )}

                  <div className="flex justify-between gap-4 mb-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {product.category || "General"}
                    </span>

                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {product.stock_level || 0} in stock
                    </span>
                  </div>

                  <h3 className="font-bold text-lg">{product.name}</h3>

                  <p className="text-sm text-gray-500 mt-2 leading-6">
                    {product.description || "No product description added."}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Price</p>
                      <p className="font-semibold">N${product.price || 0}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Unit</p>
                      <p className="font-semibold">{product.unit || "item"}</p>
                    </div>
                  </div>

                  <div className="mt-4 bg-blue-50 rounded-xl p-3">
                    <p className="text-xs text-blue-500">Listed by</p>
                    <p className="font-bold text-blue-900">
                      {product.owner_company ||
                        product.supplier ||
                        "NamLogix Company"}
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-2">
                    <Button
                      href={`/products/${product.id}`}
                      variant="primary"
                      fullWidth
                    >
                      View Product
                    </Button>

                    {product.owner_id && (
                      <Button
                        href={`/companies/${product.owner_id}`}
                        variant="outline"
                        fullWidth
                      >
                        View Company
                      </Button>
                    )}

                    {product.owner_id && (
                      <Button
                        href={`/companies/${product.owner_id}/products`}
                        variant="primary"
                        fullWidth
                      >
                        More From Company
                      </Button>
                    )}

                    <Button href="/contact" variant="orange" fullWidth>
                      Request Product
                    </Button>
                  </div>
                </AppCard>
              ))}
            </div>
          )}
        </AppCard>

        <AppCard variant="green">
          <SectionHeader
            title="🏭 Marketplace Categories"
            subtitle="The NamLogix store can support multiple industries and trade sectors."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fallbackCategories.map((item) => (
              <AppCard key={item.title} hover>
                <div className="text-4xl mb-4">{item.icon}</div>

                <h3 className="font-semibold text-lg">{item.title}</h3>

                <p className="text-sm text-gray-500 mt-2 leading-6">
                  {item.desc}
                </p>
              </AppCard>
            ))}
          </div>
        </AppCard>
      </div>
    </div>
  );
}