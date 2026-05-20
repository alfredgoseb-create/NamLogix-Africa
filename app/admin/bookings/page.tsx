// @ts-nocheck

import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import PremiumStats from "@/app/components/PremiumStats";
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
      description="Manage customer booking requests, passengers, transport inquiries, and trip reservations."
      actions={[
        {
          label: "View Trips",
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
            text: "Total booking requests",
          },
          {
            label: "Status",
            value: "Live",
            text: "Customer inquiries incoming",
          },
          {
            label: "Management",
            value: "Admin",
            text: "Booking operations center",
          },
        ]}
      />

      {error && (
        <PremiumCard>
          <h2 style={errorTitleStyle}>Could not load bookings</h2>
          <p style={errorTextStyle}>{error.message}</p>
        </PremiumCard>
      )}

      {!error && (!bookings || bookings.length === 0) && (
        <PremiumCard>
          <h2 style={emptyTitleStyle}>No bookings yet</h2>

          <p style={emptyTextStyle}>
            Booking requests submitted by customers will appear here.
          </p>
        </PremiumCard>
      )}

      {!error && bookings && bookings.length > 0 && (
        <section style={gridStyle}>
          {bookings.map((booking) => (
            <PremiumCard key={booking.id}>
              <p style={badgeStyle}>
                {booking.status?.toUpperCase() || "PENDING"}
              </p>

              <h2 style={cardTitleStyle}>
                {booking.customer_name || "Customer"}
              </h2>

              <div style={detailsStyle}>
                <p>
                  <strong>Phone:</strong>{" "}
                  {booking.phone || "Not provided"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {booking.email || "Not provided"}
                </p>

                <p>
                  <strong>Passengers:</strong>{" "}
                  {booking.passengers || 1}
                </p>

                <p>
                  <strong>Message:</strong>{" "}
                  {booking.message || "No message"}
                </p>

                <p>
                  <strong>Created:</strong>{" "}
                  {booking.created_at
                    ? new Date(booking.created_at).toLocaleString()
                    : "Unknown"}
                </p>
              </div>
            </PremiumCard>
          ))}
        </section>
      )}
    </PremiumPageShell>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 22,
};

const badgeStyle = {
  color: "#f97316",
  fontWeight: 900,
  letterSpacing: 1,
  margin: 0,
};

const cardTitleStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
  margin: "10px 0 16px",
};

const detailsStyle = {
  color: "#475569",
  lineHeight: 1.8,
};

const emptyTitleStyle = {
  fontSize: 28,
  fontWeight: 900,
  color: "#0f172a",
  margin: 0,
};

const emptyTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
};

const errorTitleStyle = {
  fontSize: 26,
  fontWeight: 900,
  color: "#991b1b",
  margin: 0,
};

const errorTextStyle = {
  color: "#7f1d1d",
};