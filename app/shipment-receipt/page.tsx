"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Shipment = {
  id: string;
  tracking_code: string;
  status: string;
  current_location: string;
  destination: string;
  progress: number;
  customer_name: string;
  service_type: string;
  contact_number: string;
  created_at: string;
};

type Assignment = {
  driver_name: string;
  driver_phone: string;
  vehicle_name: string;
  vehicle_registration: string;
  assigned_at: string;
};

type DeliveryProof = {
  receiver_name: string;
  receiver_phone: string;
  delivery_notes: string;
  delivered_at: string;
};

export default function ShipmentReceiptPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [proof, setProof] = useState<DeliveryProof | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function searchReceipt() {
    if (!trackingCode.trim()) {
      alert("Please enter your tracking code.");
      return;
    }

    setLoading(true);
    setSearched(true);
    setShipment(null);
    setAssignment(null);
    setProof(null);

    const code = trackingCode.trim();

    const { data: shipmentData } = await supabase
      .from("shipment_tracking")
      .select("*")
      .eq("tracking_code", code)
      .maybeSingle();

    const { data: assignmentData } = await supabase
      .from("shipment_assignments")
      .select("*")
      .eq("tracking_code", code)
      .order("assigned_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: proofData } = await supabase
      .from("delivery_proofs")
      .select("*")
      .eq("tracking_code", code)
      .order("delivered_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    setShipment(shipmentData || null);
    setAssignment(assignmentData || null);
    setProof(proofData || null);
    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>SHIPMENT RECEIPT</p>

        <h1 style={titleStyle}>NamLogix Shipment Receipt</h1>

        <p style={descStyle}>
          Enter your tracking code to view shipment status, assigned driver,
          vehicle details, and final proof of delivery.
        </p>

        <div style={searchBoxStyle}>
          <input
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            placeholder="Enter tracking code e.g. NLX-123456789"
            style={inputStyle}
          />

          <button onClick={searchReceipt} style={buttonStyle}>
            {loading ? "Searching..." : "View Receipt"}
          </button>
        </div>
      </section>

      <section style={containerStyle}>
        {loading ? (
          <div style={messageStyle}>Loading shipment receipt...</div>
        ) : shipment ? (
          <div style={receiptStyle}>
            <div style={receiptHeaderStyle}>
              <div>
                <p style={miniBadgeStyle}>NAMLOGIX AFRICA</p>
                <h2 style={receiptTitleStyle}>Shipment Receipt</h2>
              </div>

              <p style={receiptCodeStyle}>{shipment.tracking_code}</p>
            </div>

            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Shipment Details</h3>

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

              <p style={textStyle}>
                <strong>Route:</strong>{" "}
                {shipment.current_location || "Origin"} →{" "}
                {shipment.destination || "Destination"}
              </p>

              <p style={textStyle}>
                <strong>Customer:</strong> {shipment.customer_name || "N/A"}
              </p>

              <p style={textStyle}>
                <strong>Service:</strong> {shipment.service_type || "N/A"}
              </p>

              <p style={textStyle}>
                <strong>Contact:</strong> {shipment.contact_number || "N/A"}
              </p>
            </section>

            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Driver & Vehicle</h3>

              {assignment ? (
                <>
                  <p style={textStyle}>
                    <strong>Driver:</strong>{" "}
                    {assignment.driver_name || "N/A"}
                  </p>

                  <p style={textStyle}>
                    <strong>Driver Phone:</strong>{" "}
                    {assignment.driver_phone || "N/A"}
                  </p>

                  <p style={textStyle}>
                    <strong>Vehicle:</strong>{" "}
                    {assignment.vehicle_name || "N/A"}
                  </p>

                  <p style={textStyle}>
                    <strong>Registration:</strong>{" "}
                    {assignment.vehicle_registration || "N/A"}
                  </p>

                  <p style={smallTextStyle}>
                    Assigned:{" "}
                    {assignment.assigned_at
                      ? new Date(assignment.assigned_at).toLocaleString()
                      : "N/A"}
                  </p>
                </>
              ) : (
                <p style={mutedTextStyle}>
                  No driver has been assigned yet.
                </p>
              )}
            </section>

            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Proof of Delivery</h3>

              {proof ? (
                <>
                  <p style={deliveredBadgeStyle}>DELIVERED</p>

                  <p style={textStyle}>
                    <strong>Receiver:</strong>{" "}
                    {proof.receiver_name || "N/A"}
                  </p>

                  <p style={textStyle}>
                    <strong>Receiver Phone:</strong>{" "}
                    {proof.receiver_phone || "N/A"}
                  </p>

                  <p style={textStyle}>
                    <strong>Notes:</strong>{" "}
                    {proof.delivery_notes || "No notes"}
                  </p>

                  <p style={smallTextStyle}>
                    Delivered:{" "}
                    {proof.delivered_at
                      ? new Date(proof.delivered_at).toLocaleString()
                      : "N/A"}
                  </p>
                </>
              ) : (
                <p style={mutedTextStyle}>
                  Delivery proof is not available yet.
                </p>
              )}
            </section>
          </div>
        ) : searched ? (
          <div style={messageStyle}>
            No shipment receipt found for that tracking code.
          </div>
        ) : (
          <div style={messageStyle}>
            Enter your tracking code above to view your receipt.
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

const searchBoxStyle = {
  maxWidth: 780,
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
  background: "#f97316",
  color: "white",
  border: "none",
  padding: "16px 20px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const containerStyle = {
  maxWidth: 1000,
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

const receiptStyle = {
  background: "white",
  borderRadius: 30,
  padding: 30,
  border: "1px solid #e5e7eb",
  boxShadow: "0 18px 45px rgba(15,23,42,0.08)",
};

const receiptHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 20,
  alignItems: "center",
  flexWrap: "wrap" as const,
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: 24,
  marginBottom: 24,
};

const miniBadgeStyle = {
  color: "#f97316",
  fontWeight: 900,
  letterSpacing: 1,
  margin: 0,
};

const receiptTitleStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0 0",
};

const receiptCodeStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "10px 14px",
  borderRadius: 999,
  fontWeight: 900,
};

const sectionStyle = {
  padding: "22px 0",
  borderBottom: "1px solid #e5e7eb",
};

const sectionTitleStyle = {
  fontSize: 22,
  fontWeight: 900,
  color: "#0f172a",
  marginBottom: 14,
};

const textStyle = {
  color: "#475569",
  lineHeight: 1.7,
  margin: "8px 0",
};

const mutedTextStyle = {
  color: "#94a3b8",
  fontWeight: 700,
};

const smallTextStyle = {
  color: "#94a3b8",
  fontSize: 13,
  marginTop: 14,
};

const progressOuterStyle = {
  width: "100%",
  height: 14,
  background: "#e5e7eb",
  borderRadius: 999,
  overflow: "hidden",
  margin: "12px 0",
};

const progressInnerStyle = {
  height: "100%",
  background: "#f97316",
  borderRadius: 999,
};

const deliveredBadgeStyle = {
  display: "inline-block",
  background: "#dcfce7",
  color: "#166534",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
};