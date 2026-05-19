// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    setLoading(true);

    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setInquiries(data || []);
    }

    setLoading(false);
  }

  async function markClosed(id) {
    const { error } = await supabase
      .from("inquiries")
      .update({ status: "closed" })
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchInquiries();
    }
  }

  async function deleteInquiry(id) {
    if (!confirm("Delete inquiry?")) return;

    const { error } = await supabase
      .from("inquiries")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchInquiries();
    }
  }

  const openCount = inquiries.filter((i) => i.status === "open").length;
  const closedCount = inquiries.filter((i) => i.status === "closed").length;

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>ADMIN COMMUNICATION</p>

          <h1 style={titleStyle}>Inquiry Center</h1>

          <p style={descStyle}>
            Manage customer inquiries, supplier requests, cargo questions,
            transport support messages, and marketplace communication.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/contact" style={buttonOrange}>
              📩 Contact Page
            </Link>

            <Link href="/admin/dashboard" style={buttonBlue}>
              📦 Dashboard
            </Link>

            <Link href="/admin/transport" style={buttonWhite}>
              🚕 Transport Admin
            </Link>
          </div>
        </section>

        <section style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Total</p>
            <h3 style={statValueStyle}>{inquiries.length}</h3>
            <p style={statTextStyle}>All inquiries</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Open</p>
            <h3 style={statValueStyle}>{openCount}</h3>
            <p style={statTextStyle}>Needs response</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Closed</p>
            <h3 style={statValueStyle}>{closedCount}</h3>
            <p style={statTextStyle}>Resolved inquiries</p>
          </div>
        </section>

        <section style={cardStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={formTitleStyle}>📩 Inquiry Management</h2>
              <p style={formDescStyle}>
                All contact and marketplace inquiries submitted through
                NamLogix.
              </p>
            </div>

            <button onClick={fetchInquiries} style={smallButtonStyle}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={emptyTextStyle}>Loading inquiries...</p>
          ) : inquiries.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={{ fontSize: 44 }}>📭</div>
              <h3 style={{ margin: "12px 0 6px", fontSize: 24 }}>
                No inquiries yet
              </h3>
              <p style={{ color: "#64748b", margin: 0 }}>
                Customer inquiries from the contact page will appear here.
              </p>
            </div>
          ) : (
            <div style={gridStyle}>
              {inquiries.map((item) => (
                <article key={item.id} style={itemCardStyle}>
                  <div style={cardTopStyle}>
                    <div>
                      <h3 style={itemTitleStyle}>
                        {item.subject || "General Inquiry"}
                      </h3>

                      <p style={itemSubStyle}>{item.name || "Unknown"}</p>
                    </div>

                    <span
                      style={
                        item.status === "closed"
                          ? closedBadgeStyle
                          : openBadgeStyle
                      }
                    >
                      {item.status || "open"}
                    </span>
                  </div>

                  <div style={detailGridStyle}>
                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Email</p>
                      <p style={detailValueStyle}>{item.email || "-"}</p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Phone</p>
                      <p style={detailValueStyle}>{item.phone || "-"}</p>
                    </div>
                  </div>

                  <div style={messageBoxStyle}>{item.message}</div>

                  <p style={dateStyle}>
                    {new Date(item.created_at).toLocaleString()}
                  </p>

                  <div style={actionsStyle}>
                    {item.status !== "closed" && (
                      <button
                        onClick={() => markClosed(item.id)}
                        style={buttonBlueSmall}
                      >
                        Mark Closed
                      </button>
                    )}

                    <button
                      onClick={() => deleteInquiry(item.id)}
                      style={buttonDangerSmall}
                    >
                      Delete
                    </button>
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

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 18,
};

const itemCardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: 22,
  padding: 22,
  background: "#ffffff",
  boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
};

const cardTopStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 14,
  marginBottom: 18,
};

const itemTitleStyle = {
  fontSize: 20,
  fontWeight: 900,
  margin: 0,
  color: "#0f172a",
};

const itemSubStyle = {
  margin: "6px 0 0",
  color: "#64748b",
};

const openBadgeStyle = {
  background: "#ffedd5",
  color: "#c2410c",
  borderRadius: 999,
  padding: "6px 10px",
  height: "fit-content",
  fontSize: 12,
  fontWeight: 900,
};

const closedBadgeStyle = {
  background: "#dcfce7",
  color: "#15803d",
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

const messageBoxStyle = {
  marginTop: 14,
  background: "#f8fafc",
  borderRadius: 16,
  padding: 14,
  color: "#475569",
  lineHeight: 1.6,
};

const dateStyle = {
  color: "#94a3b8",
  fontSize: 12,
  marginTop: 14,
};

const actionsStyle = {
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
  border: "none",
  cursor: "pointer",
};

const buttonDangerSmall = {
  background: "#dc2626",
  color: "white",
  padding: "10px 14px",
  borderRadius: 14,
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
};