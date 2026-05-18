// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  async function fetchProduct() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error) {
      alert("Failed to load product: " + error.message);
      setLoading(false);
      return;
    }

    setProduct(data);

    if (data?.owner_id) {
      const { data: companyData } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", data.owner_id)
        .single();

      setCompany(companyData);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <div style={{ background: "white", padding: 30, borderRadius: 20 }}>
          <h1>Product not found</h1>
          <Link href="/store">Back to Store</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fc", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <section
          style={{
            background: "linear-gradient(135deg, #0b1220, #1e3a8a, #f97316)",
            color: "white",
            borderRadius: 28,
            padding: 36,
            marginBottom: 28,
          }}
        >
          <p style={{ fontWeight: 800, color: "#fed7aa" }}>PRODUCT DETAILS</p>

          <h1 style={{ fontSize: 42, fontWeight: 900, margin: "10px 0" }}>
            {product.name}
          </h1>

          <p style={{ maxWidth: 720, lineHeight: 1.7 }}>
            {product.description || "View this marketplace product and connect with the listed company."}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <Link href="/store" style={buttonPrimary}>
              Back to Store
            </Link>

            {product.owner_id && (
              <Link href={`/companies/${product.owner_id}`} style={buttonSecondary}>
                View Seller
              </Link>
            )}
          </div>
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          <section style={cardStyle}>
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "320px",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: "20px",
                }}
              />
            ) : (
              <div
                style={{
                  height: "320px",
                  borderRadius: "20px",
                  background: "#dbeafe",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 70,
                }}
              >
                📦
              </div>
            )}
          </section>

          <section style={cardStyle}>
            <p style={{ color: "#6b7280", fontWeight: 700 }}>Product Information</p>

            <h2 style={{ fontSize: 30, fontWeight: 900, marginTop: 8 }}>
              {product.name}
            </h2>

            <p style={{ color: "#64748b", lineHeight: 1.7 }}>
              {product.description || "No description added."}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 20 }}>
              <InfoBox label="Price" value={`N$${product.price || 0}`} />
              <InfoBox label="Stock" value={product.stock_level || 0} />
              <InfoBox label="Unit" value={product.unit || "item"} />
              <InfoBox label="Category" value={product.category || "General"} />
            </div>

            <div style={{ marginTop: 22, display: "grid", gap: 12 }}>
              <Link href="/contact" style={buttonOrange}>
                Request Product
              </Link>

              <Link href="/request-cargo" style={buttonPrimary}>
                Arrange Delivery
              </Link>
            </div>
          </section>
        </div>

        <section style={{ ...cardStyle, marginTop: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 900 }}>Seller Information</h2>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 18 }}>
            {company?.logo_url ? (
              <img
                src={company.logo_url}
                alt="Seller logo"
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 18,
                }}
              />
            ) : (
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 18,
                  background: "#e5e7eb",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 34,
                }}
              >
                🏢
              </div>
            )}

            <div>
              <h3 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>
                {company?.company_name ||
                  product.owner_company ||
                  product.supplier ||
                  "NamLogix Company"}
              </h3>

              <p style={{ color: "#64748b", marginTop: 6 }}>
                {company?.role || "Marketplace seller"}
              </p>
            </div>
          </div>

          {product.owner_id && (
            <div style={{ marginTop: 22 }}>
              <Link href={`/companies/${product.owner_id}/products`} style={buttonPrimary}>
                More Products From Seller
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div style={{ background: "#f8fafc", borderRadius: 16, padding: 16 }}>
      <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>{label}</p>
      <p style={{ fontWeight: 900, fontSize: 18, margin: "6px 0 0" }}>{value}</p>
    </div>
  );
}

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 24,
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
};

const buttonPrimary = {
  background: "#1d4ed8",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  textAlign: "center",
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonSecondary = {
  background: "white",
  color: "#1d4ed8",
  padding: "12px 18px",
  borderRadius: 14,
  textAlign: "center",
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};

const buttonOrange = {
  background: "#f97316",
  color: "white",
  padding: "12px 18px",
  borderRadius: 14,
  textAlign: "center",
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
};