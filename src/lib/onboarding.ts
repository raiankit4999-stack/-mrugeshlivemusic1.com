import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safeQuery";

// Translated from the Crystal Beats booking form's "નિયમો અને શરતો"
// (terms & conditions) panel.
export const onboardingTerms = [
  "Complete event details (invitation card / schedule) must be shared with us at the time of booking.",
  "The booking is confirmed only once 50% advance of the total amount has been paid.",
  "The remaining 50% amount must be paid no later than 24 hours before the event.",
  "100% advance payment is mandatory for celebrity events.",
  "Transportation costs for the generator, sound system, truss lights, and LED backdrop are borne by the organiser.",
  "A well-arranged stage, carpet, and chair/table setup for the event is the organiser's responsibility.",
  "Obtaining any prior government or police permission required for the event is entirely the organiser's responsibility.",
  "In case of a natural calamity, government restriction, or other unavoidable circumstance, a new date will be fixed with the consent of both parties.",
  "All information, facilities, and the invitation card needed for the event must be made available by the organiser before the event.",
  "The standard event duration is a maximum of 3 hours; additional charges apply beyond that.",
  "Please avoid unnecessary interference during the event — share any special sequence or instructions with us beforehand so our team can deliver the best show.",
] as const;

export async function getOnboardingSubmissions() {
  return safeQuery(
    () => prisma.onboardingSubmission.findMany({ orderBy: { createdAt: "desc" } }),
    []
  );
}

export async function getOnboardingSubmission(id: string) {
  return safeQuery(() => prisma.onboardingSubmission.findUnique({ where: { id } }), null);
}
