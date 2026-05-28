import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enables static HTML export, generating './out'
  basePath: '/mc_website', // Matches the repository subfolder url name on Github Pages
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

