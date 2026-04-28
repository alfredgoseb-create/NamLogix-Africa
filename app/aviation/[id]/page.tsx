// app/aviation/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type Vendor = {
  id: string;
  company_name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  rating: number;
  years_in_business: number;
};

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  price_type: string;
  estimated_duration: string;
  category: { name: string; icon: string };
};

type Location = {
  airport_code: string;
  airport_name: string;
  city: string;
};

export default function VendorDetailPage() {
  const { id } = useParams();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingForm, setBookingForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    flight_number: "",
    aircraft_registration: "",
    aircraft_type: "",
    service_date: "",
    special_requests: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetchVendorData();
  }, [id]);

  async function fetchVendorData() {
    // Fetch vendor
    const { data: vendorData } = await supabase
      .from("aviation_vendors")
      .select("*")
      .eq("id", id)
      .single();
    setVendor(vendorData);

    // Fetch services with categories
    const { data: servicesData } = await supabase
      .from("aviation_services")
      .select(`
        *,
        category:aviation_service_categories(name, icon)
      `)
      .eq("vendor_id", id)
      .eq("is_active", true);
    setServices(servicesData || []);

    // Fetch locations
    const { data: locationsData } = await supabase
      .from("aviation_service_locations")
      .select("*")
      .eq("vendor_id", id);
    setLocations(locationsData || []);

    setLoading(false);
  }

  async function handleBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedService || !vendor) return;
    
    setSubmitting(true);
    const bookingNumber = `AVB-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const { error } = await supabase.from("aviation_bookings").insert([{
      booking_number: bookingNumber,
      vendor_id: vendor.id,
      service_id: selectedService.id,
      customer_name: bookingForm.customer_name,
      customer_email: bookingForm.customer_email,
      customer_phone: bookingForm.customer_phone,
      flight_number: bookingForm.flight_number,
      aircraft_registration: bookingForm.aircraft_registration,
      aircraft_type: bookingForm.aircraft_type,
      service_date: bookingForm.service_date,
      special_requests: bookingForm.special_requests,
      quantity: 1,
      unit_price: selectedService.price,
      total_amount: selectedService.price,
      status: "pending",
    }]);

    if (error) {
      alert("Booking failed: " + error.message);
    } else {
      setBookingSuccess(true);
      setShowBooking(false);
    }
    setSubmitting(false);
  }

  if (loading) return <div className="min-h-screen bg-gray-50 p-6 text-center">Loading...</div>;
  if (!vendor) return <div className="min-h-screen bg-gray-50 p-6 text-center">Vendor not found</div>;

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow p-8 text-center max-w-md">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2">Booking Request Sent!</h2>
          <p className="text-gray-600 mb-6">{vendor.company_name} will confirm your service request shortly.</p>
          <Link href="/aviation" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg">Browse More Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/aviation" className="text-blue-600 mb-4 inline-block">← Back to Aviation Services</Link>

        {/* Vendor Header */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h1 className="text-3xl font-bold">{vendor.company_name}</h1>
          <p className="text-gray-600 mt-2">{vendor.city}</p>
          {vendor.years_in_business && <p className="text-sm text-gray-500 mt-1">{vendor.years_in_business} years in business</p>}
          <p className="mt-4">{vendor.description}</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            {vendor.email && <span className="text-sm text-gray-500">✉️ {vendor.email}</span>}
            {vendor.phone && <span className="text-sm text-gray-500 ml-4">📞 {vendor.phone}</span>}
          </div>
        </div>

        {/* Locations Served */}
        {locations.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">📍 Locations Served</h2>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <span key={loc.airport_code} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {loc.airport_code} - {loc.airport_name || loc.city}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Services List */}
        <h2 className="text-2xl font-bold mb-4">Services Offered</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl mb-2">{service.category?.icon || "✈️"}</div>
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                </div>
                <div className="text-right">
                  {service.price && (
                    <div className="text-xl font-bold text-green-600">N${service.price.toLocaleString()}</div>
                  )}
                  {service.price_type === "per_hour" && <div className="text-xs text-gray-500">per hour</div>}
                  {service.price_type === "quote_based" && <div className="text-sm text-gray-500">Quote based</div>}
                  {service.estimated_duration && <div className="text-xs text-gray-500 mt-1">⏱️ {service.estimated_duration}</div>}
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedService(service);
                  setShowBooking(true);
                }}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Request Service
              </button>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {showBooking && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Book: {selectedService.name}</h2>
                <button onClick={() => setShowBooking(false)} className="text-gray-500 text-2xl">×</button>
              </div>
              <p className="text-gray-600 mb-4">Service by {vendor.company_name}</p>
              {selectedService.price && (
                <p className="text-lg font-semibold text-green-600 mb-4">Price: N${selectedService.price.toLocaleString()}</p>
              )}
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Name *</label>
                  <input type="text" required value={bookingForm.customer_name} onChange={(e) => setBookingForm({...bookingForm, customer_name: e.target.value})} className="w-full border rounded px-3 py-2" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input type="email" required value={bookingForm.customer_email} onChange={(e) => setBookingForm({...bookingForm, customer_email: e.target.value})} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input type="tel" value={bookingForm.customer_phone} onChange={(e) => setBookingForm({...bookingForm, customer_phone: e.target.value})} className="w-full border rounded px-3 py-2" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Flight Number</label>
                    <input type="text" value={bookingForm.flight_number} onChange={(e) => setBookingForm({...bookingForm, flight_number: e.target.value})} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Aircraft Registration</label>
                    <input type="text" value={bookingForm.aircraft_registration} onChange={(e) => setBookingForm({...bookingForm, aircraft_registration: e.target.value})} className="w-full border rounded px-3 py-2" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Aircraft Type</label>
                  <input type="text" value={bookingForm.aircraft_type} onChange={(e) => setBookingForm({...bookingForm, aircraft_type: e.target.value})} className="w-full border rounded px-3 py-2" placeholder="e.g., Cessna 172, Gulfstream G450" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Service Date *</label>
                  <input type="date" required value={bookingForm.service_date} onChange={(e) => setBookingForm({...bookingForm, service_date: e.target.value})} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Special Requests</label>
                  <textarea rows={3} value={bookingForm.special_requests} onChange={(e) => setBookingForm({...bookingForm, special_requests: e.target.value})} className="w-full border rounded px-3 py-2" placeholder="Any special requirements or notes for the service provider..." />
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
                  {submitting ? "Submitting..." : "Submit Booking Request"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}