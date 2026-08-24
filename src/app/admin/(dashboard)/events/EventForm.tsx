"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/admin/SubmitButton";
import FileUploadField from "@/components/admin/FileUploadField";
import type { EventFormState } from "./actions";

type EventDefaults = {
  title: string;
  description: string;
  location: string;
  imageAlt: string;
  image?: string;
  eventDate: string; // yyyy-mm-dd
  order: number;
  published: boolean;
};

const emptyDefaults: EventDefaults = {
  title: "",
  description: "",
  location: "",
  imageAlt: "",
  eventDate: "",
  order: 0,
  published: true,
};

export default function EventForm({
  action,
  defaults = emptyDefaults,
  submitLabel = "Add event",
}: {
  action: (prevState: EventFormState, formData: FormData) => Promise<EventFormState>;
  defaults?: EventDefaults;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="title">Event title</Label>
        <Input id="title" name="title" defaultValue={defaults.title} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="eventDate">Date</Label>
          <Input id="eventDate" name="eventDate" type="date" defaultValue={defaults.eventDate} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" defaultValue={defaults.location} required />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={defaults.description} required rows={4} />
      </div>

      <FileUploadField
        name="imageUrl"
        label="Event image"
        kind="image"
        currentUrl={defaults.image}
        required
      />

      <div className="space-y-1.5">
        <Label htmlFor="imageAlt">Image alt text (for SEO)</Label>
        <Input id="imageAlt" name="imageAlt" defaultValue={defaults.imageAlt} required />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="order">Display order (lower shows first)</Label>
        <Input id="order" name="order" type="number" defaultValue={defaults.order} className="max-w-32" />
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
