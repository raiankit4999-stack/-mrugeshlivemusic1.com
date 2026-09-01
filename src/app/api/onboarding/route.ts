import { NextResponse } from "next/server";
import { prisma, dbConfigured } from "@/lib/prisma";
import { onboardingFormSchema } from "@/lib/schema";

function toInt(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!dbConfigured) {
    return NextResponse.json(
      { error: "The onboarding form isn't connected to a database yet. Please contact us directly." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = onboardingFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 400 }
    );
  }

  const values = parsed.data;
  const eventDate = new Date(values.eventDate);
  if (Number.isNaN(eventDate.getTime())) {
    return NextResponse.json({ error: "Please select a valid event date." }, { status: 400 });
  }

  const totalAmount = toInt(values.totalAmount);
  const advanceAmount = toInt(values.advanceAmount);
  const remainingAmount =
    toInt(values.remainingAmount) ??
    (totalAmount !== undefined && advanceAmount !== undefined
      ? Math.max(totalAmount - advanceAmount, 0)
      : undefined);

  try {
    const submission = await prisma.onboardingSubmission.create({
      data: {
        customerName: values.customerName,
        address: values.address,
        mobileNumber: values.mobileNumber,
        email: values.email || null,
        eventTypes: values.eventTypes,
        eventDate,
        eventTime: values.eventTime || null,
        eventVenue: values.eventVenue,
        eventDuration: values.eventDuration || null,
        totalAmount,
        advanceAmount,
        remainingAmount,
        paymentMode: values.paymentMode || null,
        paymentModeOther: values.paymentModeOther || null,
        notes: values.notes || null,
        termsAccepted: values.termsAccepted,
      },
    });

    return NextResponse.json({ id: submission.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save onboarding submission:", error);
    return NextResponse.json(
      { error: "Something went wrong while saving your details. Please try again." },
      { status: 500 }
    );
  }
}
