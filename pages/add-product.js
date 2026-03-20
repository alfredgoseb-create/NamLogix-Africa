import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('products').insert([{ name, quantity: parseInt(quantity) }]);
    if (error) alert(error.message);
    else router.push('/');
    setLoading(false);
  };

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>← Back to Dashboard</Link>
      <h1 style={{ margin: '20px 0', fontWeight: '900' }}>New Stock Entry</h1>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Product Name</label>
          <input required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Quantity</label>
          <input required type="number" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <button disabled={loading} style={{ width: '100%', backgroundColor: '#0f172a', color: 'white', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
          {loading ? 'Syncing...' : 'Add to Inventory'}
        </button>
      </form>
    </div>
  );
}