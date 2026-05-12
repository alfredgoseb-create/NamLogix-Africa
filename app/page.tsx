"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import AppCard from "@/app/components/AppCard";

const aiResponses: Record<string, string> = {
  track:
    "To track your order, go to the Track Order page from the main menu. Enter your order ID or email to see real-time status updates.",
  cargo:
    "NamLogix Africa connects cargo owners with transporters across SADC. Post a cargo request with pickup, destination, weight and budget. Transporters bid and you choose the best offer.",
  vehicle:
    "To register a vehicle, go to Admin → Vehicles and click Register Vehicle. Add trucks, vans, planes, ships or buses with registration, capacity and pricing details.",
  bid:
    "To place or review bids, visit the Cargo Bids page. Browse cargo requests and submit or manage transport quotes.",
  about:
    "NamLogix Africa is a full trade infrastructure platform for Namibia and Southern Africa covering inventory, cargo logistics, vehicle fleet, shipment tracking, customs documents, trade routes and a marketplace store.",
  route:
    "Trade routes connect major hubs across Southern Africa including Windhoek, Walvis Bay, Johannesburg, Cape Town and other SADC cities.",
  store:
    "The NamLogix Store lets customers browse and order products with images, stock levels, categories and supplier info.",
  warehouse:
    "Warehouse management lets you track stock locations, manage transfers between warehouses, and monitor inventory with barcode scanning support.",
  default:
    "NamLogix Africa covers cargo requests, fleet management, warehouse tracking, customs documents, trade routes, bids, and a marketplace store.",
};

function getAIResponse(msg: string): string {
  const m = msg.toLowerCase();

  if (m.includes("track") || m.includes("order")) return aiResponses.track;
  if (m.includes("cargo") || m.includes("freight")) return aiResponses.cargo;
  if (m.includes("vehicle") || m.includes("truck") || m.includes("register"))
    return aiResponses.vehicle;
  if (m.includes("bid") || m.includes("quote")) return aiResponses.bid;
  if (m.includes("about") || m.includes("what is") || m.includes("namlogix"))
    return aiResponses.about;
  if (m.includes("route") || m.includes("windhoek")) return aiResponses.route;
  if (m.includes("store") || m.includes("product") || m.includes("buy"))
    return aiResponses.store;
  if (m.includes("warehouse") || m.includes("stock") || m.includes("inventory"))
    return aiResponses.warehouse;

  return aiResponses.default;
}

type Message = {
  role: "user" | "ai";
  text: string;
};

function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hello! I am your NamLogix Africa trade assistant. Ask me about cargo requests, bids, trip offers, shipment tracking, or anything about the platform.",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function sendMsg(text?: string) {
    const msg = text || input.trim();

    if (!msg) return;

    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: getAIResponse(msg),
        },
      ]);
    }, 800);
  }

  const suggestions = [
    "How do I track my order?",
    "How do I post cargo?",
    "How do bids work?",
    "What cargo routes are available?",
    "What is NamLogix Africa?",
  ];

  return (
    <div
      style={{
        background: "#0f1f38",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "1.5rem 2rem 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            flexShrink: 0,
          }}
        >
          ✦
        </div>

        <span
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#e2e8f0",
          }}
        >
          Trade Assistant
        </span>

        <span style={{ fontSize: "12px", color: "#64748b" }}>
          Ask anything about logistics
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "10px",
        }}
      >
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => sendMsg(s)}
            style={{
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              color: "#93c5fd",
              fontSize: "11px",
              padding: "4px 10px",
              borderRadius: "100px",
              cursor: "pointer",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div
        ref={chatRef}
        style={{
          background: "#0a1628",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          padding: "1rem",
          marginBottom: "1rem",
          minHeight: "80px",
          maxHeight: "180px",
          overflowY: "auto",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: "10px",
              fontSize: "13px",
              lineHeight: 1.6,
              color: m.role === "user" ? "#93c5fd" : "#cbd5e1",
            }}
          >
            <span
              style={{
                fontWeight: 500,
                color: m.role === "user" ? "#93c5fd" : "#818cf8",
              }}
            >
              {m.role === "user" ? "You  " : "AI  "}
            </span>
            {m.text}
          </div>
        ))}

        {typing && (
          <div
            style={{
              color: "#475569",
              fontSize: "13px",
              fontStyle: "italic",
            }}
          >
            Thinking...
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMsg()}
          placeholder="Ask about cargo, bids, trips, shipments..."
          style={{
            flex: 1,
            background: "#0a1628",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: "100px",
            fontSize: "13px",
            outline: "none",
          }}
        />

        <button
          onClick={() => sendMsg()}
          disabled={typing}
          style={{
            background: typing ? "#1e3a5f" : "#3b82f6",
            color: typing ? "#475569" : "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "100px",
            fontSize: "13px",
            cursor: typing ? "default" : "pointer",
          }}
        >
          Ask AI
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [cargoRequests, setCargoRequests] = useState<any[]>([]);
  const [tripOffers, setTripOffers] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("cargo_requests")
      .select("id, pickup_location, delivery_location, weight_kg, budget")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => setCargoRequests(data || []));

    supabase
      .from("trip_offers")
      .select("id, origin, destination, price_per_seat, available_seats")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => setTripOffers(data || []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div
        style={{
          background: "#0a1628",
          color: "#fff",
          borderRadius: "0 0 24px 24px",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "3rem 2.5rem 2rem", position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.3)",
              color: "#93c5fd",
              fontSize: "12px",
              fontWeight: 500,
              padding: "4px 12px",
              borderRadius: "100px",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                background: "#3b82f6",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
            Live Trade Platform
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: "0 0 1rem",
            }}
          >
            NamLogix{" "}
            <span style={{ color: "#f97316" }}>AFRICA</span>
            <br />
            Trade Intelligence
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#94a3b8",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 0 2rem",
            }}
          >
            Connect, Ship, Trade — The most trusted logistics marketplace in
            Namibia and Southern Africa.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            <Link
              href="/request-cargo"
              style={{
                background: "#f97316",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "100px",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              📦 Post Cargo
            </Link>

            <Link
              href="/bids"
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "12px 24px",
                borderRadius: "100px",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              💰 Cargo Bids
            </Link>

            <Link
              href="/store"
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "12px 24px",
                borderRadius: "100px",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              🛒 Browse Store
            </Link>

            <Link
              href="/trip-offers"
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "12px 24px",
                borderRadius: "100px",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              🚛 Find a Ride
            </Link>

            <Link
              href="/order-status"
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "12px 24px",
                borderRadius: "100px",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              📍 Track Order
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[
              ["18+", "Database tables"],
              ["SADC", "Region coverage"],
              ["Bids", "Transport quotes"],
              ["NAD", "Local currency"],
            ].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: "24px", fontWeight: 700 }}>{num}</div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginTop: "2px",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <AIAssistant />
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* QUICK LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {[
            { label: "🛒 Store", href: "/store" },
            { label: "📦 Request Cargo", href: "/request-cargo" },
            { label: "💰 Cargo Bids", href: "/bids" },
            { label: "🚛 Trip Offers", href: "/trip-offers" },
            { label: "📍 Track Order", href: "/order-status" },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition font-semibold text-gray-700 cursor-pointer">
                {item.label}
              </div>
            </Link>
          ))}
        </div>

        {/* CARGO REQUESTS */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                📦 Available Cargo Requests
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Cargo opportunities available for transporters and logistics
                partners.
              </p>
            </div>

            <Link
              href="/cargo-requests"
              className="text-blue-600 hover:underline text-sm"
            >
              View all →
            </Link>
          </div>

          {cargoRequests.length === 0 ? (
            <AppCard className="text-center text-gray-500">
              No cargo requests yet.
            </AppCard>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cargoRequests.map((req) => (
                <AppCard key={req.id} hover>
                  <div className="font-semibold">
                    {req.pickup_location} → {req.delivery_location}
                  </div>

                  <div className="text-sm text-gray-500 mt-2">
                    {req.weight_kg} kg · Budget N$
                    {req.budget?.toLocaleString()}
                  </div>

                  <Link
                    href="/bids"
                    className="inline-block mt-3 text-blue-600 text-sm font-medium"
                  >
                    View and Bid →
                  </Link>
                </AppCard>
              ))}
            </div>
          )}
        </div>

        {/* BIDS SECTION */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">💰 Cargo Bidding</h2>
              <p className="text-sm text-gray-500 mt-1">
                Transporters can quote for cargo movement and businesses can
                choose the best offer.
              </p>
            </div>

            <Link
              href="/bids"
              className="text-blue-600 hover:underline text-sm"
            >
              Open bids →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <AppCard hover>
              <h3 className="font-semibold text-lg">1. Post Cargo</h3>
              <p className="text-sm text-gray-500 mt-2">
                Cargo owners post pickup, destination, weight, and budget.
              </p>
            </AppCard>

            <AppCard hover>
              <h3 className="font-semibold text-lg">2. Receive Bids</h3>
              <p className="text-sm text-gray-500 mt-2">
                Transporters submit pricing, route, and delivery estimates.
              </p>
            </AppCard>

            <AppCard hover>
              <h3 className="font-semibold text-lg">3. Choose Offer</h3>
              <p className="text-sm text-gray-500 mt-2">
                Select the best transporter and move cargo across the region.
              </p>
            </AppCard>
          </div>
        </div>

        {/* TRIP OFFERS */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">🚛 Available Trips</h2>
              <p className="text-sm text-gray-500 mt-1">
                Transport routes and trips available for passengers or cargo.
              </p>
            </div>

            <Link
              href="/trip-offers"
              className="text-blue-600 hover:underline text-sm"
            >
              View all →
            </Link>
          </div>

          {tripOffers.length === 0 ? (
            <AppCard className="text-center text-gray-500">
              No trip offers yet.
            </AppCard>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tripOffers.map((offer) => (
                <AppCard key={offer.id} hover>
                  <div className="font-semibold">
                    {offer.origin} → {offer.destination}
                  </div>

                  <div className="text-sm text-gray-500 mt-2">
                    N${offer.price_per_seat} per seat ·{" "}
                    {offer.available_seats} seats left
                  </div>

                  <Link
                    href="/trip-offers"
                    className="inline-block mt-3 text-blue-600 text-sm font-medium"
                  >
                    Book →
                  </Link>
                </AppCard>
              ))}
            </div>
          )}
        </div>

        <div className="text-center py-8 border-t">
          <Link
            href="/login"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Admin Login →
          </Link>
        </div>
      </div>
    </div>
  );
}