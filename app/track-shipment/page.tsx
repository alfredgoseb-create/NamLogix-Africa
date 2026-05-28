"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type ShipmentTracking = {
  id: string;
  booking_id: string;
  tracking_code: string;
  status: string;
  current_location: string;
  destination: string;
  progress: number;
  created_at: string;
};

export default function TrackShipmentPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [shipment, setShipment] = useState<ShipmentTracking | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function searchShipment() {
    if (!trackingCode.trim()) {
      alert("Please enter your tracking code.");
      return;
    }

    setLoading(true);
    setSearched(true);
    setShipment(null);

    const { data, error } = await supabase
      .from("shipment_tracking")
      .select("*")
      .eq("tracking_code", trackingCode.trim())
      .single();

    if (error) {
      setShipment(null);
    } else {
      setShipment(data);
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>NAMLOGIX TRACKING</p>
        <h1 style={titleStyle}>Track Your Shipment</h1>
        <p style={descStyle}>
          Enter your NamLogix Africa tracking code to check shipment progress,
          current location, and delivery status.
        </p>

        <div style={searchBoxStyle}>
          <input
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            placeholder="Enter tracking code e.g. NLX-123456789"
            style={inputStyle}
          />

          <button onClick={searchShipment} style={buttonStyle}>
            {loading ? "Searching..." : "Track Shipment"}
          </button>
        </div>
      </section>

      <section style={containerStyle}>
        {loading ? (
          <div style={messageStyle}>Searching shipment...</div>
        ) : shipment ? (
          <article style={cardStyle}>
            <p style={codeStyle}>{shipment.tracking_code}</p>

            <h2 style={cardTitleStyle}>
              {shipment.current_location || "Pickup location"} →{" "}
              {shipment.destination || "Destination"}
            </h2>

            <p style={textStyle}>
              <strong>Status:</strong> {shipment.status || "pending"}
            </p>

            <p style={textStyle}>
              <strong>Progress:</strong> {shipment.progress || 0}%
            </p>

            <div style={progressOuterStyle}>
              <div
                style={{
                  ...progressInnerStyle,
                  width: `${shipment.progress || 0}%`,
                }}
              />
            </div>

            <p style={smallTextStyle}>
              Created:{" "}
              {shipment.created_at
                ? new Date(shipment.created_at).toLocaleString()
                : "N/A"}
            </p>
          </article>
        ) : searched ? (
          <div style={messageStyle}>
            No shipment found with that tracking code.
          </div>
        ) : (
          <div style={messageStyle}>
            Enter your tracking code above to begin.
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
  flexWrap: "wrap" as const,
  justifyContent: "center",
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
  background: "#f97316",
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

const codeStyle = {
  display: "inline-block",
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
};

const cardTitleStyle = {
  fontSize: 28,
  fontWeight: 900,
  color: "#0f172a",
  marginTop: 18,
};

const textStyle = {
  color: "#475569",
  lineHeight: 1.7,
};

const smallTextStyle = {
  color: "#94a3b8",
  fontSize: 13,
  marginTop: 16,
};

const progressOuterStyle = {
  width: "100%",
  height: 14,
  background: "#e5e7eb",
  borderRadius: 999,
  overflow: "hidden",
  marginTop: 14,
};

const progressInnerStyle = {
  height: "100%",
  background: "#f97316",
  borderRadius: 999,
};