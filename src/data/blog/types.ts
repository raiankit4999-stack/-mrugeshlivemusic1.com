export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

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
};
