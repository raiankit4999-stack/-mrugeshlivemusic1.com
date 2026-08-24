"use client";

import { useState } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { Label } from "@/components/ui/label";

type Kind = "image" | "video";

export default function FileUploadField({
  name,
  label,
  kind,
  currentUrl,
  required,
  helpText,
}: {
  name: string;
  label: string;
  kind: Kind;
  currentUrl?: string;
  required?: boolean;
  helpText?: string;
}) {
  const [url, setUrl] = useState(currentUrl ?? "");
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setError("");

    try {
      const result = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/blob-upload",
        clientPayload: kind,
      });
      setUrl(result.url);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>

      {url && kind === "image" && (
        <div className="relative mb-2 aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-border">
          <Image src={url} alt="Preview" fill className="object-cover" />
        </div>
      )}
      {url && kind === "video" && (
        <p className="mb-1 text-xs text-stone">Current file: {url.split("/").pop()}</p>
      )}

      <input
        id={name}
        type="file"
        accept={kind === "image" ? "image/*" : "video/*"}
        onChange={handleChange}
        className="block w-full text-sm text-stone file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:text-primary-foreground"
      />
      <input type="hidden" name={name} value={url} />
      {required && !currentUrl && !url && (
        <p className="text-xs text-stone">Required.</p>
      )}

      {status === "uploading" && <p className="text-xs text-gold">Uploading…</p>}
      {status === "error" && <p className="text-xs text-destructive">{error}</p>}
      {helpText && <p className="text-xs text-stone">{helpText}</p>}
    </div>
  );
}
