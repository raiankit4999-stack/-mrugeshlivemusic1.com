import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TestimonialForm from "../../TestimonialForm";
import { updateTestimonialAction } from "../../actions";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  const boundUpdate = updateTestimonialAction.bind(null, testimonial.id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Edit Review</h1>
      <div className="mt-6">
        <TestimonialForm
          action={boundUpdate}
          submitLabel="Save changes"
          defaults={{
            name: testimonial.name,
            role: testimonial.role ?? "",
            quote: testimonial.quote,
            rating: testimonial.rating,
            order: testimonial.order,
            published: testimonial.published,
          }}
        />
      </div>
    </div>
  );
}
