"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { bookingFormSchema, type BookingFormValues } from "@/lib/schema";
import { buildBookingMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import eventTypes from "@/data/events.json";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      eventDate: "",
      eventType: "",
      guestCount: "",
      message: "",
    },
  });

  const onSubmit = (values: BookingFormValues) => {
    const message = buildBookingMessage(values);
    const url = buildWhatsAppUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="text-stone">
            Full Name
          </Label>
          <Input id="name" placeholder="Your name" className="mt-2" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone" className="text-stone">
            Phone Number
          </Label>
          <Input id="phone" placeholder="+91 98765 43210" className="mt-2" {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="email" className="text-stone">
            Email
          </Label>
          <Input id="email" type="email" placeholder="you@email.com" className="mt-2" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="city" className="text-stone">
            City
          </Label>
          <Input id="city" placeholder="Your city" className="mt-2" {...register("city")} />
          {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="eventDate" className="text-stone">
            Event Date
          </Label>
          <Input id="eventDate" type="date" className="mt-2" {...register("eventDate")} />
          {errors.eventDate && (
            <p className="mt-1 text-xs text-destructive">{errors.eventDate.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="eventType" className="text-stone">
            Event Type
          </Label>
          <Controller
            control={control}
            name="eventType"
            render={({ field }) => (
              <Select value={field.value || null} onValueChange={(val) => field.onChange(val ?? "")}>
                <SelectTrigger id="eventType" className="mt-2 w-full">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((event) => (
                    <SelectItem key={event.value} value={event.value}>
                      {event.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.eventType && (
            <p className="mt-1 text-xs text-destructive">{errors.eventType.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="guestCount" className="text-stone">
          Guest Count
        </Label>
        <Input
          id="guestCount"
          inputMode="numeric"
          placeholder="e.g. 300"
          className="mt-2"
          {...register("guestCount")}
        />
        {errors.guestCount && (
          <p className="mt-1 text-xs text-destructive">{errors.guestCount.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="text-stone">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us more about your event..."
          className="mt-2 min-h-28"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full rounded-full bg-gold py-4 text-sm font-medium uppercase tracking-widest text-ink shadow-gold-glow transition-colors hover:bg-gold-soft disabled:opacity-60"
      >
        {isSubmitting ? "Preparing your request..." : "Send via WhatsApp"}
      </motion.button>

      {submitted && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gold"
        >
          <CheckCircle2 size={16} /> Redirecting you to WhatsApp — please confirm sending your message.
        </motion.p>
      )}
    </form>
  );
}
