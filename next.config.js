/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'hqhzlkfbyiddcniabion.supabase.co',
    }]
    // domains: ['hqhzlkfbyiddcniabion.supabase.co']
  }
}

module.exports = nextConfig
