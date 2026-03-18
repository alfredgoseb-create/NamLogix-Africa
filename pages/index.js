import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#0070f3', fontSize: '3rem' }}>TradeGrid-Africa</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>Supply Chain & Logistics Management</p>
      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link href="/products" style={{ padding: '15px 25px', background: '#0070f3', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
          View Products
        </Link>
        <Link href="/warehouse" style={{ padding: '15px 25px', background: '#10b981', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
          View Warehouses
        </Link>
      </div>
    </div>
  );
}