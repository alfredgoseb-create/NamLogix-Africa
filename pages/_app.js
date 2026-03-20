import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check for active session on load
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();

    // Listen for sign-in/sign-out events
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <>
      <style jsx global>{`
        body { margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', sans-serif; }
        .nav-link { color: #64748b; text-decoration: none; font-weight: 600; padding: 10px 15px; border-radius: 8px; }
        .nav-link:hover { background: #eff6ff; color: #2563eb; }
        .container { max-width: 1000px; margin: 0 auto; padding: 20px; }
        .btn-logout { background: #fee2e2; color: #ef4444; border: none; padding: 8px 15px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-left: 10px; }
        .btn-logout:hover { background: #fecaca; }
      `}</style>
      
      <nav style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '10px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: '900', fontSize: '20px' }}>NamLogix <span style={{color:'#2563eb'}}>AFRICA</span></span>
          
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link href="/" className="nav-link">Dashboard</Link>
              <Link href="/stats" className="nav-link">Analytics</Link>
              <div style={{ width: '1px', height: '20px', background: '#e2e8f0', margin: '0 10px' }}></div>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>{user.email}</span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          )}
        </div>
      </nav>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;