"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const documents = [
  "Vehicle Registration Certificate",
  "Roadworthy Certificate",
  "Driver License",
  "Insurance Document",
];

export default function VehicleDocumentsPage() {
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  async function uploadDocument(file: File, documentType: string) {
    setMessage("");

    if (!file) return;

    setUploading(true);

    const fileName = `${Date.now()}-${documentType}-${file.name}`;

    const { error } = await supabase.storage
      .from("vehicle-documents")
      .upload(fileName, file);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(`${documentType} uploaded successfully.`);
    }

    setUploading(false);
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>FLEET COMPLIANCE</p>
        <h1 style={titleStyle}>Vehicle Documents</h1>
        <p style={descStyle}>
          Upload vehicle registration papers, roadworthy certificates, driver
          licenses, and insurance documents for admin verification.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/my-vehicles" style={primaryButtonStyle}>
            View My Vehicles
          </Link>

          <Link href="/admin/vehicle-approvals" style={secondaryButtonStyle}>
            Vehicle Approvals
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        {message && <div style={messageStyle}>{message}</div>}

        <div style={gridStyle}>
          {documents.map((doc) => (
            <article key={doc} style={cardStyle}>
              <div style={statusStyle}>Required</div>
              <h3 style={cardTitleStyle}>{doc}</h3>
              <p style={cardTextStyle}>
                Upload PDF, JPG, or PNG files for this compliance document.
              </p>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadDocument(file, doc);
                }}
                style={inputStyle}
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const pageStyle = { minHeight: "100vh", background: "#f8fafc" };

const heroStyle = {
  padding: "90px 24px",
  textAlign: "center" as const,
  color: "white",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.92), rgba(249,115,22,0.88))",
};

const badgeStyle = { color: "#fdba74", fontWeight: 900, letterSpacing: 1 };

const titleStyle = {
  fontSize: 54,
  fontWeight: 900,
  margin: "10px 0 14px",
};

const descStyle = {
  maxWidth: 820,
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
  maxWidth: 1100,
  margin: "0 auto",
  padding: "60px 24px",
};

const messageStyle = {
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  color: "#1d4ed8",
  padding: 16,
  borderRadius: 16,
  fontWeight: 900,
  marginBottom: 24,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
};

const inputStyle = {
  width: "100%",
  marginTop: 18,
  padding: "13px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  background: "#f8fafc",
};