"use client";

import { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { onboardingFormSchema, type OnboardingFormValues } from "@/lib/schema";
import { onboardingTerms } from "@/lib/onboarding";
import eventTypeOptions from "@/data/onboardingEventTypes.json";
import siteConfig from "@/data/siteConfig.json";
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

const paymentModes = [
  { value: "BANK", label: "Bank Transfer" },
  { value: "UPI", label: "UPI" },
  { value: "CASH", label: "Cash" },
  { value: "CHECK", label: "Cheque" },
  { value: "OTHER", label: "Other" },
];

export default function OnboardingForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      customerName: "",
      address: "",
      mobileNumber: "",
      email: "",
      eventTypes: [],
      eventDate: "",
      eventTime: "",
      eventVenue: "",
      eventDuration: "",
      totalAmount: "",
      advanceAmount: "",
      remainingAmount: "",
      paymentMode: "",
      paymentModeOther: "",
      notes: "",
      termsAccepted: false,
    },
  });

  const paymentMode = useWatch({ control, name: "paymentMode" });

  const onSubmit = async (values: OnboardingFormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmittedName(values.customerName);
      reset();
    } catch {
      setSubmitError("Couldn't reach the server. Please check your connection and try again.");
    }
  };

  if (submittedName) {
    return (
      <div className="rounded-2xl border border-gold/30 bg-card p-8 text-center shadow-sm">
        <CheckCircle2 size={40} className="mx-auto text-gold" />
        <h2 className="mt-4 text-xl font-semibold text-ink">Thank you, {submittedName}!</h2>
        <p className="mt-2 text-sm text-stone">
          Your details have been received. Our team will review them and get in touch with you
          on your mobile number shortly to confirm your event.
        </p>
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-medium uppercase tracking-widest text-ink transition-colors hover:bg-gold-soft"
        >
          Message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <section className="space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gold">Your Details</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="customerName" className="text-stone">
              Full Name *
            </Label>
            <Input id="customerName" placeholder="Your name" className="mt-2" {...register("customerName")} />
            {errors.customerName && (
              <p className="mt-1 text-xs text-destructive">{errors.customerName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="mobileNumber" className="text-stone">
              Mobile Number *
            </Label>
            <Input
              id="mobileNumber"
              placeholder="+91 98765 43210"
              className="mt-2"
              {...register("mobileNumber")}
            />
            {errors.mobileNumber && (
              <p className="mt-1 text-xs text-destructive">{errors.mobileNumber.message}</p>
            )}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="email" className="text-stone">
              Email (optional)
            </Label>
            <Input id="email" type="email" placeholder="you@email.com" className="mt-2" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="address" className="text-stone">
              Address *
            </Label>
            <Input id="address" placeholder="Your address" className="mt-2" {...register("address")} />
            {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address.message}</p>}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gold">Event Details</h2>
        <div>
          <Label className="text-stone">Event Type — select all that apply *</Label>
          <Controller
            control={control}
            name="eventTypes"
            render={({ field }) => (
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
                {eventTypeOptions.map((type) => (
                  <label key={type.value} className="flex items-center gap-2 text-sm text-ink">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-input accent-gold"
                      checked={field.value.includes(type.value)}
                      onChange={(e) => {
                        if (e.target.checked) field.onChange([...field.value, type.value]);
                        else field.onChange(field.value.filter((v) => v !== type.value));
                      }}
                    />
                    {type.label}
                  </label>
                ))}
              </div>
            )}
          />
          {errors.eventTypes && (
            <p className="mt-1 text-xs text-destructive">{errors.eventTypes.message}</p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="eventDate" className="text-stone">
              Event Date *
            </Label>
            <Input id="eventDate" type="date" className="mt-2" {...register("eventDate")} />
            {errors.eventDate && (
              <p className="mt-1 text-xs text-destructive">{errors.eventDate.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="eventTime" className="text-stone">
              Event Time
            </Label>
            <Input id="eventTime" type="time" className="mt-2" {...register("eventTime")} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="eventVenue" className="text-stone">
              Event Venue *
            </Label>
            <Input id="eventVenue" placeholder="Venue / location" className="mt-2" {...register("eventVenue")} />
            {errors.eventVenue && (
              <p className="mt-1 text-xs text-destructive">{errors.eventVenue.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="eventDuration" className="text-stone">
              Event Duration
            </Label>
            <Input
              id="eventDuration"
              placeholder="e.g. 3 hours"
              className="mt-2"
              {...register("eventDuration")}
            />
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gold">
          Payment (fill in if already discussed — otherwise leave blank)
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <Label htmlFor="totalAmount" className="text-stone">
              Total Amount (₹)
            </Label>
            <Input id="totalAmount" inputMode="numeric" className="mt-2" {...register("totalAmount")} />
          </div>
          <div>
            <Label htmlFor="advanceAmount" className="text-stone">
              Advance (₹)
            </Label>
            <Input id="advanceAmount" inputMode="numeric" className="mt-2" {...register("advanceAmount")} />
          </div>
          <div>
            <Label htmlFor="remainingAmount" className="text-stone">
              Balance Due (₹)
            </Label>
            <Input id="remainingAmount" inputMode="numeric" className="mt-2" {...register("remainingAmount")} />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="paymentMode" className="text-stone">
              Payment Mode
            </Label>
            <Controller
              control={control}
              name="paymentMode"
              render={({ field }) => (
                <Select value={field.value || null} onValueChange={(val) => field.onChange(val ?? "")}>
                  <SelectTrigger id="paymentMode" className="mt-2 w-full">
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {paymentMode === "OTHER" && (
            <div>
              <Label htmlFor="paymentModeOther" className="text-stone">
                Please specify
              </Label>
              <Input id="paymentModeOther" className="mt-2" {...register("paymentModeOther")} />
            </div>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gold">Anything else?</h2>
        <Textarea
          placeholder="Special requests, song list, schedule notes..."
          className="min-h-24"
          {...register("notes")}
        />
        {errors.notes && <p className="mt-1 text-xs text-destructive">{errors.notes.message}</p>}
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gold">Terms &amp; Conditions</h2>
        <ol className="max-h-56 list-decimal space-y-2 overflow-y-auto rounded-xl border border-border bg-muted/40 p-4 pl-8 text-sm text-stone">
          {onboardingTerms.map((term, i) => (
            <li key={i}>{term}</li>
          ))}
        </ol>
        <label className="flex items-start gap-3 text-sm text-ink">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-gold"
            {...register("termsAccepted")}
          />
          <span>
            I have read, understood, and accept all the terms and conditions above, and take full
            responsibility for the same. Typing my name above serves as my digital signature.
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-xs text-destructive">{errors.termsAccepted.message}</p>
        )}
      </section>

      {submitError && <p className="text-sm text-destructive">{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-sm font-medium uppercase tracking-widest text-ink shadow-gold-glow transition-colors hover:bg-gold-soft disabled:opacity-60"
      >
        {isSubmitting && <Loader2 size={16} className="animate-spin" />}
        {isSubmitting ? "Submitting..." : "Submit My Details"}
      </button>
    </form>
  );
}
