// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function CompanyProductsPage() {
  const params = useParams();
  const companyId = params.id;

  const [company, setCompany] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [companyId]);

  async function fetchData() {
    setLoading(true);

    const { data: companyData } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", companyId)
      .single();

    setCompany(companyData);

    const { data: productData } = await supabase
      .from("products")
      .select("*")
      .eq("owner_id", companyId)
      .order("created_at", { ascending: false });

    setProducts(productData || []);
    setLoading(false);
  }

  if (loading) {
    return <CenterText text="Loading company products..." />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fc", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <section style={heroStyle}>
          <p style={{ color: "#fed7aa", fontWeight: 800 }}>COMPANY PRODUCTS</p>

          <h1 style={{ fontSize: 42, fontWeight: 900, margin: "10px 0" }}>
            {company?.company_name || company?.full_name || "Company Products"}
          </h1>

          <p style={{ maxWidth: 720, lineHeight: 1.7 }}>
            Products listed by this company on the NamLogix Africa marketplace.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <Link href={`/companies/${companyId}`} style={buttonPrimary}>
              Company Profile
            </Link>

            <Link href="/store" style={buttonSecondary}>
              Marketplace
            </Link>
          </div>
        </section>

        <section style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>
                🛒 Marketplace Products
              </h2>

              <p style={{ color: "#64748b", marginTop: 8 }}>
                Products created by this company.
              </p>
            </div>

            <button onClick={fetchData} style={refreshButton}>
              Refresh
            </button>
          </div>

          {products.length === 0 ? (
            <div style={emptyBox}>
              <div style={{ fontSize: 50 }}>🛒</div>
              <h3>No products yet</h3>
              <p>This company has not listed products yet.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 22,
              }}
            >
              {products.map((product) => (
                <div key={product.id} style={productCard}>
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: 150,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div style={placeholderImage}>📦</div>
                  )}

                  <div style={{ padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 12 }}>
                      <span style={categoryPill}>
                        {product.category || "General"}
                      </span>

                      <span style={stockPill}>
                        {product.stock_level || 0} stock
                      </span>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 900, margin: "0 0 8px" }}>
                      {product.name}
                    </h3>

                    <p style={{ color: "#64748b", fontSize: 14, lineHeight: "20px", minHeight: 40 }}>
                      {product.description || "No description added."}
                    </p>

                    <p style={{ fontWeight: 900, marginTop: 12 }}>
                      N${product.price || 0} • {product.unit || "item"}
                    </p>

                    <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
                      <Link href={`/products/${product.id}`} style={buttonPrimary}>
                        View Product
                      </Link>

                      <Link href="/contact" style={buttonOrange}>
                        Request Product
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

function CenterText({ text }) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      {text}
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

const productCard = {
  background: "white",
  borderRadius: 20,
  overflow: "hidden",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 22px rgba(15, 23, 42, 0.08)",
};

const placeholderImage = {
  height: 150,
  background: "#dbeafe",
  display: "grid",
  placeItems: "center",
  fontSize: 46,
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

const categoryPill = {
  background: "#ede9fe",
  color: "#6b21a8",
  padding: "5px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 800,
};

const stockPill = {
  background: "#dcfce7",
  color: "#166534",
  padding: "5px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 800,
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