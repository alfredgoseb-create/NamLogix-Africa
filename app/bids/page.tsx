// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import PremiumStats from "@/app/components/PremiumStats";
import AdminTable from "@/app/components/AdminTable";
import StatusBadge from "@/app/components/StatusBadge";
import {
  PremiumInput,
  PremiumSelect,
  PremiumTextarea,
  PremiumSubmitButton,
  formGridStyle,
} from "@/app/components/PremiumForm";
import { supabase } from "@/lib/supabaseClient";

const emptyBidForm = {
  cargo_request_id: "",
  transporter_name: "",
  transporter_phone: "",
  transporter_email: "",
  bid_amount: "",
  estimated_delivery_time: "",
  notes: "",
};

export default function BidsPage() {
  const [cargoRequests, setCargoRequests] = useState([]);
  const [bids, setBids] = useState([]);
  const [form, setForm] = useState(emptyBidForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    const { data: cargoData } = await supabase
      .from("cargo_requests")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: bidsData } = await supabase
      .from("bids")
      .select(
        `
        *,
        cargo_requests (
          pickup_location,
          delivery_location,
          request_number
        )
      `
      )
      .order("created_at", { ascending: false });

    setCargoRequests(cargoData || []);
    setBids(bidsData || []);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.cargo_request_id || !form.transporter_name) {
      alert("Please select cargo and enter transporter name.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("bids").insert([
      {
        cargo_request_id: form.cargo_request_id,
        transporter_name: form.transporter_name,
        transporter_phone: form.transporter_phone,
        transporter_email: form.transporter_email,
        bid_amount: Number(form.bid_amount) || 0,
        estimated_delivery_time: form.estimated_delivery_time,
        notes: form.notes,
        status: "pending",
      },
    ]);

    setSaving(false);

    if (error) {
      alert("Failed to submit bid: " + error.message);
      return;
    }

    alert("Bid submitted successfully.");
    setForm(emptyBidForm);
    fetchData();
  }

  const pendingBids = bids.filter((b) => b.status === "pending").length;
  const acceptedBids = bids.filter((b) => b.status === "accepted").length;
  const totalBidValue = bids.reduce(
    (acc, bid) => acc + Number(bid.bid_amount || 0),
    0
  );

  return (
    <PremiumPageShell
      badge="TRANSPORT BIDDING"
      title="Cargo Bids"
      description="Submit and manage transport bids, cargo quotes, logistics pricing, and transporter offers for cargo movement across Southern Africa."
      actions={[
        { label: "Find Cargo", href: "/cargo-requests", variant: "blue" },
        { label: "Post Cargo", href: "/request-cargo", variant: "orange" },
        { label: "Trip Offers", href: "/trip-offers", variant: "white" },
      ]}
    >
      <PremiumStats
        stats={[
          {
            label: "Total Bids",
            value: bids.length,
            text: "Submitted transporter offers",
          },
          {
            label: "Pending",
            value: pendingBids,
            text: "Awaiting decision",
          },
          {
            label: "Accepted",
            value: acceptedBids,
            text: "Confirmed transporters",
          },
          {
            label: "Bid Value",
            value: `NAD ${totalBidValue}`,
            text: "Total quoted value",
          },
        ]}
      />

      <PremiumCard>
        <h2 style={formTitleStyle}>💰 Submit Transport Bid</h2>

        <p style={formDescStyle}>
          Select a cargo request and submit your transporter quote.
        </p>

        <form onSubmit={handleSubmit} style={formGridStyle}>
          <PremiumSelect
            value={form.cargo_request_id}
            onChange={(e) =>
              setForm({ ...form, cargo_request_id: e.target.value })
            }
            style={{ gridColumn: "1 / -1" }}
          >
            <option value="">Select Cargo Request *</option>

            {cargoRequests.map((cargo) => (
              <option key={cargo.id} value={cargo.id}>
                {cargo.request_number || cargo.id} — {cargo.pickup_location} to{" "}
                {cargo.delivery_location}
              </option>
            ))}
          </PremiumSelect>

          <PremiumInput
            placeholder="Transporter Name *"
            value={form.transporter_name}
            onChange={(e) =>
              setForm({ ...form, transporter_name: e.target.value })
            }
          />

          <PremiumInput
            placeholder="Transporter Phone"
            value={form.transporter_phone}
            onChange={(e) =>
              setForm({ ...form, transporter_phone: e.target.value })
            }
          />

          <PremiumInput
            type="email"
            placeholder="Transporter Email"
            value={form.transporter_email}
            onChange={(e) =>
              setForm({ ...form, transporter_email: e.target.value })
            }
          />

          <PremiumInput
            type="number"
            placeholder="Bid Amount NAD"
            value={form.bid_amount}
            onChange={(e) =>
              setForm({ ...form, bid_amount: e.target.value })
            }
          />

          <PremiumInput
            placeholder="Estimated Delivery Time"
            value={form.estimated_delivery_time}
            onChange={(e) =>
              setForm({
                ...form,
                estimated_delivery_time: e.target.value,
              })
            }
          />

          <PremiumTextarea
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          <PremiumSubmitButton disabled={saving}>
            {saving ? "Submitting Bid..." : "💰 Submit Bid"}
          </PremiumSubmitButton>
        </form>
      </PremiumCard>

      <div style={{ marginTop: 24 }}>
        {loading ? (
          <PremiumCard>
            <p style={mutedStyle}>Loading bids...</p>
          </PremiumCard>
        ) : bids.length === 0 ? (
          <PremiumCard>
            <h2 style={emptyTitleStyle}>No bids yet</h2>
            <p style={emptyTextStyle}>
              When transporters submit quotes for cargo movement, those bids
              will appear here.
            </p>
            <Link href="/cargo-requests" style={buttonStyle}>
              View Cargo Requests
            </Link>
          </PremiumCard>
        ) : (
          <AdminTable
            headers={[
              "Transporter",
              "Cargo Route",
              "Amount",
              "Delivery",
              "Status",
              "Created",
              "Action",
            ]}
            rows={bids.map((bid) => (
              <tr key={bid.id} style={rowStyle}>
                <td style={cellStyle}>
                  <strong>{bid.transporter_name || "Unknown"}</strong>
                  <br />
                  <span style={mutedStyle}>
                    {bid.transporter_phone || "No phone"}
                  </span>
                </td>

                <td style={cellStyle}>
                  {bid.cargo_requests?.pickup_location || "Unknown"} →{" "}
                  {bid.cargo_requests?.delivery_location || "Unknown"}
                </td>

                <td style={cellStyle}>NAD {bid.bid_amount || 0}</td>

                <td style={cellStyle}>
                  {bid.estimated_delivery_time || "Not set"}
                </td>

                <td style={cellStyle}>
                  <StatusBadge status={bid.status || "pending"} />
                </td>

                <td style={cellStyle}>
                  {bid.created_at
                    ? new Date(bid.created_at).toLocaleString()
                    : "Unknown"}
                </td>

               <td style={cellStyle}>
  <Link href={`/bids/${bid.id}`} style={buttonStyle}>
    View Bid
  </Link>
</td>
              </tr>
            ))}
          />
        )}
      </div>
    </PremiumPageShell>
  );
}

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
  fontSize: 14,
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