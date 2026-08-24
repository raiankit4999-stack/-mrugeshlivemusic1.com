import TestimonialForm from "../TestimonialForm";
import { createTestimonialAction } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">New Review</h1>
      <div className="mt-6">
        <TestimonialForm action={createTestimonialAction} submitLabel="Add review" />
      </div>
    </div>
  );
}
