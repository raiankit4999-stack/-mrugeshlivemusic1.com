import { marked } from "marked";

export default function MarkdownContent({ markdown }: { markdown: string }) {
  const html = marked.parse(markdown, { async: false, breaks: true });

  return (
    <div
      className="space-y-6 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:text-ink [&_h2]:pt-4 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-ink [&_p]:text-stone [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:text-stone [&_li]:leading-relaxed [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-2 [&_blockquote]:border-gold [&_blockquote]:pl-5 [&_blockquote]:py-1 [&_blockquote]:font-display [&_blockquote]:text-xl [&_blockquote]:text-ink [&_blockquote]:italic [&_strong]:text-ink"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
