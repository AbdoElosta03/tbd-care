import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js rejects a lone "*". These patterns match any hostname in development.
  allowedDevOrigins: ["*.*.*.*", "*.*.*", "*.*"],
};

export default nextConfig;
