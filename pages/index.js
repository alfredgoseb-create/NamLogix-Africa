import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/Layout';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    try {
      // Build-time safety: check if supabase exists before calling
      if (!supabase) {
        console.warn("Supabase client not initialized.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setInventory(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    if (!supabase) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    
    if (!error) {
      setInventory(inventory.filter(item => item.id !== id));
    } else {
      alert("Error: " + error.message);
    }
  }

  const filteredItems = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      {/* Search and User Profile Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search inventory..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900">Alfred Goseb</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
          <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            AG
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Items</p>
          <p className="text-3xl font-black text-slate-900">{inventory.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Warehouses</p>
          <p className="text-3xl font-black text-slate-900">3</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pending Shipments</p>
          <p className="text-3xl font-black text-slate-900">12</p>
        </div>
      </div>

      {/* Main Inventory List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Inventory Status</h2>
          <Link href="/add-product">
            <button className="text-sm bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-lg hover:bg-blue-100 transition">
              + Quick Add
            </button>
          </Link>
        </div>
        
        <div className="divide-y divide-slate-50">
          {loading ? (
            <div className="p-10 text-center text-slate-400 animate-pulse">Synchronizing with database...</div>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 hover:bg-slate-50 transition">
                <div className="mb-4 sm:mb-0">
                  <p className="font-bold text-slate-900 text-lg">{item.name}</p>
                  <p className="text-xs font-mono text-slate-400 uppercase">REF: {item.id.substring(0, 8)}</p>
                </div>
                <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end space-x-8">
                  <p className="text-xl font-mono font-black text-blue-600">{item.quantity} <span className="text-xs text-slate-400 uppercase">Units</span></p>
                  <div className="flex space-x-4">
                    <Link href={`/edit-product/${item.id}`}>
                      <button className="text-slate-400 hover:text-blue-600 transition p-1">
                        ✏️ <span className="text-xs font-bold ml-1">Edit</span>
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-slate-400 hover:text-red-500 transition p-1"
                    >
                      🗑️ <span className="text-xs font-bold ml-1">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center">
              <p className="text-slate-400 italic">No products found in the database.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}