// app/aviation/dashboard/charters/new/page.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewCharterPage() {
  const router = useRouter();
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingVendor, setFetchingVendor] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    aircraft_type: "",
    aircraft_registration: "",
    capacity_passengers: "",
    max_cargo_kg: "",
    origin: "",
    destination: "",
    origin_airport_code: "",
    destination_airport_code: "",
    departure_time: "",
    return_time: "",
    is_one_way: false,
    price_per_hour: "",
    price_total: "",
    available_seats: "",
    description: "",
  });

  useEffect(() => {
    fetchVendor();
  }, []);

  async function fetchVendor() {
    setFetchingVendor(true);
    setError(null);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    
    const { data: vendor, error: vendorError } = await supabase
      .from("aviation_vendors")
      .select("id, status")
      .eq("user_id", user.id)
      .single();
    
    if (vendorError) {
      console.error("Vendor fetch error:", vendorError);
      setError("You are not registered as an aviation service provider. Please register first.");
      setFetchingVendor(false);
      return;
    }
    
    if (vendor) {
      if (vendor.status !== "approved") {
        setError(`Your account is ${vendor.status}. Please wait for admin approval.`);
        setFetchingVendor(false);
        return;
      }
      setVendorId(vendor.id);
    } else {
      setError("No vendor profile found. Please register as an aviation service provider.");
      setFetchingVendor(false);
      return;
    }
    
    setFetchingVendor(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!vendorId) {
      alert("Vendor not found. Please register first.");
      return;
    }
    
    if (!form.aircraft_type) {
      alert("Aircraft type is required");
      return;
    }
    
    if (!form.origin || !form.destination) {
      alert("Origin and destination are required");
      return;
    }
    
    if (!form.departure_time) {
      alert("Departure time is required");
      return;
    }
    
    setLoading(true);

    const charterData = {
      vendor_id: vendorId,
      aircraft_type: form.aircraft_type,
      aircraft_registration: form.aircraft_registration || null,
      capacity_passengers: form.capacity_passengers ? parseInt(form.capacity_passengers) : null,
      max_cargo_kg: form.max_cargo_kg ? parseFloat(form.max_cargo_kg) : null,
      origin: form.origin,
      destination: form.destination,
      origin_airport_code: form.origin_airport_code || null,
      destination_airport_code: form.destination_airport_code || null,
      departure_time: form.departure_time,
      return_time: form.return_time || null,
      is_one_way: form.is_one_way,
      price_per_hour: form.price_per_hour ? parseFloat(form.price_per_hour) : null,
      price_total: form.price_total ? parseFloat(form.price_total) : null,
      available_seats: form.available_seats ? parseInt(form.available_seats) : form.capacity_passengers ? parseInt(form.capacity_passengers) : null,
      description: form.description || null,
      status: "available",
    };

    console.log("Submitting charter:", charterData);

    const { error: insertError } = await supabase
      .from("aviation_charters")
      .insert([charterData]);

    if (insertError) {
      console.error("Insert error:", insertError);
      alert("Failed to add charter: " + insertError.message);
    } else {
      alert("Charter flight added successfully!");
      router.push("/aviation/dashboard");
    }
    setLoading(false);
  }

  if (fetchingVendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow p-8 max-w-md text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/aviation/register" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg">
            Register as Vendor
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Add Charter Flight</h1>
          <Link href="/aviation/dashboard" className="text-blue-600 text-sm">← Back to Dashboard</Link>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Aircraft Type *</label>
              <input 
                type="text" 
                required 
                value={form.aircraft_type} 
                onChange={(e) => setForm({...form, aircraft_type: e.target.value})} 
                className="w-full border rounded px-3 py-2" 
                placeholder="e.g., Cessna 172, Gulfstream G450" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Registration</label>
              <input 
                type="text" 
                value={form.aircraft_registration} 
                onChange={(e) => setForm({...form, aircraft_registration: e.target.value})} 
                className="w-full border rounded px-3 py-2" 
                placeholder="e.g., V5-NAM" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Passenger Capacity</label>
              <input 
                type="number" 
                value={form.capacity_passengers} 
                onChange={(e) => setForm({...form, capacity_passengers: e.target.value})} 
                className="w-full border rounded px-3 py-2" 
                placeholder="e.g., 6" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Cargo (kg)</label>
              <input 
                type="number" 
                value={form.max_cargo_kg} 
                onChange={(e) => setForm({...form, max_cargo_kg: e.target.value})} 
                className="w-full border rounded px-3 py-2" 
                placeholder="e.g., 500" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Origin *</label>
              <input 
                type="text" 
                required 
                value={form.origin} 
                onChange={(e) => setForm({...form, origin: e.target.value})} 
                className="w-full border rounded px-3 py-2" 
                placeholder="e.g., Windhoek" 
              />
              <input 
                type="text" 
                value={form.origin_airport_code} 
                onChange={(e) => setForm({...form, origin_airport_code: e.target.value})} 
                className="w-full mt-1 border rounded px-3 py-1 text-sm" 
                placeholder="Airport code (e.g., FYWH)" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Destination *</label>
              <input 
                type="text" 
                required 
                value={form.destination} 
                onChange={(e) => setForm({...form, destination: e.target.value})} 
                className="w-full border rounded px-3 py-2" 
                placeholder="e.g., Swakopmund" 
              />
              <input 
                type="text" 
                value={form.destination_airport_code} 
                onChange={(e) => setForm({...form, destination_airport_code: e.target.value})} 
                className="w-full mt-1 border rounded px-3 py-1 text-sm" 
                placeholder="Airport code (e.g., FYSM)" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Departure Time *</label>
              <input 
                type="datetime-local" 
                required 
                value={form.departure_time} 
                onChange={(e) => setForm({...form, departure_time: e.target.value})} 
                className="w-full border rounded px-3 py-2" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Return Time</label>
              <input 
                type="datetime-local" 
                value={form.return_time} 
                onChange={(e) => setForm({...form, return_time: e.target.value})} 
                className="w-full border rounded px-3 py-2" 
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty for one-way flights</p>
            </div>
          </div>
          
          <div>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={form.is_one_way} 
                onChange={(e) => setForm({...form, is_one_way: e.target.checked})} 
              />
              <span className="text-sm">One Way Flight (no return)</span>
            </label>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price Per Hour (N$)</label>
              <input 
                type="number" 
                step="0.01" 
                value={form.price_per_hour} 
                onChange={(e) => setForm({...form, price_per_hour: e.target.value})} 
                className="w-full border rounded px-3 py-2" 
                placeholder="e.g., 8500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Price (N$)</label>
              <input 
                type="number" 
                step="0.01" 
                value={form.price_total} 
                onChange={(e) => setForm({...form, price_total: e.target.value})} 
                className="w-full border rounded px-3 py-2" 
                placeholder="e.g., 25000" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Available Seats</label>
            <input 
              type="number" 
              value={form.available_seats} 
              onChange={(e) => setForm({...form, available_seats: e.target.value})} 
              className="w-full border rounded px-3 py-2" 
              placeholder="Leave empty to use passenger capacity" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea 
              rows={3} 
              value={form.description} 
              onChange={(e) => setForm({...form, description: e.target.value})} 
              className="w-full border rounded px-3 py-2" 
              placeholder="Additional details about the aircraft, amenities, restrictions, special offers..." 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Adding Charter..." : "Add Charter Flight"}
          </button>
        </form>
      </div>
    </div>
  );
}