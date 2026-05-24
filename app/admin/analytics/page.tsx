"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

type Product = {
  id: string;
  name: string;
  category: string;
  stock_level: number;
  supplier: string;
};

type Supplier = {
  id: string;
  name: string;
  category: string;
};

type Order = {
  id: string;
  status: string;
  created_at: string;
  quantity: number;
};

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

export default function AnalyticsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    fetchData();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login");
    }
  }

  async function fetchData() {
    setLoading(true);

    const { data: productsData } = await supabase.from("products").select("*");
    setProducts(productsData || []);

    const { data: suppliersData } = await supabase.from("suppliers").select("*");
    setSuppliers(suppliersData || []);

    const { data: ordersData } = await supabase.from("orders").select("*");
    setOrders(ordersData || []);

    setLoading(false);
  }

  function productsByCategory() {
    const categoryMap = new Map<string, number>();

    products.forEach((product) => {
      const category = product.category || "Uncategorized";
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });

    return Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value,
    }));
  }

  function ordersByStatus() {
    const statusMap = new Map<string, number>();

    orders.forEach((order) => {
      const status = order.status || "pending";
      statusMap.set(status, (statusMap.get(status) || 0) + 1);
    });

    return Array.from(statusMap.entries()).map(([name, value]) => ({
      name,
      value,
    }));
  }

  function lowStockProducts() {
    return products
      .filter((product) => product.stock_level <= 10 && product.stock_level > 0)
      .map((product) => ({
        name: product.name,
        stock: product.stock_level,
      }));
  }

  function ordersOverTime() {
    const last7Days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);
      return date.toISOString().split("T")[0];
    }).reverse();

    return last7Days.map((date) => {
      const count = orders.filter((order) =>
        order.created_at?.startsWith(date)
      ).length;

      return { date, count };
    });
  }

  if (loading) {
    return (
      <main style={pageStyle}>
        <section style={loadingStyle}>Loading analytics...</section>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>ADMIN ANALYTICS</p>

        <h1 style={titleStyle}>Analytics Dashboard</h1>

        <p style={descStyle}>
          Key metrics and visual insights for products, suppliers, orders, stock
          levels, and marketplace activity.
        </p>

        <button onClick={fetchData} style={refreshButtonStyle}>
          Refresh Analytics
        </button>
      </section>

      <section style={containerStyle}>
        <div style={summaryGridStyle}>
          <div style={summaryCardStyle}>
            <p style={summaryLabelStyle}>Total Products</p>
            <h2 style={summaryValueStyle}>{products.length}</h2>
          </div>

          <div style={summaryCardStyle}>
            <p style={summaryLabelStyle}>Total Suppliers</p>
            <h2 style={summaryValueStyle}>{suppliers.length}</h2>
          </div>

          <div style={summaryCardStyle}>
            <p style={summaryLabelStyle}>Total Orders</p>
            <h2 style={summaryValueStyle}>{orders.length}</h2>
          </div>

          <div style={summaryCardStyle}>
            <p style={summaryLabelStyle}>Low Stock Items</p>
            <h2 style={warningValueStyle}>{lowStockProducts().length}</h2>
          </div>
        </div>

        <div style={chartsGridStyle}>
          <div style={chartCardStyle}>
            <h2 style={chartTitleStyle}>Products by Category</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productsByCategory()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3B82F6" name="Products" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={chartCardStyle}>
            <h2 style={chartTitleStyle}>Orders by Status</h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ordersByStatus()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent = 0 }: any) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ordersByStatus().map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={chartCardStyle}>
            <h2 style={chartTitleStyle}>Low Stock Products</h2>

            {lowStockProducts().length === 0 ? (
              <p style={emptyTextStyle}>No low stock products</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={lowStockProducts()} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Bar dataKey="stock" fill="#F59E0B" name="Stock Level" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div style={chartCardStyle}>
            <h2 style={chartTitleStyle}>Orders Over Time</h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ordersOverTime()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#10B981"
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
};

const loadingStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "80px 24px",
  color: "#64748b",
  fontWeight: 900,
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
  maxWidth: 780,
  margin: "0 auto",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.86)",
  fontSize: 18,
};

const refreshButtonStyle = {
  marginTop: 30,
  background: "#f97316",
  color: "white",
  border: "none",
  padding: "14px 20px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const containerStyle = {
  maxWidth: 1300,
  margin: "0 auto",
  padding: "60px 24px",
};

const summaryGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
  marginBottom: 36,
};

const summaryCardStyle = {
  background: "white",
  borderRadius: 24,
  padding: 24,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const summaryLabelStyle = {
  color: "#64748b",
  fontWeight: 900,
  margin: 0,
};

const summaryValueStyle = {
  fontSize: 38,
  fontWeight: 900,
  color: "#0f172a",
  margin: "8px 0 0",
};

const warningValueStyle = {
  ...summaryValueStyle,
  color: "#d97706",
};

const chartsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
  gap: 28,
};

const chartCardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
};

const chartTitleStyle = {
  fontSize: 22,
  fontWeight: 900,
  color: "#0f172a",
  marginBottom: 20,
};

const emptyTextStyle = {
  color: "#64748b",
  textAlign: "center" as const,
  padding: "60px 0",
  fontWeight: 800,
};