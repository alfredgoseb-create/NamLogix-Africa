// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function CompanyDetailsPage() {
  const params = useParams();
  const companyId = params.id;

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, [companyId]);

  async function fetchCompany() {
    setLoading(true);

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", companyId)
      .single();

    if (error) {
      alert("Failed to load company: " + error.message);
    } else {
      setCompany(data);
    }

    setLoading(false);
  }

  if (loading) {
    return <CenterText text="Loading company profile..." />;
  }

  if (!company) {
    return (
      <CenterText text="Company profile could not be loaded." />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fc", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <section style={heroStyle}>
          <p style={{ color: "#fed7aa", fontWeight: 800 }}>COMPANY PROFILE</p>

          <h1 style={{ fontSize: 42, fontWeight: 900, margin: "10px 0" }}>
            {company.company_name || company.full_name || "Unnamed Company"}
          </h1>

          <p style={{ maxWidth: 720, lineHeight: 1.7 }}>
            View this company’s business identity, role, contact details, and platform presence.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <Link href="/companies" style={buttonPrimary}>Back to Companies</Link>
            <Link href={`/companies/${company.id}/products`} style={buttonOrange}>Company Products</Link>
            <Link href="/store" style={buttonSecondary}>Marketplace</Link>
          </div>
        </section>

        <section style={cardStyle}>
          <div style={{ position: "relative" }}>
            {company.banner_url ? (
              <img
                src={company.banner_url}
                alt="Company banner"
                style={{
                  width: "100%",
                  height: 260,
                  objectFit: "cover",
                  borderRadius: 24,
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 260,
                  borderRadius: 24,
                  background: "linear-gradient(135deg, #1e3a8a, #f97316)",
                  display: "grid",
                  placeItems: "center",
                  color: "white",
                  fontSize: 30,
                  fontWeight: 900,
                }}
              >
                Company Banner
              </div>
            )}

            <div style={{ position: "absolute", left: 28, bottom: -55 }}>
              {company.logo_url ? (
                <img
                  src={company.logo_url}
                  alt="Company logo"
                  style={{
                    width: 110,
                    height: 110,
                    objectFit: "cover",
                    borderRadius: 24,
                    border: "5px solid white",
                    background: "white",
                    boxShadow: "0 12px 30px rgba(15,23,42,0.25)",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 24,
                    border: "5px solid white",
                    background: "white",
                    boxShadow: "0 12px 30px rgba(15,23,42,0.25)",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 42,
                  }}
                >
                  🏢
                </div>
              )}
            </div>
          </div>

          <div style={{ paddingTop: 80 }}>
            <span style={pillStyle}>{company.role || "customer"}</span>

            <h2 style={{ fontSize: 34, fontWeight: 900, margin: "14px 0 6px" }}>
              {company.company_name || company.full_name || "Unnamed Company"}
            </h2>

            <p style={{ color: "#64748b" }}>
              Business profile on NamLogix Africa.
            </p>
          </div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 24 }}>
          <section style={cardStyle}>
            <h2 style={sectionTitle}>📞 Contact Details</h2>

            <InfoBox label="Contact Person" value={company.full_name || "Not provided"} />
            <InfoBox label="Phone" value={company.phone || "Not provided"} />
            <InfoBox label="Company Role" value={company.role || "customer"} />
          </section>

          <section style={cardStyle}>
            <h2 style={sectionTitle}>🚀 Platform Opportunities</h2>

            <div style={{ color: "#475569", lineHeight: 1.9 }}>
              <p>✅ Sell products in the marketplace</p>
              <p>✅ Connect with cargo owners</p>
              <p>✅ Join warehouse and logistics networks</p>
              <p>✅ Receive inquiries from customers</p>
              <p>✅ Build trust through a branded profile</p>
            </div>

            <div style={{ marginTop: 22 }}>
              <Link href={`/companies/${company.id}/products`} style={buttonOrange}>
                View Company Products
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function CenterText({ text }) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      {text}
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div style={{ background: "#f8fafc", borderRadius: 16, padding: 16, marginTop: 14 }}>
      <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>{label}</p>
      <p style={{ fontWeight: 900, margin: "6px 0 0" }}>{value}</p>
    </div>
  );
}

const heroStyle = {
  background: "linear-gradient(135deg, #0b1220, #1e3a8a, #f97316)",
  color: "white",
  borderRadius: 28,
  padding: 36,
  marginBottom: 28,
};

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 24,
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
};

const sectionTitle = {
  fontSize: 24,
  fontWeight: 900,
  marginBottom: 14,
};

const pillStyle = {
  display: "inline-block",
  background: "#dbeafe",
  color: "#1d4ed8",
  padding: "6px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 800,
  textTransform: "capitalize",
};

const buttonPrimary = {
  background: "#1d4ed8",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonSecondary = {
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