import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  async function fetchInventory() {
    if (!supabase) return;
    const { data } = await supabase.from('products').select('*').order('name');
    if (data) setInventory(data);
  }

  async function updateStock(id, newQty) {
    if (newQty < 0) return;
    await supabase.from('products').update({ quantity: newQty }).eq('id', id);
    fetchInventory();
  }

  const exportToCSV = () => {
    const headers = ['Product Name, Quantity, Last Updated\n'];
    const rows = inventory.map(i => `${i.name}, ${i.quantity}, ${i.created_at}\n`);
    const blob = new Blob([headers + rows.join('')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NamLogix_Inventory_${new Date().toLocaleDateString()}.csv`;
    a.click();
  };

  useEffect(() => { fetchInventory(); }, []);

  const filtered = inventory.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', gap: '15px', flexWrap: 'wrap' }}>
        <input 
          placeholder="Search products..." 
          style={{ flex: '1', minWidth: '250px', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={exportToCSV} style={{ background: '#f1f5f9', color: '#475569', padding: '12px 20px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
            Download CSV
          </button>
          <Link href="/add-product" style={{ background: '#2563eb', color: 'white', padding: '12px 20px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
            + Add Stock
          </Link>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', overflowX: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead style={{ background: '#f8fafc' }}>
            <tr>
              <th style={{ padding: '20px', textAlign: 'left' }}>Product</th>
              <th style={{ padding: '20px', textAlign: 'center' }}>Stock Level</th>
              <th style={{ padding: '20px', textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '20px', fontWeight: 'bold' }}>{item.name}</td>
                <td style={{ padding: '20px', textAlign: 'center' }}>
                  <button onClick={() => updateStock(item.id, item.quantity - 1)} style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}>-</button>
                  <span style={{ margin: '0 20px', fontWeight: '900', fontSize: '18px' }}>{item.quantity}</span>
                  <button onClick={() => updateStock(item.id, item.quantity + 1)} style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}>+</button>
                </td>
                <td style={{ padding: '20px', textAlign: 'right' }}>
                  <span style={{ 
                    color: item.quantity <= 5 ? '#ef4444' : '#16a34a', 
                    fontWeight: 'bold',
                    background: item.quantity <= 5 ? '#fee2e2' : '#dcfce7',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '13px'
                  }}>
                    {item.quantity <= 0 ? 'Out of Stock' : item.quantity <= 5 ? 'Low Stock' : 'Healthy'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}