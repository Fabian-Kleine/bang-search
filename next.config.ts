import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{
      source: '/search',
      destination: '/search/index.html'
    }]
  }
};

export default nextConfig;
