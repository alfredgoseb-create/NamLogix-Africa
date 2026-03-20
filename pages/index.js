import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        fetchInventory();
      }
    };
    checkUser();
  }, []);

  async function fetchInventory() {
    const { data } = await supabase.from('products').select('*').order('name');
    if (data) setInventory(data);
    setLoading(false);
  }

  async function updateStock(id, newQty) {
    if (newQty < 0) return;
    await supabase.from('products').update({ quantity: newQty }).eq('id', id);
    fetchInventory();
  }

  if (loading) return <div className="container">Loading NamLogix Central Hub...</div>;

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h1 style={{ fontWeight: '900' }}>Inventory Dashboard</h1>
        <Link href="/add-product" style={{ background: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
          + New Stock
        </Link>
      </header>

      <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8fafc' }}>
            <tr>
              <th style={{ padding: '20px', textAlign: 'left' }}>Product</th>
              <th style={{ padding: '20px', textAlign: 'center' }}>Stock Level</th>
              <th style={{ padding: '20px', textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '20px', fontWeight: 'bold' }}>{item.name}</td>
                <td style={{ padding: '20px', textAlign: 'center' }}>
                  <button onClick={() => updateStock(item.id, item.quantity - 1)} style={{ padding: '5px 10px' }}>-</button>
                  <span style={{ margin: '0 15px', fontWeight: '900' }}>{item.quantity}</span>
                  <button onClick={() => updateStock(item.id, item.quantity + 1)} style={{ padding: '5px 10px' }}>+</button>
                </td>
                <td style={{ padding: '20px', textAlign: 'right' }}>
                  <span style={{ color: item.quantity <= 5 ? '#ef4444' : '#16a34a', fontWeight: 'bold' }}>
                    {item.quantity <= 5 ? 'LOW STOCK' : 'OK'}
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