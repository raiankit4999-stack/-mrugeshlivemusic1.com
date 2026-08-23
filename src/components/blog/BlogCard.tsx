import Image from "next/image";
import Link from "next/link";
import type { UnifiedPost } from "@/lib/posts";

export default function BlogCard({ post }: { post: UnifiedPost }) {
  const date = new Date(post.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl glass shadow-luxury transition-shadow duration-300 hover:shadow-gold-glow"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.coverAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-gold">
          <span>{date}</span>
          <span aria-hidden>&middot;</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="mt-3 font-display text-xl text-ink leading-snug">{post.title}</h3>
        <p className="mt-2 text-sm text-stone leading-relaxed line-clamp-3">{post.excerpt}</p>
      </div>
    </Link>
  );
}
