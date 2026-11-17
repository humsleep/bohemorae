import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 전부 정적 페이지라 cacheComponents·partialPrefetching은 끈다
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
