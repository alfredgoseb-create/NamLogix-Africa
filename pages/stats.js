import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Stats() {
  const [report, setReport] = useState({ total: 0, low: 0, out: 0 });

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('products').select('*');
      if (data) {
        setReport({
          total: data.length,
          low: data.filter(i => i.quantity > 0 && i.quantity <= 5).length,
          out: data.filter(i => i.quantity === 0).length
        });
      }
    }
    load();
  }, []);

  return (
    <div className="container">
      <h1 style={{ fontWeight: '900' }}>Operational Report</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
          <p style={{ margin: 0, color: '#64748b', fontWeight: 'bold' }}>TOTAL SKUs</p>
          <p style={{ fontSize: '32px', fontWeight: '900', margin: '10px 0 0 0' }}>{report.total}</p>
        </div>
        <div style={{ background: '#fffbeb', padding: '30px', borderRadius: '20px', border: '1px solid #fef3c7' }}>
          <p style={{ margin: 0, color: '#b45309', fontWeight: 'bold' }}>LOW STOCK</p>
          <p style={{ fontSize: '32px', fontWeight: '900', margin: '10px 0 0 0', color: '#b45309' }}>{report.low}</p>
        </div>
        <div style={{ background: '#fef2f2', padding: '30px', borderRadius: '20px', border: '1px solid #fee2e2' }}>
          <p style={{ margin: 0, color: '#ef4444', fontWeight: 'bold' }}>OUT OF STOCK</p>
          <p style={{ fontSize: '32px', fontWeight: '900', margin: '10px 0 0 0', color: '#ef4444' }}>{report.out}</p>
        </div>
      </div>
    </div>
  );
}