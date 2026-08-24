import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "healdiway.bkarogyam.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bkarogyam.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
