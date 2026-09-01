import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getOnboardingSubmission } from "@/lib/onboarding";
import eventTypeOptions from "@/data/onboardingEventTypes.json";
import DeleteButton from "@/components/admin/DeleteButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { deleteOnboardingSubmissionAction, toggleReviewedAction } from "../actions";

const eventTypeLabels = Object.fromEntries(eventTypeOptions.map((t) => [t.value, t.label]));

const paymentModeLabels: Record<string, string> = {
  BANK: "Bank Transfer",
  UPI: "UPI",
  CASH: "Cash",
  CHECK: "Cheque",
  OTHER: "Other",
};

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-stone">{label}</dt>
      <dd className="mt-1 text-sm text-ink">{value || "—"}</dd>
    </div>
  );
}

export default async function AdminOnboardingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await getOnboardingSubmission(id);
  if (!submission) notFound();

  const currency = (value: number | null) =>
    value == null ? null : `₹${value.toLocaleString("en-IN")}`;

  return (
    <div>
      <Link
        href="/admin/onboarding"
        className="inline-flex items-center gap-1.5 text-sm text-stone hover:text-ink"
      >
        <ArrowLeft size={14} /> Back to submissions
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink">{submission.customerName}</h1>
        <div className="flex items-center gap-2">
          <form action={toggleReviewedAction.bind(null, submission.id, !submission.reviewed)}>
            <Button type="submit" variant="outline" size="sm">
              {submission.reviewed ? "Mark as new" : "Mark as reviewed"}
            </Button>
          </form>
          <DeleteButton
            action={deleteOnboardingSubmissionAction.bind(null, submission.id)}
            confirmMessage={`Delete the submission from "${submission.customerName}"?`}
          />
        </div>
      </div>
      <p className="mt-1 text-sm text-stone">
        Submitted {new Date(submission.createdAt).toLocaleString("en-IN")}
      </p>

      <div className="mt-6 space-y-8 rounded-xl border border-border bg-card p-6">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gold">Contact</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" value={submission.customerName} />
            <Field label="Mobile number" value={submission.mobileNumber} />
            <Field label="Email" value={submission.email} />
            <Field label="Address" value={submission.address} />
          </dl>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gold">Event</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Event type"
              value={submission.eventTypes.map((t) => eventTypeLabels[t] ?? t).join(", ")}
            />
            <Field
              label="Event date"
              value={new Date(submission.eventDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
            <Field label="Event time" value={submission.eventTime} />
            <Field label="Event venue" value={submission.eventVenue} />
            <Field label="Event duration" value={submission.eventDuration} />
          </dl>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gold">Payment</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            <Field label="Total amount" value={currency(submission.totalAmount)} />
            <Field label="Advance" value={currency(submission.advanceAmount)} />
            <Field label="Balance due" value={currency(submission.remainingAmount)} />
            <Field
              label="Payment mode"
              value={
                submission.paymentMode === "OTHER"
                  ? submission.paymentModeOther || "Other"
                  : submission.paymentMode
                  ? paymentModeLabels[submission.paymentMode]
                  : null
              }
            />
          </dl>
        </section>

        {submission.notes && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gold">Notes</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm text-ink">{submission.notes}</p>
          </section>
        )}

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gold">Terms</h2>
          <p className="mt-3 text-sm text-ink">
            {submission.termsAccepted
              ? "Accepted the terms & conditions."
              : "Did not accept the terms & conditions."}
          </p>
        </section>
      </div>

      <Link
        href={`https://wa.me/91${submission.mobileNumber.replace(/\D/g, "").slice(-10)}`}
        target="_blank"
        className={buttonVariants({ variant: "default", className: "mt-6" })}
      >
        Message on WhatsApp
      </Link>
    </div>
  );
}
