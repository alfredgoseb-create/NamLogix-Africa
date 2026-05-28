"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function AdminShipmentTrackingPage() {
  const [shipments, setShipments] = useState<ShipmentTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    fetchShipments();
  }, []);

  async function fetchShipments() {
    setLoading(true);

    const { data, error } = await supabase
      .from("shipment_tracking")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load shipments: " + error.message);
    } else {
      setShipments(data || []);
    }

    setLoading(false);
  }

  async function updateShipment(
    id: string,
    status: string,
    progress: number
  ) {
    setUpdatingId(id);

    const { error } = await supabase
      .from("shipment_tracking")
      .update({ status, progress })
      .eq("id", id);

    setUpdatingId("");

    if (error) {
      alert("Failed to update shipment: " + error.message);
      return;
    }

    fetchShipments();
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN TRACKING</p>
        <h1 style={titleStyle}>Shipment Tracking</h1>
        <p style={descStyle}>
          Manage approved bookings, shipment progress, pickup status, transit
          updates, and completed deliveries.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/admin/booking-management" style={primaryButtonStyle}>
            Back to Bookings
          </Link>

          <button onClick={fetchShipments} style={secondaryButtonStyle}>
            Refresh
          </button>
        </div>
      </section>

      <section style={containerStyle}>
        {loading ? (
          <div style={messageStyle}>Loading shipments...</div>
        ) : shipments.length === 0 ? (
          <div style={messageStyle}>No shipment records found yet.</div>
        ) : (
          <div style={gridStyle}>
            {shipments.map((shipment) => (
              <article key={shipment.id} style={cardStyle}>
                <p style={codeStyle}>{shipment.tracking_code}</p>

                <h2 style={cardTitleStyle}>
                  {shipment.current_location || "Pickup"} →{" "}
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

                <div style={buttonGridStyle}>
                  <button
                    disabled={updatingId === shipment.id}
                    onClick={() =>
                      updateShipment(shipment.id, "pending_pickup", 10)
                    }
                    style={smallButtonStyle}
                  >
                    Pending Pickup
                  </button>

                  <button
                    disabled={updatingId === shipment.id}
                    onClick={() =>
                      updateShipment(shipment.id, "picked_up", 30)
                    }
                    style={smallButtonStyle}
                  >
                    Picked Up
                  </button>

                  <button
                    disabled={updatingId === shipment.id}
                    onClick={() =>
                      updateShipment(shipment.id, "in_transit", 60)
                    }
                    style={smallButtonStyle}
                  >
                    In Transit
                  </button>

                  <button
                    disabled={updatingId === shipment.id}
                    onClick={() =>
                      updateShipment(shipment.id, "delivered", 100)
                    }
                    style={completeButtonStyle}
                  >
                    Delivered
                  </button>
                </div>

                <p style={smallTextStyle}>
                  Created:{" "}
                  {shipment.created_at
                    ? new Date(shipment.created_at).toLocaleString()
                    : "N/A"}
                </p>
              </article>
            ))}
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
  maxWidth: 850,
  margin: "0 auto",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  fontSize: 18,
};

const buttonRowStyle = {
  display: "flex",
  gap: 14,
  justifyContent: "center",
  flexWrap: "wrap" as const,
  marginTop: 30,
};

const primaryButtonStyle = {
  background: "#f97316",
  color: "white",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const secondaryButtonStyle = {
  background: "white",
  color: "#0f172a",
  border: "none",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const containerStyle = {
  maxWidth: 1200,
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

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
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
  fontSize: 24,
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
  height: 12,
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

const buttonGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
  gap: 10,
  marginTop: 22,
};

const smallButtonStyle = {
  background: "#0f172a",
  color: "white",
  border: "none",
  padding: "11px 12px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const completeButtonStyle = {
  ...smallButtonStyle,
  background: "#16a34a",
};