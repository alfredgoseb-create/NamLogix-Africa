import React from 'react';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body { margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', sans-serif; }
        .nav-link { color: #64748b; text-decoration: none; font-weight: 600; padding: 8px 16px; border-radius: 8px; transition: 0.2s; }
        .nav-link:hover { background: #eff6ff; color: #2563eb; }
        .container { max-width: 1000px; margin: 0 auto; padding: 20px; }
      `}</style>
      
      <nav style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '15px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: '900', fontSize: '20px' }}>NamLogix <span style={{color:'#2563eb'}}>AFRICA</span></span>
          <div style={{ display: 'flex', gap: '10px' }}>
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