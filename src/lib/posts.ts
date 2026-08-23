import { posts as staticPosts } from "@/data/blog/posts";
import type { BlogBlock } from "@/data/blog/types";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safeQuery";

export type UnifiedPost = {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt: string;
  date: string;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  readingTime: string;
  faqs?: { question: string; answer: string }[];
  source: "static" | "db";
  blocks?: BlogBlock[];
  bodyMarkdown?: string;
};

function staticToUnified(post: (typeof staticPosts)[number]): UnifiedPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    coverImage: post.coverImage,
    coverAlt: post.coverAlt,
    tags: post.tags,
    readingTime: post.readingTime,
    faqs: post.faqs,
    source: "static",
    blocks: post.content,
  };
}

function wordsToReadingTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export { wordsToReadingTime };

async function getDbPosts() {
  return safeQuery(
    () =>
      prisma.post.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
      }),
    []
  );
}

export async function getAllPosts(): Promise<UnifiedPost[]> {
  const dbPosts = await getDbPosts();

  const unifiedDbPosts: UnifiedPost[] = dbPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    metaTitle: post.metaTitle ?? undefined,
    metaDescription: post.metaDescription ?? undefined,
    excerpt: post.excerpt,
    date: post.publishedAt.toISOString(),
    coverImage: post.coverImage,
    coverAlt: post.coverAlt,
    tags: post.tags,
    readingTime: post.readingTime,
    source: "db",
    bodyMarkdown: post.bodyMarkdown,
  }));

  const unifiedStaticPosts = staticPosts.map(staticToUnified);

  return [...unifiedDbPosts, ...unifiedStaticPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<UnifiedPost | null> {
  const staticMatch = staticPosts.find((p) => p.slug === slug);
  if (staticMatch) return staticToUnified(staticMatch);

  const dbPost = await safeQuery(
    () => prisma.post.findFirst({ where: { slug, published: true } }),
    null
  );
  if (!dbPost) return null;

  return {
    slug: dbPost.slug,
    title: dbPost.title,
    metaTitle: dbPost.metaTitle ?? undefined,
    metaDescription: dbPost.metaDescription ?? undefined,
    excerpt: dbPost.excerpt,
    date: dbPost.publishedAt.toISOString(),
    coverImage: dbPost.coverImage,
    coverAlt: dbPost.coverAlt,
    tags: dbPost.tags,
    readingTime: dbPost.readingTime,
    source: "db",
    bodyMarkdown: dbPost.bodyMarkdown,
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  const dbPosts = await getDbPosts();
  return [...staticPosts.map((p) => p.slug), ...dbPosts.map((p) => p.slug)];
}
