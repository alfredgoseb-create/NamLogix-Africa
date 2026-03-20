import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);
  const router = useRouter();

  const handleAdd = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('products')
      .insert([{ name, stock_level: parseInt(stock), status: 'In Stock' }]);
    
    if (!error) router.push('/dashboard');
    else alert("Error adding stock");
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Add New Stock</h2>
      <form onSubmit={handleAdd}>
        <input 
          placeholder="Product Name" 
          onChange={(e) => setName(e.target.value)} 
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <input 
          type="number" 
          placeholder="Quantity" 
          onChange={(e) => setStock(e.target.value)} 
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <button type="submit" style={{ background: '#2563eb', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
          Save Product
        </button>
      </form>
    </div>
  );
}