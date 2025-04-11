/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for static export
  output: 'export',
  distDir: 'out',

  // Skip TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable image optimization for remote images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
