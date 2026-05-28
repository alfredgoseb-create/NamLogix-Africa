"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type BookingRequest = {
  id: string;
  customer_name: string;
  service_type: string;
  pickup_location: string;
  delivery_location: string;
  preferred_date: string;
  contact_number: string;
  notes: string;
  status: string;
};

export default function AdminBookingManagementPage() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("booking_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load bookings: " + error.message);
    } else {
      setBookings(data || []);
    }

    setLoading(false);
  }

  async function updateBookingStatus(id: string, status: string) {
    setUpdatingId(id);

    const { error } = await supabase
      .from("booking_requests")
      .update({ status })
      .eq("id", id);

    setUpdatingId("");

    if (error) {
      alert("Failed to update booking: " + error.message);
      return;
    }

    fetchBookings();
  }

  function getStatusStyle(status: string) {
    if (status === "approved") return approvedStatusStyle;
    if (status === "assigned") return assignedStatusStyle;
    if (status === "completed") return completedStatusStyle;
    if (status === "cancelled") return cancelledStatusStyle;
    return statusStyle;
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN CONTROL</p>

        <h1 style={titleStyle}>Booking Management</h1>

        <p style={descStyle}>
          Review live cargo bookings, ride requests, warehouse deliveries,
          customer jobs, and transporter assignments from Supabase.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/booking-create" style={primaryButtonStyle}>
            Create Booking
          </Link>

          <Link href="/booking-requests" style={secondaryButtonStyle}>
            Public Bookings
          </Link>

          <button onClick={fetchBookings} style={whiteButtonStyle}>
            Refresh
          </button>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={statsGridStyle}>
          <article style={statCardStyle}>
            <p style={statLabelStyle}>Total</p>
            <h2 style={statValueStyle}>{bookings.length}</h2>
            <p style={statTextStyle}>Booking requests</p>
          </article>

          <article style={statCardStyle}>
            <p style={statLabelStyle}>New</p>
            <h2 style={statValueStyle}>
              {
                bookings.filter(
                  (booking) =>
                    !booking.status || booking.status === "new_request"
                ).length
              }
            </h2>
            <p style={statTextStyle}>Awaiting review</p>
          </article>

          <article style={statCardStyle}>
            <p style={statLabelStyle}>Approved</p>
            <h2 style={statValueStyle}>
              {
                bookings.filter((booking) => booking.status === "approved")
                  .length
              }
            </h2>
            <p style={statTextStyle}>Ready for assignment</p>
          </article>

          <article style={statCardStyle}>
            <p style={statLabelStyle}>Completed</p>
            <h2 style={statValueStyle}>
              {
                bookings.filter((booking) => booking.status === "completed")
                  .length
              }
            </h2>
            <p style={statTextStyle}>Finished jobs</p>
          </article>
        </div>

        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>LIVE BOOKING QUEUE</p>

          <h2 style={sectionTitleStyle}>Bookings Requiring Review</h2>

          <p style={sectionTextStyle}>
            Bookings submitted through the platform appear here. Admins can
            approve, assign, complete, cancel, match transport, and open
            tracking.
          </p>
        </div>

        {loading ? (
          <div style={loadingStyle}>Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div style={emptyStyle}>No booking requests found yet.</div>
        ) : (
          <div style={gridStyle}>
            {bookings.map((booking) => (
              <article key={booking.id} style={cardStyle}>
                <div style={getStatusStyle(booking.status || "new_request")}>
                  {booking.status || "new_request"}
                </div>

                <h3 style={cardTitleStyle}>
                  {booking.service_type || "Service Request"}
                </h3>

                <p style={cardTextStyle}>
                  <strong>Customer:</strong>{" "}
                  {booking.customer_name || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Pickup:</strong>{" "}
                  {booking.pickup_location || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Delivery:</strong>{" "}
                  {booking.delivery_location || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Date:</strong>{" "}
                  {booking.preferred_date || "Flexible"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Contact:</strong>{" "}
                  {booking.contact_number || "N/A"}
                </p>

                <p style={descriptionStyle}>{booking.notes || "No notes"}</p>

                <div style={statusButtonRowStyle}>
                  <button
                    onClick={() =>
                      updateBookingStatus(booking.id, "approved")
                    }
                    disabled={updatingId === booking.id}
                    style={approveButtonStyle}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateBookingStatus(booking.id, "assigned")
                    }
                    disabled={updatingId === booking.id}
                    style={assignButtonStyle}
                  >
                    Assign
                  </button>

                  <button
                    onClick={() =>
                      updateBookingStatus(booking.id, "completed")
                    }
                    disabled={updatingId === booking.id}
                    style={completeButtonStyle}
                  >
                    Complete
                  </button>

                  <button
                    onClick={() =>
                      updateBookingStatus(booking.id, "cancelled")
                    }
                    disabled={updatingId === booking.id}
                    style={cancelButtonStyle}
                  >
                    Cancel
                  </button>
                </div>

                <div style={cardActionsStyle}>
                  <Link href="/cargo-matching" style={darkButtonStyle}>
                    Match Transport
                  </Link>

                  <Link href="/live-tracking" style={lightButtonStyle}>
                    Tracking
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
  color: "#1d4ed8",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const whiteButtonStyle = {
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

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
  marginBottom: 42,
};

const statCardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 24,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const statLabelStyle = {
  color: "#64748b",
  fontWeight: 900,
  margin: 0,
};

const statValueStyle = {
  fontSize: 36,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0",
};

const statTextStyle = {
  color: "#64748b",
  margin: 0,
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
  maxWidth: 820,
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

const statusStyle = {
  display: "inline-block",
  background: "#fff7ed",
  color: "#c2410c",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
  marginBottom: 18,
};

const approvedStatusStyle = {
  ...statusStyle,
  background: "#dcfce7",
  color: "#166534",
};

const assignedStatusStyle = {
  ...statusStyle,
  background: "#dbeafe",
  color: "#1d4ed8",
};

const completedStatusStyle = {
  ...statusStyle,
  background: "#ede9fe",
  color: "#6d28d9",
};

const cancelledStatusStyle = {
  ...statusStyle,
  background: "#fee2e2",
  color: "#b91c1c",
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

const descriptionStyle = {
  color: "#64748b",
  lineHeight: 1.7,
  marginTop: 12,
};

const statusButtonRowStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap" as const,
  marginTop: 22,
};

const approveButtonStyle = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "11px 14px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const assignButtonStyle = {
  ...approveButtonStyle,
  background: "#1d4ed8",
};

const completeButtonStyle = {
  ...approveButtonStyle,
  background: "#7c3aed",
};

const cancelButtonStyle = {
  ...approveButtonStyle,
  background: "#dc2626",
};

const cardActionsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap" as const,
  marginTop: 18,
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