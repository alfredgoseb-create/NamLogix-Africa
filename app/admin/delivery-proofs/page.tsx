"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type DeliveryProof = {
  id: string;
  shipment_id: string;
  tracking_code: string;
  receiver_name: string;
  receiver_phone: string;
  delivery_notes: string;
  delivered_at: string;
};

export default function DeliveryProofsPage() {
  const [proofs, setProofs] = useState<DeliveryProof[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProofs();
  }, []);

  async function fetchProofs() {
    setLoading(true);

    const { data, error } = await supabase
      .from("delivery_proofs")
      .select("*")
      .order("delivered_at", { ascending: false });

    if (error) {
      alert("Failed to load delivery proofs: " + error.message);
    } else {
      setProofs(data || []);
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>PROOF OF DELIVERY</p>

        <h1 style={titleStyle}>Delivery Proofs</h1>

        <p style={descStyle}>
          View completed deliveries, receiver details, delivery notes, and final
          proof records for NamLogix Africa shipments.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/admin/tracking-management" style={primaryButtonStyle}>
            Tracking Management
          </Link>

          <button onClick={fetchProofs} style={secondaryButtonStyle}>
            Refresh
          </button>
        </div>
      </section>

      <section style={containerStyle}>
        {loading ? (
          <div style={messageStyle}>Loading delivery proofs...</div>
        ) : proofs.length === 0 ? (
          <div style={messageStyle}>No delivery proofs found yet.</div>
        ) : (
          <div style={gridStyle}>
            {proofs.map((proof) => (
              <article key={proof.id} style={cardStyle}>
                <p style={codeStyle}>{proof.tracking_code || "No Code"}</p>

                <h2 style={cardTitleStyle}>
                  Delivered to {proof.receiver_name || "Receiver"}
                </h2>

                <p style={textStyle}>
                  <strong>Receiver Phone:</strong>{" "}
                  {proof.receiver_phone || "N/A"}
                </p>

                <p style={textStyle}>
                  <strong>Delivery Notes:</strong>{" "}
                  {proof.delivery_notes || "No notes"}
                </p>

                <p style={smallTextStyle}>
                  Delivered:{" "}
                  {proof.delivered_at
                    ? new Date(proof.delivered_at).toLocaleString()
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
  justifyContent: "center",
  gap: 14,
  marginTop: 30,
  flexWrap: "wrap" as const,
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
  fontWeight: 900,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
  background: "#dcfce7",
  color: "#166534",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
};

const cardTitleStyle = {
  fontSize: 26,
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