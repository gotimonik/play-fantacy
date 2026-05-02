/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    domains: ["localhost", "playfantacy.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "playfantacy.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
