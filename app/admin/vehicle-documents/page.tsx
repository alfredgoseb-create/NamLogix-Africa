"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type StorageFile = {
  name: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
};

export default function AdminVehicleDocumentsPage() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    setLoading(true);

    const { data, error } = await supabase.storage
      .from("vehicle-documents")
      .list("", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (!error && data) {
  setFiles(data as StorageFile[]);
}
    setLoading(false);
  }

  function getPublicUrl(fileName: string) {
    const { data } = supabase.storage
      .from("vehicle-documents")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN COMPLIANCE</p>
        <h1 style={titleStyle}>Vehicle Document Review</h1>
        <p style={descStyle}>
          Review uploaded vehicle registration papers, roadworthy certificates,
          driver licenses, and insurance files.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/vehicle-documents" style={primaryButtonStyle}>
            Upload Documents
          </Link>

          <Link href="/admin/vehicle-approvals" style={secondaryButtonStyle}>
            Vehicle Approvals
          </Link>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionBadgeStyle}>UPLOADED FILES</p>
          <h2 style={sectionTitleStyle}>Vehicle Compliance Documents</h2>
          <p style={sectionTextStyle}>
            These files are loaded from the Supabase Storage bucket.
          </p>
        </div>

        {loading ? (
          <div style={emptyStyle}>Loading documents...</div>
        ) : files.length === 0 ? (
          <div style={emptyStyle}>No uploaded documents found yet.</div>
        ) : (
          <div style={gridStyle}>
            {files.map((file) => (
              <article key={file.name} style={cardStyle}>
                <div style={statusStyle}>Uploaded</div>

                <h3 style={cardTitleStyle}>{file.name}</h3>

                <p style={cardTextStyle}>
                  <strong>Created:</strong>{" "}
                  {file.created_at
                    ? new Date(file.created_at).toLocaleString()
                    : "N/A"}
                </p>

                <a
                  href={getPublicUrl(file.name)}
                  target="_blank"
                  rel="noreferrer"
                  style={darkButtonStyle}
                >
                  Open Document
                </a>
              </article>
            ))}
          </div>
        )}
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
  maxWidth: 850,
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
  maxWidth: 1200,
  margin: "0 auto",
  padding: "60px 24px",
};

const sectionHeaderStyle = { marginBottom: 30 };

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
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
  background: "#dcfce7",
  color: "#166534",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
  marginBottom: 18,
};

const cardTitleStyle = {
  fontSize: 20,
  fontWeight: 900,
  color: "#0f172a",
  wordBreak: "break-word" as const,
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.7,
};

const darkButtonStyle = {
  display: "inline-block",
  marginTop: 18,
  background: "#0f172a",
  color: "white",
  padding: "12px 15px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};