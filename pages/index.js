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
        // Safety check: if supabase isn't ready, don't crash the build
        if (!supabase) {
          console.warn("Supabase client not found");
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
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              NamLogix <span className="text-blue-600">Africa</span>
            </h1>
            <p className="text-slate-500 font-medium">Global Inventory Management System</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-right">
              <p className="text-xs font-bold text-slate-400 uppercase">System Status</p>
              <p className="text-sm font-bold text-green-600">● Operational</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Stock</p>
            <p className="text-3xl font-black text-slate-900">{inventory.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Warehouses</p>
            <p className="text-3xl font-black text-slate-900">3</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Active Shipments</p>
            <p className="text-3xl font-black text-slate-900">12</p>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-xl font-bold text-slate-800">Live Inventory</h2>
            <Link href="/add-product">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-200">
                + Add New Product
              </button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs uppercase tracking-tighter border-b border-slate-50">
                  <th className="px-8 py-5 font-black">Product Details</th>
                  <th className="px-8 py-5 font-black text-center">Current Quantity</th>
                  <th className="px-8 py-5 font-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan="3" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400 font-bold animate-pulse">Fetching Secure Data...</p>
                      </div>
                    </td>
                  </tr>
                ) : inventory.length > 0 ? (
                  inventory.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-8 py-6">
                        <p className="font-bold text-slate-900 text-lg">{item.name}</p>
                        <p className="text-xs font-mono text-slate-400 uppercase">ID: {item.id.substring(0, 8)}</p>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-black font-mono text-lg">
                          {item.quantity}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Link href={`/edit-product/${item.id}`}>
                            <button className="p-2 text-slate-400 hover:text-blue-600 transition">
                              ✏️
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-8 py-20 text-center text-slate-400 italic">
                      No inventory items found. Add your first product to get started.
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