"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/admin/SubmitButton";
import type { GalleryFormState } from "./actions";

type Defaults = {
  alt: string;
  category: string;
  orientation: "portrait" | "landscape";
  imageUrl: string;
};

export default function GalleryImageForm({
  action,
  defaults,
}: {
  action: (prevState: GalleryFormState, formData: FormData) => Promise<GalleryFormState>;
  defaults: Defaults;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-md space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="imageFile">Image</Label>
        <div className="relative mb-2 aspect-square w-40 overflow-hidden rounded-lg border border-border">
          <Image src={defaults.imageUrl} alt="Current" fill className="object-cover" />
        </div>
        <input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-stone file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:text-primary-foreground"
        />
        <p className="text-xs text-stone">Leave blank to keep the current image.</p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="alt">Alt text (for SEO)</Label>
        <Input id="alt" name="alt" defaultValue={defaults.alt} required />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="category">Category (optional)</Label>
        <Input id="category" name="category" defaultValue={defaults.category} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="orientation">Orientation</Label>
        <select
          id="orientation"
          name="orientation"
          defaultValue={defaults.orientation}
          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
        >
          <option value="landscape">Landscape</option>
          <option value="portrait">Portrait</option>
        </select>
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SubmitButton>Save changes</SubmitButton>
    </form>
  );
}
