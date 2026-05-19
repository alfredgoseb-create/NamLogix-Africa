// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  async function fetchProduct() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert("Failed to load product: " + error.message);
    } else {
      setProduct(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <section style={cardStyle}>
            <p style={emptyTextStyle}>Loading product...</p>
          </section>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <section style={cardStyle}>
            <div style={emptyStateStyle}>
              <div style={{ fontSize: 44 }}>🛒</div>
              <h2 style={formTitleStyle}>Product not found</h2>
              <p style={formDescStyle}>
                This product may have been removed or is no longer available.
              </p>

              <Link href="/store" style={buttonOrange}>
                Back to Store
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>MARKETPLACE PRODUCT</p>

          <h1 style={titleStyle}>{product.name}</h1>

          <p style={descStyle}>
            View product details, supplier information, warehouse location,
            price, stock level, and request support through NamLogix Africa.
          </p>

          <div style={buttonRowStyle}>
            <Link href="/contact" style={buttonOrange}>
              📩 Request Product
            </Link>

            <Link href="/store" style={buttonBlue}>
              🛒 Back to Store
            </Link>

            <Link href="/request-cargo" style={buttonWhite}>
              📦 Post Cargo
            </Link>
          </div>
        </section>

        <section style={detailLayoutStyle}>
          <div style={imagePanelStyle}>
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                style={productImageStyle}
              />
            ) : (
              <div style={productImageFallbackStyle}>🛒</div>
            )}
          </div>

          <div style={cardStyle}>
            <p style={categoryBadgeStyle}>
              {product.category || "General Product"}
            </p>

            <h2 style={formTitleStyle}>{product.name}</h2>

            <p style={descriptionStyle}>
              {product.description || "No product description added."}
            </p>

            <div style={statsGridStyle}>
              <div style={detailBoxStyle}>
                <p style={detailLabelStyle}>Price</p>
                <p style={detailValueStyle}>N${product.price || 0}</p>
              </div>

              <div style={detailBoxStyle}>
                <p style={detailLabelStyle}>Stock</p>
                <p style={detailValueStyle}>{product.stock_level || 0}</p>
              </div>

              <div style={detailBoxStyle}>
                <p style={detailLabelStyle}>Unit</p>
                <p style={detailValueStyle}>{product.unit || "item"}</p>
              </div>

              <div style={detailBoxStyle}>
                <p style={detailLabelStyle}>Status</p>
                <p style={detailValueStyle}>{product.status || "active"}</p>
              </div>
            </div>

            <div style={infoBoxStyle}>
              <p style={infoLineStyle}>
                <strong>Supplier:</strong> {product.supplier || "-"}
              </p>

              <p style={infoLineStyle}>
                <strong>Warehouse:</strong> {product.warehouse || "-"}
              </p>

              <p style={infoLineStyle}>
                <strong>Product ID:</strong> {product.id}
              </p>
            </div>

            <div style={actionsStyle}>
              <Link href="/contact" style={buttonOrangeSmall}>
                Request Product
              </Link>

              <Link href="/transport" style={buttonBlueSmall}>
                Book Transport
              </Link>
            </div>
          </div>
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

const detailLayoutStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 24,
  alignItems: "start",
};

const imagePanelStyle = {
  background: "white",
  borderRadius: 24,
  padding: 18,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.10)",
};

const productImageStyle = {
  width: "100%",
  maxHeight: 360,
  objectFit: "cover",
  borderRadius: 20,
  display: "block",
};

const productImageFallbackStyle = {
  height: 320,
  borderRadius: 20,
  background: "#f1f5f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 70,
};

const cardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.10)",
};

const categoryBadgeStyle = {
  display: "inline-block",
  background: "#dbeafe",
  color: "#1d4ed8",
  borderRadius: 999,
  padding: "7px 12px",
  fontWeight: 900,
  fontSize: 12,
  margin: "0 0 14px",
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
  marginBottom: 24,
};

const descriptionStyle = {
  color: "#64748b",
  lineHeight: 1.7,
  marginTop: 12,
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: 12,
  marginTop: 20,
};

const detailBoxStyle = {
  background: "#f8fafc",
  borderRadius: 16,
  padding: 14,
};

const detailLabelStyle = {
  color: "#94a3b8",
  fontSize: 12,
  margin: 0,
};

const detailValueStyle = {
  color: "#0f172a",
  fontWeight: 900,
  margin: "5px 0 0",
};

const infoBoxStyle = {
  marginTop: 20,
  background: "#f8fafc",
  borderRadius: 18,
  padding: 16,
};

const infoLineStyle = {
  margin: "8px 0",
  color: "#475569",
};

const actionsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginTop: 22,
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
};

const buttonOrangeSmall = {
  ...buttonOrange,
  padding: "10px 14px",
  fontSize: 14,
};