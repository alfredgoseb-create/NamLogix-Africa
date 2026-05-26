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

export default function FleetDashboardPage() {
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

  const approved = vehicles.filter((item) => item.status === "approved").length;
  const pending = vehicles.filter((item) => item.status === "pending").length;
  const suspended = vehicles.filter((item) => item.status === "suspended").length;

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>FLEET OPERATIONS</p>
        <h1 style={titleStyle}>Fleet Dashboard</h1>
        <p style={descStyle}>
          Monitor vehicles, fleet readiness, approval status, owners, routes,
          and available transport capacity from live Supabase data.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/vehicle-register" style={primaryButtonStyle}>
            Register Vehicle
          </Link>

          <Link href="/admin/vehicle-approvals" style={secondaryButtonStyle}>
            Vehicle Approvals
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={statsGridStyle}>
          <article style={statCardStyle}>
            <p style={statLabelStyle}>Total Vehicles</p>
            <h2 style={statValueStyle}>{vehicles.length}</h2>
            <p style={statTextStyle}>Registered fleet units</p>
          </article>

          <article style={statCardStyle}>
            <p style={statLabelStyle}>Approved</p>
            <h2 style={statValueStyle}>{approved}</h2>
            <p style={statTextStyle}>Ready for operations</p>
          </article>

          <article style={statCardStyle}>
            <p style={statLabelStyle}>Pending</p>
            <h2 style={statValueStyle}>{pending}</h2>
            <p style={statTextStyle}>Awaiting admin review</p>
          </article>

          <article style={statCardStyle}>
            <p style={statLabelStyle}>Suspended</p>
            <h2 style={statValueStyle}>{suspended}</h2>
            <p style={statTextStyle}>Temporarily inactive</p>
          </article>
        </div>

        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>LIVE FLEET LIST</p>
          <h2 style={sectionTitleStyle}>Vehicle Operations Overview</h2>
          <p style={sectionTextStyle}>
            This dashboard uses the same vehicles table as registration and
            admin approvals.
          </p>
        </div>

        {loading ? (
          <div style={loadingStyle}>Loading fleet...</div>
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

                <div style={cardActionsStyle}>
                  <Link href="/live-tracking" style={darkButtonStyle}>
                    Tracking
                  </Link>

                  <Link href="/booking-requests" style={lightButtonStyle}>
                    Assign Booking
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
  borderRadius: 26,
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
  fontSize: 38,
  fontWeight: 900,
  color: "#0f172a",
  margin: "10px 0",
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