import { dbConfigured } from "@/lib/prisma";

/**
 * Runs a Prisma query and falls back to `fallback` if the database isn't
 * configured yet or the query fails, so public pages keep rendering with
 * static content only until DATABASE_URL is set (e.g. in local dev).
 */
export async function safeQuery<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  if (!dbConfigured) return fallback;
  try {
    return await run();
  } catch (error) {
    console.error("Database query failed, falling back to static content:", error);
    return fallback;
  }
}
