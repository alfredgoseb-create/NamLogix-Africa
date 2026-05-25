"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Driver = {
  id: string;
  full_name: string;
  license_number: string;
  experience_years: string;
  phone: string;
  status: string;
  route_region: string;
};

export default function DriverProfilesPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  async function fetchDrivers() {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setDrivers(data);
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>TRANSPORT OPERATIONS</p>

        <h1 style={titleStyle}>Professional Driver Network</h1>

        <p style={descStyle}>
          Manage transport drivers, delivery teams, cargo operators,
          logistics crews, and regional transport professionals across Namibia
          and Southern Africa.
        </p>

        <div style={heroButtonsStyle}>
          <Link href="/driver-register" style={primaryButtonStyle}>
            Register Driver
          </Link>

          <Link href="/transporters" style={secondaryButtonStyle}>
            Transport Companies
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>DRIVER DIRECTORY</p>

          <h2 style={sectionTitleStyle}>
            Active Driver Profiles
          </h2>

          <p style={sectionTextStyle}>
            View transport professionals connected to the NamLogix Africa
            logistics ecosystem.
          </p>
        </div>

        {loading ? (
          <div style={loadingStyle}>
            Loading drivers...
          </div>
        ) : drivers.length === 0 ? (
          <div style={emptyStyle}>
            No drivers registered yet.
          </div>
        ) : (
          <div style={gridStyle}>
            {drivers.map((driver) => (
              <article key={driver.id} style={cardStyle}>
                <div style={statusStyle}>
                  {driver.status || "active"}
                </div>

                <h3 style={cardTitleStyle}>
                  {driver.full_name}
                </h3>

                <p style={cardTextStyle}>
                  <strong>License:</strong>{" "}
                  {driver.license_number || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Experience:</strong>{" "}
                  {driver.experience_years || "0"} years
                </p>

                <p style={cardTextStyle}>
                  <strong>Phone:</strong>{" "}
                  {driver.phone || "N/A"}
                </p>

                <p style={cardTextStyle}>
                  <strong>Region:</strong>{" "}
                  {driver.route_region || "Namibia"}
                </p>

                <div style={cardActionsStyle}>
                  <Link
                    href="/live-tracking"
                    style={darkButtonStyle}
                  >
                    Tracking
                  </Link>

                  <Link
                    href="/booking-requests"
                    style={lightButtonStyle}
                  >
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
  maxWidth: 860,
  margin: "0 auto",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  fontSize: 18,
};

const heroButtonsStyle = {
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
  gridTemplateColumns:
    "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow:
    "0 12px 30px rgba(15,23,42,0.06)",
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