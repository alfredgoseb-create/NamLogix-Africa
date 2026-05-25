"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Vehicle = {
  id: string;
  owner_name: string;
  vehicle_type: string;
  vehicle_make: string;
  vehicle_model: string;
  registration_number: string;
  load_capacity: string;
  route: string;
  contact_number: string;
  description: string;
  image_url: string;
  created_at: string;
};

const demoVehicles: Vehicle[] = [
  {
    id: "demo-1",
    owner_name: "NamLogix Transport Partner",
    vehicle_type: "Truck",
    vehicle_make: "MAN",
    vehicle_model: "TGS",
    registration_number: "N 12345 W",
    load_capacity: "10 tons",
    route: "Windhoek to Walvis Bay",
    contact_number: "+264 81 000 0000",
    description: "Reliable heavy-duty truck for cargo and regional transport.",
    image_url: "",
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-2",
    owner_name: "Local Delivery Partner",
    vehicle_type: "Bakkie",
    vehicle_make: "Toyota",
    vehicle_model: "Hilux",
    registration_number: "N 67890 WH",
    load_capacity: "1 ton",
    route: "Windhoek / Okahandja / Swakopmund",
    contact_number: "+264 81 111 1111",
    description: "Good for small deliveries, town transport, and urgent jobs.",
    image_url: "",
    created_at: new Date().toISOString(),
  },
];

export default function MyVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    setLoading(true);

    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error.message);
      setVehicles(demoVehicles);
    } else {
      setVehicles(data && data.length > 0 ? data : demoVehicles);
    }

    setLoading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>TRANSPORTER FLEET</p>

        <h1 style={titleStyle}>My Vehicles</h1>

        <p style={descStyle}>
          View registered trucks, bakkies, buses, trailers, delivery vans, and
          transport vehicles connected to NamLogix Africa.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/vehicle-register" style={primaryButtonStyle}>
            + Register Vehicle
          </Link>

          <button onClick={fetchVehicles} style={secondaryButtonStyle}>
            Refresh Fleet
          </button>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Vehicles</p>
            <h3 style={statValueStyle}>{vehicles.length}</h3>
            <p style={statTextStyle}>Registered fleet</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Routes</p>
            <h3 style={statValueStyle}>Active</h3>
            <p style={statTextStyle}>Transport corridors</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Status</p>
            <h3 style={statValueStyle}>Ready</h3>
            <p style={statTextStyle}>Fleet management</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Uploads</p>
            <h3 style={statValueStyle}>Images</h3>
            <p style={statTextStyle}>Vehicle photos supported</p>
          </div>
        </div>

        <div style={sectionHeaderStyle}>
          <div>
            <p style={sectionBadgeStyle}>VEHICLE LISTINGS</p>

            <h2 style={sectionTitleStyle}>Registered Vehicle Fleet</h2>

            <p style={sectionTextStyle}>
              These vehicles can later be linked to cargo bids, trips,
              transporter profiles, and delivery tracking.
            </p>
          </div>

          <Link href="/vehicle-documents" style={smallButtonStyle}>
            Upload Documents
          </Link>
        </div>

        {loading ? (
          <div style={emptyStyle}>Loading vehicles...</div>
        ) : vehicles.length === 0 ? (
          <div style={emptyStyle}>
            No vehicles found. Register your first vehicle to begin.
          </div>
        ) : (
          <div style={gridStyle}>
            {vehicles.map((vehicle) => (
              <article key={vehicle.id} style={cardStyle}>
                <div style={imageWrapStyle}>
                  {vehicle.image_url ? (
                    <img
                      src={vehicle.image_url}
                      alt={vehicle.registration_number || "Vehicle"}
                      style={imageStyle}
                    />
                  ) : (
                    <div style={placeholderImageStyle}>
                      <span style={placeholderIconStyle}>🚚</span>
                      <p style={placeholderTextStyle}>No vehicle image yet</p>
                    </div>
                  )}
                </div>

                <div style={cardBodyStyle}>
                  <div style={typeBadgeStyle}>
                    {vehicle.vehicle_type || "Vehicle"}
                  </div>

                  <h3 style={cardTitleStyle}>
                    {vehicle.vehicle_make || "Vehicle"}{" "}
                    {vehicle.vehicle_model || ""}
                  </h3>

                  <p style={cardTextStyle}>
                    <strong>Registration:</strong>{" "}
                    {vehicle.registration_number || "Not provided"}
                  </p>

                  <p style={cardTextStyle}>
                    <strong>Owner:</strong>{" "}
                    {vehicle.owner_name || "Not provided"}
                  </p>

                  <p style={cardTextStyle}>
                    <strong>Capacity:</strong>{" "}
                    {vehicle.load_capacity || "Not provided"}
                  </p>

                  <p style={cardTextStyle}>
                    <strong>Route:</strong> {vehicle.route || "Not provided"}
                  </p>

                  <p style={cardTextStyle}>
                    <strong>Contact:</strong>{" "}
                    {vehicle.contact_number || "Not provided"}
                  </p>

                  {vehicle.description && (
                    <p style={descriptionStyle}>{vehicle.description}</p>
                  )}

                  <div style={cardActionsStyle}>
                    <Link href="/vehicle-register" style={editButtonStyle}>
                      Edit
                    </Link>

                    <Link href="/create-trip" style={tripButtonStyle}>
                      Create Trip
                    </Link>

                    <Link href="/vehicle-documents" style={docsButtonStyle}>
                      Docs
                    </Link>
                  </div>
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
  maxWidth: 780,
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

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
  marginBottom: 38,
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
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0",
};

const statTextStyle = {
  color: "#64748b",
  margin: 0,
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 18,
  flexWrap: "wrap" as const,
  marginBottom: 28,
};

const sectionBadgeStyle = {
  color: "#f97316",
  fontWeight: 900,
  letterSpacing: 1,
  margin: 0,
};

const sectionTitleStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0",
};

const sectionTextStyle = {
  color: "#64748b",
  margin: 0,
  lineHeight: 1.7,
};

const smallButtonStyle = {
  background: "#1d4ed8",
  color: "white",
  padding: "13px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const emptyStyle = {
  background: "white",
  borderRadius: 24,
  padding: 32,
  textAlign: "center" as const,
  color: "#64748b",
  fontWeight: 800,
  border: "1px solid #e5e7eb",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 26,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  overflow: "hidden",
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
};

const imageWrapStyle = {
  height: 220,
  background: "#e2e8f0",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};

const placeholderImageStyle = {
  height: "100%",
  display: "grid",
  placeItems: "center",
  textAlign: "center" as const,
  color: "#64748b",
};

const placeholderIconStyle = {
  fontSize: 54,
};

const placeholderTextStyle = {
  margin: 0,
  fontWeight: 800,
};

const cardBodyStyle = {
  padding: 24,
};

const typeBadgeStyle = {
  display: "inline-block",
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
  marginBottom: 14,
};

const cardTitleStyle = {
  fontSize: 25,
  fontWeight: 900,
  color: "#0f172a",
  margin: "0 0 12px",
};

const cardTextStyle = {
  color: "#475569",
  lineHeight: 1.6,
  margin: "7px 0",
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

const editButtonStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "11px 14px",
  borderRadius: 12,
  fontWeight: 900,
  textDecoration: "none",
};

const tripButtonStyle = {
  background: "#f97316",
  color: "white",
  padding: "11px 14px",
  borderRadius: 12,
  fontWeight: 900,
  textDecoration: "none",
};

const docsButtonStyle = {
  background: "#0f172a",
  color: "white",
  padding: "11px 14px",
  borderRadius: 12,
  fontWeight: 900,
  textDecoration: "none",
};