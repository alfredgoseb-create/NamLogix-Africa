import React from 'react';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body { margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', system-ui, sans-serif; }
        .nav-link { color: #64748b; text-decoration: none; font-weight: 600; padding: 10px 18px; border-radius: 10px; transition: 0.3s; }
        .nav-link:hover { background: #eff6ff; color: #2563eb; }
        .container { max-width: 1000px; margin: 0 auto; padding: 20px; }
      `}</style>
      
      <nav style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '12px 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: '900', fontSize: '22px', letterSpacing: '-0.5px' }}>
            NamLogix <span style={{color:'#2563eb'}}>AFRICA</span>
          </span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <Link href="/" className="nav-link">Dashboard</Link>
            <Link href="/stats" className="nav-link">Analytics</Link>
          </div>
        </div>
      </nav>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;