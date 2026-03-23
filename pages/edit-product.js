import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({ name: '', stock_level: '', supplier: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      async function getProduct() {
        const { data } = await supabase.from('products').select('*').eq('id', id).single();
        if (data) setFormData({ name: data.name, stock_level: data.stock_level, supplier: data.supplier });
        setLoading(false);
      }
      getProduct();
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('products').update({
      name: formData.name,
      stock_level: parseInt(formData.stock_level),
      supplier: formData.supplier
    }).eq('id', id);

    if (error) alert(error.message);
    else router.push('/dashboard');
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading Product Data...</p>;

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <button onClick={() => router.back()} style={{ marginBottom: '20px', cursor: 'pointer' }}>← Cancel</button>
      <h2 style={{ color: '#1e40af' }}>Edit {formData.name}</h2>
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>Product Name</label>
        <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <label>Quantity</label>
        <input type="number" value={formData.stock_level} onChange={(e) => setFormData({...formData, stock_level: e.target.value})} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <label>Supplier</label>
        <input type="text" value={formData.supplier} onChange={(e) => setFormData({...formData, supplier: e.target.value})} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <button type="submit" style={{ backgroundColor: '#f59e0b', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Update Inventory
        </button>
      </form>
    </div>
  );
}