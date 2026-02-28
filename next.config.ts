import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/reach-modern' : '',
  assetPrefix: isProd ? '/reach-modern' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
