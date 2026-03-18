import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default function Home() {
  const [stats, setStats] = useState({ products: 0, warehouses: 0, shipments: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // 1. Get counts
      const { count: pCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
      const { count: wCount } = await supabase.from('warehouses').select('*', { count: 'exact', head: true });
      const { count: sCount } = await supabase.from('shipments').select('*', { count: 'exact', head: true });
      
      // 2. Get recent products for the search preview
      const { data: pData } = await supabase.from('products').select('*').limit(5).order('id', { ascending: false });

      setStats({ products: pCount || 0, warehouses: wCount || 0, shipments: sCount || 0 });
      setProducts(pData || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Filter products based on search input
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={containerStyle}>
      {/* Sidebar Navigation */}
      <nav style={sidebarStyle}>
        <div style={{ padding: '20px' }}>
          <h2 style={{ color: '#60a5fa', margin: '0 0 10px 0' }}>NamLogix</h2>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Logistics v1.0</p>
        </div>
        <div style={navGroup}>
          <Link href="/products" style={navLink}>📦 Inventory</Link>
          <Link href="/warehouse" style={navLink}>🏢 Warehouses</Link>
          <Link href="/shipments" style={navLink}>🚚 Shipments</Link>
          <div style={{ marginTop: '20px' }}>
            <Link href="/add-product" style={addBtnStyle}>+ New Product</Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={mainContentStyle}>
        <header style={headerStyle}>
          <div style={{ flex: 1 }}>
            <input 
              type="text" 
              placeholder="🔍 Search inventory..." 
              style={searchBarStyle}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div style={profileArea}>
            <span style={{ marginRight: '10px' }}>Alfred Goseb</span>
            <div style={avatarStyle}>AG</div>
          </div>
        </header>

        {/* Stats Grid */}
        <section style={gridStyle}>
          <div style={statCard}>
            <p style={cardLabel}>INVENTORY</p>
            <p style={numberStyle}>{loading ? '...' : stats.products}</p>
          </div>
          <div style={statCard}>
            <p style={cardLabel}>WAREHOUSES</p>
            <p style={numberStyle}>{loading ? '...' : stats.warehouses}</p>
          </div>
          <div style={statCard}>
            <p style={cardLabel}>SHIPMENTS</p>
            <p style={numberStyle}>{loading ? '...' : stats.shipments}</p>
          </div>
        </section>

        {/* Search Results / Recent Activity */}
        <section style={recentSection}>
          <h3 style={{ marginBottom: '20px' }}>{searchQuery ? 'Search Results' : 'Recently Added Items'}</h3>
          <div style={tableContainer}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(p => (
                <div key={p.id} style={tableRow}>
                  <span>{p.name}</span>
                  <span style={{ fontWeight: 'bold' }}>N${p.price}</span>
                  <span style={statusTag}>In Stock</span>
                </div>
              ))
            ) : (
              <p style={{ color: '#64748b' }}>No items found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

// --- Modern Dashboard Styles ---
const containerStyle = { display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'system-ui, sans-serif' };
const sidebarStyle = { width: '240px', backgroundColor: '#1e293b', color: 'white', display: 'flex', flexDirection: 'column' };
const navGroup = { display: 'flex', flexDirection: 'column', padding: '10px', gap: '5px' };
const navLink = { color: '#cbd5e1', textDecoration: 'none', padding: '12px', borderRadius: '8px', fontSize: '0.95rem' };
const addBtnStyle = { ...navLink, backgroundColor: '#2563eb', color: 'white', textAlign: 'center', fontWeight: 'bold' };

const mainContentStyle = { flex: 1, padding: '30px', overflowY: 'auto' };
const headerStyle = { display: 'flex', alignItems: 'center', marginBottom: '30px', gap: '20px' };
const searchBarStyle = { width: '100%', maxWidth: '400px', padding: '12px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' };
const profileArea = { display: 'flex', alignItems: 'center', color: '#475569', fontWeight: '500' };
const avatarStyle = { width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' };

const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' };
const statCard = { backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' };
const cardLabel = { fontSize: '0.7rem', color: '#64748b', fontWeight: 'bold', letterSpacing: '1px' };
const numberStyle = { fontSize: '2rem', fontWeight: 'bold', margin: '5px 0', color: '#1e293b' };

const recentSection = { backgroundColor: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' };
const tableContainer = { display: 'flex', flexDirection: 'column', gap: '10px' };
const tableRow = { display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #f1f5f9', alignItems: 'center' };
const statusTag = { fontSize: '0.7rem', backgroundColor: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '5px', fontWeight: 'bold' };