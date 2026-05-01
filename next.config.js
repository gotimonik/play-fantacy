// next.config.js

const nextConfig = {
  images: {
    domains: ['playfantacy.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'playfantacy.com',
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;