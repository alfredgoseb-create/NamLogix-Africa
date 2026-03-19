import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInventory() {
      try {
        // Build-time safety check to prevent Exit Code 1
        if (!supabase) {
          console.warn("Supabase client not initialized");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (data) {
          setInventory(data);
        }
      } catch (err) {
        console.error("Data fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-4 sm:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              NamLogix <span className="text-blue-600">Africa</span>
            </h1>
            <p className="text-slate-500 font-medium">Inventory & Logistics Control</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Build Status</p>
            <p className="text-sm font-bold text-green-600">● Online & Updated</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Stock Items</p>
            <p className="text-3xl font-black text-slate-900">{inventory.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Warehouses</p>
            <p className="text-3xl font-black text-slate-900">3</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Active Shipments</p>
            <p className="text-3xl font-black text-slate-900">12</p>
          </div>
        </div>

        {/* Inventory List */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h2 className="text-xl font-bold text-slate-800">Live Inventory</h2>
            <Link href="/add-product">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-100">
                + Add Product
              </button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs uppercase border-b border-slate-50">
                  <th className="px-8 py-5 font-black">Item Details</th>
                  <th className="px-8 py-5 font-black text-center">Quantity</th>
                  <th className="px-8 py-5 font-black text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan="3" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400 font-bold">Syncing Database...</p>
                      </div>
                    </td>
                  </tr>
                ) : inventory.length > 0 ? (
                  inventory.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-8 py-6">
                        <p className="font-bold text-slate-900 text-lg">{item.name}</p>
                        <p className="text-xs font-mono text-slate-400 uppercase tracking-tighter">REF: {item.id.substring(0, 8)}</p>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-black font-mono text-lg">
                          {item.quantity}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                          Available
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-8 py-20 text-center text-slate-400 italic">
                      No inventory items found. Add a product to begin.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}