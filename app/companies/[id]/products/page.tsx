// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageHero from "@/app/components/PageHero";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import { supabase } from "@/lib/supabaseClient";

export default function CompanyProductsPage() {
  const params = useParams();
  const companyId = params.id;

  const [company, setCompany] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [companyId]);

  async function fetchData() {
    setLoading(true);

    const { data: companyData } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", companyId)
      .single();

    setCompany(companyData);

    const { data: productData } = await supabase
      .from("products")
      .select("*")
      .eq("owner_id", companyId)
      .order("created_at", { ascending: false });

    setProducts(productData || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen page-soft-bg flex items-center justify-center">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Company Products"
        titleTop={company?.company_name || "Company"}
        titleHighlight="AFRICA"
        titleBottom="Marketplace Products"
        description="Products listed by this company on the NamLogix Africa marketplace."
        actions={[
          {
            label: "Company Profile",
            href: `/companies/${companyId}`,
            primary: true,
          },
          {
            label: "Marketplace",
            href: "/store",
          },
        ]}
        stats={[
          { value: products.length, label: "Products" },
          { value: "Live", label: "Marketplace" },
          { value: company?.role || "Business", label: "Role" },
          { value: "B2B", label: "Trade" },
        ]}
        infoCards={[
          { title: "Inventory", text: "Company stock" },
          { title: "Marketplace", text: "Public products" },
          { title: "Trade", text: "Regional commerce" },
          { title: "Logistics", text: "Integrated shipping" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <AppCard variant="blue">
          <SectionHeader
            title="🛒 Company Marketplace Products"
            subtitle="Products created by this company."
          />

          {products.length === 0 ? (
            <EmptyState
              icon="🛒"
              title="No products yet"
              message="This company has not listed products yet."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <AppCard key={product.id} hover>
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-48 w-full object-cover rounded-2xl mb-4"
                    />
                  ) : (
                    <div className="h-48 rounded-2xl bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center text-5xl mb-4">
                      📦
                    </div>
                  )}

                  <div className="flex justify-between mb-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {product.category || "General"}
                    </span>

                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {product.stock_level || 0} stock
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-gray-900">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 leading-6">
                    {product.description || "No description added."}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400">Price</p>
                      <p className="font-bold">N${product.price || 0}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400">Unit</p>
                      <p className="font-bold">{product.unit || "item"}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Button href="/contact" variant="orange" fullWidth>
                      Request Product
                    </Button>
                  </div>
                </AppCard>
              ))}
            </div>
          )}
        </AppCard>
      </div>
    </div>
  );
}