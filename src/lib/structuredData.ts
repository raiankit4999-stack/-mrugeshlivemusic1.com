import siteConfig from "@/data/siteConfig.json";

const address = {
  "@type": "PostalAddress",
  streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.line3}`,
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
  jobTitle: "Gujarati Live Musician",
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
  areaServed: "Gujarat, India",
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
