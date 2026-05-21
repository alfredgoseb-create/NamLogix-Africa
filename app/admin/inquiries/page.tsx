// @ts-nocheck

import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumStats from "@/app/components/PremiumStats";
import AdminTable from "@/app/components/AdminTable";
import { supabase } from "@/lib/supabaseClient";

export default async function AdminInquiriesPage() {
  const { data: inquiries, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <PremiumPageShell
      badge="ADMIN SUPPORT"
      title="Customer Inquiries"
      description="View customer messages, supplier requests, cargo questions, transport support, aviation inquiries, and partnership leads."
      actions={[
        { label: "Contact Page", href: "/contact", variant: "blue" },
        { label: "Bookings", href: "/admin/bookings", variant: "orange" },
        { label: "Dashboard", href: "/admin/dashboard", variant: "white" },
      ]}
    >
      <PremiumStats
        stats={[
          {
            label: "Inquiries",
            value: inquiries?.length || 0,
            text: "Total customer messages",
          },
          {
            label: "Status",
            value: "Support",
            text: "Customer service center",
          },
          {
            label: "Pipeline",
            value: "Leads",
            text: "Partners, suppliers and clients",
          },
        ]}
      />

      {error && (
        <div style={errorBoxStyle}>
          <h2>Could not load inquiries</h2>
          <p>{error.message}</p>
        </div>
      )}

      {!error && inquiries && (
        <AdminTable
          headers={[
            "Name",
            "Email",
            "Phone",
            "Type",
            "Message",
            "Status",
            "Created",
          ]}
          rows={inquiries.map((item) => (
            <tr key={item.id} style={rowStyle}>
              <td style={cellStyle}>{item.name || "Unnamed"}</td>

              <td style={cellStyle}>{item.email || "Not provided"}</td>

              <td style={cellStyle}>{item.phone || "Not provided"}</td>

              <td style={cellStyle}>{item.inquiry_type || "general"}</td>

              <td style={cellStyle}>{item.message || "No message"}</td>

              <td style={cellStyle}>
                <span style={statusStyle}>{item.status || "new"}</span>
              </td>

              <td style={cellStyle}>
                {item.created_at
                  ? new Date(item.created_at).toLocaleString()
                  : "Unknown"}
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

const statusStyle = {
  background: "#dcfce7",
  color: "#166534",
  padding: "6px 10px",
  borderRadius: 999,
  fontWeight: 800,
  fontSize: 12,
};

const errorBoxStyle = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: 24,
  borderRadius: 20,
};