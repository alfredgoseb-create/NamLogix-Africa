import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInventory() {
      try {
        if (!supabase) return;
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        if (data) setInventory(data);
      } catch (err) {
        console.error('Error fetching inventory:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
            NamLogix <span style={{ color: '#2563eb' }}>Africa</span>
          </h1>
          <p style={{ color: '#64748b', margin: '5px 0 0 0', fontWeight: '500' }}>Global Inventory Control</p>
        </div>
        <Link href="/add-product" style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}>
            + Add New Product
          </button>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'white', padding: '25px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>Total Stock Items</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a', margin: '10px 0 0 0' }}>{loading ? '...' : inventory.length}</p>
        </div>
        <div style={{ background: 'white', padding: '25px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>System Status</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a', margin: '10px 0 0 0' }}>Online</p>
        </div>
        <div style={{ background: 'white', padding: '25px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>Active Warehouse</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a', margin: '10px 0 0 0' }}>Windhoek</p>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f1f5f9' }}>
            <tr>
              <th style={{ padding: '20px', color: '#475569', fontWeight: 'bold' }}>Product Name</th>
              <th style={{ padding: '20px', color: '#475569', fontWeight: 'bold', textAlign: 'center' }}>Quantity</th>
              <th style={{ padding: '20px', color: '#475569', fontWeight: 'bold', textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Loading inventory...</td></tr>
            ) : inventory.length === 0 ? (
              <tr><td colSpan="3" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No products found. Add one to get started!</td></tr>
            ) : (
              inventory.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '20px', fontWeight: 'bold', color: '#1e293b' }}>{item.name}</td>
                  <td style={{ padding: '20px', textAlign: 'center' }}>
                    <span style={{ background: '#eff6ff', color: '#2563eb', padding: '6px 16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                      {item.quantity}
                    </span>
                  </td>
                  <td style={{ padding: '20px', textAlign: 'right', color: '#16a34a', fontWeight: 'bold' }}>In Stock</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}