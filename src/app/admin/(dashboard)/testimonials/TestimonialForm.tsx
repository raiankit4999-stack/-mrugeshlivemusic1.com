"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/admin/SubmitButton";
import type { TestimonialFormState } from "./actions";

type Defaults = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  order: number;
  published: boolean;
};

const emptyDefaults: Defaults = {
  name: "",
  role: "",
  quote: "",
  rating: 5,
  order: 0,
  published: true,
};

export default function TestimonialForm({
  action,
  defaults = emptyDefaults,
  submitLabel = "Add review",
}: {
  action: (prevState: TestimonialFormState, formData: FormData) => Promise<TestimonialFormState>;
  defaults?: Defaults;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={defaults.name} required />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="role">Source (optional)</Label>
        <Input id="role" name="role" defaultValue={defaults.role} placeholder="e.g. Google Review — Wedding" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="quote">Review text</Label>
        <Textarea id="quote" name="quote" defaultValue={defaults.quote} required rows={4} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Input id="rating" name="rating" type="number" min={1} max={5} defaultValue={defaults.rating} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="order">Display order</Label>
          <Input id="order" name="order" type="number" defaultValue={defaults.order} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={defaults.published}
          className="size-4 rounded border-input"
        />
        <Label htmlFor="published">Published (visible on the homepage)</Label>
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SubmitButton>{submitLabel}</SubmitButton>
    </form>
  );
}
