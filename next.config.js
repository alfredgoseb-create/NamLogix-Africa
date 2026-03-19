/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/NamLogix-Africa',
  images: {
    unoptimized: true,
  },
  // This ensures that links to /warehouse become /NamLogix-Africa/warehouse
  trailingSlash: true, 
}

module.exports = nextConfig