// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import DashboardHeader from "@/app/components/DashboardHeader";
import AppCard from "@/app/components/AppCard";
import DashboardCard from "@/app/components/DashboardCard";
import SectionHeader from "@/app/components/SectionHeader";
import EmptyState from "@/app/components/EmptyState";
import Button from "@/app/components/Button";

export default function AdminTransportPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("transport_bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load bookings: " + error.message);
    } else {
      setBookings(data || []);
    }

    setLoading(false);
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("transport_bookings")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("Failed to update booking: " + error.message);
    } else {
      fetchBookings();
    }
  }

  async function deleteBooking(id) {
    if (!confirm("Delete this booking?")) return;

    const { error } = await supabase
      .from("transport_bookings")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Failed to delete booking: " + error.message);
    } else {
      fetchBookings();
    }
  }

  const pending = bookings.filter((b) => b.status === "pending").length;
  const accepted = bookings.filter((b) => b.status === "accepted").length;
  const completed = bookings.filter((b) => b.status === "completed").length;

  return (
    <div className="min-h-screen page-soft-bg">
      <DashboardHeader
        badge="Transport Operations"
        title="Transport Booking Control"
        description="Manage local transport, hospital trips, home-to-work rides, goods movement, and business transport requests."
        actions={[
          {
            label: "🚕 Public Transport Page",
            href: "/transport",
            primary: true,
          },
          {
            label: "📩 Inquiries",
            href: "/admin/inquiries",
          },
          {
            label: "📦 Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "🛒 Store",
            href: "/store",
          },
        ]}
        stats={[
          {
            value: bookings.length,
            label: "Total bookings",
          },
          {
            value: pending,
            label: "Pending",
          },
          {
            value: accepted,
            label: "Accepted",
          },
          {
            value: completed,
            label: "Completed",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="Total"
            value={bookings.length}
            subtitle="All bookings"
            color="blue"
          />

          <DashboardCard
            title="Pending"
            value={pending}
            subtitle="Needs action"
            color="orange"
          />

          <DashboardCard
            title="Accepted"
            value={accepted}
            subtitle="Approved trips"
            color="green"
          />

          <DashboardCard
            title="Completed"
            value={completed}
            subtitle="Finished trips"
            color="red"
          />
        </div>

        <AppCard variant="blue">
          <SectionHeader
            title="🚕 Transport Bookings"
            subtitle="Bookings submitted from the public transport request page."
            action={
              <button
                onClick={fetchBookings}
                className="bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800"
              >
                Refresh
              </button>
            }
          />

          {loading ? (
            <p>Loading transport bookings...</p>
          ) : bookings.length === 0 ? (
            <EmptyState
              icon="🚕"
              title="No transport bookings yet"
              message="Bookings from the public transport page will appear here."
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <AppCard key={booking.id} hover>
                  <div className="flex justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-black text-xl">
                        {booking.pickup_location} →{" "}
                        {booking.dropoff_location}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {booking.booking_type || "Transport Booking"}
                      </p>
                    </div>

                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold h-fit">
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Customer</p>
                      <p className="font-semibold">
                        {booking.customer_name || "-"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Phone</p>
                      <p className="font-semibold">
                        {booking.phone || "-"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Date</p>
                      <p className="font-semibold">
                        {booking.preferred_date || "-"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Time</p>
                      <p className="font-semibold">
                        {booking.preferred_time || "-"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Passengers</p>
                      <p className="font-semibold">
                        {booking.passengers || 1}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-gray-400">Reason</p>
                      <p className="font-semibold">
                        {booking.trip_reason || "-"}
                      </p>
                    </div>
                  </div>

                  {booking.cargo_description && (
                    <div className="mt-4 bg-gray-50 rounded-xl p-4 text-sm leading-7">
                      <strong>Goods:</strong>{" "}
                      {booking.cargo_description}
                    </div>
                  )}

                  <p className="text-xs text-gray-400 mt-4">
                    Created:{" "}
                    {new Date(
                      booking.created_at
                    ).toLocaleString()}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-5">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() =>
                        updateStatus(booking.id, "accepted")
                      }
                    >
                      Accept
                    </Button>

                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        updateStatus(booking.id, "completed")
                      }
                    >
                      Complete
                    </Button>

                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => deleteBooking(booking.id)}
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