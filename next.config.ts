import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**" // Allows all HTTPS hosts
      }
      // {
      //   protocol: "https",
      //   hostname: "cineflow-videofiles.s3.ap-south-1.amazonaws.com"
      // },
    ]
  },
  devIndicators: false
};

export default nextConfig;
