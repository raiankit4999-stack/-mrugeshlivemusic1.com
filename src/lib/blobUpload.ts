import { put } from "@vercel/blob";

/**
 * Uploads an image file from a form submission to Vercel Blob and returns
 * its public URL. Returns null if no file (or an empty file) was provided,
 * so callers can fall back to an existing image URL when editing.
 */
export async function uploadImageIfProvided(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "Image uploads aren't configured yet. Connect a Vercel Blob store to this project and redeploy."
    );
  }

  const extension = file.name.split(".").pop() || "jpg";
  const filename = `${crypto.randomUUID()}.${extension}`;

  const blob = await put(filename, file, { access: "public" });
  return blob.url;
}
