"use client";

import Image from "next/image";
import siteConfig from "@/data/siteConfig.json";
import { scrollToSection } from "@/lib/lenis";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-[18px] w-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.87.24-1.46 1.49-1.46H16.5V4.3c-.26-.03-1.15-.11-2.19-.11-2.17 0-3.66 1.32-3.66 3.75v2.09H8.15v3h2.5V21h2.85z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M21.6 7.2s-.21-1.5-.87-2.16c-.83-.87-1.76-.87-2.19-.92C15.55 4 12 4 12 4h-.01s-3.55 0-6.54.12c-.43.05-1.36.05-2.19.92C2.6 5.7 2.4 7.2 2.4 7.2S2.18 8.95 2.18 10.7v1.6c0 1.75.22 3.5.22 3.5s.2 1.5.86 2.16c.83.87 1.92.84 2.4.94 1.74.17 7.34.21 7.34.21s3.55-.01 6.54-.13c.43-.05 1.36-.05 2.19-.92.66-.66.87-2.16.87-2.16s.22-1.75.22-3.5v-1.6c0-1.75-.22-3.5-.22-3.5zM9.98 14.5v-5.6l5.4 2.81-5.4 2.79z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "videos", label: "Videos" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gold/15 bg-ink-soft">
      <div className="divider-gold" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/logo.png"
            alt="Mrugesh Beats"
            width={405}
            height={458}
            className="h-16 w-auto mb-3"
          />
          <p className="text-sm text-stone leading-relaxed">
            Professional Live Musician based in Nadiad, Gujarat — bringing premium live
            entertainment to weddings, Garba nights, and celebrations across India.
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-gold mb-4">Quick Links</p>
          <ul className="space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className="text-sm text-stone hover:text-gold transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-gold mb-4">Contact</p>
          <ul className="space-y-3 text-sm text-stone">
            <li>{siteConfig.address.line1}, {siteConfig.address.line2}</li>
            <li>{siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.postalCode}</li>
            <li>
              <a href={`tel:${siteConfig.phone}`} className="hover:text-gold transition-colors">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-gold transition-colors">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-gold mb-4">Follow</p>
          <div className="flex gap-4">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-ink transition-colors"
            >
              <InstagramIcon />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-ink transition-colors"
            >
              <FacebookIcon />
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-ink transition-colors"
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="divider-gold" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 text-center text-xs text-stone tracking-wide">
        © {year} Mrugesh Beats. All rights reserved.
      </div>
    </footer>
  );
}
