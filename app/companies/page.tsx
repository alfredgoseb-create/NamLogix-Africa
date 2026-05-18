// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    setLoading(true);

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load companies: " + error.message);
    } else {
      setCompanies(data || []);
    }

    setLoading(false);
  }

  const suppliers = companies.filter((c) => c.role === "supplier").length;
  const warehouses = companies.filter((c) => c.role === "warehouse").length;
  const transporters = companies.filter((c) => c.role === "transporter").length;

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fc", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <section style={heroStyle}>
          <p style={{ color: "#fed7aa", fontWeight: 800 }}>BUSINESS DIRECTORY</p>

          <h1 style={{ fontSize: 42, fontWeight: 900, margin: "10px 0" }}>
            NamLogix AFRICA Company Network
          </h1>

          <p style={{ maxWidth: 760, lineHeight: 1.7 }}>
            Explore registered suppliers, warehouses, transporters, and trade partners on the NamLogix Africa platform.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <Link href="/signup" style={buttonOrange}>
              Create Profile
            </Link>

            <Link href="/profile" style={buttonPrimary}>
              My Profile
            </Link>

            <Link href="/store" style={buttonSecondary}>
              Marketplace
            </Link>
          </div>
        </section>

        <section style={statsGrid}>
          <StatCard title="Companies" value={companies.length} />
          <StatCard title="Suppliers" value={suppliers} />
          <StatCard title="Warehouses" value={warehouses} />
          <StatCard title="Transporters" value={transporters} />
        </section>

        <section style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 30, fontWeight: 900, margin: 0 }}>
                🏢 Registered Companies
              </h2>

              <p style={{ color: "#64748b", marginTop: 8 }}>
                Business profiles created by platform users.
              </p>
            </div>

            <button onClick={fetchCompanies} style={refreshButton}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p>Loading company profiles...</p>
          ) : companies.length === 0 ? (
            <div style={emptyBox}>
              <div style={{ fontSize: 52 }}>🏢</div>
              <h3>No companies yet</h3>
              <p>Company profiles will appear here once users create and update their profiles.</p>
            </div>
          ) : (
            <div style={companyGrid}>
              {companies.map((company) => (
                <div key={company.id} style={companyCard}>
                  <div style={{ position: "relative", height: 140, background: "#e5e7eb" }}>
                    {company.banner_url ? (
                      <img
                        src={company.banner_url}
                        alt="Company banner"
                        style={{
                          width: "100%",
                          height: 140,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          height: 140,
                          background: "linear-gradient(135deg, #1e3a8a, #f97316)",
                        }}
                      />
                    )}

                    <div style={{ position: "absolute", left: 16, bottom: -36 }}>
                      {company.logo_url ? (
                        <img
                          src={company.logo_url}
                          alt="Company logo"
                          style={{
                            width: 72,
                            height: 72,
                            objectFit: "cover",
                            borderRadius: 16,
                            border: "4px solid white",
                            background: "white",
                            boxShadow: "0 10px 22px rgba(15,23,42,0.2)",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 72,
                            height: 72,
                            borderRadius: 16,
                            border: "4px solid white",
                            background: "white",
                            boxShadow: "0 10px 22px rgba(15,23,42,0.2)",
                            display: "grid",
                            placeItems: "center",
                            fontSize: 30,
                          }}
                        >
                          🏢
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ padding: "48px 18px 18px" }}>
                    <span style={pillStyle}>{company.role || "customer"}</span>

                    <h3 style={{ fontSize: 19, fontWeight: 900, margin: "12px 0 6px" }}>
                      {company.company_name || company.full_name || "Unnamed Company"}
                    </h3>

                    <p style={{ color: "#64748b", fontSize: 14, margin: "4px 0" }}>
                      Contact: {company.full_name || "Not provided"}
                    </p>

                    <p style={{ color: "#64748b", fontSize: 14, margin: "4px 0" }}>
                      Phone: {company.phone || "Not provided"}
                    </p>

                    <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
                      <Link href={`/companies/${company.id}`} style={buttonPrimary}>
                        View Company Profile
                      </Link>

                      <Link href={`/companies/${company.id}/products`} style={buttonSecondary}>
                        Company Products
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div style={statCard}>
      <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>{title}</p>
      <p style={{ fontSize: 30, fontWeight: 900, margin: "6px 0 0" }}>{value}</p>
    </div>
  );
}

const heroStyle = {
  background: "linear-gradient(135deg, #0b1220, #1e3a8a, #f97316)",
  color: "white",
  borderRadius: 28,
  padding: 36,
  marginBottom: 24,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 16,
  marginBottom: 24,
};

const statCard = {
  background: "white",
  borderRadius: 22,
  padding: 20,
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 22px rgba(15,23,42,0.06)",
};

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 24,
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
};

const companyGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 22,
};

const companyCard = {
  background: "white",
  borderRadius: 22,
  overflow: "hidden",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 22px rgba(15, 23, 42, 0.08)",
};

const emptyBox = {
  textAlign: "center",
  padding: 50,
  borderRadius: 20,
  background: "#f8fafc",
  color: "#64748b",
};

const refreshButton = {
  background: "white",
  border: "1px solid #d1d5db",
  borderRadius: 14,
  padding: "10px 16px",
  fontWeight: 800,
  cursor: "pointer",
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
  padding: "11px 14px",
  borderRadius: 12,
  textAlign: "center",
  fontWeight: 800,
  textDecoration: "none",
  display: "block",
};

const buttonSecondary = {
  background: "white",
  color: "#1d4ed8",
  padding: "11px 14px",
  borderRadius: 12,
  textAlign: "center",
  fontWeight: 800,
  textDecoration: "none",
  display: "block",
  border: "1px solid #bfdbfe",
};

const buttonOrange = {
  background: "#f97316",
  color: "white",
  padding: "11px 14px",
  borderRadius: 12,
  textAlign: "center",
  fontWeight: 800,
  textDecoration: "none",
  display: "block",
};