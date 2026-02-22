import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["fakestoreapi.com"], // allow these external domains
  },
};

export default nextConfig;
