// @ts-nocheck

import Link from "next/link";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import PremiumStats from "@/app/components/PremiumStats";
import AdminTable from "@/app/components/AdminTable";
import { supabase } from "@/lib/supabaseClient";

export default async function TripOffersPage() {
  const { data: trips, error } = await supabase
    .from("trip_offers")
    .select(
      "id, offer_number, origin, destination, price_per_seat, departure_time, available_seats, status"
    )
    .eq("status", "active")
    .order("created_at", { ascending: false });

  return (
    <PremiumPageShell
      badge="NAMLOGIX TRIPS"
      title="Available Trip Offers"
      description="Browse active trip offers from transporters, drivers, logistics operators, and service providers moving people or cargo across routes."
      actions={[
        { label: "Create Trip", href: "/create-trip", variant: "orange" },
        { label: "Book Transport", href: "/transport", variant: "blue" },
        { label: "Back Home", href: "/", variant: "white" },
      ]}
    >
      <PremiumStats
        stats={[
          {
            label: "Active Trips",
            value: trips?.length || 0,
            text: "Currently listed trip offers",
          },
          {
            label: "Booking",
            value: "Open",
            text: "Customers can request transport",
          },
          {
            label: "Routes",
            value: "Local",
            text: "Town, regional and cross-border",
          },
        ]}
      />

      {error && (
        <PremiumCard>
          <h2 style={errorTitleStyle}>Could not load trip offers</h2>
          <p style={errorTextStyle}>{error.message}</p>
        </PremiumCard>
      )}

      {!error && (!trips || trips.length === 0) && (
        <PremiumCard>
          <h2 style={emptyTitleStyle}>No active trip offers yet</h2>

          <p style={emptyTextStyle}>
            Trip offers will appear here when drivers or logistics providers
            add available routes.
          </p>

          <Link href="/create-trip" style={buttonStyle}>
            Create First Trip Offer
          </Link>
        </PremiumCard>
      )}

      {!error && trips && trips.length > 0 && (
        <AdminTable
          headers={[
            "Route",
            "Departure",
            "Seats",
            "Price",
            "Status",
            "Action",
          ]}
          rows={trips.map((trip) => (
            <tr key={trip.id} style={rowStyle}>
              <td style={cellStyle}>
                <strong>
                  {trip.origin || "Unknown"} → {trip.destination || "Unknown"}
                </strong>
                <br />
                <span style={mutedStyle}>
                  {trip.offer_number || "Trip Offer"}
                </span>
              </td>

              <td style={cellStyle}>
                {trip.departure_time
                  ? new Date(trip.departure_time).toLocaleString()
                  : "Not specified"}
              </td>

              <td style={cellStyle}>
                {trip.available_seats ?? "Not specified"}
              </td>

              <td style={cellStyle}>
                {trip.price_per_seat
                  ? `NAD ${trip.price_per_seat}`
                  : "Contact for price"}
              </td>

              <td style={cellStyle}>
                <span style={statusStyle}>{trip.status || "active"}</span>
              </td>

              <td style={cellStyle}>
                <Link href="/book-trip" style={buttonStyle}>
                  Book
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

const mutedStyle = {
  color: "#64748b",
  fontSize: 13,
};

const statusStyle = {
  background: "#dcfce7",
  color: "#166534",
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

const emptyTitleStyle = {
  fontSize: 28,
  fontWeight: 900,
  color: "#0f172a",
  margin: 0,
};

const emptyTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
  marginBottom: 20,
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