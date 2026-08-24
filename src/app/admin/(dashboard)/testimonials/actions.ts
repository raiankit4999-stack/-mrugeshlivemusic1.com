"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type TestimonialFormState = { error?: string };

function readFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const quote = String(formData.get("quote") ?? "").trim();
  const rating = Number.parseInt(String(formData.get("rating") ?? "5"), 10) || 5;
  const orderRaw = String(formData.get("order") ?? "0");
  const order = Number.parseInt(orderRaw, 10) || 0;
  const published = formData.get("published") === "on";

  return { name, role, quote, rating: Math.min(5, Math.max(1, rating)), order, published };
}

function revalidateTestimonialPaths() {
  revalidatePath("/");
}

export async function createTestimonialAction(
  _prev: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  const fields = readFields(formData);
  if (!fields.name) return { error: "Name is required." };
  if (!fields.quote) return { error: "Review text is required." };

  await prisma.testimonial.create({
    data: {
      name: fields.name,
      role: fields.role || null,
      quote: fields.quote,
      rating: fields.rating,
      order: fields.order,
      published: fields.published,
    },
  });

  revalidateTestimonialPaths();
  redirect("/admin/testimonials");
}

export async function updateTestimonialAction(
  id: string,
  _prev: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  const fields = readFields(formData);
  if (!fields.name) return { error: "Name is required." };
  if (!fields.quote) return { error: "Review text is required." };

  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (!existing) return { error: "Review not found." };

  await prisma.testimonial.update({
    where: { id },
    data: {
      name: fields.name,
      role: fields.role || null,
      quote: fields.quote,
      rating: fields.rating,
      order: fields.order,
      published: fields.published,
    },
  });

  revalidateTestimonialPaths();
  redirect("/admin/testimonials");
}

export async function deleteTestimonialAction(id: string): Promise<void> {
  await prisma.testimonial.delete({ where: { id } });
  revalidateTestimonialPaths();
  revalidatePath("/admin/testimonials");
}
