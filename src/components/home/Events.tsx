import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Event } from "@prisma/client";

export default function Events({ events }: { events: Event[] }) {
  if (events.length === 0) return null;

  return (
    <section id="events" className="relative bg-ink-soft py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="What's On"
          title="Upcoming Events"
          description="See Crystal Beats live — upcoming shows, Garba nights, and celebrations across Gujarat."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const date = new Date(event.eventDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            return (
              <div
                key={event.id}
                className="group overflow-hidden rounded-2xl glass shadow-luxury transition-shadow duration-300 hover:shadow-gold-glow"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-ink leading-snug">{event.title}</h3>
                  <div className="mt-3 flex flex-col gap-1.5 text-sm text-stone">
                    <span className="flex items-center gap-2">
                      <Calendar size={15} className="text-gold shrink-0" />
                      {date}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={15} className="text-gold shrink-0" />
                      {event.location}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-stone leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
