/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  experimental: {
    cpus: 1
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "playfantacy.com",
        pathname: "/**"
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
