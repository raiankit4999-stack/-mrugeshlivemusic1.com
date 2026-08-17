import type { Metadata } from "next";
import { posts } from "@/data/blog/posts";
import BlogCard from "@/components/blog/BlogCard";
import SectionHeading from "@/components/ui/SectionHeading";
import siteConfig from "@/data/siteConfig.json";

export const metadata: Metadata = {
  title: "Blog — Live Music, Wedding & Event Planning Guides",
  description:
    "Practical guides on Garba nights, wedding music, Bhakti Sangeet, tabla lessons, and live entertainment planning from Crystal Beats, Nadiad, Gujarat.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog — Live Music, Wedding & Event Planning Guides | Crystal Beats",
    description:
      "Practical guides on Garba nights, wedding music, Bhakti Sangeet, tabla lessons, and live entertainment planning from Crystal Beats, Nadiad, Gujarat.",
    url: `${siteConfig.siteUrl}/blog`,
  },
};

export default function BlogPage() {
  return (
    <section className="relative bg-background py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="From Crystal Beats"
          title="Live Music & Event Planning Guides"
          description="Practical, experience-based guides on Garba, weddings, Bhakti Sangeet, and learning Indian instruments."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
