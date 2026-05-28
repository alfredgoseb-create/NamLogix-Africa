"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function AdminTrackingManagementPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleRegistration, setVehicleRegistration] = useState("");

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
      alert("Failed to load tracking records: " + error.message);
    } else {
      setShipments(data || []);
    }

    setLoading(false);
  }

  async function updateProgress(id: string, progress: number, status: string) {
    setUpdatingId(id);

    const shipment = shipments.find((s) => s.id === id);

    const { error } = await supabase
      .from("shipment_tracking")
      .update({ progress, status })
      .eq("id", id);

    if (!error && shipment) {
      await supabase.from("tracking_history").insert([
        {
          shipment_id: shipment.id,
          tracking_code: shipment.tracking_code,
          status,
          location: shipment.current_location,
          notes: `Shipment updated to ${status}`,
        },
      ]);
    }

    setUpdatingId("");

    if (error) {
      alert("Failed to update tracking: " + error.message);
      return;
    }

    fetchShipments();
  }

  async function assignDriver(shipment: Shipment) {
    if (!driverName || !vehicleName) {
      alert("Please enter driver name and vehicle name.");
      return;
    }

    setUpdatingId(shipment.id);

    const { error } = await supabase.from("shipment_assignments").insert([
      {
        shipment_id: shipment.id,
        tracking_code: shipment.tracking_code,
        driver_name: driverName,
        driver_phone: driverPhone,
        vehicle_name: vehicleName,
        vehicle_registration: vehicleRegistration,
      },
    ]);

    if (error) {
      setUpdatingId("");
      alert("Failed to assign driver: " + error.message);
      return;
    }

    await supabase
      .from("shipment_tracking")
      .update({
        status: "driver_assigned",
        progress: 20,
      })
      .eq("id", shipment.id);

    await supabase.from("tracking_history").insert([
      {
        shipment_id: shipment.id,
        tracking_code: shipment.tracking_code,
        status: "driver_assigned",
        location: shipment.current_location,
        notes: `Driver ${driverName} assigned with vehicle ${vehicleName}`,
      },
    ]);

    setDriverName("");
    setDriverPhone("");
    setVehicleName("");
    setVehicleRegistration("");
    setUpdatingId("");

    alert("Driver assigned successfully.");

    fetchShipments();
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>TRACKING CONTROL CENTER</p>

        <h1 style={titleStyle}>Tracking Management</h1>

        <p style={descStyle}>
          Monitor approved bookings, shipment movement, customer details, driver
          assignment, pickup status, transit status, and delivery completion.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/admin/dashboard" style={primaryButtonStyle}>
            Admin Dashboard
          </Link>

          <Link href="/admin/booking-management" style={secondaryLinkStyle}>
            Booking Management
          </Link>

          <button onClick={fetchShipments} style={secondaryButtonStyle}>
            Refresh
          </button>
        </div>
      </section>

      <section style={containerStyle}>
        {loading ? (
          <div style={messageStyle}>Loading tracking records...</div>
        ) : shipments.length === 0 ? (
          <div style={messageStyle}>
            No tracking records found yet. Approve a booking first.
          </div>
        ) : (
          <div style={gridStyle}>
            {shipments.map((shipment) => (
              <article key={shipment.id} style={cardStyle}>
                <div style={topRowStyle}>
                  <span style={trackingStyle}>
                    {shipment.tracking_code || "No Code"}
                  </span>

                  <span style={statusStyle}>
                    {shipment.status || "pending"}
                  </span>
                </div>

                <h2 style={routeStyle}>
                  {shipment.current_location || "Origin"} →{" "}
                  {shipment.destination || "Destination"}
                </h2>

                <p style={textStyle}>
                  <strong>Customer:</strong>{" "}
                  {shipment.customer_name || "N/A"}
                </p>

                <p style={textStyle}>
                  <strong>Service:</strong> {shipment.service_type || "N/A"}
                </p>

                <p style={textStyle}>
                  <strong>Contact:</strong> {shipment.contact_number || "N/A"}
                </p>

                <p style={progressTextStyle}>
                  Shipment Progress: {shipment.progress || 0}%
                </p>

                <div style={progressBarStyle}>
                  <div
                    style={{
                      ...progressFillStyle,
                      width: `${shipment.progress || 0}%`,
                    }}
                  />
                </div>

                <div style={assignmentBoxStyle}>
                  <input
                    placeholder="Driver Name"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    style={inputStyle}
                  />

                  <input
                    placeholder="Driver Phone"
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    style={inputStyle}
                  />

                  <input
                    placeholder="Vehicle Name"
                    value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                    style={inputStyle}
                  />

                  <input
                    placeholder="Vehicle Registration"
                    value={vehicleRegistration}
                    onChange={(e) => setVehicleRegistration(e.target.value)}
                    style={inputStyle}
                  />

                  <button
                    disabled={updatingId === shipment.id}
                    style={assignDriverButtonStyle}
                    onClick={() => assignDriver(shipment)}
                  >
                    Assign Driver
                  </button>
                </div>

                <div style={buttonGridStyle}>
                  <button
                    disabled={updatingId === shipment.id}
                    style={actionButtonStyle}
                    onClick={() =>
                      updateProgress(shipment.id, 10, "pending_pickup")
                    }
                  >
                    Pending Pickup
                  </button>

                  <button
                    disabled={updatingId === shipment.id}
                    style={actionButtonStyle}
                    onClick={() =>
                      updateProgress(shipment.id, 35, "picked_up")
                    }
                  >
                    Picked Up
                  </button>

                  <button
                    disabled={updatingId === shipment.id}
                    style={actionButtonStyle}
                    onClick={() =>
                      updateProgress(shipment.id, 65, "in_transit")
                    }
                  >
                    In Transit
                  </button>

                  <button
                    disabled={updatingId === shipment.id}
                    style={deliveredButtonStyle}
                    onClick={() =>
                      updateProgress(shipment.id, 100, "delivered")
                    }
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
  maxWidth: 900,
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

const secondaryLinkStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
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
  maxWidth: 1300,
  margin: "0 auto",
  padding: "60px 24px",
};

const messageStyle = {
  background: "white",
  padding: 40,
  borderRadius: 24,
  textAlign: "center" as const,
  fontWeight: 900,
  color: "#64748b",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const topRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  flexWrap: "wrap" as const,
};

const trackingStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
};

const statusStyle = {
  background: "#dcfce7",
  color: "#166534",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
};

const routeStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
  marginTop: 20,
};

const textStyle = {
  color: "#475569",
  lineHeight: 1.7,
  margin: "8px 0",
};

const progressTextStyle = {
  color: "#475569",
  marginTop: 16,
  fontWeight: 700,
};

const progressBarStyle = {
  width: "100%",
  height: 14,
  background: "#e5e7eb",
  borderRadius: 999,
  overflow: "hidden",
  marginTop: 10,
};

const progressFillStyle = {
  height: "100%",
  background: "#f97316",
  borderRadius: 999,
};

const assignmentBoxStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 10,
  marginTop: 22,
  padding: 16,
  borderRadius: 18,
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
};

const inputStyle = {
  padding: "12px",
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  fontSize: 14,
};

const assignDriverButtonStyle = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const buttonGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 12,
  marginTop: 24,
};

const actionButtonStyle = {
  background: "#0f172a",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const deliveredButtonStyle = {
  ...actionButtonStyle,
  background: "#16a34a",
};

const smallTextStyle = {
  color: "#94a3b8",
  fontSize: 13,
  marginTop: 18,
};