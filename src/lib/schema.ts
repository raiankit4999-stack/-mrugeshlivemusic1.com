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

const optionalDigits = z
  .string()
  .trim()
  .regex(/^[0-9]*$/, "Enter a whole number")
  .optional()
  .or(z.literal(""));

export const onboardingFormSchema = z.object({
  customerName: z.string().trim().min(2, "Please enter your full name"),
  address: z.string().trim().min(5, "Please enter your address"),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^[+]?[0-9\s-]{10,15}$/, "Enter a valid mobile number"),
  email: z.string().trim().email("Enter a valid email address").optional().or(z.literal("")),
  eventTypes: z.array(z.string()).min(1, "Select at least one event type"),
  eventDate: z.string().min(1, "Please select the event date"),
  eventTime: z.string().trim().optional(),
  eventVenue: z.string().trim().min(2, "Please enter the event venue"),
  eventDuration: z.string().trim().optional(),
  totalAmount: optionalDigits,
  advanceAmount: optionalDigits,
  remainingAmount: optionalDigits,
  paymentMode: z.enum(["BANK", "UPI", "CASH", "CHECK", "OTHER", ""]).optional(),
  paymentModeOther: z.string().trim().optional(),
  notes: z.string().trim().max(500, "Message is too long").optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to continue",
  }),
});

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;
