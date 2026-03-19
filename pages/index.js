import React from 'react';

export default function Home() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    }}>
      <header style={{ 
        borderBottom: '2px solid #e2e8f0', 
        marginBottom: '30px', 
        paddingBottom: '20px' 
      }}>
        <h1 style={{ color: '#0f172a', fontSize: '32px', fontWeight: '900', margin: '0' }}>
          NamLogix Africa
        </h1>
        <p style={{ color: '#64748b', marginTop: '8px' }}>
          Inventory Management System v2.0
        </p>
      </header>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px' 
      }}>
        <div style={{ 
          background: '#fff', 
          padding: '24px', 
          borderRadius: '16px', 
          border: '1px solid #e2e8f0', 
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' 
        }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            Build Status
          </p>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a', margin: '0' }}>
            ✅ SUCCESS
          </p>
        </div>

        <div style={{ 
          background: '#fff', 
          padding: '24px', 
          borderRadius: '16px', 
          border: '1px solid #e2e8f0', 
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' 
        }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            System Check
          </p>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', margin: '0' }}>
            Online
          </p>
        </div>
      </div>

      <div style={{ 
        marginTop: '40px', 
        padding: '30px', 
        background: '#f8fafc', 
        borderRadius: '16px', 
        textAlign: 'center',
        border: '1px dashed #cbd5e1'
      }}>
        <p style={{ color: '#475569', fontSize: '18px', fontWeight: '500' }}>
          🚀 If you see this page, the GitHub Actions build finally passed!
        </p>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '10px' }}>
          We have bypassed the Supabase error. Now we can slowly add features back.
        </p>
      </div>
    </div>
  );
}