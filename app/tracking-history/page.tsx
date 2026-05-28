"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type TrackingHistory = {
  id: string;
  tracking_code: string;
  status: string;
  location: string;
  notes: string;
  created_at: string;
};

export default function TrackingHistoryPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [history, setHistory] = useState<TrackingHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function searchTrackingHistory() {
    if (!trackingCode.trim()) {
      alert("Please enter a tracking code.");
      return;
    }

    setLoading(true);
    setSearched(true);

    const { data, error } = await supabase
      .from("tracking_history")
      .select("*")
      .eq("tracking_code", trackingCode.trim())
      .order("created_at", { ascending: true });

    if (error) {
      alert(error.message);
      setHistory([]);
    } else {
      setHistory(data || []);
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>SHIPMENT TIMELINE</p>

        <h1 style={titleStyle}>Tracking History</h1>

        <p style={descStyle}>
          View the complete shipment journey from pickup to delivery.
        </p>

        <div style={searchBoxStyle}>
          <input
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            placeholder="Enter tracking code"
            style={inputStyle}
          />

          <button
            onClick={searchTrackingHistory}
            style={buttonStyle}
          >
            {loading ? "Searching..." : "View Timeline"}
          </button>
        </div>
      </section>

      <section style={containerStyle}>
        {loading ? (
          <div style={messageStyle}>Loading timeline...</div>
        ) : history.length > 0 ? (
          <div style={timelineStyle}>
            {history.map((item, index) => (
              <div key={item.id} style={timelineItemStyle}>
                <div style={timelineDotStyle} />

                {index !== history.length - 1 && (
                  <div style={timelineLineStyle} />
                )}

                <div style={timelineCardStyle}>
                  <p style={statusStyle}>{item.status}</p>

                  <h2 style={locationStyle}>
                    {item.location || "Unknown Location"}
                  </h2>

                  <p style={notesStyle}>
                    {item.notes || "No notes"}
                  </p>

                  <p style={dateStyle}>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : searched ? (
          <div style={messageStyle}>
            No tracking history found.
          </div>
        ) : (
          <div style={messageStyle}>
            Enter your tracking code to view shipment history.
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

const timelineStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 24,
};

const timelineItemStyle = {
  position: "relative" as const,
  paddingLeft: 50,
};

const timelineDotStyle = {
  position: "absolute" as const,
  left: 0,
  top: 12,
  width: 18,
  height: 18,
  borderRadius: "50%",
  background: "#f97316",
};

const timelineLineStyle = {
  position: "absolute" as const,
  left: 8,
  top: 30,
  width: 2,
  height: "100%",
  background: "#cbd5e1",
};

const timelineCardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 24,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const statusStyle = {
  display: "inline-block",
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
};

const locationStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
  marginTop: 16,
};

const notesStyle = {
  color: "#475569",
  lineHeight: 1.7,
  marginTop: 12,
};

const dateStyle = {
  color: "#94a3b8",
  fontSize: 13,
  marginTop: 16,
};