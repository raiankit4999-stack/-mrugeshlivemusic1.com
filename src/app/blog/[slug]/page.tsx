import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/blog/posts";
import BlogContent from "@/components/blog/BlogContent";
import BlogCard from "@/components/blog/BlogCard";
import siteConfig from "@/data/siteConfig.json";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.siteUrl}/blog/${post.slug}`,
      publishedTime: post.date,
      images: [{ url: post.coverImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const otherPosts = posts.filter((p) => p.slug !== slug).slice(0, 3);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage.startsWith("http")
      ? post.coverImage
      : `${siteConfig.siteUrl}${post.coverImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: [
      { "@type": "Person", name: siteConfig.name },
      { "@type": "Organization", name: "Rivavya Create and Trade LLP", url: "https://www.rivavya.com" },
    ],
    publisher: {
      "@type": "Organization",
      name: siteConfig.brand,
      url: siteConfig.siteUrl,
    },
    mainEntityOfPage: `${siteConfig.siteUrl}/blog/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteConfig.siteUrl}/blog/${post.slug}` },
    ],
  };

  const date = new Date(post.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="relative bg-background py-32 lg:py-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-widest text-stone">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>{" "}
          / <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
        </nav>

        <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-gold mb-3">
          {post.tags.join(" · ")}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-ink text-balance">{post.title}</h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-stone">
          <span>{date}</span>
          <span aria-hidden>&middot;</span>
          <span>{post.readingTime}</span>
        </div>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-luxury">
          <Image
            src={post.coverImage}
            alt={post.coverAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 768px"
          />
        </div>

        <div className="mt-10">
          <BlogContent blocks={post.content} />
        </div>

        <div className="mt-12 rounded-2xl glass p-6 text-sm text-stone">
          Written by the Crystal Beats team, in partnership with{" "}
          <a
            href="https://www.rivavya.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-soft transition-colors"
          >
            Rivavya Create and Trade LLP
          </a>
          .
        </div>

        <div className="mt-10 rounded-2xl border border-gold/30 p-6 text-center">
          <p className="font-display text-2xl text-ink">Planning an event?</p>
          <p className="mt-2 text-sm text-stone">
            Book Crystal Beats for your next wedding, Garba night, or celebration.
          </p>
          <Link
            href="/#contact"
            className="mt-5 inline-flex items-center rounded-full bg-gold px-8 py-3 text-sm font-medium uppercase tracking-widest text-ink shadow-gold-glow hover:bg-gold-soft transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>

      {otherPosts.length > 0 && (
        <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-2xl text-ink mb-8">More from the blog</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
