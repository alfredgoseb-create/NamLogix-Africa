// @ts-nocheck

import Link from "next/link";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import { supabase } from "@/lib/supabaseClient";

export default async function BookingDetailPage({ params }) {
  const { id } = params;

  const { data: booking, error } = await supabase
    .from("trip_bookings")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <PremiumPageShell
      badge="BOOKING DETAIL"
      title="Trip Booking Details"
      description="View full customer booking information and follow up with the customer."
      actions={[
        { label: "All Bookings", href: "/admin/bookings", variant: "blue" },
        { label: "Trip Offers", href: "/trip-offers", variant: "orange" },
        { label: "Dashboard", href: "/admin/dashboard", variant: "white" },
      ]}
    >
      {error && (
        <PremiumCard>
          <h2 style={errorTitleStyle}>Could not load booking</h2>
          <p style={errorTextStyle}>{error.message}</p>
        </PremiumCard>
      )}

      {!error && booking && (
        <PremiumCard>
          <p style={badgeStyle}>{booking.status || "pending"}</p>

          <h2 style={titleStyle}>
            {booking.customer_name || "Unnamed Customer"}
          </h2>

          <div style={detailsGridStyle}>
            <Info label="Phone" value={booking.phone || "Not provided"} />
            <Info label="Email" value={booking.email || "Not provided"} />
            <Info label="Passengers" value={booking.passengers || 1} />
            <Info
              label="Created"
              value={
                booking.created_at
                  ? new Date(booking.created_at).toLocaleString()
                  : "Unknown"
              }
            />
          </div>

          <div style={messageBoxStyle}>
            <h3 style={sectionTitleStyle}>Customer Message</h3>
            <p style={messageStyle}>{booking.message || "No message provided."}</p>
          </div>

          <div style={buttonRowStyle}>
            <Link href="/admin/bookings" style={buttonStyle}>
              Back to Bookings
            </Link>

            <Link href="/contact" style={secondaryButtonStyle}>
              Contact Support
            </Link>
          </div>
        </PremiumCard>
      )}
    </PremiumPageShell>
  );
}

function Info({ label, value }) {
  return (
    <div style={infoBoxStyle}>
      <p style={infoLabelStyle}>{label}</p>
      <h3 style={infoValueStyle}>{value}</h3>
    </div>
  );
}

const badgeStyle = {
  display: "inline-block",
  background: "#dbeafe",
  color: "#1d4ed8",
  padding: "7px 12px",
  borderRadius: 999,
  fontWeight: 900,
  textTransform: "uppercase" as const,
};

const titleStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  marginTop: 18,
};

const detailsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
  marginTop: 24,
};

const infoBoxStyle = {
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  borderRadius: 18,
  padding: 18,
};

const infoLabelStyle = {
  color: "#64748b",
  fontWeight: 800,
  margin: 0,
};

const infoValueStyle = {
  color: "#0f172a",
  fontWeight: 900,
  marginTop: 8,
  marginBottom: 0,
  fontSize: 18,
};

const messageBoxStyle = {
  marginTop: 26,
  padding: 22,
  borderRadius: 20,
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
};

const sectionTitleStyle = {
  marginTop: 0,
  color: "#0f172a",
  fontWeight: 900,
};

const messageStyle = {
  color: "#475569",
  lineHeight: 1.8,
};

const buttonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap" as const,
  marginTop: 26,
};

const buttonStyle = {
  display: "inline-block",
  background: "#1d4ed8",
  color: "white",
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
};

const secondaryButtonStyle = {
  ...buttonStyle,
  background: "#f97316",
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