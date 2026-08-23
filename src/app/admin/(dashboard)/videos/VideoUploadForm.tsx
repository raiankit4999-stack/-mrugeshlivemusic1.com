"use client";

import { useActionState, useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/admin/SubmitButton";
import { addVideoAction, type VideoFormState } from "./actions";

export default function VideoUploadForm() {
  const [state, formAction] = useActionState(addVideoAction, {} as VideoFormState);
  const [sourceType, setSourceType] = useState<"youtube" | "upload">("youtube");
  const formRef = useRef<HTMLFormElement>(null);
  const prevErrorRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (prevErrorRef.current !== undefined && !state.error) {
      formRef.current?.reset();
    }
    prevErrorRef.current = state.error ?? "";
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-4 sm:grid-cols-2 max-w-2xl">
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label>Video source</Label>
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sourceType"
              value="youtube"
              checked={sourceType === "youtube"}
              onChange={() => setSourceType("youtube")}
            />
            YouTube link
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sourceType"
              value="upload"
              checked={sourceType === "upload"}
              onChange={() => setSourceType("upload")}
            />
            Upload video file
          </label>
        </div>
      </div>

      {sourceType === "youtube" ? (
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="youtubeUrl">YouTube URL</Label>
          <Input id="youtubeUrl" name="youtubeUrl" placeholder="https://www.youtube.com/watch?v=..." />
        </div>
      ) : (
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="videoFile">Video file (mp4)</Label>
          <input
            id="videoFile"
            name="videoFile"
            type="file"
            accept="video/*"
            className="block w-full text-sm text-stone file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:text-primary-foreground"
          />
        </div>
      )}

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="posterFile">Thumbnail image</Label>
        <input
          id="posterFile"
          name="posterFile"
          type="file"
          accept="image/*"
          required
          className="block w-full text-sm text-stone file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:text-primary-foreground"
        />
      </div>

      {state.error && <p className="text-sm text-destructive sm:col-span-2">{state.error}</p>}
      <div className="sm:col-span-2">
        <SubmitButton pendingText="Uploading...">Add video</SubmitButton>
      </div>
    </form>
  );
}
