// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageHero from "@/app/components/PageHero";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";
import SectionHeader from "@/app/components/SectionHeader";
import { supabase } from "@/lib/supabaseClient";

export default function CompanyDetailsPage() {
  const params = useParams();
  const companyId = params.id;

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, [companyId]);

  async function fetchCompany() {
    setLoading(true);

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", companyId)
      .single();

    if (error) {
      alert("Failed to load company: " + error.message);
    } else {
      setCompany(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen page-soft-bg flex items-center justify-center">
        Loading company profile...
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen page-soft-bg flex items-center justify-center px-6">
        <AppCard>
          <h1 className="text-2xl font-black text-gray-900">
            Company not found
          </h1>

          <p className="text-gray-500 mt-2">
            This company profile could not be loaded.
          </p>

          <div className="mt-6">
            <Button href="/companies" variant="primary">
              Back to Companies
            </Button>
          </div>
        </AppCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Company Profile"
        titleTop={company.company_name || company.full_name || "NamLogix"}
        titleHighlight="AFRICA"
        titleBottom={company.role || "Business Partner"}
        description="View this company's business identity, role, contact details, and platform presence on NamLogix Africa."
        actions={[
          { label: "Back to Companies", href: "/companies", primary: true },
          { label: "Contact", href: "/contact" },
          { label: "Marketplace", href: "/store" },
        ]}
        stats={[
          { value: company.role || "User", label: "Account role" },
          { value: company.logo_url ? "Yes" : "No", label: "Logo" },
          { value: company.banner_url ? "Yes" : "No", label: "Banner" },
          { value: "Live", label: "Profile" },
        ]}
        infoCards={[
          { title: "Company", text: company.company_name || "Profile" },
          { title: "Contact", text: company.full_name || "Person" },
          { title: "Phone", text: company.phone || "Not added" },
          { title: "Role", text: company.role || "customer" },
        ]}
      />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <AppCard variant="blue" className="mb-8">
          <div className="relative rounded-3xl overflow-hidden bg-gray-100 min-h-64">
            {company.banner_url ? (
              <img
                src={company.banner_url}
                alt={company.company_name || "Company banner"}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="h-64 bg-gradient-to-r from-blue-900 to-orange-500 flex items-center justify-center text-white font-black text-3xl">
                Company Banner
              </div>
            )}

            <div className="absolute left-8 -bottom-0 translate-y-1/2">
              {company.logo_url ? (
                <img
                  src={company.logo_url}
                  alt={company.company_name || "Company logo"}
                  className="h-32 w-32 object-cover rounded-3xl border-4 border-white shadow-xl bg-white"
                />
              ) : (
                <div className="h-32 w-32 rounded-3xl border-4 border-white shadow-xl bg-white flex items-center justify-center text-5xl">
                  🏢
                </div>
              )}
            </div>
          </div>

          <div className="pt-24">
            <span className="inline-block text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-3">
              {company.role || "customer"}
            </span>

            <h1 className="text-4xl font-black text-gray-900">
              {company.company_name ||
                company.full_name ||
                "Unnamed Company"}
            </h1>

            <p className="text-gray-500 mt-3">
              Business profile on NamLogix Africa.
            </p>
          </div>
        </AppCard>

        <div className="grid md:grid-cols-2 gap-6">
          <AppCard variant="orange">
            <SectionHeader
              title="📞 Contact Details"
              subtitle="Company representative information."
            />

            <div className="space-y-4 text-sm">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-400">Contact Person</p>
                <p className="font-bold text-gray-900">
                  {company.full_name || "Not provided"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-400">Phone</p>
                <p className="font-bold text-gray-900">
                  {company.phone || "Not provided"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-400">Company Role</p>
                <p className="font-bold text-gray-900">
                  {company.role || "customer"}
                </p>
              </div>
            </div>
          </AppCard>

          <AppCard variant="green">
            <SectionHeader
              title="🚀 Platform Opportunities"
              subtitle="What this company can do inside NamLogix."
            />

            <div className="space-y-3 text-sm text-gray-600">
              <p>✅ Sell products in the marketplace</p>
              <p>✅ Connect with cargo owners</p>
              <p>✅ Join warehouse and logistics networks</p>
              <p>✅ Receive inquiries from customers</p>
              <p>✅ Build trust through a branded profile</p>
            </div>

            <div className="mt-6">
              <Button href="/contact" variant="orange" fullWidth>
                Send Inquiry
              </Button>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}