import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Warehouse() {
  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    async function getWarehouses() {
      const { data } = await supabase.from('warehouses').select('*');
      if (data) setWarehouses(data);
    }
    getWarehouses();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Warehouse Locations</h1>
      <ul>
        {warehouses.map(w => <li key={w.id}>{w.name} - {w.location}</li>)}
      </ul>
    </div>
  );
}