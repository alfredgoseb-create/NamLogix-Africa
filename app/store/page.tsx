// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to load products: " + error.message);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  const totalStock = products.reduce(
    (sum, p) => sum + Number(p.stock_level || 0),
    0
  );

  const categories = new Set(
    products.map((p) => p.category).filter(Boolean)
  ).size;

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={heroStyle}>
          <p style={badgeStyle}>NAMLOGIX MARKETPLACE</p>

          <h1 style={titleStyle}>Trade Store</h1>

          <p style={descStyle}>
            Browse products from suppliers, warehouses, and trade partners
            across Namibia and Southern Africa.
          </p>

          <div style={buttonRowStyle}>
            <Link href="#products" style={buttonOrange}>
              🛒 Browse Products
            </Link>

            <Link href="/request-cargo" style={buttonBlue}>
              📦 Post Cargo
            </Link>

            <Link href="/contact" style={buttonWhite}>
              📩 Request Product
            </Link>
          </div>
        </section>

        <section style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Products</p>
            <h3 style={statValueStyle}>{products.length}</h3>
            <p style={statTextStyle}>Active items</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Stock</p>
            <h3 style={statValueStyle}>{totalStock}</h3>
            <p style={statTextStyle}>Available units</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Categories</p>
            <h3 style={statValueStyle}>{categories}</h3>
            <p style={statTextStyle}>Product groups</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Status</p>
            <h3 style={statValueStyle}>Live</h3>
            <p style={statTextStyle}>Marketplace active</p>
          </div>
        </section>

        <section id="products" style={cardStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={formTitleStyle}>🛒 Marketplace Products</h2>
              <p style={formDescStyle}>
                Products listed from inventory, suppliers, and warehouse stock.
              </p>
            </div>

            <button onClick={fetchProducts} style={smallButtonStyle}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={emptyTextStyle}>Loading products...</p>
          ) : products.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={{ fontSize: 44 }}>🛒</div>
              <h3 style={{ margin: "12px 0 6px", fontSize: 24 }}>
                No products yet
              </h3>
              <p style={{ color: "#64748b", margin: 0 }}>
                Products added from the admin dashboard will appear here.
              </p>
            </div>
          ) : (
            <div style={gridStyle}>
              {products.map((product) => (
                <article key={product.id} style={productCardStyle}>
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      style={imageStyle}
                    />
                  ) : (
                    <div style={imageFallbackStyle}>🛒</div>
                  )}

                  <div style={cardTopStyle}>
                    <div>
                      <h3 style={itemTitleStyle}>{product.name}</h3>
                      <p style={itemSubStyle}>
                        {product.category || "General"}
                      </p>
                    </div>

                    <span style={stockBadgeStyle}>
                      {product.stock_level || 0} stock
                    </span>
                  </div>

                  <p style={descriptionStyle}>
                    {product.description || "No product description added."}
                  </p>

                  <div style={detailGridStyle}>
                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Price</p>
                      <p style={detailValueStyle}>N${product.price || 0}</p>
                    </div>

                    <div style={detailBoxStyle}>
                      <p style={detailLabelStyle}>Unit</p>
                      <p style={detailValueStyle}>{product.unit || "item"}</p>
                    </div>
                  </div>

                  {product.supplier && (
                    <p style={smallMetaStyle}>Supplier: {product.supplier}</p>
                  )}

                  {product.warehouse && (
                    <p style={smallMetaStyle}>Warehouse: {product.warehouse}</p>
                  )}

                  <div style={actionsStyle}>
                    <Link href="/contact" style={buttonOrangeSmall}>
                      Request Product
                    </Link>

                    <Link href={`/products/${product.id}`} style={buttonBlueSmall}>
                      View Details
                    </Link>
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
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 18,
};

const productCardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: 22,
  padding: 18,
  background: "#ffffff",
  boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
  overflow: "hidden",
};

const imageStyle = {
  width: "100%",
  height: 170,
  objectFit: "cover",
  borderRadius: 18,
  marginBottom: 16,
  display: "block",
};

const imageFallbackStyle = {
  width: "100%",
  height: 170,
  borderRadius: 18,
  marginBottom: 16,
  background: "#f1f5f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 46,
};

const cardTopStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 14,
  marginBottom: 12,
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

const stockBadgeStyle = {
  background: "#dcfce7",
  color: "#15803d",
  borderRadius: 999,
  padding: "6px 10px",
  height: "fit-content",
  fontSize: 12,
  fontWeight: 900,
  whiteSpace: "nowrap",
};

const descriptionStyle = {
  color: "#64748b",
  lineHeight: 1.6,
  fontSize: 14,
  minHeight: 46,
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

const smallMetaStyle = {
  color: "#94a3b8",
  fontSize: 12,
  margin: "10px 0 0",
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
};

const buttonOrangeSmall = {
  ...buttonOrange,
  padding: "10px 14px",
  fontSize: 14,
};