"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Package, Users, DollarSign, TrendingUp } from "lucide-react";

export default function VendorDashboard() {
  const router = useRouter();
  const [vendor, setVendor] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");
      const { data: v } = await supabase.from("aviation_vendors").select("*").eq("user_id", user.id).single();
      if (!v) return router.push("/aviation/register");
      setVendor(v);
      await Promise.all([
        supabase.from("aviation_bookings").select("*, service:aviation_services(name)").eq("vendor_id", v.id).then(res => setBookings(res.data || [])),
        supabase.from("aviation_services").select("*").eq("vendor_id", v.id).then(res => setServices(res.data || [])),
      ]);
      setLoading(false);
    };
    fetchVendor();
  }, []);

  if (loading) return <div className="p-12 text-center">Loading dashboard...</div>;

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: Package, color: "bg-blue-100 text-blue-700" },
    { label: "Pending", value: bookings.filter(b => b.status === "pending").length, icon: Users, color: "bg-yellow-100 text-yellow-700" },
    { label: "Services", value: services.length, icon: TrendingUp, color: "bg-green-100 text-green-700" },
    { label: "Revenue", value: `N$${bookings.reduce((s, b) => s + (b.total_amount || 0), 0).toLocaleString()}`, icon: DollarSign, color: "bg-purple-100 text-purple-700" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <p className="text-gray-600">{vendor?.company_name}</p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Link href="/aviation/dashboard/services/new"><Button>+ Add Service</Button></Link>
          <Link href="/aviation/dashboard/charters/new"><Button variant="secondary">+ Add Charter</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
            <div className={`rounded-full p-3 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          {bookings.length === 0 ? (
            <div className="text-gray-500 text-center py-6">No bookings yet</div>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 5).map((b) => (
                <div key={b.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <div className="font-medium">{b.service?.name}</div>
                    <div className="text-xs text-gray-500">{b.customer_name} • {new Date(b.service_date).toLocaleDateString()}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${b.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>{b.status}</span>
                    {b.status === "pending" && (
                      <button onClick={async () => { await supabase.from("aviation_bookings").update({ status: "confirmed" }).eq("id", b.id); window.location.reload(); }} className="ml-2 text-xs text-blue-600">Confirm</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Services List */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Your Services</h2>
          {services.length === 0 ? (
            <div className="text-gray-500 text-center py-6">No services added yet</div>
          ) : (
            <div className="space-y-3">
              {services.map((s) => (
                <div key={s.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.price ? `N$${s.price}` : "Quote based"}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}