// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import PageHero from "@/app/components/PageHero";
import AppCard from "@/app/components/AppCard";
import Button from "@/app/components/Button";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import { supabase } from "@/lib/supabaseClient";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    setLoading(true);

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load companies: " + error.message);
    } else {
      setCompanies(data || []);
    }

    setLoading(false);
  }

  const suppliers = companies.filter((c) => c.role === "supplier").length;
  const warehouses = companies.filter((c) => c.role === "warehouse").length;
  const transporters = companies.filter((c) => c.role === "transporter").length;

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Business Directory"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Company Network"
        description="Explore registered suppliers, warehouses, transporters, and trade partners on the NamLogix Africa platform."
        actions={[
          { label: "Create Profile", href: "/signup", primary: true },
          { label: "My Profile", href: "/profile" },
          { label: "Marketplace", href: "/store" },
        ]}
        stats={[
          { value: companies.length, label: "Companies" },
          { value: suppliers, label: "Suppliers" },
          { value: warehouses, label: "Warehouses" },
          { value: transporters, label: "Transporters" },
        ]}
        infoCards={[
          { title: "Suppliers", text: "Product sellers" },
          { title: "Warehouses", text: "Storage providers" },
          { title: "Transporters", text: "Logistics operators" },
          { title: "Customers", text: "Cargo owners" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <AppCard variant="blue">
          <SectionHeader
            title="🏢 Registered Companies"
            subtitle="Business profiles created by platform users."
            action={
              <button
                onClick={fetchCompanies}
                className="bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800"
              >
                Refresh
              </button>
            }
          />

          {loading ? (
            <p>Loading company profiles...</p>
          ) : companies.length === 0 ? (
            <EmptyState
              icon="🏢"
              title="No companies yet"
              message="Company profiles will appear here once users create and update their profiles."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <AppCard key={company.id} hover>
                  <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-36 mb-14">
                    {company.banner_url ? (
                      <img
                        src={company.banner_url}
                        alt={company.company_name || "Company banner"}
                        className="h-36 w-full object-cover"
                      />
                    ) : (
                      <div className="h-36 bg-gradient-to-r from-blue-900 to-orange-500" />
                    )}

                    <div className="absolute left-4 -bottom-10">
                      {company.logo_url ? (
                        <img
                          src={company.logo_url}
                          alt={company.company_name || "Company logo"}
                          className="h-20 w-20 rounded-2xl object-cover border-4 border-white bg-white shadow-lg"
                        />
                      ) : (
                        <div className="h-20 w-20 rounded-2xl border-4 border-white bg-white shadow-lg flex items-center justify-center text-3xl">
                          🏢
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="inline-block text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-3 capitalize">
                    {company.role || "customer"}
                  </span>

                  <h3 className="text-xl font-black text-gray-900">
                    {company.company_name ||
                      company.full_name ||
                      "Unnamed Company"}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Contact: {company.full_name || "Not provided"}
                  </p>

                  <p className="text-sm text-gray-500">
                    Phone: {company.phone || "Not provided"}
                  </p>

                  <div className="mt-5">
                    <Button
                      href={`/companies/${company.id}`}
                      variant="outline"
                      fullWidth
                    >
                      View Company Profile
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