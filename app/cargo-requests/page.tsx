// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function CargoRequestsPage() {
  const [cargoRequests, setCargoRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCargoRequests();
  }, []);

  async function fetchCargoRequests() {
    setLoading(true);

    const { data, error } = await supabase
      .from("cargo_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load cargo requests: " + error.message);
    } else {
      setCargoRequests(data || []);
    }

    setLoading(false);
  }

  const openCargo = cargoRequests.filter(
    (item) => item.status === "pending" || item.status === "open"
  ).length;

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>CARGO MARKETPLACE</p>

          <h1 style={titleStyle}>Available Cargo</h1>

          <p style={descStyle}>
            Browse cargo requests, discover transport opportunities, and connect
            cargo owners with logistics operators across Southern Africa.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/request-cargo" style={buttonOrange}>
              📦 Post Cargo
            </Link>

            <Link href="/trip-offers" style={buttonBlue}>
              🚚 Trip Offers
            </Link>

            <Link href="/trade-routes" style={buttonWhite}>
              🛣️ Trade Routes
            </Link>
          </div>
        </section>

        <section style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Cargo Requests</p>
            <h3 style={statValueStyle}>{cargoRequests.length}</h3>
            <p style={statTextStyle}>Total posted cargo</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Open Cargo</p>
            <h3 style={statValueStyle}>{openCargo}</h3>
            <p style={statTextStyle}>Ready for bidding</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Coverage</p>
            <h3 style={statValueStyle}>SADC</h3>
            <p style={statTextStyle}>Regional network</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Status</p>
            <h3 style={statValueStyle}>Live</h3>
            <p style={statTextStyle}>Marketplace active</p>
          </div>
        </section>

        <section style={cardStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={formTitleStyle}>📦 Cargo Requests</h2>
              <p style={formDescStyle}>
                Cargo posted by customers and businesses looking for transport.
              </p>
            </div>

            <button onClick={fetchCargoRequests} style={smallButtonStyle}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={emptyTextStyle}>Loading cargo requests...</p>
          ) : cargoRequests.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={{ fontSize: 44 }}>📦</div>
              <h3 style={{ margin: "12px 0 6px", fontSize: 24 }}>
                No cargo requests yet
              </h3>
              <p style={{ color: "#64748b", margin: 0 }}>
                Cargo posted from the request page will appear here.
              </p>
            </div>
          ) : (
            <div style={cargoGridStyle}>
              {cargoRequests.map((cargo) => (
                <article key={cargo.id} style={cargoCardStyle}>
                  <div style={cargoTopStyle}>
                    <div>
                      <h3 style={cargoTitleStyle}>
                        {cargo.pickup_location || "Pickup"} →{" "}
                        {cargo.delivery_location || "Delivery"}
                      </h3>

                      <p style={cargoSubStyle}>
                        {cargo.cargo_type || "General Cargo"}
                      </p>
                    </div>

                    <span style={statusBadgeStyle}>
                      {cargo.status || "pending"}
                    </span>
                  </div>

                  <div style={detailGridStyle}>
                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Weight</p>
                      <p style={detailValueStyle}>
                        {cargo.weight_kg || 0} KG
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Budget</p>
                      <p style={detailValueStyle}>
                        N${cargo.budget || 0}
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Contact</p>
                      <p style={detailValueStyle}>
                        {cargo.contact_name || "-"}
                      </p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Phone</p>
                      <p style={detailValueStyle}>
                        {cargo.contact_phone || "-"}
                      </p>
                    </div>
                  </div>

                  {cargo.description && (
                    <p style={descriptionBoxStyle}>{cargo.description}</p>
                  )}

                  <div style={cargoActionsStyle}>
                    <Link href="/contact" style={buttonBlueSmall}>
                      Contact Owner
                    </Link>

                    <Link href="/trip-offers" style={buttonOrangeSmall}>
                      Submit Bid
                    </Link>
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

const cargoGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 18,
};

const cargoCardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: 22,
  padding: 22,
  background: "#ffffff",
  boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
};

const cargoTopStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 14,
  marginBottom: 18,
};

const cargoTitleStyle = {
  fontSize: 20,
  fontWeight: 900,
  margin: 0,
  color: "#0f172a",
};

const cargoSubStyle = {
  margin: "6px 0 0",
  color: "#64748b",
};

const statusBadgeStyle = {
  background: "#ffedd5",
  color: "#c2410c",
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

const descriptionBoxStyle = {
  marginTop: 14,
  background: "#f8fafc",
  borderRadius: 16,
  padding: 14,
  color: "#475569",
  lineHeight: 1.6,
};

const cargoActionsStyle = {
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
};

const buttonOrangeSmall = {
  ...buttonOrange,
  padding: "10px 14px",
  fontSize: 14,
};