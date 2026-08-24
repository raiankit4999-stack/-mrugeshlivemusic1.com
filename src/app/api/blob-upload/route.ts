import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getSession } from "@/lib/auth";

const MAX_IMAGE_BYTES = 15 * 1024 * 1024; // 15MB
const MAX_VIDEO_BYTES = 200 * 1024 * 1024; // 200MB

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

export async function POST(request: Request): Promise<NextResponse> {
  // Uploads go straight from the browser to Blob storage, bypassing the
  // serverless function body-size limit — but that also means this route,
  // not middleware, is what has to check the admin is actually logged in
  // before handing out an upload token.
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        const kind = clientPayload === "video" ? "video" : "image";
        return {
          allowedContentTypes: kind === "video" ? VIDEO_TYPES : IMAGE_TYPES,
          maximumSizeInBytes: kind === "video" ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES,
          addRandomSuffix: true,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 }
    );
  }
}
