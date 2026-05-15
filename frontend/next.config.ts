import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },       // Cloudinary CDN
      { protocol: 'https', hostname: 'images.unsplash.com' },      // Fallback images
      { protocol: 'https', hostname: 'maps.googleapis.com' },
      // localhost for local dev (images served via Next.js API or Cloudinary)
      { protocol: 'http',  hostname: 'localhost', port: '3000' },
    ],
  },
};

export default nextConfig;
