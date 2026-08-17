import siteConfig from "@/data/siteConfig.json";
import services from "@/data/services.json";

const address = {
  "@type": "PostalAddress",
  streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
  addressLocality: siteConfig.address.city,
  addressRegion: siteConfig.address.state,
  postalCode: siteConfig.address.postalCode,
  addressCountry: "IN",
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: siteConfig.brand,
  jobTitle: "Live Musician",
  description: siteConfig.description,
  url: siteConfig.siteUrl,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address,
  sameAs: Object.values(siteConfig.social),
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.brand,
  image: siteConfig.heroPosterUrl,
  description: siteConfig.description,
  url: siteConfig.siteUrl,
  telephone: siteConfig.phone,
  priceRange: "$$",
  address,
  areaServed: [
    { "@type": "AdministrativeArea", name: "Gujarat, India" },
    { "@type": "City", name: "Ahmedabad" },
    { "@type": "City", name: "Surat" },
    { "@type": "City", name: "Vadodara" },
    { "@type": "City", name: "Rajkot" },
    { "@type": "City", name: "Bhavnagar" },
    { "@type": "City", name: "Jamnagar" },
    { "@type": "City", name: "Gandhinagar" },
    { "@type": "City", name: "Junagadh" },
    { "@type": "City", name: "Nadiad" },
    { "@type": "City", name: "Anand" },
    { "@type": "City", name: "Mehsana" },
    { "@type": "City", name: "Navsari" },
    { "@type": "City", name: "Valsad" },
    { "@type": "City", name: "Bharuch" },
    { "@type": "City", name: "Morbi" },
    { "@type": "City", name: "Patan" },
    { "@type": "City", name: "Porbandar" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Live Music & Event Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  },
};

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
