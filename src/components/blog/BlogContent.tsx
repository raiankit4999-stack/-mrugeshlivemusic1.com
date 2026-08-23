import Link from "next/link";
import type { BlogBlock } from "@/data/blog/types";
import siteConfig from "@/data/siteConfig.json";

export default function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        const lang = block.lang;

        if (block.type === "heading") {
          return (
            <h2 key={i} lang={lang} className="font-display text-2xl sm:text-3xl text-ink pt-4">
              {block.text}
            </h2>
          );
        }
        if (block.type === "paragraph") {
          return (
            <p key={i} lang={lang} className="text-stone leading-relaxed">
              {block.text}
            </p>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} lang={lang} className="space-y-2 text-stone leading-relaxed list-disc pl-5">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              lang={lang}
              className="border-l-2 border-gold pl-5 py-1 font-display text-xl text-ink italic"
            >
              &ldquo;{block.text}&rdquo;
            </blockquote>
          );
        }
        if (block.type === "map") {
          return (
            <div key={i} lang={lang}>
              <div className="overflow-hidden rounded-2xl border border-gold/20 shadow-luxury">
                <iframe
                  src={siteConfig.mapEmbedUrl}
                  title={`${siteConfig.brand} location on Google Maps — Nadiad, Gujarat`}
                  className="h-72 w-full grayscale-[0.3] contrast-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {block.caption && <p className="mt-3 text-sm text-stone">{block.caption}</p>}
            </div>
          );
        }
        if (block.type === "links") {
          return (
            <div key={i} lang={lang} className="rounded-2xl glass p-6">
              {block.heading && (
                <h3 className="font-display text-lg text-ink mb-3">{block.heading}</h3>
              )}
              <ul className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Link
                      href={item.href}
                      className="text-gold underline underline-offset-4 hover:text-gold-soft transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
