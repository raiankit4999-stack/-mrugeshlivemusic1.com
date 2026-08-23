"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/admin/SubmitButton";
import type { PostFormState } from "./actions";

type PostDefaults = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  bodyMarkdown: string;
  coverAlt: string;
  coverImage?: string;
  tags: string;
  published: boolean;
};

const emptyDefaults: PostDefaults = {
  title: "",
  slug: "",
  metaTitle: "",
  metaDescription: "",
  excerpt: "",
  bodyMarkdown: "",
  coverAlt: "",
  tags: "",
  published: true,
};

export default function PostForm({
  action,
  defaults = emptyDefaults,
  submitLabel = "Publish post",
}: {
  action: (prevState: PostFormState, formData: FormData) => Promise<PostFormState>;
  defaults?: PostDefaults;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={defaults.title} required />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input id="slug" name="slug" defaultValue={defaults.slug} placeholder="auto-generated from title if left blank" />
        <p className="text-xs text-stone">Shows up as crystalbeats.com/blog/your-slug</p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="coverImageFile">Cover image</Label>
        {defaults.coverImage && (
          <div className="relative mb-2 aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-border">
            <Image src={defaults.coverImage} alt="Current cover" fill className="object-cover" />
          </div>
        )}
        <input
          id="coverImageFile"
          name="coverImageFile"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-stone file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:text-primary-foreground"
          required={!defaults.coverImage}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="coverAlt">Cover image alt text (for SEO)</Label>
        <Input id="coverAlt" name="coverAlt" defaultValue={defaults.coverAlt} required />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="excerpt">Excerpt (short summary shown on the blog listing)</Label>
        <Textarea id="excerpt" name="excerpt" defaultValue={defaults.excerpt} required rows={2} />
      </div>

      <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-4">
        <p className="text-sm font-medium text-ink">SEO (optional — falls back to title/excerpt)</p>
        <div className="space-y-1.5">
          <Label htmlFor="metaTitle">Meta title</Label>
          <Input id="metaTitle" name="metaTitle" defaultValue={defaults.metaTitle} maxLength={70} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="metaDescription">Meta description</Label>
          <Textarea id="metaDescription" name="metaDescription" defaultValue={defaults.metaDescription} maxLength={170} rows={2} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input id="tags" name="tags" defaultValue={defaults.tags} placeholder="Wedding, Nadiad, Tips" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bodyMarkdown">Post content (Markdown supported: ## heading, **bold**, - list, etc.)</Label>
        <Textarea
          id="bodyMarkdown"
          name="bodyMarkdown"
          defaultValue={defaults.bodyMarkdown}
          required
          rows={16}
          className="font-mono text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={defaults.published}
          className="size-4 rounded border-input"
        />
        <Label htmlFor="published">Published (visible on the site)</Label>
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SubmitButton>{submitLabel}</SubmitButton>
    </form>
  );
}
