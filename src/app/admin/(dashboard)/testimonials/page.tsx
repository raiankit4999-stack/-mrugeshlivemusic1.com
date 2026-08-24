import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safeQuery";
import { buttonVariants } from "@/components/ui/button";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteTestimonialAction } from "./actions";

export default async function AdminTestimonialsPage() {
  const testimonials = await safeQuery(
    () => prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
    []
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink">Reviews</h1>
        <Link href="/admin/testimonials/new" className={buttonVariants({ variant: "default" })}>
          <Plus size={16} />
          New review
        </Link>
      </div>

      <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {testimonials.length === 0 && (
          <p className="p-5 text-sm text-stone">No reviews yet — click &quot;New review&quot; to add one.</p>
        )}
        {testimonials.map((t) => (
          <div key={t.id} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate font-medium text-ink">{t.name}</p>
                <span className="flex items-center gap-0.5 text-gold">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} className="fill-gold text-gold" />
                  ))}
                </span>
              </div>
              <p className="truncate text-sm text-stone">
                {t.quote} {t.published ? "" : "· (draft)"}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/testimonials/${t.id}/edit`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Edit
              </Link>
              <DeleteButton action={deleteTestimonialAction.bind(null, t.id)} confirmMessage={`Delete review from "${t.name}"?`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
