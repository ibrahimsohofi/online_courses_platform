/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Set to true to prevent hydration issues
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
