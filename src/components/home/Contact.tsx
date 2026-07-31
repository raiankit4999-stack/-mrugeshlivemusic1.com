import { MapPin, Phone, Mail } from "lucide-react";
import siteConfig from "@/data/siteConfig.json";
import SectionHeading from "@/components/ui/SectionHeading";
import BookingForm from "@/components/home/BookingForm";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-ink-soft py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Book Your Event"
          description="Tell us about your event and we'll get back to you with a customised proposal."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="glass rounded-3xl p-8 shadow-luxury">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="text-sm uppercase tracking-widest text-gold">Address</p>
                  <p className="mt-2 text-white leading-relaxed">
                    Mrugesh Shukla
                    <br />
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}
                    <br />
                    {siteConfig.address.line3}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.state} -{" "}
                    {siteConfig.address.postalCode}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Phone size={20} />
                </span>
                <div>
                  <p className="text-sm uppercase tracking-widest text-gold">Phone</p>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="mt-2 block text-white hover:text-gold transition-colors"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Mail size={20} />
                </span>
                <div>
                  <p className="text-sm uppercase tracking-widest text-gold">Email</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-2 block text-white hover:text-gold transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gold/20 shadow-luxury">
              <iframe
                src={siteConfig.mapEmbedUrl}
                title="Mrugesh Beats location on Google Maps"
                className="h-72 w-full grayscale invert-[0.92] contrast-[1.1]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="glass-gold rounded-3xl p-8 sm:p-10 shadow-luxury">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
