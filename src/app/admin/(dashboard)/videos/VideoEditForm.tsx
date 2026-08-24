"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/admin/SubmitButton";
import FileUploadField from "@/components/admin/FileUploadField";
import type { VideoFormState } from "./actions";

type Defaults = {
  title: string;
  type: "mp4" | "youtube";
  posterUrl: string;
};

export default function VideoEditForm({
  action,
  defaults,
}: {
  action: (prevState: VideoFormState, formData: FormData) => Promise<VideoFormState>;
  defaults: Defaults;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-md space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={defaults.title} required />
      </div>

      {defaults.type === "youtube" ? (
        <div className="space-y-1.5">
          <Label htmlFor="youtubeUrl">Replace YouTube URL (optional)</Label>
          <Input id="youtubeUrl" name="youtubeUrl" placeholder="https://www.youtube.com/watch?v=..." />
          <p className="text-xs text-stone">Leave blank to keep the current video.</p>
        </div>
      ) : (
        <FileUploadField
          name="videoUrl"
          label="Replace video file"
          kind="video"
          helpText="Leave blank to keep the current video."
        />
      )}

      <FileUploadField
        name="posterUrl"
        label="Thumbnail image"
        kind="image"
        currentUrl={defaults.posterUrl}
        helpText="Leave blank to keep the current thumbnail."
      />

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SubmitButton>Save changes</SubmitButton>
    </form>
  );
}
