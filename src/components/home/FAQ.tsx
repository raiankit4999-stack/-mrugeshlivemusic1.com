import faqs from "@/data/faq.json";
import { buildFaqJsonLd } from "@/lib/structuredData";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqJsonLd = buildFaqJsonLd(faqs);

  return (
    <section id="faq" className="relative bg-background py-28 lg:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Questions"
          title="Frequently Asked Questions"
          description="Everything you need to know before booking Mrugesh Beats for your event."
        />

        <Accordion className="mt-14" defaultValue={[faqs[0].id]}>
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="glass mb-4 rounded-2xl border-none px-6 py-2"
            >
              <AccordionTrigger className="font-display text-lg text-white hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-stone leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
