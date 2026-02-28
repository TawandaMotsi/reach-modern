import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/reach-modern',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
