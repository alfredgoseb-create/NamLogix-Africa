/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Matches your GitHub repo name exactly
  basePath: '/NamLogix-Africa',
  assetPrefix: '/NamLogix-Africa',
}

module.exports = nextConfig