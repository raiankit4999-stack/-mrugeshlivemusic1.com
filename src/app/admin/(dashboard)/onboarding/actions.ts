"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deleteOnboardingSubmissionAction(id: string): Promise<void> {
  await prisma.onboardingSubmission.delete({ where: { id } });
  revalidatePath("/admin/onboarding");
  redirect("/admin/onboarding");
}

export async function toggleReviewedAction(id: string, reviewed: boolean): Promise<void> {
  await prisma.onboardingSubmission.update({ where: { id }, data: { reviewed } });
  revalidatePath("/admin/onboarding");
  revalidatePath(`/admin/onboarding/${id}`);
}
