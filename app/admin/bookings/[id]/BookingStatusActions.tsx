// @ts-nocheck
"use client";

import { supabase } from "@/lib/supabaseClient";

export default function BookingStatusActions({ bookingId }) {
  async function updateStatus(status) {
    const { error } = await supabase
      .from("trip_bookings")
      .update({ status })
      .eq("id", bookingId);

    if (error) {
      alert("Failed to update booking status: " + error.message);
      return;
    }

    alert("Booking status updated.");
    window.location.reload();
  }

  return (
    <div style={buttonRowStyle}>
      <button onClick={() => updateStatus("confirmed")} style={blueButtonStyle}>
        Confirm Booking
      </button>

      <button onClick={() => updateStatus("cancelled")} style={redButtonStyle}>
        Cancel Booking
      </button>

      <button onClick={() => updateStatus("completed")} style={greenButtonStyle}>
        Mark Completed
      </button>
    </div>
  );
}

const buttonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap" as const,
  marginTop: 18,
};

const blueButtonStyle = {
  background: "#1d4ed8",
  color: "white",
  border: "none",
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const redButtonStyle = {
  ...blueButtonStyle,
  background: "#dc2626",
};

const greenButtonStyle = {
  ...blueButtonStyle,
  background: "#16a34a",
};