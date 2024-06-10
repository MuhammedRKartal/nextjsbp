/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_VERIFICATION: process.env.GOOGLE_VERIFICATION,
  },
};

module.exports = nextConfig;
