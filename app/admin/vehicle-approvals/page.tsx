"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Vehicle = {
  id: string;
  vehicle_name: string;
  vehicle_type: string;
  registration_number: string;
  capacity: string;
  route_area: string;
  owner_name: string;
  contact_number: string;
  status: string;
};

export default function VehicleApprovalsPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setVehicles(data);
    }

    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("vehicles").update({ status }).eq("id", id);
    fetchVehicles();
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN CONTROL</p>
        <h1 style={titleStyle}>Vehicle Approvals</h1>
        <p style={descStyle}>
          Review registered vehicles, approve transport units, suspend vehicles,
          and manage fleet readiness from Supabase.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/vehicle-register" style={primaryButtonStyle}>
            Register Vehicle
          </Link>

          <Link href="/my-vehicles" style={secondaryButtonStyle}>
            My Vehicles
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>LIVE VEHICLE QUEUE</p>
          <h2 style={sectionTitleStyle}>Vehicles Awaiting Review</h2>
          <p style={sectionTextStyle}>
            Vehicles submitted through the registration form appear here for
            admin approval.
          </p>
        </div>

        {loading ? (
          <div style={loadingStyle}>Loading vehicles...</div>
        ) : vehicles.length === 0 ? (
          <div style={emptyStyle}>No vehicles registered yet.</div>
        ) : (
          <div style={gridStyle}>
            {vehicles.map((vehicle) => (
              <article key={vehicle.id} style={cardStyle}>
                <div style={statusStyle}>{vehicle.status || "pending"}</div>

                <h3 style={cardTitleStyle}>
                  {vehicle.vehicle_name || "Unnamed Vehicle"}
                </h3>

                <p style={cardTextStyle}>
                  <strong>Type:</strong> {vehicle.vehicle_type || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Registration:</strong>{" "}
                  {vehicle.registration_number || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Capacity:</strong> {vehicle.capacity || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Route:</strong> {vehicle.route_area || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Owner:</strong> {vehicle.owner_name || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Contact:</strong> {vehicle.contact_number || "N/A"}
                </p>

                <div style={cardActionsStyle}>
                  <button
                    type="button"
                    onClick={() => updateStatus(vehicle.id, "approved")}
                    style={approveButtonStyle}
                  >
                    Approve
                  </button>

                  <button
                    type="button"
                    onClick={() => updateStatus(vehicle.id, "suspended")}
                    style={suspendButtonStyle}
                  >
                    Suspend
                  </button>

                  <button
                    type="button"
                    onClick={() => updateStatus(vehicle.id, "pending")}
                    style={pendingButtonStyle}
                  >
                    Pending
                  </button>
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
  background: "#fff7ed",
  color: "#c2410c",
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

const cardActionsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap" as const,
  marginTop: 22,
};

const approveButtonStyle = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "12px 15px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const suspendButtonStyle = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "12px 15px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const pendingButtonStyle = {
  background: "#0f172a",
  color: "white",
  border: "none",
  padding: "12px 15px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};