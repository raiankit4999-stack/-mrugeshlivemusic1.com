"use client";

import { useActionState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/admin/SubmitButton";
import { addGalleryImageAction, type GalleryFormState } from "./actions";

export default function GalleryUploadForm() {
  const [state, formAction] = useActionState(addGalleryImageAction, {} as GalleryFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const prevErrorRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    // Clear the form after a successful submit (no error this time, but a previous action ran).
    if (prevErrorRef.current !== undefined && !state.error) {
      formRef.current?.reset();
    }
    prevErrorRef.current = state.error ?? "";
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-4 sm:grid-cols-2 max-w-2xl">
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="imageFile">Image</Label>
        <input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/*"
          required
          className="block w-full text-sm text-stone file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:text-primary-foreground"
        />
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="alt">Alt text (for SEO)</Label>
        <Input id="alt" name="alt" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="category">Category (optional)</Label>
        <Input id="category" name="category" placeholder="e.g. Wedding Events" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="orientation">Orientation</Label>
        <select
          id="orientation"
          name="orientation"
          defaultValue="landscape"
          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
        >
          <option value="landscape">Landscape</option>
          <option value="portrait">Portrait</option>
        </select>
      </div>
      {state.error && <p className="text-sm text-destructive sm:col-span-2">{state.error}</p>}
      <div className="sm:col-span-2">
        <SubmitButton pendingText="Uploading...">Add image</SubmitButton>
      </div>
    </form>
  );
}
