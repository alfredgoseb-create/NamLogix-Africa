import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // This "dummy" data will show up even if the database is blocked
    // so we can see if the website is actually updating!
    const testData = [{id: 1, name: "Connection Testing...", stock_level: 0, supplier: "NamLogix"}];
    setProducts(testData);

    async function getStock() {
      const { data, error } = await supabase.from('products').select('*');
      if (data && data.length > 0) {
        setProducts(data); // If the database works, it replaces the test data
      }
    }
    getStock();
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h1>Inventory - v6 Force Update</h1>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f3f4f6' }}>
          <tr><th>Item Name</th><th>Stock</th><th>Supplier</th></tr>
        </thead>
        <tbody>
          {products.map(item => (
            <tr key={item.id}>
              <td style={{ padding: '10px' }}>{item.name}</td>
              <td style={{ padding: '10px' }}>{item.stock_level}</td>
              <td style={{ padding: '10px' }}>{item.supplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}