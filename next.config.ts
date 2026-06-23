import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Rimuovi o commenta la riga "output: 'export'"
  images: {
    unoptimized: true,
  },
};

export default nextConfig;