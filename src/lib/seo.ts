import type { Metadata } from "next";
import siteConfig from "@/data/siteConfig.json";

const keywords = [
  "Live Singer Gujarat",
  "Live Musician Gujarat",
  "Live Music Nadiad",
  "Wedding Singer Gujarat",
  "Garba Singer Gujarat",
  "Bhakti Singer Gujarat",
  "Live Orchestra Gujarat",
  "Live Band Gujarat",
  "Wedding Music Gujarat",
  "Celebrity Singer Gujarat",
  "Event Organiser Gujarat",
  "Ring Ceremony Music Gujarat",
  "Destination Wedding Band Gujarat",
  "Vedic Event Music Gujarat",
  "Sangeet Sandhya Gujarat",
  "Corporate Event Live Band Gujarat",
  "Live Band Ahmedabad",
  "Live Band Surat",
  "Live Band Vadodara",
  "Live Band Rajkot",
  "Live Band Gandhinagar",
  "Mrugesh Shukla",
  "Crystal Beats",
];

const title = "Crystal Beats | Events by Mrugesh Shukla — Live Musician, Pan-Gujarat Bookings";
const description =
  "Crystal Beats — Events by Mrugesh Shukla, a professional live music and event entertainment brand based in Nadiad, Gujarat. Now taking bookings from across Gujarat — Ahmedabad, Surat, Vadodara, Rajkot, Gandhinagar and beyond — for weddings, Garba nights, Vedic events, Bhakti Sangeet, and corporate events.";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: title,
    template: "%s | Crystal Beats",
  },
  description,
  keywords,
  authors: [{ name: "Mrugesh Shukla" }],
  creator: "Mrugesh Shukla",
  applicationName: "Crystal Beats",
  category: "Music",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.siteUrl,
    siteName: "Crystal Beats",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
