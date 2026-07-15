import type { NextConfig } from "next";

const basePath = '/mc_website'; // Matches the repository subfolder url name on Github Pages

const nextConfig: NextConfig = {
  output: 'export', // Enables static HTML export, generating './out'
  basePath,
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

