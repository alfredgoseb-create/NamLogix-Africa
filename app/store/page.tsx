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

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fc", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <section
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "28px",
            marginBottom: "28px",
            border: "1px solid #e5e7eb",
          }}
        >
          <p style={{ color: "#6b21a8", fontWeight: 700, fontSize: "13px" }}>
            NAMLOGIX AFRICA
          </p>

          <h1 style={{ fontSize: "34px", fontWeight: 900, margin: "10px 0" }}>
            Marketplace Products
          </h1>

          <p style={{ color: "#64748b", marginBottom: "20px" }}>
            Products listed from company profiles, suppliers, inventory, and warehouse stock.
          </p>

          <button
            onClick={fetchProducts}
            style={{
              padding: "10px 16px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              background: "white",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Refresh
          </button>
        </section>

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <section
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "40px",
              textAlign: "center",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2>No products yet</h2>
            <p>Products added from the admin inventory dashboard will appear here.</p>
          </section>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "22px",
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                }}
              >
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "150px",
                      background: "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "42px",
                    }}
                  >
                    🛒
                  </div>
                )}

                <div style={{ padding: "16px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: "#ede9fe",
                      color: "#6b21a8",
                      padding: "5px 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      marginBottom: "10px",
                    }}
                  >
                    {product.category || "General"}
                  </span>

                  <h3 style={{ fontSize: "17px", fontWeight: 900, margin: "0 0 8px" }}>
                    {product.name}
                  </h3>

                  <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "20px" }}>
                    {product.description || "No description added."}
                  </p>

                  <p style={{ fontWeight: 800, marginTop: "12px" }}>
                    N${product.price || 0} • {product.stock_level || 0} in stock
                  </p>

                  <p style={{ color: "#64748b", fontSize: "13px" }}>
                    Listed by: {product.owner_company || product.supplier || "NamLogix Company"}
                  </p>

                  <div style={{ display: "grid", gap: "10px", marginTop: "16px" }}>
                    <Link
                      href={`/products/${product.id}`}
                      style={{
                        background: "#1d4ed8",
                        color: "white",
                        padding: "11px",
                        borderRadius: "12px",
                        textAlign: "center",
                        fontWeight: 800,
                      }}
                    >
                      View Product
                    </Link>

                    {product.owner_id && (
                      <Link
                        href={`/companies/${product.owner_id}`}
                        style={{
                          background: "white",
                          color: "#1d4ed8",
                          border: "1px solid #bfdbfe",
                          padding: "11px",
                          borderRadius: "12px",
                          textAlign: "center",
                          fontWeight: 800,
                        }}
                      >
                        View Company
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}