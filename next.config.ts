import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: process.env.GITHUB_ACTIONS === 'true' ? '/data_news_project/' : undefined,
  images: { unoptimized: true },
};

export default nextConfig;