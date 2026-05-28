"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type DeliveryProof = {
  tracking_code: string;
  receiver_name: string;
  receiver_phone: string;
  delivery_notes: string;
  delivered_at: string;
};

export default function DeliveryStatusPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [proof, setProof] = useState<DeliveryProof | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function searchDeliveryStatus() {
    if (!trackingCode.trim()) {
      alert("Please enter a tracking code.");
      return;
    }

    setLoading(true);
    setSearched(true);

    const { data, error } = await supabase
      .from("delivery_proofs")
      .select("*")
      .eq("tracking_code", trackingCode.trim())
      .single();

    if (error) {
      setProof(null);
    } else {
      setProof(data);
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>DELIVERY CONFIRMATION</p>

        <h1 style={titleStyle}>Check Delivery Status</h1>

        <p style={descStyle}>
          Customers can confirm whether a shipment was delivered successfully.
        </p>

        <div style={searchBoxStyle}>
          <input
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            placeholder="Enter tracking code"
            style={inputStyle}
          />

          <button
            onClick={searchDeliveryStatus}
            style={buttonStyle}
          >
            {loading ? "Searching..." : "Check Delivery"}
          </button>
        </div>
      </section>

      <section style={containerStyle}>
        {loading ? (
          <div style={messageStyle}>Loading delivery status...</div>
        ) : proof ? (
          <article style={cardStyle}>
            <p style={successBadgeStyle}>DELIVERED</p>

            <h2 style={cardTitleStyle}>
              Shipment Successfully Delivered
            </h2>

            <p style={textStyle}>
              <strong>Tracking Code:</strong>{" "}
              {proof.tracking_code}
            </p>

            <p style={textStyle}>
              <strong>Receiver:</strong>{" "}
              {proof.receiver_name || "N/A"}
            </p>

            <p style={textStyle}>
              <strong>Receiver Phone:</strong>{" "}
              {proof.receiver_phone || "N/A"}
            </p>

            <p style={textStyle}>
              <strong>Delivery Notes:</strong>{" "}
              {proof.delivery_notes || "No notes"}
            </p>

            <p style={smallTextStyle}>
              Delivered At:{" "}
              {proof.delivered_at
                ? new Date(proof.delivered_at).toLocaleString()
                : "N/A"}
            </p>
          </article>
        ) : searched ? (
          <div style={messageStyle}>
            No delivery confirmation found yet.
          </div>
        ) : (
          <div style={messageStyle}>
            Enter your tracking code above.
          </div>
        )}
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
};

const heroStyle = {
  padding: "90px 24px",
  textAlign: "center" as const,
  color: "white",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.97), rgba(30,64,175,0.94), rgba(249,115,22,0.88))",
};

const badgeStyle = {
  color: "#fdba74",
  fontWeight: 900,
  letterSpacing: 1,
};

const titleStyle = {
  fontSize: 54,
  fontWeight: 900,
  margin: "10px 0 14px",
};

const descStyle = {
  maxWidth: 800,
  margin: "0 auto",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  fontSize: 18,
};

const searchBoxStyle = {
  maxWidth: 760,
  margin: "34px auto 0",
  display: "flex",
  gap: 12,
  justifyContent: "center",
  flexWrap: "wrap" as const,
};

const inputStyle = {
  flex: 1,
  minWidth: 280,
  padding: "16px 18px",
  borderRadius: 14,
  border: "none",
  fontSize: 16,
  fontWeight: 700,
};

const buttonStyle = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "16px 20px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const containerStyle = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "60px 24px",
};

const messageStyle = {
  background: "white",
  padding: 40,
  borderRadius: 24,
  textAlign: "center" as const,
  color: "#64748b",
  fontWeight: 800,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 32,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const successBadgeStyle = {
  display: "inline-block",
  background: "#dcfce7",
  color: "#166534",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
};

const cardTitleStyle = {
  fontSize: 30,
  fontWeight: 900,
  color: "#0f172a",
  marginTop: 18,
};

const textStyle = {
  color: "#475569",
  lineHeight: 1.8,
  marginTop: 10,
};

const smallTextStyle = {
  color: "#94a3b8",
  fontSize: 13,
  marginTop: 18,
};