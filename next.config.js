/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }
};

module.exports = nextConfig;
