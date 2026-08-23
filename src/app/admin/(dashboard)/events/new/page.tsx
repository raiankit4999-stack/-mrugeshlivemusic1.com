import EventForm from "../EventForm";
import { createEventAction } from "../actions";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">New Event</h1>
      <div className="mt-6">
        <EventForm action={createEventAction} submitLabel="Add event" />
      </div>
    </div>
  );
}
