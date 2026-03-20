import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Stats() {
  const [report, setReport] = useState({ total: 0, alerts: 0, outOfStock: 0 });

  useEffect(() => {
    async function load() {
      if (!supabase) return;
      const { data } = await supabase.from('products').select('*');
      if (data) {
        setReport({
          total: data.length,
          alerts: data.filter(i => i.quantity > 0 && i.quantity <= 5).length,
          outOfStock: data.filter(i => i.quantity === 0).length
        });
      }
    }
    load();
  }, []);

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <h1 style={{ fontWeight: '900', fontSize: '32px' }}>Warehouse Report</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <p style={{ margin: 0, color: '#64748b', fontWeight: 'bold' }}>Total Products</p>
          <p style={{ fontSize: '42px', fontWeight: '900', margin: '10px 0 0 0' }}>{report.total}</p>
        </div>
        <div style={{ background: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <p style={{ margin: 0, color: '#f59e0b', fontWeight: 'bold' }}>Low Stock Items</p>
          <p style={{ fontSize: '42px', fontWeight: '900', margin: '10px 0 0 0', color: '#f59e0b' }}>{report.alerts}</p>
        </div>
        <div style={{ background: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <p style={{ margin: 0, color: '#ef4444', fontWeight: 'bold' }}>Out of Stock</p>
          <p style={{ fontSize: '42px', fontWeight: '900', margin: '10px 0 0 0', color: '#ef4444' }}>{report.outOfStock}</p>
        </div>
      </div>
    </div>
  );
}