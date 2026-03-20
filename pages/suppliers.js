import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => { fetchSuppliers(); }, []);

  async function fetchSuppliers() {
    const { data } = await supabase.from('suppliers').select('*').order('name');
    if (data) setSuppliers(data);
  }

  async function addSupplier(e) {
    e.preventDefault();
    await supabase.from('suppliers').insert([{ name, contact }]);
    setName(''); setContact('');
    fetchSuppliers();
  }

  return (
    <div className="container">
      <h1 style={{ fontWeight: '900' }}>Supplier Network</h1>
      
      <form onSubmit={addSupplier} style={{ background: 'white', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0', marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <input placeholder="Company Name" value={name} onChange={e => setName(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} required />
        <input placeholder="Contact (Email/Phone)" value={contact} onChange={e => setContact(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} required />
        <button type="submit" style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Add Vendor</button>
      </form>

      <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8fafc' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left' }}>Vendor</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Contact Info</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{s.name}</td>
                <td style={{ padding: '15px', color: '#64748b' }}>{s.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}