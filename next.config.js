/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // We are making these match your repository name exactly
  basePath: '/NamLogix-Africa',
  assetPrefix: '/NamLogix-Africa/',
  trailingSlash: true,
}

module.exports = nextConfig