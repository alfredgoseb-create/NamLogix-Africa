import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/Layout';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch data when the page loads
  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setInventory(data);
    setLoading(false);
  }

  // Handle Delete with confirmation
  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setInventory(inventory.filter(item => item.id !== id));
    } else {
      alert("Error: " + error.message);
    }
  }

  // Filter inventory based on search input
  const filteredItems = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      {/* Header Section with Search and Profile */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search inventory..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
        </div>
        <div className="flex space-x-4">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900">Alfred Goseb</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
          <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">AG</div>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-semibold uppercase">Total Items</p>
          <p className="text-3xl font-bold text-slate-900">{inventory.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-semibold uppercase">Warehouses</p>
          <p className="text-3xl font-bold text-slate-900">3</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-semibold uppercase">Shipments</p>
          <p className="text-3xl font-bold text-slate-900">12</p>
        </div>
      </div>

      {/* Main Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Inventory List</h2>
        <div className="space-y-4">
          {loading ? (
            <p className="text-slate-500">Loading your stock...</p>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 transition">
                <div>
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">ID: {item.id.substring(0, 8)}</p>
                </div>
                <div className="flex items-center space-x-6">
                  <p className="text-lg font-mono font-bold text-blue-600">{item.quantity} Units</p>
                  <div className="flex space-x-3">
                    {/* Link to the Edit page we created */}
                    <Link href={`/edit-product/${item.id}`}>
                      <button className="text-blue-500 hover:text-blue-700 font-bold text-sm">
                        Edit
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-red-400 hover:text-red-600 font-bold text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-400 py-10">No items found matching your search.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}