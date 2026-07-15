import type { NextConfig } from "next";

// GitHub Pages serves this repository below `/mc_website`, whereas Vercel
// serves the project from the domain root. `basePath` is baked in at build
// time, so it must not be set for Vercel builds.
const isVercel = process.env.VERCEL === '1';
const basePath = isVercel ? '' : '/mc_website';

const nextConfig: NextConfig = {
  output: 'export', // Enables static HTML export, generating './out'
  ...(basePath ? { basePath } : {}),
  env: {
    // Exposed so local `/public` image paths can be prefixed client- and server-side;
    // next/image does not prepend basePath to plain string src values automatically.
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  images: {
    unoptimized: true, // Required for static hosting as Github Pages has no dynamic Node resize server
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
