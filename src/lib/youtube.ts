/**
 * Converts a normal YouTube URL (watch, youtu.be, shorts) into an embeddable
 * https://www.youtube.com/embed/<id> URL. Returns null if no video id is found.
 */
export function toYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    let id: string | null = null;

    if (parsed.hostname.includes("youtu.be")) {
      id = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") {
        id = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        id = parsed.pathname.split("/embed/")[1];
      } else if (parsed.pathname.startsWith("/shorts/")) {
        id = parsed.pathname.split("/shorts/")[1];
      }
    }

    id = id?.split(/[?&]/)[0] ?? null;
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null;
  }
}
