import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Khi thay ảnh placeholder bằng ảnh thật từ CDN/CMS, thêm domain vào đây:
    // remotePatterns: [{ protocol: "https", hostname: "your-cdn.com" }],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
