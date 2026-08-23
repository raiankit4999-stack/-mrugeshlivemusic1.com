"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadImageIfProvided } from "@/lib/blobUpload";

export type EventFormState = { error?: string };

function readEventFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const imageAlt = String(formData.get("imageAlt") ?? "").trim();
  const eventDateRaw = String(formData.get("eventDate") ?? "");
  const orderRaw = String(formData.get("order") ?? "0");
  const published = formData.get("published") === "on";

  const eventDate = eventDateRaw ? new Date(eventDateRaw) : null;
  const order = Number.parseInt(orderRaw, 10) || 0;

  return { title, description, location, imageAlt, eventDate, order, published };
}

function revalidateEventPaths() {
  revalidatePath("/");
}

export async function createEventAction(_prev: EventFormState, formData: FormData): Promise<EventFormState> {
  const fields = readEventFields(formData);

  if (!fields.title) return { error: "Title is required." };
  if (!fields.description) return { error: "Description is required." };
  if (!fields.location) return { error: "Location is required." };
  if (!fields.imageAlt) return { error: "Image alt text is required for SEO." };
  if (!fields.eventDate || Number.isNaN(fields.eventDate.getTime())) {
    return { error: "A valid event date is required." };
  }

  let image: string | null;
  try {
    image = await uploadImageIfProvided(formData.get("imageFile") as File | null);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Image upload failed." };
  }
  if (!image) return { error: "An event image is required." };

  await prisma.event.create({
    data: {
      title: fields.title,
      description: fields.description,
      location: fields.location,
      imageAlt: fields.imageAlt,
      eventDate: fields.eventDate,
      order: fields.order,
      published: fields.published,
      image,
    },
  });

  revalidateEventPaths();
  redirect("/admin/events");
}

export async function updateEventAction(
  id: string,
  _prev: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  const fields = readEventFields(formData);

  if (!fields.title) return { error: "Title is required." };
  if (!fields.description) return { error: "Description is required." };
  if (!fields.location) return { error: "Location is required." };
  if (!fields.imageAlt) return { error: "Image alt text is required for SEO." };
  if (!fields.eventDate || Number.isNaN(fields.eventDate.getTime())) {
    return { error: "A valid event date is required." };
  }

  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) return { error: "Event not found." };

  let image = existing.image;
  try {
    const uploaded = await uploadImageIfProvided(formData.get("imageFile") as File | null);
    if (uploaded) image = uploaded;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Image upload failed." };
  }

  await prisma.event.update({
    where: { id },
    data: {
      title: fields.title,
      description: fields.description,
      location: fields.location,
      imageAlt: fields.imageAlt,
      eventDate: fields.eventDate,
      order: fields.order,
      published: fields.published,
      image,
    },
  });

  revalidateEventPaths();
  redirect("/admin/events");
}

export async function deleteEventAction(id: string): Promise<void> {
  await prisma.event.delete({ where: { id } });
  revalidateEventPaths();
  revalidatePath("/admin/events");
}
