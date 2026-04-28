"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

type Vendor = {
  id: string;
  company_name: string;
  description: string;
  city: string;
  rating: number;
};

export default function AviationPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      const { data } = await supabase
        .from("aviation_vendors")
        .select("id, company_name, description, city, rating")
        .eq("status", "approved")
        .order("company_name");
      setVendors(data || []);
      setLoading(false);
    };
    fetchVendors();
  }, []);

  if (loading) return <div className="p-12 text-center">Loading aviation services...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">✈️ Aviation Services in Namibia</h1>
        <p className="text-gray-600 mt-2">Ground handling, permits, fuel, catering, and more</p>
      </div>
      {vendors.length === 0 ? (
        <Card className="text-center text-gray-500 py-12">No vendors yet. <Link href="/aviation/register" className="text-blue-600">Register as a vendor</Link></Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <Link key={vendor.id} href={`/aviation/${vendor.id}`}>
              <Card hover>
                <h3 className="text-xl font-semibold">{vendor.company_name}</h3>
                <p className="text-sm text-gray-500 mt-1">{vendor.city}</p>
                <p className="text-sm text-gray-600 mt-3 line-clamp-2">{vendor.description || "Aviation service provider"}</p>
                {vendor.rating > 0 && <div className="mt-2 text-sm text-yellow-500">★ {vendor.rating}</div>}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}