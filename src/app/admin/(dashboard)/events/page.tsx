import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safeQuery";
import { buttonVariants } from "@/components/ui/button";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteEventAction } from "./actions";

export default async function AdminEventsPage() {
  const events = await safeQuery(
    () => prisma.event.findMany({ orderBy: [{ order: "asc" }, { eventDate: "asc" }] }),
    []
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink">Events</h1>
        <Link href="/admin/events/new" className={buttonVariants({ variant: "default" })}>
          <Plus size={16} />
          New event
        </Link>
      </div>

      <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {events.length === 0 && (
          <p className="p-5 text-sm text-stone">No events yet — click &quot;New event&quot; to add one.</p>
        )}
        {events.map((event) => (
          <div key={event.id} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">{event.title}</p>
              <p className="truncate text-sm text-stone">
                {new Date(event.eventDate).toLocaleDateString("en-IN")} · {event.location}
                {event.published ? "" : " · (draft)"}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/events/${event.id}/edit`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Edit
              </Link>
              <DeleteButton action={deleteEventAction.bind(null, event.id)} confirmMessage={`Delete "${event.title}"?`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
