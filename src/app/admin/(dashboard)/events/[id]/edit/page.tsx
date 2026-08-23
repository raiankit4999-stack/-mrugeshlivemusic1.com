import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EventForm from "../../EventForm";
import { updateEventAction } from "../../actions";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  const boundUpdate = updateEventAction.bind(null, event.id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Edit Event</h1>
      <div className="mt-6">
        <EventForm
          action={boundUpdate}
          submitLabel="Save changes"
          defaults={{
            title: event.title,
            description: event.description,
            location: event.location,
            imageAlt: event.imageAlt,
            image: event.image,
            eventDate: event.eventDate.toISOString().slice(0, 10),
            order: event.order,
            published: event.published,
          }}
        />
      </div>
    </div>
  );
}
