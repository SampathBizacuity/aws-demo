import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use static export so Amplify can host without SSR rewrites.
  output: 'export'
};

export default nextConfig;
