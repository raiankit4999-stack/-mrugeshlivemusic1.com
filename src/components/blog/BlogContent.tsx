import type { BlogBlock } from "@/data/blog/types";

export default function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2 key={i} className="font-display text-2xl sm:text-3xl text-ink pt-4">
              {block.text}
            </h2>
          );
        }
        if (block.type === "paragraph") {
          return (
            <p key={i} className="text-stone leading-relaxed">
              {block.text}
            </p>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-2 text-stone leading-relaxed list-disc pl-5">
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
              className="border-l-2 border-gold pl-5 py-1 font-display text-xl text-ink italic"
            >
              &ldquo;{block.text}&rdquo;
            </blockquote>
          );
        }
        return null;
      })}
    </div>
  );
}
