// @ts-nocheck

import Link from "next/link";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import PremiumStats from "@/app/components/PremiumStats";
import { supabase } from "@/lib/supabaseClient";

export default async function AdminDashboardPage() {
  const { data: cargoRequests } = await supabase
    .from("cargo_requests")
    .select("id");

  const { data: tripOffers } = await supabase.from("trip_offers").select("id");

  const { data: bookings } = await supabase.from("trip_bookings").select("id");

  const { data: inquiries } = await supabase.from("inquiries").select("id");

  const { data: bids } = await supabase.from("bids").select("id");

  const { data: shipments } = await supabase
    .from("shipment_tracking")
    .select("id, status");

  const { data: deliveryProofs } = await supabase
    .from("delivery_proofs")
    .select("id");

  const driverAssignedCount =
    shipments?.filter((item) => item.status === "driver_assigned").length || 0;

  const inTransitCount =
    shipments?.filter((item) => item.status === "in_transit").length || 0;

  const deliveredCount =
    shipments?.filter((item) => item.status === "delivered").length || 0;

  return (
    <PremiumPageShell
      badge="NAMLOGIX ADMIN"
      title="Admin Dashboard"
      description="Manage cargo requests, transporter bids, trip offers, bookings, customer inquiries, shipment tracking, driver dispatch, and delivery proof records from one control center."
      actions={[
        { label: "Cargo Requests", href: "/cargo-requests", variant: "blue" },
        { label: "Tracking", href: "/admin/tracking-management", variant: "orange" },
        { label: "Home", href: "/", variant: "white" },
      ]}
    >
      <PremiumStats
        stats={[
          {
            label: "Cargo Requests",
            value: cargoRequests?.length || 0,
            text: "Posted cargo requests",
          },
          {
            label: "Bids",
            value: bids?.length || 0,
            text: "Transporter cargo bids",
          },
          {
            label: "Trip Offers",
            value: tripOffers?.length || 0,
            text: "Available transporter routes",
          },
          {
            label: "Bookings",
            value: bookings?.length || 0,
            text: "Customer trip bookings",
          },
          {
            label: "Shipments",
            value: shipments?.length || 0,
            text: "Shipment tracking records",
          },
          {
            label: "Driver Assigned",
            value: driverAssignedCount,
            text: "Shipments with drivers",
          },
          {
            label: "In Transit",
            value: inTransitCount,
            text: "Shipments currently moving",
          },
          {
            label: "Delivered",
            value: deliveredCount,
            text: "Completed deliveries",
          },
          {
            label: "Delivery Proofs",
            value: deliveryProofs?.length || 0,
            text: "Saved proof records",
          },
          {
            label: "Inquiries",
            value: inquiries?.length || 0,
            text: "Support and customer leads",
          },
        ]}
      />

      <section style={gridStyle}>
        <PremiumCard>
          <div style={iconStyle}>📦</div>
          <h2 style={cardTitleStyle}>Cargo Operations</h2>
          <p style={cardTextStyle}>
            View posted cargo requests and help connect customers with
            transporters.
          </p>
          <Link href="/cargo-requests" style={buttonStyle}>
            Manage Cargo
          </Link>
        </PremiumCard>

        <PremiumCard>
          <div style={iconStyle}>🚚</div>
          <h2 style={cardTitleStyle}>Shipment Tracking</h2>
          <p style={cardTextStyle}>
            Monitor active shipments, progress stages, pickup status, transit
            status, and completed deliveries.
          </p>
          <Link href="/admin/tracking-management" style={buttonStyle}>
            Manage Tracking
          </Link>
        </PremiumCard>

        <PremiumCard>
          <div style={iconStyle}>👨‍✈️</div>
          <h2 style={cardTitleStyle}>Driver Dispatch</h2>
          <p style={cardTextStyle}>
            View assigned drivers, vehicles, tracking codes, and shipment
            dispatch records.
          </p>
          <Link href="/admin/shipment-assignments" style={buttonStyle}>
            View Assignments
          </Link>
        </PremiumCard>

        <PremiumCard>
          <div style={iconStyle}>✅</div>
          <h2 style={cardTitleStyle}>Delivery Proofs</h2>
          <p style={cardTextStyle}>
            Review completed deliveries, receiver details, delivery notes, and
            proof of delivery records.
          </p>
          <Link href="/admin/delivery-proofs" style={buttonStyle}>
            View Proofs
          </Link>
        </PremiumCard>

        <PremiumCard>
          <div style={iconStyle}>💰</div>
          <h2 style={cardTitleStyle}>Transporter Bids</h2>
          <p style={cardTextStyle}>
            Review transport offers, accept bids, reject bids, and manage cargo
            quotation workflows.
          </p>
          <Link href="/bids" style={buttonStyle}>
            Manage Bids
          </Link>
        </PremiumCard>

        <PremiumCard>
          <div style={iconStyle}>🚐</div>
          <h2 style={cardTitleStyle}>Trip Offers</h2>
          <p style={cardTextStyle}>
            Create and view available transport routes, seats, pricing, and
            departure schedules.
          </p>
          <Link href="/create-trip" style={buttonStyle}>
            Create Trip
          </Link>
        </PremiumCard>

        <PremiumCard>
          <div style={iconStyle}>🎫</div>
          <h2 style={cardTitleStyle}>Booking Requests</h2>
          <p style={cardTextStyle}>
            Review customer booking requests, passenger details, and trip
            messages.
          </p>
          <Link href="/admin/booking-management" style={buttonStyle}>
            View Bookings
          </Link>
        </PremiumCard>

        <PremiumCard>
          <div style={iconStyle}>📩</div>
          <h2 style={cardTitleStyle}>Customer Inquiries</h2>
          <p style={cardTextStyle}>
            Manage support messages, supplier leads, aviation requests, and
            partnerships.
          </p>
          <Link href="/admin/inquiries" style={buttonStyle}>
            View Inquiries
          </Link>
        </PremiumCard>

        <PremiumCard>
          <div style={iconStyle}>✈️</div>
          <h2 style={cardTitleStyle}>Aviation Services</h2>
          <p style={cardTextStyle}>
            Expand into charter flights, air cargo, tourism routes, and
            emergency aviation support.
          </p>
          <Link href="/aviation" style={buttonStyle}>
            Aviation Page
          </Link>
        </PremiumCard>

        <PremiumCard>
          <div style={iconStyle}>🛒</div>
          <h2 style={cardTitleStyle}>Marketplace Store</h2>
          <p style={cardTextStyle}>
            Manage warehouse stock, supplier products, inventory listings, and
            trade products.
          </p>
          <Link href="/store" style={buttonStyle}>
            Open Store
          </Link>
        </PremiumCard>
      </section>
    </PremiumPageShell>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 22,
};

const iconStyle = {
  fontSize: 44,
  marginBottom: 18,
};

const cardTitleStyle = {
  fontSize: 24,
  fontWeight: 900,
  marginBottom: 12,
  color: "#0f172a",
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
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