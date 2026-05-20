// @ts-nocheck

import Link from "next/link";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import PremiumStats from "@/app/components/PremiumStats";
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
        { label: "Post Cargo", href: "/request-cargo", variant: "blue" },
        { label: "Book Transport", href: "/transport", variant: "orange" },
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
          <Link href="/transport" style={buttonStyle}>
            Request Transport
          </Link>
        </PremiumCard>
      )}

      {!error && trips && trips.length > 0 && (
        <section style={gridStyle}>
          {trips.map((trip) => (
            <PremiumCard key={trip.id}>
              <p style={badgeStyle}>{trip.offer_number || "TRIP OFFER"}</p>

              <h2 style={cardTitleStyle}>
                {trip.origin} → {trip.destination}
              </h2>

              <div style={detailsStyle}>
                <p>
                  <strong>Departure:</strong>{" "}
                  {trip.departure_time
                    ? new Date(trip.departure_time).toLocaleString()
                    : "Not specified"}
                </p>

                <p>
                  <strong>Available Seats:</strong>{" "}
                  {trip.available_seats ?? "Not specified"}
                </p>

                <p>
                  <strong>Price:</strong>{" "}
                  {trip.price_per_seat
                    ? `NAD ${trip.price_per_seat}`
                    : "Contact for price"}
                </p>
              </div>

              <Link href="/transport" style={buttonStyle}>
                Book This Trip
              </Link>
            </PremiumCard>
          ))}
        </section>
      )}
    </PremiumPageShell>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
  marginBottom: 22,
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