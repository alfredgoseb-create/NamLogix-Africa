"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type TrackingUpdate = {
  id: string;
  tracking_number: string;
  customer_name: string;
  route: string;
  progress: string;
  status: string;
  notes: string;
};

export default function AdminTrackingManagementPage() {
  const [trackingItems, setTrackingItems] = useState<TrackingUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTracking();
  }, []);

  async function fetchTracking() {
    const { data, error } = await supabase
      .from("tracking_updates")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setTrackingItems(data);
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN CONTROL</p>

        <h1 style={titleStyle}>Tracking Management</h1>

        <p style={descStyle}>
          Monitor live tracking records, trip progress, customer deliveries,
          cargo movement, and transporter updates from Supabase.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/tracking-create" style={primaryButtonStyle}>
            Create Tracking
          </Link>

          <Link href="/live-tracking" style={secondaryButtonStyle}>
            Live Tracking
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>LIVE TRACKING CONTROL</p>

          <h2 style={sectionTitleStyle}>Tracking Records</h2>

          <p style={sectionTextStyle}>
            Tracking records created through the platform appear here. Later
            admins can update progress, status, and delivery notes.
          </p>
        </div>

        {loading ? (
          <div style={loadingStyle}>Loading tracking records...</div>
        ) : trackingItems.length === 0 ? (
          <div style={emptyStyle}>No tracking records found yet.</div>
        ) : (
          <div style={gridStyle}>
            {trackingItems.map((item) => (
              <article key={item.id} style={cardStyle}>
                <div style={statusStyle}>{item.status || "preparing"}</div>

                <h3 style={cardTitleStyle}>
                  {item.tracking_number || "Tracking Record"}
                </h3>

                <p style={cardTextStyle}>
                  <strong>Customer:</strong> {item.customer_name || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Route:</strong> {item.route || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Progress:</strong> {item.progress || "0%"}
                </p>

                <div style={progressWrapStyle}>
                  <div
                    style={{
                      ...progressBarStyle,
                      width: item.progress || "0%",
                    }}
                  />
                </div>

                <p style={descriptionStyle}>{item.notes || "No notes"}</p>

                <div style={cardActionsStyle}>
                  <Link href="/tracking-create" style={darkButtonStyle}>
                    Add Update
                  </Link>

                  <Link href="/customer-tracking" style={lightButtonStyle}>
                    Customer View
                  </Link>
                </div>
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
    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.92), rgba(249,115,22,0.88))",
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
  maxWidth: 860,
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
  color: "#1d4ed8",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const containerStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "60px 24px",
};

const sectionHeaderStyle = {
  marginBottom: 30,
};

const sectionBadgeStyle = {
  color: "#f97316",
  fontWeight: 900,
  letterSpacing: 1,
};

const sectionTitleStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0",
};

const sectionTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
  maxWidth: 780,
};

const loadingStyle = {
  background: "white",
  padding: 40,
  borderRadius: 24,
  textAlign: "center" as const,
  fontWeight: 900,
};

const emptyStyle = {
  background: "white",
  padding: 40,
  borderRadius: 24,
  textAlign: "center" as const,
  color: "#64748b",
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

const statusStyle = {
  display: "inline-block",
  background: "#dcfce7",
  color: "#166534",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
  marginBottom: 18,
};

const cardTitleStyle = {
  fontSize: 26,
  fontWeight: 900,
  color: "#0f172a",
};

const cardTextStyle = {
  color: "#475569",
  lineHeight: 1.7,
};

const progressWrapStyle = {
  width: "100%",
  height: 12,
  background: "#e5e7eb",
  borderRadius: 999,
  overflow: "hidden",
  marginTop: 14,
};

const progressBarStyle = {
  height: "100%",
  background: "#f97316",
  borderRadius: 999,
};

const descriptionStyle = {
  color: "#64748b",
  lineHeight: 1.7,
  marginTop: 14,
};

const cardActionsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap" as const,
  marginTop: 22,
};

const darkButtonStyle = {
  background: "#0f172a",
  color: "white",
  padding: "12px 15px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const lightButtonStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "12px 15px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};