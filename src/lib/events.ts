import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safeQuery";

export async function getUpcomingEvents() {
  return safeQuery(
    () =>
      prisma.event.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { eventDate: "asc" }],
      }),
    []
  );
}
