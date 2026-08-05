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
  "Mrugesh Shukla",
  "Mrugesh Beats",
];

const title = "Mrugesh Shukla | Mrugesh Beats — Live Musician in Nadiad, Gujarat";
const description =
  "Mrugesh Shukla (Mrugesh Beats) is a professional live musician based in Nadiad, Gujarat. Book live music for weddings, Garba nights, Bhakti Sandhya, and corporate events across India.";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: title,
    template: "%s | Mrugesh Beats",
  },
  description,
  keywords,
  authors: [{ name: "Mrugesh Shukla" }],
  creator: "Mrugesh Shukla",
  applicationName: "Mrugesh Beats",
  category: "Music",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.siteUrl,
    siteName: "Mrugesh Beats",
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
