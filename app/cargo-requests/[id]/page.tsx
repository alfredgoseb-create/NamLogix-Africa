// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import StatusBadge from "@/app/components/StatusBadge";
import {
  PremiumInput,
  PremiumTextarea,
  PremiumSubmitButton,
  formGridStyle,
} from "@/app/components/PremiumForm";
import { supabase } from "@/lib/supabaseClient";

export default function CargoRequestDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [carrierName, setCarrierName] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [bidMessage, setBidMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRequest();
  }, [id]);

  async function fetchRequest() {
    setLoading(true);

    const { data, error } = await supabase
      .from("cargo_requests")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert("Failed to load cargo request: " + error.message);
    }

    setRequest(data);
    setLoading(false);
  }

  async function placeBid(e: React.FormEvent) {
    e.preventDefault();

    if (!carrierName || !bidAmount) {
      alert("Carrier name and bid amount are required.");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("bids").insert([
      {
        cargo_request_id: id,
        carrier_name: carrierName,
        bid_amount: Number(bidAmount) || 0,
        message: bidMessage,
        status: "pending",
      },
    ]);

    setSubmitting(false);

    if (error) {
      alert("Bid failed: " + error.message);
      return;
    }

    alert("Bid placed successfully.");
    router.push("/bids");
  }

  if (loading) {
    return (
      <PremiumPageShell
        badge="LOADING CARGO"
        title="Loading Cargo Request"
        description="Please wait while NamLogix loads the cargo details."
        actions={[
          { label: "Cargo Requests", href: "/cargo-requests", variant: "blue" },
          { label: "Back Home", href: "/", variant: "white" },
        ]}
      >
        <PremiumCard>
          <p style={loadingTextStyle}>Loading cargo request...</p>
        </PremiumCard>
      </PremiumPageShell>
    );
  }

  if (!request) {
    return (
      <PremiumPageShell
        badge="CARGO NOT FOUND"
        title="Cargo Request Not Found"
        description="The selected cargo request could not be found."
        actions={[
          { label: "Cargo Requests", href: "/cargo-requests", variant: "blue" },
          { label: "Back Home", href: "/", variant: "white" },
        ]}
      >
        <PremiumCard>
          <p style={loadingTextStyle}>No cargo request found.</p>
        </PremiumCard>
      </PremiumPageShell>
    );
  }

  return (
    <PremiumPageShell
      badge="CARGO DETAIL"
      title="Cargo Request Details"
      description="View full cargo information and submit a transporter bid for this shipment."
      actions={[
        { label: "All Cargo", href: "/cargo-requests", variant: "blue" },
        { label: "Post Cargo", href: "/request-cargo", variant: "orange" },
        { label: "Dashboard", href: "/admin/dashboard", variant: "white" },
      ]}
    >
      <PremiumCard>
        <div style={topRowStyle}>
          <StatusBadge status={request.status || "pending"} />

          <span style={requestNumberStyle}>
            {request.request_number || "Cargo Request"}
          </span>
        </div>

        <h2 style={titleStyle}>
          {request.pickup_location || "Unknown"} →{" "}
          {request.delivery_location || "Unknown"}
        </h2>

        <div style={detailsGridStyle}>
          <Info
            label="Cargo Type"
            value={request.cargo_type || "Not specified"}
          />

          <Info
            label="Weight"
            value={
              request.weight_kg ? `${request.weight_kg} KG` : "Not specified"
            }
          />

          <Info
            label="Volume"
            value={
              request.volume_cbm ? `${request.volume_cbm} CBM` : "Not specified"
            }
          />

          <Info
            label="Transport Mode"
            value={request.transport_mode || "Not specified"}
          />

          <Info
            label="Budget"
            value={request.budget ? `NAD ${request.budget}` : "Not specified"}
          />

          <Info
            label="Created"
            value={
              request.created_at
                ? new Date(request.created_at).toLocaleString()
                : "Unknown"
            }
          />
        </div>

        <div style={messageBoxStyle}>
          <h3 style={sectionTitleStyle}>Cargo Description</h3>

          <p style={messageStyle}>
            {request.description || "No description provided."}
          </p>
        </div>
      </PremiumCard>

      <PremiumCard style={{ marginTop: 24 }}>
        <h2 style={formTitleStyle}>🚚 Place Transport Bid</h2>

        <p style={formDescStyle}>
          Transporters can submit a bid for this cargo request. The bid will be
          saved and can later be reviewed by admin.
        </p>

        <form onSubmit={placeBid} style={formGridStyle}>
          <PremiumInput
            placeholder="Your name / company *"
            value={carrierName}
            onChange={(e) => setCarrierName(e.target.value)}
            required
          />

          <PremiumInput
            type="number"
            placeholder="Bid amount NAD *"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
          />

          <PremiumTextarea
            placeholder="Message / vehicle details / estimated delivery time"
            value={bidMessage}
            onChange={(e) => setBidMessage(e.target.value)}
          />

          <PremiumSubmitButton disabled={submitting}>
            {submitting ? "Placing Bid..." : "Submit Bid"}
          </PremiumSubmitButton>
        </form>

        <div style={buttonRowStyle}>
          <Link href="/cargo-requests" style={buttonStyle}>
            Back to Cargo
          </Link>

          <Link href="/bids" style={secondaryButtonStyle}>
            View Bids
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

const loadingTextStyle = {
  color: "#64748b",
  fontWeight: 800,
};

const topRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap" as const,
};

const requestNumberStyle = {
  color: "#64748b",
  fontWeight: 800,
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

const formTitleStyle = {
  fontSize: 30,
  fontWeight: 900,
  margin: 0,
  color: "#0f172a",
};

const formDescStyle = {
  color: "#64748b",
  marginTop: 8,
  marginBottom: 0,
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