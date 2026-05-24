"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Order = {
  id: string;
  order_number: string;
  product_name: string;
  quantity: number;
  customer_name: string;
  customer_email: string;
  delivery_address: string;
  status: string;
  created_at: string;
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    fetchOrders();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login");
    }
  }

  async function fetchOrders() {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to fetch orders: " + error.message);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  }

  async function updateStatus(orderId: string, newStatus: string) {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus, updated_at: new Date() })
      .eq("id", orderId);

    if (error) {
      alert("Failed to update status: " + error.message);
    } else {
      fetchOrders();
    }
  }

  function getStatusStyle(status: string) {
    if (status === "pending") return pendingStatusStyle;
    if (status === "confirmed") return confirmedStatusStyle;
    if (status === "shipped") return shippedStatusStyle;
    if (status === "delivered") return deliveredStatusStyle;
    if (status === "cancelled") return cancelledStatusStyle;
    return defaultStatusStyle;
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN ORDERS</p>

        <h1 style={titleStyle}>Orders</h1>

        <p style={descStyle}>
          Manage customer orders, product purchases, delivery details, and order
          status updates.
        </p>
      </section>

      <section style={containerStyle}>
        <div style={topBarStyle}>
          <div>
            <h2 style={sectionTitleStyle}>Customer Orders</h2>
            <p style={sectionTextStyle}>
              Review and update marketplace order statuses.
            </p>
          </div>

          <button onClick={fetchOrders} style={refreshButtonStyle}>
            Refresh Orders
          </button>
        </div>

        <div style={cardStyle}>
          {loading ? (
            <p style={mutedTextStyle}>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p style={mutedTextStyle}>No orders yet.</p>
          ) : (
            <div style={listStyle}>
              {orders.map((order) => (
                <article key={order.id} style={orderCardStyle}>
                  <div style={orderTopStyle}>
                    <div>
                      <h3 style={orderTitleStyle}>
                        {order.product_name || "Untitled Product"}
                      </h3>

                      <p style={orderMetaStyle}>
                        Order #{order.order_number || order.id.slice(0, 8)} •{" "}
                        {order.quantity} units
                      </p>

                      <p style={orderTextStyle}>
                        <strong>Customer:</strong> {order.customer_name} (
                        {order.customer_email})
                      </p>

                      <p style={orderTextStyle}>
                        <strong>Delivery:</strong> {order.delivery_address}
                      </p>

                      <p style={dateStyle}>
                        {order.created_at
                          ? new Date(order.created_at).toLocaleString()
                          : "No date"}
                      </p>
                    </div>

                    <select
                      value={order.status || "pending"}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      style={{
                        ...selectStyle,
                        ...getStatusStyle(order.status || "pending"),
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
};

const heroStyle = {
  padding: "80px 24px",
  textAlign: "center" as const,
  color: "white",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.92), rgba(249,115,22,0.88))",
};

const badgeStyle = {
  color: "#fdba74",
  fontWeight: 900,
  letterSpacing: 1,
  marginBottom: 10,
};

const titleStyle = {
  fontSize: 54,
  fontWeight: 900,
  margin: "0 0 14px",
};

const descStyle = {
  maxWidth: 760,
  margin: "0 auto",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  fontSize: 18,
};

const containerStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "60px 24px",
};

const topBarStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 18,
  flexWrap: "wrap" as const,
  marginBottom: 28,
};

const sectionTitleStyle = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
  margin: 0,
};

const sectionTextStyle = {
  color: "#64748b",
  marginTop: 8,
};

const refreshButtonStyle = {
  background: "#1d4ed8",
  color: "white",
  border: "none",
  padding: "13px 18px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
};

const mutedTextStyle = {
  color: "#64748b",
  fontWeight: 700,
};

const listStyle = {
  display: "grid",
  gap: 18,
};

const orderCardStyle = {
  border: "1px solid #e2e8f0",
  borderRadius: 22,
  padding: 22,
  background: "#ffffff",
};

const orderTopStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 18,
  flexWrap: "wrap" as const,
};

const orderTitleStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
  margin: "0 0 10px",
};

const orderMetaStyle = {
  color: "#475569",
  fontWeight: 800,
  marginBottom: 10,
};

const orderTextStyle = {
  color: "#475569",
  lineHeight: 1.7,
  margin: "6px 0",
};

const dateStyle = {
  color: "#94a3b8",
  fontSize: 13,
  marginTop: 10,
};

const selectStyle = {
  border: "1px solid #cbd5e1",
  borderRadius: 999,
  padding: "9px 12px",
  fontWeight: 900,
  cursor: "pointer",
};

const pendingStatusStyle = {
  background: "#fef3c7",
  color: "#92400e",
};

const confirmedStatusStyle = {
  background: "#dbeafe",
  color: "#1d4ed8",
};

const shippedStatusStyle = {
  background: "#ede9fe",
  color: "#6d28d9",
};

const deliveredStatusStyle = {
  background: "#dcfce7",
  color: "#15803d",
};

const cancelledStatusStyle = {
  background: "#fee2e2",
  color: "#b91c1c",
};

const defaultStatusStyle = {
  background: "#f1f5f9",
  color: "#334155",
};