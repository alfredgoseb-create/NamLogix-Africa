import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for active session on load
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getUser();

    // Listen for auth state changes (Login/Logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_OUT') {
        router.push('/login');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <style jsx global>{`
        body { margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, sans-serif; }
        .nav-link { color: #64748b; text-decoration: none; font-weight: 600; padding: 10px 15px; border-radius: 8px; font-size: 14px; transition: 0.2s; }
        .nav-link:hover { background: #eff6ff; color: #2563eb; }
        .active-link { color: #2563eb; background: #eff6ff; }
        .container { max-width: 1000px; margin: 0 auto; padding: 20px; }
        .btn-logout { background: #fee2e2; color: #ef4444; border: none; padding: 8px 16px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 13px; transition: 0.2s; }
        .btn-logout:hover { background: #fecaca; }
        header { background: white; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 50; }
      `}</style>
      
      <header>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: '900', fontSize: '20px', letterSpacing: '-0.5px' }}>
              NamLogix <span style={{color:'#2563eb'}}>AFRICA</span>
            </span>
          </div>
          
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active-link' : ''}`}>Dashboard</Link>
              <Link href="/suppliers" className={`nav-link ${router.pathname === '/suppliers' ? 'active-link' : ''}`}>Suppliers</Link>
              <Link href="/stats" className={`nav-link ${router.pathname === '/stats' ? 'active-link' : ''}`}>Analytics</Link>
              <div style={{ width: '1px', height: '20px', background: '#e2e8f0', margin: '0 10px' }}></div>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>{user.email}</span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          )}
        </div>
      </header>

      <main>
        {loading ? (
          <div className="container" style={{ textAlign: 'center', paddingTop: '50px', color: '#64748b' }}>
            Connecting to NamLogix Network...
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </main>
    </>
  );
}

export default MyApp;