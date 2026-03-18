import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const { data } = await supabase.from('products').select('*');
      if (data) setProducts(data);
    }
    getProducts();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Inventory List</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h3>{p.name}</h3>
            <p>N${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}