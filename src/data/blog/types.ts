export type BlogBlock =
  | { type: "paragraph"; text: string; lang?: "gu" }
  | { type: "heading"; text: string; lang?: "gu" }
  | { type: "list"; items: string[]; lang?: "gu" }
  | { type: "quote"; text: string; lang?: "gu" }
  | { type: "map"; caption?: string; lang?: "gu" }
  | { type: "links"; heading?: string; items: { label: string; href: string }[]; lang?: "gu" };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  readingTime: string;
  content: BlogBlock[];
  faqs?: { question: string; answer: string }[];
};
