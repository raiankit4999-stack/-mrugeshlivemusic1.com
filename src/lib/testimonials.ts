import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safeQuery";
import staticTestimonials from "@/data/testimonials.json";
import type { Testimonial } from "@prisma/client";

export async function getTestimonials(): Promise<Testimonial[]> {
  const dbTestimonials = await safeQuery(
    () =>
      prisma.testimonial.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
    []
  );

  // Same fallback pattern as gallery.ts/videos.ts: DB is the source of truth
  // once the one-time seed has run, static file is the fallback until then.
  if (dbTestimonials.length > 0) return dbTestimonials;

  const now = new Date();
  return staticTestimonials.map((t, i) => ({
    id: t.id,
    name: t.name,
    role: t.role,
    quote: t.quote,
    rating: t.rating,
    published: true,
    order: i,
    createdAt: now,
  }));
}
