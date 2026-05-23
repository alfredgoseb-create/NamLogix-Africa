// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import StatusBadge from "@/app/components/StatusBadge";
import { supabase } from "@/lib/supabaseClient";

export default function BidDetailPage() {
  const { id } = useParams();
  const [bid, setBid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBid();
  }, [id]);

  async function fetchBid() {
    setLoading(true);

    const { data, error } = await supabase
      .from("bids")
      .select(
        `
        *,
        cargo_requests (
          id,
          request_number,
          pickup_location,
          delivery_location,
          cargo_type,
          weight_kg,
          budget,
          status
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      alert("Failed to load bid: " + error.message);
    }

    setBid(data);
    setLoading(false);
  }

  async function acceptBid() {
    if (!bid) return;

    const { error: bidError } = await supabase
      .from("bids")
      .update({ status: "accepted" })
      .eq("id", id);

    if (bidError) {
      alert("Failed to accept bid: " + bidError.message);
      return;
    }

    const { error: cargoError } = await supabase
      .from("cargo_requests")
      .update({
        status: "assigned",
        accepted_bid_id: bid.id,
        assigned_transporter: bid.transporter_name || "Transporter",
      })
      .eq("id", bid.cargo_request_id);

    if (cargoError) {
      alert("Bid accepted, but cargo assignment failed: " + cargoError.message);
      return;
    }

    alert("Bid accepted and cargo assigned.");
    fetchBid();
  }

  async function updateBidStatus(status) {
    const { error } = await supabase
      .from("bids")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("Failed to update bid: " + error.message);
      return;
    }

    alert("Bid status updated.");
    fetchBid();
  }

  if (loading) {
    return (
      <PremiumPageShell
        badge="LOADING BID"
        title="Loading Bid"
        description="Please wait while NamLogix loads the bid details."
        actions={[
          { label: "All Bids", href: "/bids", variant: "blue" },
          { label: "Dashboard", href: "/admin/dashboard", variant: "white" },
        ]}
      >
        <PremiumCard>
          <p style={mutedStyle}>Loading bid...</p>
        </PremiumCard>
      </PremiumPageShell>
    );
  }

  if (!bid) {
    return (
      <PremiumPageShell
        badge="BID NOT FOUND"
        title="Bid Not Found"
        description="The selected bid could not be found."
        actions={[
          { label: "All Bids", href: "/bids", variant: "blue" },
          { label: "Dashboard", href: "/admin/dashboard", variant: "white" },
        ]}
      >
        <PremiumCard>
          <p style={mutedStyle}>No bid found.</p>
        </PremiumCard>
      </PremiumPageShell>
    );
  }

  return (
    <PremiumPageShell
      badge="BID DETAIL"
      title="Transport Bid Details"
      description="Review transporter offer details, accept bids, reject bids, and assign cargo to a transporter."
      actions={[
        { label: "All Bids", href: "/bids", variant: "blue" },
        { label: "Cargo Requests", href: "/cargo-requests", variant: "orange" },
        { label: "Dashboard", href: "/admin/dashboard", variant: "white" },
      ]}
    >
      <PremiumCard>
        <div style={topRowStyle}>
          <StatusBadge status={bid.status || "pending"} />

          <span style={mutedStyle}>Bid ID: {bid.id}</span>
        </div>

        <h2 style={titleStyle}>
          {bid.transporter_name || "Unknown Transporter"}
        </h2>

        <div style={detailsGridStyle}>
          <Info label="Phone" value={bid.transporter_phone || "Not provided"} />
          <Info label="Email" value={bid.transporter_email || "Not provided"} />
          <Info label="Bid Amount" value={`NAD ${bid.bid_amount || 0}`} />
          <Info
            label="Estimated Delivery"
            value={bid.estimated_delivery_time || "Not specified"}
          />
        </div>

        <div style={messageBoxStyle}>
          <h3 style={sectionTitleStyle}>Bid Notes</h3>
          <p style={messageStyle}>
            {bid.notes || bid.message || "No notes provided."}
          </p>
        </div>

        <div style={messageBoxStyle}>
          <h3 style={sectionTitleStyle}>Cargo Request</h3>

          <p style={messageStyle}>
            <strong>
              {bid.cargo_requests?.pickup_location || "Unknown"} →{" "}
              {bid.cargo_requests?.delivery_location || "Unknown"}
            </strong>
          </p>

          <p style={messageStyle}>
            Cargo Type: {bid.cargo_requests?.cargo_type || "Not specified"}
          </p>

          <p style={messageStyle}>
            Weight:{" "}
            {bid.cargo_requests?.weight_kg
              ? `${bid.cargo_requests.weight_kg} KG`
              : "Not specified"}
          </p>

          <p style={messageStyle}>
            Budget:{" "}
            {bid.cargo_requests?.budget
              ? `NAD ${bid.cargo_requests.budget}`
              : "Not specified"}
          </p>

          <p style={messageStyle}>
            Cargo Status:{" "}
            <StatusBadge status={bid.cargo_requests?.status || "pending"} />
          </p>
        </div>

        <div style={messageBoxStyle}>
          <h3 style={sectionTitleStyle}>Bid Actions</h3>

          <p style={messageStyle}>
            Accepting a bid will mark the cargo request as assigned and save the
            selected transporter.
          </p>

          <div style={buttonRowStyle}>
            <button onClick={acceptBid} style={greenButtonStyle}>
              Accept & Assign Cargo
            </button>

            <button
              onClick={() => updateBidStatus("rejected")}
              style={redButtonStyle}
            >
              Reject Bid
            </button>

            <button
              onClick={() => updateBidStatus("completed")}
              style={blueButtonStyle}
            >
              Mark Completed
            </button>
          </div>
        </div>

        <div style={buttonRowStyle}>
          <Link href="/bids" style={buttonStyle}>
            Back to Bids
          </Link>

          <Link
            href={`/cargo-requests/${bid.cargo_request_id}`}
            style={secondaryButtonStyle}
          >
            View Cargo
          </Link>
        </div>
      </PremiumCard>
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

const topRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap" as const,
  alignItems: "center",
};

const titleStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  marginTop: 20,
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

const mutedStyle = {
  color: "#64748b",
  fontWeight: 800,
};

const buttonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap" as const,
  marginTop: 22,
};

const buttonStyle = {
  display: "inline-block",
  background: "#1d4ed8",
  color: "white",
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  border: "none",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  ...buttonStyle,
  background: "#f97316",
};

const greenButtonStyle = {
  ...buttonStyle,
  background: "#16a34a",
};

const redButtonStyle = {
  ...buttonStyle,
  background: "#dc2626",
};

const blueButtonStyle = {
  ...buttonStyle,
  background: "#1d4ed8",
};