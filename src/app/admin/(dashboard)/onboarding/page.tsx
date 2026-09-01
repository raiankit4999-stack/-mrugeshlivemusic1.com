import Link from "next/link";
import { getOnboardingSubmissions } from "@/lib/onboarding";
import eventTypeOptions from "@/data/onboardingEventTypes.json";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

const eventTypeLabels = Object.fromEntries(eventTypeOptions.map((t) => [t.value, t.label]));

export default async function AdminOnboardingPage() {
  const submissions = await getOnboardingSubmissions();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink">Onboarding Submissions</h1>
          <p className="mt-1 text-sm text-stone">
            Client details submitted through the public onboarding form.
          </p>
        </div>
        <Link href="/onboarding" target="_blank" className={buttonVariants({ variant: "outline" })}>
          View form
        </Link>
      </div>

      <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {submissions.length === 0 && (
          <p className="p-5 text-sm text-stone">No submissions yet — share the onboarding link to get started.</p>
        )}
        {submissions.map((s) => (
          <Link
            key={s.id}
            href={`/admin/onboarding/${s.id}`}
            className="flex flex-col gap-2 p-4 transition-colors hover:bg-muted sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate font-medium text-ink">{s.customerName}</p>
                {!s.reviewed && <Badge>New</Badge>}
              </div>
              <p className="truncate text-sm text-stone">
                {s.mobileNumber} · {s.eventVenue} ·{" "}
                {new Date(s.eventDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="truncate text-xs text-stone">
                {s.eventTypes.map((t) => eventTypeLabels[t] ?? t).join(", ") || "No event type selected"}
              </p>
            </div>
            <p className="shrink-0 text-xs text-stone">
              Submitted{" "}
              {new Date(s.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
