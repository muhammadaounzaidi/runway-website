import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Inlined at build time so the client-side contact form can read it.
  env: {
    API_BASE_URL: process.env.API_BASE_URL ?? "",
  },
};

export default nextConfig;
