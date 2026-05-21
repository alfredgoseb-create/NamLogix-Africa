// @ts-nocheck

import Link from "next/link";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumStats from "@/app/components/PremiumStats";
import AdminTable from "@/app/components/AdminTable";
import { supabase } from "@/lib/supabaseClient";

export default async function AdminBookingsPage() {
  const { data: bookings, error } = await supabase
    .from("trip_bookings")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <PremiumPageShell
      badge="ADMIN BOOKINGS"
      title="Trip Booking Requests"
      description="Manage customer booking requests, passenger details, and transport inquiries."
      actions={[
        {
          label: "Trip Offers",
          href: "/trip-offers",
          variant: "blue",
        },
        {
          label: "Create Trip",
          href: "/create-trip",
          variant: "orange",
        },
        {
          label: "Dashboard",
          href: "/admin/dashboard",
          variant: "white",
        },
      ]}
    >
      <PremiumStats
        stats={[
          {
            label: "Bookings",
            value: bookings?.length || 0,
            text: "Customer booking requests",
          },
          {
            label: "Status",
            value: "Live",
            text: "Real-time booking pipeline",
          },
          {
            label: "Operations",
            value: "Admin",
            text: "Transport management",
          },
        ]}
      />

      {error && (
        <div style={errorBoxStyle}>
          <h2>Could not load bookings</h2>
          <p>{error.message}</p>
        </div>
      )}

      {!error && bookings && (
        <AdminTable
          headers={[
            "Customer",
            "Phone",
            "Email",
            "Passengers",
            "Message",
            "Status",
            "Created",
            "Action",
          ]}
          rows={bookings.map((booking) => (
            <tr key={booking.id} style={rowStyle}>
              <td style={cellStyle}>
                {booking.customer_name || "Unknown"}
              </td>

              <td style={cellStyle}>
                {booking.phone || "Not provided"}
              </td>

              <td style={cellStyle}>
                {booking.email || "Not provided"}
              </td>

              <td style={cellStyle}>
                {booking.passengers || 1}
              </td>

              <td style={cellStyle}>
                {booking.message || "No message"}
              </td>

              <td style={cellStyle}>
                <span style={statusStyle}>
                  {booking.status || "pending"}
                </span>
              </td>

              <td style={cellStyle}>
                {booking.created_at
                  ? new Date(booking.created_at).toLocaleString()
                  : "Unknown"}
              </td>

              <td style={cellStyle}>
                <Link
                  href={`/admin/bookings/${booking.id}`}
                  style={buttonStyle}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        />
      )}
    </PremiumPageShell>
  );
}

const rowStyle = {
  borderBottom: "1px solid #f1f5f9",
};

const cellStyle = {
  padding: "18px 20px",
  color: "#334155",
  fontSize: 14,
  verticalAlign: "top",
};

const statusStyle = {
  background: "#dbeafe",
  color: "#1d4ed8",
  padding: "6px 10px",
  borderRadius: 999,
  fontWeight: 800,
  fontSize: 12,
};

const buttonStyle = {
  display: "inline-block",
  background: "#1d4ed8",
  color: "white",
  padding: "10px 14px",
  borderRadius: 12,
  fontWeight: 800,
  textDecoration: "none",
  fontSize: 13,
};

const errorBoxStyle = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: 24,
  borderRadius: 20,
};