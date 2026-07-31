import siteConfig from "@/data/siteConfig.json";
import eventTypes from "@/data/events.json";
import type { BookingFormValues } from "@/lib/schema";

export function buildBookingMessage(values: BookingFormValues): string {
  const eventLabel =
    eventTypes.find((event) => event.value === values.eventType)?.label ?? values.eventType;

  const lines = [
    "Hello Mrugesh Shukla ji",
    "I want to book you for upcoming Event.",
    "",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `City: ${values.city}`,
    `Event: ${eventLabel}`,
    `Date: ${values.eventDate}`,
    `Guests: ${values.guestCount}`,
    `Message: ${values.message || "-"}`,
  ];
  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string, phone: string = siteConfig.whatsappNumber): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildGenericWhatsAppUrl(): string {
  const message = "Hello Mrugesh Shukla ji, I would like to know more about booking you for my event.";
  return buildWhatsAppUrl(message);
}
