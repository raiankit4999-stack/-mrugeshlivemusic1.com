"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/admin/SubmitButton";
import FileUploadField from "@/components/admin/FileUploadField";
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
      <FileUploadField
        name="imageUrl"
        label="Image"
        kind="image"
        currentUrl={defaults.imageUrl}
        helpText="Choose a new file to replace the current image, or leave it as is."
      />

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
