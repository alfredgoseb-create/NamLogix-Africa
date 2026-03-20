import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background-color: #f8fafc;
          color: #1e293b;
        }
        * {
          box-sizing: border-box;
        }
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;