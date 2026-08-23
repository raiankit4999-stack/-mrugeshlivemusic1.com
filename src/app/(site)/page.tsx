import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import EventExperience from "@/components/home/EventExperience";
import Events from "@/components/home/Events";
import InstrumentShowcase from "@/components/home/InstrumentShowcase";
import Gallery from "@/components/home/Gallery";
import VideoGallery from "@/components/home/VideoGallery";
import Stats from "@/components/home/Stats";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Contact from "@/components/home/Contact";
import { getUpcomingEvents } from "@/lib/events";
import { getGalleryImages } from "@/lib/gallery";
import { getVideos } from "@/lib/videos";

export default async function Home() {
  const [events, galleryImages, videos] = await Promise.all([
    getUpcomingEvents(),
    getGalleryImages(),
    getVideos(),
  ]);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <EventExperience />
      <Events events={events} />
      <InstrumentShowcase />
      <Gallery images={galleryImages} />
      <VideoGallery videos={videos} />
      <Stats />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
