// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function AdminTransportPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("transport_bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load bookings: " + error.message);
    } else {
      setBookings(data || []);
    }

    setLoading(false);
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("transport_bookings")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("Failed to update booking: " + error.message);
    } else {
      fetchBookings();
    }
  }

  async function deleteBooking(id) {
    if (!confirm("Delete this booking?")) return;

    const { error } = await supabase
      .from("transport_bookings")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Failed to delete booking: " + error.message);
    } else {
      fetchBookings();
    }
  }

  const pending = bookings.filter((b) => b.status === "pending").length;
  const accepted = bookings.filter((b) => b.status === "accepted").length;
  const completed = bookings.filter((b) => b.status === "completed").length;

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>ADMIN TRANSPORT</p>

          <h1 style={titleStyle}>Transport Booking Control</h1>

          <p style={descStyle}>
            Manage local transport, hospital trips, home-to-work rides, goods
            movement, and business transport requests from one admin panel.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/transport" style={buttonOrange}>
              🚕 Public Transport Page
            </Link>

            <Link href="/admin/drivers" style={buttonBlue}>
              🚗 Drivers
            </Link>

            <Link href="/admin/inquiries" style={buttonWhite}>
              📩 Inquiries
            </Link>
          </div>
        </section>

        <section style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Total</p>
            <h3 style={statValueStyle}>{bookings.length}</h3>
            <p style={statTextStyle}>All bookings</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Pending</p>
            <h3 style={statValueStyle}>{pending}</h3>
            <p style={statTextStyle}>Needs action</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Accepted</p>
            <h3 style={statValueStyle}>{accepted}</h3>
            <p style={statTextStyle}>Approved trips</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Completed</p>
            <h3 style={statValueStyle}>{completed}</h3>
            <p style={statTextStyle}>Finished trips</p>
          </div>
        </section>

        <section style={cardStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={formTitleStyle}>🚕 Transport Bookings</h2>
              <p style={formDescStyle}>
                Bookings submitted from the public transport request page.
              </p>
            </div>

            <button onClick={fetchBookings} style={smallButtonStyle}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={emptyTextStyle}>Loading transport bookings...</p>
          ) : bookings.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={{ fontSize: 44 }}>🚕</div>
              <h3 style={{ margin: "12px 0 6px", fontSize: 24 }}>
                No transport bookings yet
              </h3>
              <p style={{ color: "#64748b", margin: 0 }}>
                Bookings from the public transport page will appear here.
              </p>
            </div>
          ) : (
            <div style={gridStyle}>
              {bookings.map((booking) => (
                <article key={booking.id} style={itemCardStyle}>
                  <div style={cardTopStyle}>
                    <div>
                      <h3 style={itemTitleStyle}>
                        {booking.pickup_location} →{" "}
                        {booking.dropoff_location}
                      </h3>

                      <p style={itemSubStyle}>
                        {booking.booking_type || "Transport Booking"}
                      </p>
                    </div>

                    <span
                      style={
                        booking.status === "completed"
                          ? completedBadgeStyle
                          : booking.status === "accepted"
                          ? acceptedBadgeStyle
                          : pendingBadgeStyle
                      }
                    >
                      {booking.status || "pending"}
                    </span>
                  </div>

                  <div style={detailGridStyle}>
                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Customer</p>
                      <p style={detailValueStyle}>
                        {booking.customer_name || "-"}
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Phone</p>
                      <p style={detailValueStyle}>{booking.phone || "-"}</p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Date</p>
                      <p style={detailValueStyle}>
                        {booking.preferred_date || "-"}
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Time</p>
                      <p style={detailValueStyle}>
                        {booking.preferred_time || "-"}
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Passengers</p>
                      <p style={detailValueStyle}>
                        {booking.passengers || 1}
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Reason</p>
                      <p style={detailValueStyle}>
                        {booking.trip_reason || "-"}
                      </p>
                    </div>
                  </div>

                  {booking.cargo_description && (
                    <div style={messageBoxStyle}>
                      <strong>Goods:</strong> {booking.cargo_description}
                    </div>
                  )}

                  <p style={dateStyle}>
                    Created: {new Date(booking.created_at).toLocaleString()}
                  </p>

                  <div style={actionsStyle}>
                    <button
                      onClick={() => updateStatus(booking.id, "accepted")}
                      style={buttonBlueSmall}
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => updateStatus(booking.id, "completed")}
                      style={buttonGreenSmall}
                    >
                      Complete
                    </button>

                    <button
                      onClick={() => deleteBooking(booking.id)}
                      style={buttonDangerSmall}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f6f8fc",
  padding: "40px 24px",
};

const containerStyle = {
  maxWidth: 1100,
  margin: "0 auto",
};

const heroStyle = {
  background: "linear-gradient(135deg, #0b1220, #1e3a8a, #f97316)",
  color: "white",
  borderRadius: 28,
  padding: 36,
  marginBottom: 24,
  boxShadow: "0 20px 40px rgba(15,23,42,0.22)",
};

const badgeStyle = {
  color: "#fed7aa",
  fontWeight: 900,
  letterSpacing: 1,
  margin: 0,
};

const titleStyle = {
  fontSize: 42,
  fontWeight: 900,
  margin: "10px 0",
};

const descStyle = {
  maxWidth: 760,
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.85)",
};

const buttonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 24,
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
  marginBottom: 24,
};

const statCardStyle = {
  background: "white",
  borderRadius: 22,
  padding: 22,
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
};

const statLabelStyle = {
  color: "#64748b",
  fontWeight: 800,
  margin: 0,
};

const statValueStyle = {
  fontSize: 30,
  fontWeight: 900,
  margin: "8px 0",
  color: "#0f172a",
};

const statTextStyle = {
  color: "#64748b",
  margin: 0,
};

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.10)",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  alignItems: "center",
  marginBottom: 24,
  flexWrap: "wrap",
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

const smallButtonStyle = {
  background: "#1d4ed8",
  color: "white",
  padding: "11px 16px",
  borderRadius: 14,
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
};

const emptyTextStyle = {
  color: "#64748b",
};

const emptyStateStyle = {
  textAlign: "center",
  padding: 50,
  background: "#f8fafc",
  borderRadius: 20,
  border: "1px dashed #cbd5e1",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 18,
};

const itemCardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: 22,
  padding: 22,
  background: "#ffffff",
  boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
};

const cardTopStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 14,
  marginBottom: 18,
};

const itemTitleStyle = {
  fontSize: 20,
  fontWeight: 900,
  margin: 0,
  color: "#0f172a",
};

const itemSubStyle = {
  margin: "6px 0 0",
  color: "#64748b",
};

const pendingBadgeStyle = {
  background: "#ffedd5",
  color: "#c2410c",
  borderRadius: 999,
  padding: "6px 10px",
  height: "fit-content",
  fontSize: 12,
  fontWeight: 900,
};

const acceptedBadgeStyle = {
  background: "#dbeafe",
  color: "#1d4ed8",
  borderRadius: 999,
  padding: "6px 10px",
  height: "fit-content",
  fontSize: 12,
  fontWeight: 900,
};

const completedBadgeStyle = {
  background: "#dcfce7",
  color: "#15803d",
  borderRadius: 999,
  padding: "6px 10px",
  height: "fit-content",
  fontSize: 12,
  fontWeight: 900,
};

const detailGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 10,
};

const detailBoxStyle = {
  background: "#f8fafc",
  borderRadius: 16,
  padding: 12,
};

const detailLabelStyle = {
  color: "#94a3b8",
  fontSize: 12,
  margin: 0,
};

const detailValueStyle = {
  color: "#0f172a",
  fontWeight: 800,
  margin: "4px 0 0",
};

const messageBoxStyle = {
  marginTop: 14,
  background: "#f8fafc",
  borderRadius: 16,
  padding: 14,
  color: "#475569",
  lineHeight: 1.6,
};

const dateStyle = {
  color: "#94a3b8",
  fontSize: 12,
  marginTop: 14,
};

const actionsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginTop: 18,
};

const buttonBlue = {
  background: "#1d4ed8",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonWhite = {
  background: "white",
  color: "#1d4ed8",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonOrange = {
  background: "#f97316",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonBlueSmall = {
  ...buttonBlue,
  padding: "10px 14px",
  fontSize: 14,
  border: "none",
  cursor: "pointer",
};

const buttonGreenSmall = {
  background: "#16a34a",
  color: "white",
  padding: "10px 14px",
  borderRadius: 14,
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
};

const buttonDangerSmall = {
  background: "#dc2626",
  color: "white",
  padding: "10px 14px",
  borderRadius: 14,
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
};