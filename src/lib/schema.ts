import { z } from "zod";

export const bookingFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .regex(/^[+]?[0-9\s-]{10,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address"),
  city: z.string().trim().min(2, "Please enter your city"),
  eventDate: z.string().min(1, "Please select an event date"),
  eventType: z.string().min(1, "Please select an event type"),
  guestCount: z
    .string()
    .min(1, "Please enter the expected guest count")
    .regex(/^[0-9]+$/, "Guest count must be a number"),
  message: z.string().trim().max(500, "Message is too long").optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
