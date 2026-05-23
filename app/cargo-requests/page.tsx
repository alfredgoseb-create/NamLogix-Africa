// @ts-nocheck

import Link from "next/link";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import PremiumStats from "@/app/components/PremiumStats";
import AdminTable from "@/app/components/AdminTable";
import StatusBadge from "@/app/components/StatusBadge";
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
        <AdminTable
          headers={[
            "Route",
            "Cargo Type",
            "Weight",
            "Budget",
            "Status",
            "Created",
            "Action",
          ]}
          rows={requests.map((request) => (
            <tr key={request.id} style={rowStyle}>
              <td style={cellStyle}>
                <strong>
                  {request.pickup_location || "Unknown"} →{" "}
                  {request.delivery_location || "Unknown"}
                </strong>
                <br />
                <span style={mutedStyle}>
                  {request.request_number || "Cargo Request"}
                </span>
              </td>

              <td style={cellStyle}>
                {request.cargo_type || "Not specified"}
              </td>

              <td style={cellStyle}>
                {request.weight_kg
                  ? `${request.weight_kg} KG`
                  : "Not specified"}
              </td>

              <td style={cellStyle}>
                {request.budget
                  ? `NAD ${request.budget}`
                  : "Contact for price"}
              </td>

              <td style={cellStyle}>
                <StatusBadge status={request.status || "pending"} />
              </td>

              <td style={cellStyle}>
                {request.created_at
                  ? new Date(request.created_at).toLocaleString()
                  : "Unknown"}
              </td>

             <td style={cellStyle}>
  <Link href={`/cargo-requests/${request.id}`} style={buttonStyle}>
    View
  </Link>
</td>
            </tr>
          ))}
        />
      )}
    </PremiumPageShell>
  );
}

const rowStyle = {
  borderBottom: "1px solid #f1f5f9",
};

const cellStyle = {
  padding: "18px 20px",
  color: "#334155",
  fontSize: 14,
  verticalAlign: "top",
};

const mutedStyle = {
  color: "#64748b",
  fontSize: 13,
};

const buttonStyle = {
  display: "inline-block",
  background: "#1d4ed8",
  color: "white",
  padding: "10px 14px",
  borderRadius: 12,
  fontWeight: 800,
  textDecoration: "none",
  fontSize: 13,
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