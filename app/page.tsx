"use client";

import { useState } from "react";
import Link from "next/link";

function getAIResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("cargo")) {
    return "Post cargo or browse available shipments below.";
  }
  if (q.includes("trip")) {
    return "Check available trips or create your own route.";
  }
  if (q.includes("price")) {
    return "Prices depend on distance, weight, and demand.";
  }
  return "I can help with cargo, trips, pricing, and logistics.";
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    setResponse(getAIResponse(query));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔥 HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="max-w-5xl mx-auto text-center px-6">

          <h1 className="text-5xl font-bold mb-4">
            NamLogix <span className="text-orange-300">AFRICA</span>
          </h1>

          <p className="text-xl mb-6">
            AI-powered logistics assistant for cargo, transport & trade.
          </p>

          {/* AI INPUT */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Ask: How do I ship goods to Walvis Bay?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
              className="flex-1 px-5 py-3 rounded-xl text-gray-800"
            />

            <button
              onClick={handleAsk}
              className="bg-orange-500 px-6 py-3 rounded-xl font-semibold hover:bg-orange-600"
            >
              {loading ? "Thinking..." : "Ask AI"}
            </button>
          </div>

          {/* AI RESPONSE */}
          {response && (
            <div className="mt-6 bg-white/10 p-4 rounded-xl text-left">
              🤖 {response}
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/request-cargo" className="bg-orange-500 px-6 py-2 rounded-full">
              📦 Post Cargo
            </Link>
            <Link href="/trip-offers" className="bg-white text-blue-900 px-6 py-2 rounded-full">
              🚛 Find Trips
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}