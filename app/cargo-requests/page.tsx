// @ts-nocheck

import Link from "next/link";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import PremiumStats from "@/app/components/PremiumStats";
import { supabase } from "@/lib/supabaseClient";

export default async function CargoRequestsPage() {
  const { data: requests, error } = await supabase
    .from("cargo_requests")
    .select(
      "id, request_number, pickup_location, delivery_location, cargo_type, weight_kg, budget, status, created_at"
    )
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  return (
    <PremiumPageShell
      badge="NAMLOGIX CARGO"
      title="Cargo Requests"
      description="Browse active cargo requests from customers, businesses, warehouses, and traders looking for transport and logistics support."
      actions={[
        {
          label: "Post Cargo Request",
          href: "/request-cargo",
          variant: "orange",
        },
        {
          label: "Available Trips",
          href: "/trip-offers",
          variant: "blue",
        },
        {
          label: "Back Home",
          href: "/",
          variant: "white",
        },
      ]}
    >
      <PremiumStats
        stats={[
          {
            label: "Pending Cargo",
            value: requests?.length || 0,
            text: "Open cargo requests",
          },
          {
            label: "Status",
            value: "Live",
            text: "Ready for transporter bids",
          },
          {
            label: "Market",
            value: "B2B",
            text: "Cargo owners and operators",
          },
        ]}
      />

      {error && (
        <PremiumCard>
          <h2 style={errorTitleStyle}>Could not load cargo requests</h2>
          <p style={errorTextStyle}>{error.message}</p>
        </PremiumCard>
      )}

      {!error && (!requests || requests.length === 0) && (
        <PremiumCard>
          <h2 style={emptyTitleStyle}>No pending cargo requests yet</h2>

          <p style={emptyTextStyle}>
            Cargo requests will appear here when customers or businesses post
            shipments that need transport.
          </p>

          <Link href="/request-cargo" style={buttonStyle}>
            Post First Cargo Request
          </Link>
        </PremiumCard>
      )}

      {!error && requests && requests.length > 0 && (
        <section style={gridStyle}>
          {requests.map((request) => (
            <PremiumCard key={request.id}>
              <p style={badgeStyle}>
                {request.request_number || "CARGO REQUEST"}
              </p>

              <h2 style={cardTitleStyle}>
                {request.pickup_location} → {request.delivery_location}
              </h2>

              <div style={detailsStyle}>
                <p>
                  <strong>Cargo Type:</strong>{" "}
                  {request.cargo_type || "Not specified"}
                </p>

                <p>
                  <strong>Weight:</strong>{" "}
                  {request.weight_kg
                    ? `${request.weight_kg} KG`
                    : "Not specified"}
                </p>

                <p>
                  <strong>Budget:</strong>{" "}
                  {request.budget
                    ? `NAD ${request.budget}`
                    : "Contact for price"}
                </p>

                <p>
                  <strong>Status:</strong> {request.status}
                </p>
              </div>

              <Link href="/contact" style={buttonStyle}>
                Contact About Cargo
              </Link>
            </PremiumCard>
          ))}
        </section>
      )}
    </PremiumPageShell>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 22,
};

const badgeStyle = {
  color: "#f97316",
  fontWeight: 900,
  letterSpacing: 1,
  margin: 0,
};

const cardTitleStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
  margin: "10px 0 16px",
};

const detailsStyle = {
  color: "#475569",
  lineHeight: 1.8,
  marginBottom: 22,
};

const buttonStyle = {
  display: "inline-block",
  background: "#1d4ed8",
  color: "white",
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
};

const emptyTitleStyle = {
  fontSize: 28,
  fontWeight: 900,
  color: "#0f172a",
  margin: 0,
};

const emptyTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
  marginBottom: 20,
};

const errorTitleStyle = {
  fontSize: 26,
  fontWeight: 900,
  color: "#991b1b",
  margin: 0,
};

const errorTextStyle = {
  color: "#7f1d1d",
};