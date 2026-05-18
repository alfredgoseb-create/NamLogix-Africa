// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageHero from "@/app/components/PageHero";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";
import SectionHeader from "@/app/components/SectionHeader";
import { supabase } from "@/lib/supabaseClient";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  async function fetchProduct() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error) {
      alert("Failed to load product: " + error.message);
      setLoading(false);
      return;
    }

    setProduct(data);

    if (data?.owner_id) {
      const { data: companyData } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", data.owner_id)
        .single();

      setCompany(companyData);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen page-soft-bg flex items-center justify-center">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen page-soft-bg flex items-center justify-center px-6">
        <AppCard>
          <h1 className="text-2xl font-black text-gray-900">
            Product not found
          </h1>

          <div className="mt-6">
            <Button href="/store" variant="primary">
              Back to Store
            </Button>
          </div>
        </AppCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Product Details"
        titleTop={product.name}
        titleHighlight="AFRICA"
        titleBottom={product.category || "Marketplace Product"}
        description={
          product.description ||
          "View this marketplace product and connect with the listed company."
        }
        actions={[
          { label: "Back to Store", href: "/store", primary: true },
          { label: "Companies", href: "/companies" },
          { label: "Post Cargo", href: "/request-cargo" },
        ]}
        stats={[
          { value: `N$${product.price || 0}`, label: "Price" },
          { value: product.stock_level || 0, label: "Stock" },
          { value: product.unit || "item", label: "Unit" },
          { value: product.status || "active", label: "Status" },
        ]}
        infoCards={[
          { title: "Seller", text: product.owner_company || "Company" },
          { title: "Category", text: product.category || "General" },
          { title: "Warehouse", text: product.warehouse || "Not added" },
          { title: "Supplier", text: product.supplier || "Not added" },
        ]}
      />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <AppCard variant="blue">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-96 object-cover rounded-3xl"
              />
            ) : (
              <div className="w-full h-96 rounded-3xl bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center text-7xl">
                📦
              </div>
            )}
          </AppCard>

          <AppCard variant="orange">
            <SectionHeader
              title="🛒 Product Information"
              subtitle="Marketplace listing details."
            />

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Product Name</p>
                <h1 className="text-3xl font-black text-gray-900">
                  {product.name}
                </h1>
              </div>

              <p className="text-gray-600 leading-7">
                {product.description || "No description added."}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400">Price</p>
                  <p className="font-black text-xl">N${product.price || 0}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400">Stock</p>
                  <p className="font-black text-xl">
                    {product.stock_level || 0}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400">Unit</p>
                  <p className="font-bold">{product.unit || "item"}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400">Category</p>
                  <p className="font-bold">{product.category || "General"}</p>
                </div>
              </div>

              <div className="grid gap-3 pt-4">
                <Button href="/contact" variant="orange" fullWidth>
                  Request This Product
                </Button>

                {product.owner_id && (
                  <Button
                    href={`/companies/${product.owner_id}`}
                    variant="outline"
                    fullWidth
                  >
                    View Seller Profile
                  </Button>
                )}
              </div>
            </div>
          </AppCard>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <AppCard variant="green">
            <SectionHeader
              title="🏢 Seller Information"
              subtitle="Company connected to this product."
            />

            <div className="flex items-center gap-4">
              {company?.logo_url ? (
                <img
                  src={company.logo_url}
                  alt={company.company_name || "Seller logo"}
                  className="h-20 w-20 rounded-2xl object-cover border bg-white"
                />
              ) : (
                <div className="h-20 w-20 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl">
                  🏢
                </div>
              )}

              <div>
                <h3 className="text-xl font-black text-gray-900">
                  {company?.company_name ||
                    product.owner_company ||
                    product.supplier ||
                    "NamLogix Company"}
                </h3>

                <p className="text-sm text-gray-500">
                  {company?.role || "Marketplace seller"}
                </p>
              </div>
            </div>

            {product.owner_id && (
              <div className="mt-6">
                <Button
                  href={`/companies/${product.owner_id}/products`}
                  variant="primary"
                  fullWidth
                >
                  More Products From Seller
                </Button>
              </div>
            )}
          </AppCard>

          <AppCard variant="blue">
            <SectionHeader
              title="🚚 Logistics Options"
              subtitle="Use NamLogix to move this product."
            />

            <div className="space-y-3 text-sm text-gray-600">
              <p>✅ Request product from seller</p>
              <p>✅ Post cargo for delivery</p>
              <p>✅ Find transporters and trade routes</p>
              <p>✅ Connect warehouse stock with logistics</p>
            </div>

            <div className="mt-6">
              <Button href="/request-cargo" variant="orange" fullWidth>
                Arrange Delivery
              </Button>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}