import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import EventExperience from "@/components/home/EventExperience";
import InstrumentShowcase from "@/components/home/InstrumentShowcase";
import Gallery from "@/components/home/Gallery";
import VideoGallery from "@/components/home/VideoGallery";
import Stats from "@/components/home/Stats";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <EventExperience />
      <InstrumentShowcase />
      <Gallery />
      <VideoGallery />
      <Stats />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
