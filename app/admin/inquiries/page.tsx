// @ts-nocheck

import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import PremiumStats from "@/app/components/PremiumStats";
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
        <PremiumCard>
          <h2 style={errorTitleStyle}>Could not load inquiries</h2>
          <p style={errorTextStyle}>{error.message}</p>
        </PremiumCard>
      )}

      {!error && (!inquiries || inquiries.length === 0) && (
        <PremiumCard>
          <h2 style={emptyTitleStyle}>No inquiries yet</h2>
          <p style={emptyTextStyle}>
            Contact form messages will appear here after customers submit them.
          </p>
        </PremiumCard>
      )}

      {!error && inquiries && inquiries.length > 0 && (
        <section style={gridStyle}>
          {inquiries.map((item) => (
            <PremiumCard key={item.id}>
              <p style={badgeStyle}>
                {item.inquiry_type?.toUpperCase() || "GENERAL"}
              </p>

              <h2 style={cardTitleStyle}>
                {item.name || "Unnamed Customer"}
              </h2>

              <div style={detailsStyle}>
                <p>
                  <strong>Status:</strong> {item.status || "new"}
                </p>

                <p>
                  <strong>Email:</strong> {item.email || "Not provided"}
                </p>

                <p>
                  <strong>Phone:</strong> {item.phone || "Not provided"}
                </p>

                <p>
                  <strong>Message:</strong> {item.message || "No message"}
                </p>

                <p>
                  <strong>Created:</strong>{" "}
                  {item.created_at
                    ? new Date(item.created_at).toLocaleString()
                    : "Unknown"}
                </p>
              </div>
            </PremiumCard>
          ))}
        </section>
      )}
    </PremiumPageShell>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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