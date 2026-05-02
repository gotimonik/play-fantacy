/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
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
