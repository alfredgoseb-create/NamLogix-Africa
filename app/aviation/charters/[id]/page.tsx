// app/aviation/charters/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
  return_time: string;
  is_one_way: boolean;
  price_per_hour: number;
  price_total: number;
  available_seats: number;
  description: string;
  vendor: { company_name: string; email: string; phone: string };
};

export default function CharterDetailPage() {
  const { id } = useParams();
  const [charter, setCharter] = useState<Charter | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    passengers: "",
    cargo_kg: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCharter();
  }, [id]);

  async function fetchCharter() {
    const { data, error } = await supabase
      .from("aviation_charters")
      .select(`
        *,
        vendor:aviation_vendors(company_name, email, phone)
      `)
      .eq("id", id)
      .single();
    if (error) console.error(error);
    else setCharter(data);
    setLoading(false);
  }

  async function sendInquiry(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    
    // Store inquiry in a table (you may want to create an `inquiries` table)
    const { error } = await supabase.from("inquiries").insert([{
      type: "charter",
      charter_id: id,
      name: inquiryForm.name,
      email: inquiryForm.email,
      phone: inquiryForm.phone,
      message: `${inquiryForm.passengers} passengers, ${inquiryForm.cargo_kg}kg cargo. ${inquiryForm.message}`,
      status: "pending",
    }]);

    if (error) {
      alert("Failed to send inquiry: " + error.message);
    } else {
      alert("Inquiry sent! The operator will contact you shortly.");
      setShowInquiry(false);
    }
    setSubmitting(false);
  }

  if (loading) return <div className="min-h-screen bg-gray-50 p-6 text-center">Loading...</div>;
  if (!charter) return <div className="min-h-screen bg-gray-50 p-6 text-center">Charter not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/aviation/charters" className="text-blue-600 mb-4 inline-block">← Back to Charters</Link>
        
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6">
            <h1 className="text-3xl font-bold">{charter.aircraft_type}</h1>
            <p className="text-blue-200">{charter.aircraft_registration}</p>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Flight Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Origin:</span>
                    <span className="font-medium">{charter.origin_airport_code || charter.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Destination:</span>
                    <span className="font-medium">{charter.destination_airport_code || charter.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Departure:</span>
                    <span className="font-medium">{new Date(charter.departure_time).toLocaleString()}</span>
                  </div>
                  {charter.return_time && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Return:</span>
                      <span className="font-medium">{new Date(charter.return_time).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{charter.is_one_way ? "One Way" : "Round Trip"}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Aircraft Specs</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passengers:</span>
                    <span className="font-medium">{charter.capacity_passengers} seats</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Cargo:</span>
                    <span className="font-medium">{charter.max_cargo_kg} kg</span>
                  </div>
                  {charter.price_per_hour && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hourly Rate:</span>
                      <span className="font-medium text-green-600">N${charter.price_per_hour.toLocaleString()}</span>
                    </div>
                  )}
                  {charter.price_total && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Price:</span>
                      <span className="font-bold text-green-600 text-lg">N${charter.price_total.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {charter.description && (
              <div className="mt-6 pt-6 border-t">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{charter.description}</p>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t">
              <h2 className="text-lg font-semibold mb-2">Operator</h2>
              <p className="font-medium">{charter.vendor?.company_name}</p>
              <p className="text-sm text-gray-500">{charter.vendor?.email} | {charter.vendor?.phone}</p>
            </div>
            
            <button
              onClick={() => setShowInquiry(true)}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Inquire About This Charter
            </button>
          </div>
        </div>
      </div>
      
      {/* Inquiry Modal */}
      {showInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Inquire About Charter</h2>
              <button onClick={() => setShowInquiry(false)} className="text-gray-500 text-2xl">×</button>
            </div>
            <form onSubmit={sendInquiry} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name *</label>
                <input type="text" required value={inquiryForm.name} onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input type="email" required value={inquiryForm.email} onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input type="tel" value={inquiryForm.phone} onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Passengers</label>
                  <input type="number" value={inquiryForm.passengers} onChange={(e) => setInquiryForm({...inquiryForm, passengers: e.target.value})} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cargo (kg)</label>
                  <input type="number" value={inquiryForm.cargo_kg} onChange={(e) => setInquiryForm({...inquiryForm, cargo_kg: e.target.value})} className="w-full border rounded px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea rows={3} value={inquiryForm.message} onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})} className="w-full border rounded px-3 py-2" placeholder="Any special requirements..." />
              </div>
              <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white py-2 rounded-lg">
                {submitting ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}