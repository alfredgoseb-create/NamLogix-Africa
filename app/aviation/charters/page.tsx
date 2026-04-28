// app/aviation/charters/page.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type Charter = {
  id: string;
  aircraft_type: string;
  aircraft_registration: string;
  capacity_passengers: number;
  max_cargo_kg: number;
  origin: string;
  destination: string;
  origin_airport_code: string;
  destination_airport_code: string;
  departure_time: string;
  price_per_hour: number;
  price_total: number;
  available_seats: number;
  vendor: { company_name: string };
};

export default function CharterFlightsPage() {
  const [charters, setCharters] = useState<Charter[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOrigin, setFilterOrigin] = useState("");
  const [filterDestination, setFilterDestination] = useState("");

  useEffect(() => {
    fetchCharters();
  }, []);

  async function fetchCharters() {
    let query = supabase
      .from("aviation_charters")
      .select(`
        *,
        vendor:aviation_vendors(company_name)
      `)
      .eq("status", "available")
      .order("departure_time", { ascending: true });

    const { data, error } = await query;
    if (error) console.error(error);
    else setCharters(data || []);
    setLoading(false);
  }

  const filteredCharters = charters.filter(c => 
    (!filterOrigin || c.origin.toLowerCase().includes(filterOrigin.toLowerCase()) || c.origin_airport_code?.toLowerCase().includes(filterOrigin.toLowerCase())) &&
    (!filterDestination || c.destination.toLowerCase().includes(filterDestination.toLowerCase()) || c.destination_airport_code?.toLowerCase().includes(filterDestination.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Charter Flights in Namibia</h1>
          <p className="text-xl">Book private charter flights across Namibia and beyond.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-8 flex flex-wrap gap-4">
          <input type="text" placeholder="Origin (airport or city)" value={filterOrigin} onChange={(e) => setFilterOrigin(e.target.value)} className="border rounded px-3 py-2 flex-1" />
          <input type="text" placeholder="Destination (airport or city)" value={filterDestination} onChange={(e) => setFilterDestination(e.target.value)} className="border rounded px-3 py-2 flex-1" />
        </div>

        {loading && <div className="text-center py-12">Loading charter flights...</div>}

        {!loading && filteredCharters.length === 0 && (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <p className="text-gray-500">No charter flights found. Check back later or <Link href="/aviation" className="text-blue-600">request ground services</Link>.</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {filteredCharters.map((charter) => (
            <div key={charter.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{charter.aircraft_type}</h2>
                  <p className="text-gray-500 text-sm">{charter.aircraft_registration}</p>
                </div>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{charter.available_seats} seats</span>
              </div>
              <div className="mt-4 text-center py-3 border-y">
                <div className="text-lg font-semibold">{charter.origin_airport_code || charter.origin} → {charter.destination_airport_code || charter.destination}</div>
                <p className="text-sm text-gray-500">{charter.departure_time ? new Date(charter.departure_time).toLocaleString() : "Date TBC"}</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>👥 {charter.capacity_passengers} passengers</div>
                <div>📦 {charter.max_cargo_kg} kg cargo</div>
                {charter.price_per_hour && <div>💰 N${charter.price_per_hour.toLocaleString()}/hour</div>}
                {charter.price_total && <div>💵 Total: N${charter.price_total.toLocaleString()}</div>}
              </div>
              <p className="text-xs text-gray-500 mt-2">Operator: {charter.vendor?.company_name}</p>
              <Link href={`/aviation/charters/${charter.id}`} className="mt-4 block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700">
                Inquire & Book
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}