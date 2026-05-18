// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PageHero from "@/app/components/PageHero";
import AppCard from "@/app/components/AppCard";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import Button from "@/app/components/Button";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    setLoading(true);

    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setInquiries(data || []);
    }

    setLoading(false);
  }

  async function markClosed(id) {
    const { error } = await supabase
      .from("inquiries")
      .update({
        status: "closed",
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchInquiries();
    }
  }

  async function deleteInquiry(id) {
    if (!confirm("Delete inquiry?")) return;

    const { error } = await supabase
      .from("inquiries")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchInquiries();
    }
  }

  const openCount = inquiries.filter(
    (i) => i.status === "open"
  ).length;

  const closedCount = inquiries.filter(
    (i) => i.status === "closed"
  ).length;

  return (
    <div className="min-h-screen page-soft-bg">
      <PageHero
        badge="Customer Communication"
        titleTop="NamLogix"
        titleHighlight="AFRICA"
        titleBottom="Inquiry Center"
        description="Manage customer inquiries, supplier requests, cargo requests, and marketplace communication from one admin panel."
        actions={[
          {
            label: "📩 Contact Page",
            href: "/contact",
            primary: true,
          },
          {
            label: "🛒 Store",
            href: "/store",
          },
          {
            label: "📦 Dashboard",
            href: "/admin/dashboard",
          },
        ]}
        stats={[
          {
            value: inquiries.length,
            label: "Total inquiries",
          },
          {
            value: openCount,
            label: "Open",
          },
          {
            value: closedCount,
            label: "Closed",
          },
          {
            value: "Live",
            label: "System status",
          },
        ]}
        infoCards={[
          {
            title: "Customers",
            text: "Communication tracking",
          },
          {
            title: "Suppliers",
            text: "Business requests",
          },
          {
            title: "Cargo",
            text: "Logistics support",
          },
          {
            title: "Marketplace",
            text: "Product inquiries",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <DashboardCard
            title="Total"
            value={inquiries.length}
            subtitle="All inquiries"
            color="blue"
          />

          <DashboardCard
            title="Open"
            value={openCount}
            subtitle="Needs response"
            color="orange"
          />

          <DashboardCard
            title="Closed"
            value={closedCount}
            subtitle="Resolved"
            color="green"
          />
        </div>

        <AppCard variant="blue">
          <SectionHeader
            title="📩 Inquiry Management"
            subtitle="All contact and marketplace inquiries submitted through NamLogix."
            action={
              <button
                onClick={fetchInquiries}
                className="bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800"
              >
                Refresh
              </button>
            }
          />

          {loading ? (
            <p>Loading inquiries...</p>
          ) : inquiries.length === 0 ? (
            <EmptyState
              icon="📭"
              title="No inquiries yet"
              message="Customer inquiries from the contact page will appear here."
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {inquiries.map((item) => (
                <AppCard key={item.id} hover>

                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl">
                      {item.subject || "General Inquiry"}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === "closed"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <strong>Name:</strong> {item.name}
                    </p>

                    <p>
                      <strong>Email:</strong> {item.email || "-"}
                    </p>

                    <p>
                      <strong>Phone:</strong> {item.phone || "-"}
                    </p>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-gray-50 text-sm leading-7">
                    {item.message}
                  </div>

                  <p className="text-xs text-gray-400 mt-4">
                    {new Date(item.created_at).toLocaleString()}
                  </p>

                  <div className="flex gap-3 mt-5">
                    {item.status !== "closed" && (
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => markClosed(item.id)}
                      >
                        Mark Closed
                      </Button>
                    )}

                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => deleteInquiry(item.id)}
                    >
                      Delete
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