import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

function Card({ children, className = "", hover = false }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`bg-white rounded-xl shadow p-6 ${hover ? "hover:shadow-lg transition cursor-pointer" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default async function HomePage() {
  const { data: cargoRequests } = await supabase
    .from("cargo_requests")
    .select("id, pickup_location, delivery_location, weight_kg, budget")
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(6);

  const { data: tripOffers } = await supabase
    .from("trip_offers")
    .select("id, origin, destination, price_per_seat, available_seats")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">NamLogix <span className="text-orange-300">AFRICA</span></h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Connect, Ship, Trade - The most trusted logistics marketplace in Namibia.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/request-cargo" className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-semibold transition">📦 Post Cargo</Link>
            <Link href="/store" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition">🛒 Browse Store</Link>
            <Link href="/trip-offers" className="border border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-full font-semibold transition">🚛 Find a Ride</Link>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <Link href="/store"><div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition font-semibold text-gray-700">🛒 Store</div></Link>
          <Link href="/request-cargo"><div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition font-semibold text-gray-700">📦 Request Cargo</div></Link>
          <Link href="/trip-offers"><div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition font-semibold text-gray-700">🚛 Trip Offers</div></Link>
          <Link href="/order-status"><div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition font-semibold text-gray-700">📍 Track Order</div></Link>
        </div>
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">📦 Available Cargo Requests</h2>
            <Link href="/request-cargo" className="text-blue-600 hover:underline text-sm">View all →</Link>
          </div>
          {!cargoRequests || cargoRequests.length === 0 ? (
            <Card className="text-center text-gray-500">No cargo requests yet.</Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cargoRequests.map((req) => (
                <Card key={req.id} hover>
                  <div className="font-semibold">{req.pickup_location} → {req.delivery_location}</div>
                  <div className="text-sm text-gray-500 mt-2">{req.weight_kg} kg · Budget N${req.budget?.toLocaleString()}</div>
                  <Link href="/cargo-bids" className="inline-block mt-3 text-blue-600 text-sm font-medium">View and Bid →</Link>
                </Card>
              ))}
            </div>
          )}
        </div>
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">🚛 Available Trips</h2>
            <Link href="/trip-offers" className="text-blue-600 hover:underline text-sm">View all →</Link>
          </div>
          {!tripOffers || tripOffers.length === 0 ? (
            <Card className="text-center text-gray-500">No trip offers yet.</Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tripOffers.map((offer) => (
                <Card key={offer.id} hover>
                  <div className="font-semibold">{offer.origin} → {offer.destination}</div>
                  <div className="text-sm text-gray-500 mt-2">N${offer.price_per_seat} per seat · {offer.available_seats} seats left</div>
                  <Link href="/trip-offers" className="inline-block mt-3 text-blue-600 text-sm font-medium">Book →</Link>
                </Card>
              ))}
            </div>
          )}
        </div>
        <div className="text-center py-8 border-t">
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-700">Admin Login →</Link>
        </div>
      </div>
      <footer className="bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          2026 NamLogix Africa - Connecting Southern African Trade
        </div>
      </footer>
    </div>
  );
}
