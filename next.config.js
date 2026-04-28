/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Turbopack configuration to resolve @/* imports correctly
  turbopack: {
    resolveAlias: {
      '@': './app',
      '@/components': './app/components',
      '@/lib': './app/lib',
    },
  },
  
  // Do NOT include `output: 'export'`
}

module.exports = nextConfig