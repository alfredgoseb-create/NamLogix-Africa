/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/NamLogix-Africa',
  assetPrefix: '/NamLogix-Africa',
  trailingSlash: true,
}

module.exports = nextConfig