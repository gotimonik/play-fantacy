// next.config.js

const nextConfig = {
  images: {
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