import type { NextConfig } from "next";
import path from "path";

const RETIRED_NADIAD_ANAND_GUIDES = [
  "best-music-teacher-nadiad",
  "best-music-teacher-anand",
  "best-music-academy-nadiad",
  "best-music-academy-anand",
  "best-music-learning-centre-nadiad",
  "best-music-learning-centre-anand",
  "music-instruments-classes-nadiad",
  "music-instruments-classes-anand",
];

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return RETIRED_NADIAD_ANAND_GUIDES.map((slug) => ({
      source: `/blog/${slug}`,
      destination: "/blog/best-music-academy-nadiad-anand",
      permanent: true,
    }));
  },
};

export default nextConfig;
