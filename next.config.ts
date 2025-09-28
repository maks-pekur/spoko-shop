import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { hostname: "spokosushi.com", protocol: "https" },
      { hostname: "images.unsplash.com", protocol: "https" },
      { hostname: "via.placeholder.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
