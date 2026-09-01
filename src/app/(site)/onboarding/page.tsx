import type { Metadata } from "next";
import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";
import siteConfig from "@/data/siteConfig.json";
import OnboardingForm from "@/components/onboarding/OnboardingForm";

export const metadata: Metadata = {
  title: "Client Onboarding",
  description:
    "Confirm your event booking with Crystal Beats — share your event details, preferences, and terms acceptance so our team can get your booking underway.",
  robots: { index: false, follow: false },
};

export default function OnboardingPage() {
  return (
    <section className="relative overflow-hidden bg-ink-soft py-28 lg:py-36">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="Crystal Beats"
            width={405}
            height={458}
            priority
            className="mx-auto h-20 w-auto sm:h-24"
          />
          <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">
            Client Onboarding
          </h1>
          <p className="mt-2 text-sm uppercase tracking-widest text-gold">
            {siteConfig.brandTagline}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone">
            Welcome to Crystal Beats! Please fill in your event details below to confirm your
            booking with us. Our team will review everything and reach out to you shortly.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-stone">
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1.5 hover:text-gold">
              <Phone size={14} /> {siteConfig.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-gold">
              <Mail size={14} /> {siteConfig.email}
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} /> {siteConfig.address.city}, {siteConfig.address.state}
            </span>
          </div>
        </div>

        <div className="glass-gold mt-12 rounded-3xl p-6 shadow-luxury sm:p-10">
          <OnboardingForm />
        </div>
      </div>
    </section>
  );
}
