// @ts-nocheck

import Link from "next/link";
import PremiumPageShell from "@/app/components/PremiumPageShell";
import PremiumCard from "@/app/components/PremiumCard";
import { supabase } from "@/lib/supabaseClient";

export default async function InquiryDetailPage({ params }) {
  const { id } = params;

  const { data: inquiry, error } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <PremiumPageShell
      badge="INQUIRY DETAIL"
      title="Customer Inquiry Details"
      description="View full customer inquiry information and respond to support or partnership requests."
      actions={[
        {
          label: "All Inquiries",
          href: "/admin/inquiries",
          variant: "blue",
        },
        {
          label: "Dashboard",
          href: "/admin/dashboard",
          variant: "orange",
        },
        {
          label: "Back Home",
          href: "/",
          variant: "white",
        },
      ]}
    >
      {error && (
        <PremiumCard>
          <h2 style={errorTitleStyle}>Could not load inquiry</h2>
          <p style={errorTextStyle}>{error.message}</p>
        </PremiumCard>
      )}

      {!error && inquiry && (
        <PremiumCard>
          <p style={badgeStyle}>
            {inquiry.inquiry_type || "general"}
          </p>

          <h2 style={titleStyle}>
            {inquiry.name || "Unnamed Customer"}
          </h2>

          <div style={detailsGridStyle}>
            <Info label="Email" value={inquiry.email || "Not provided"} />

            <Info label="Phone" value={inquiry.phone || "Not provided"} />

            <Info label="Status" value={inquiry.status || "new"} />

            <Info
              label="Created"
              value={
                inquiry.created_at
                  ? new Date(inquiry.created_at).toLocaleString()
                  : "Unknown"
              }
            />
          </div>

          <div style={messageBoxStyle}>
            <h3 style={sectionTitleStyle}>Customer Message</h3>

            <p style={messageStyle}>
              {inquiry.message || "No message provided."}
            </p>
          </div>

          <div style={buttonRowStyle}>
            <Link href="/admin/inquiries" style={buttonStyle}>
              Back to Inquiries
            </Link>

            <Link href="/contact" style={secondaryButtonStyle}>
              Contact Page
            </Link>
          </div>
        </PremiumCard>
      )}
    </PremiumPageShell>
  );
}

function Info({ label, value }) {
  return (
    <div style={infoBoxStyle}>
      <p style={infoLabelStyle}>{label}</p>
      <h3 style={infoValueStyle}>{value}</h3>
    </div>
  );
}

const badgeStyle = {
  display: "inline-block",
  background: "#dcfce7",
  color: "#166534",
  padding: "7px 12px",
  borderRadius: 999,
  fontWeight: 900,
  textTransform: "uppercase" as const,
};

const titleStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  marginTop: 18,
};

const detailsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
  marginTop: 24,
};

const infoBoxStyle = {
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  borderRadius: 18,
  padding: 18,
};

const infoLabelStyle = {
  color: "#64748b",
  fontWeight: 800,
  margin: 0,
};

const infoValueStyle = {
  color: "#0f172a",
  fontWeight: 900,
  marginTop: 8,
  marginBottom: 0,
  fontSize: 18,
};

const messageBoxStyle = {
  marginTop: 26,
  padding: 22,
  borderRadius: 20,
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
};

const sectionTitleStyle = {
  marginTop: 0,
  color: "#0f172a",
  fontWeight: 900,
};

const messageStyle = {
  color: "#475569",
  lineHeight: 1.8,
};

const buttonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap" as const,
  marginTop: 26,
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

const secondaryButtonStyle = {
  ...buttonStyle,
  background: "#f97316",
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