"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Shipment = {
  id: string;
  tracking_code: string;
  customer_name: string;
  service_type: string;
};

type Invoice = {
  id: string;
  shipment_id: string;
  tracking_code: string;
  customer_name: string;
  service_type: string;
  amount: number;
  currency: string;
  invoice_status: string;
  created_at: string;
};

export default function ShipmentInvoicesPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShipmentId, setSelectedShipmentId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    const { data: shipmentData } = await supabase
      .from("shipment_tracking")
      .select("id, tracking_code, customer_name, service_type")
      .order("created_at", { ascending: false });

    const { data: invoiceData } = await supabase
      .from("shipment_invoices")
      .select("*")
      .order("created_at", { ascending: false });

    setShipments(shipmentData || []);
    setInvoices(invoiceData || []);
    setLoading(false);
  }

  async function createInvoice() {
    if (!selectedShipmentId || !amount) {
      alert("Please select shipment and enter amount.");
      return;
    }

    const shipment = shipments.find((item) => item.id === selectedShipmentId);

    if (!shipment) {
      alert("Shipment not found.");
      return;
    }

    const { error } = await supabase.from("shipment_invoices").insert([
      {
        shipment_id: shipment.id,
        tracking_code: shipment.tracking_code,
        customer_name: shipment.customer_name,
        service_type: shipment.service_type,
        amount: Number(amount),
        currency: "NAD",
        invoice_status: "unpaid",
      },
    ]);

    if (error) {
      alert("Failed to create invoice: " + error.message);
      return;
    }

    setSelectedShipmentId("");
    setAmount("");
    fetchData();
  }

  async function updateInvoiceStatus(id: string, status: string) {
    const { error } = await supabase
      .from("shipment_invoices")
      .update({ invoice_status: status })
      .eq("id", id);

    if (error) {
      alert("Failed to update invoice: " + error.message);
      return;
    }

    fetchData();
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={badgeStyle}>SHIPMENT BILLING</p>

        <h1 style={titleStyle}>Shipment Invoices</h1>

        <p style={descStyle}>
          Create shipment invoices, track paid and unpaid logistics billing, and
          manage NamLogix Africa shipment payments.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/admin/dashboard" style={primaryButtonStyle}>
            Admin Dashboard
          </Link>

          <Link href="/admin/tracking-management" style={secondaryLinkStyle}>
            Tracking Management
          </Link>

          <button onClick={fetchData} style={secondaryButtonStyle}>
            Refresh
          </button>
        </div>
      </section>

      <section style={containerStyle}>
        <div style={formCardStyle}>
          <h2 style={sectionTitleStyle}>Create New Invoice</h2>

          <select
            value={selectedShipmentId}
            onChange={(e) => setSelectedShipmentId(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select shipment</option>
            {shipments.map((shipment) => (
              <option key={shipment.id} value={shipment.id}>
                {shipment.tracking_code} - {shipment.customer_name || "N/A"}
              </option>
            ))}
          </select>

          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Invoice amount in NAD"
            type="number"
            style={inputStyle}
          />

          <button onClick={createInvoice} style={createButtonStyle}>
            Create Invoice
          </button>
        </div>

        {loading ? (
          <div style={messageStyle}>Loading invoices...</div>
        ) : invoices.length === 0 ? (
          <div style={messageStyle}>No shipment invoices found yet.</div>
        ) : (
          <div style={gridStyle}>
            {invoices.map((invoice) => (
              <article key={invoice.id} style={cardStyle}>
                <div style={topRowStyle}>
                  <p style={codeStyle}>{invoice.tracking_code}</p>
                  <p style={statusStyle}>{invoice.invoice_status}</p>
                </div>

                <h2 style={cardTitleStyle}>
                  {invoice.customer_name || "Customer"}
                </h2>

                <p style={textStyle}>
                  <strong>Service:</strong> {invoice.service_type || "N/A"}
                </p>

                <p style={amountStyle}>
                  {invoice.currency || "NAD"} {invoice.amount || 0}
                </p>

                <p style={smallTextStyle}>
                  Created:{" "}
                  {invoice.created_at
                    ? new Date(invoice.created_at).toLocaleString()
                    : "N/A"}
                </p>

                <div style={buttonGridStyle}>
                  <button
                    style={paidButtonStyle}
                    onClick={() => updateInvoiceStatus(invoice.id, "paid")}
                  >
                    Mark Paid
                  </button>

                  <button
                    style={unpaidButtonStyle}
                    onClick={() => updateInvoiceStatus(invoice.id, "unpaid")}
                  >
                    Mark Unpaid
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
};

const heroStyle = {
  padding: "90px 24px",
  textAlign: "center" as const,
  color: "white",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.97), rgba(30,64,175,0.94), rgba(249,115,22,0.88))",
};

const badgeStyle = {
  color: "#fdba74",
  fontWeight: 900,
  letterSpacing: 1,
};

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
  justifyContent: "center",
  gap: 14,
  marginTop: 30,
  flexWrap: "wrap" as const,
};

const primaryButtonStyle = {
  background: "#f97316",
  color: "white",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const secondaryLinkStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  textDecoration: "none",
};

const secondaryButtonStyle = {
  background: "white",
  color: "#0f172a",
  border: "none",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const containerStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "60px 24px",
};

const formCardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
  marginBottom: 32,
  display: "grid",
  gap: 14,
};

const sectionTitleStyle = {
  fontSize: 26,
  fontWeight: 900,
  color: "#0f172a",
};

const inputStyle = {
  padding: "14px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  fontSize: 15,
};

const createButtonStyle = {
  background: "#f97316",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const messageStyle = {
  background: "white",
  padding: 40,
  borderRadius: 24,
  textAlign: "center" as const,
  color: "#64748b",
  fontWeight: 900,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 28,
  padding: 28,
  border: "1px solid #e5e7eb",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
};

const topRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap" as const,
};

const codeStyle = {
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
};

const statusStyle = {
  background: "#dcfce7",
  color: "#166534",
  padding: "8px 12px",
  borderRadius: 999,
  fontWeight: 900,
  fontSize: 13,
};

const cardTitleStyle = {
  fontSize: 26,
  fontWeight: 900,
  color: "#0f172a",
  marginTop: 18,
};

const textStyle = {
  color: "#475569",
  lineHeight: 1.7,
};

const amountStyle = {
  fontSize: 28,
  fontWeight: 900,
  color: "#f97316",
};

const smallTextStyle = {
  color: "#94a3b8",
  fontSize: 13,
  marginTop: 16,
};

const buttonGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 10,
  marginTop: 20,
};

const paidButtonStyle = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const unpaidButtonStyle = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};