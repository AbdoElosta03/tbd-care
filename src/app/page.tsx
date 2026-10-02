import { AppSection } from "@/components/home/app-section";
import { AboutSection } from "@/components/home/about-section";
import { FaqSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { JoinUsSection } from "@/components/home/join-us-section";
import { ProvidersPreviewSection } from "@/components/home/providers-preview-section";
import { PartnersSection } from "@/components/home/partners-section";
import { ServicesSection } from "@/components/home/services-section";
import { StoryScrollEngine } from "@/components/home/story-scroll-engine";
import { WhyUsSection } from "@/components/home/why-us-section";

/** Homepage section order. StoryScrollEngine owns GSAP/Lenis. */

export default function HomePage() {
  return (
    <div className="story-page">
      <div className="story-progress" aria-hidden="true">
        <span />
      </div>
      <HeroSection />
      <AboutSection />
      <PartnersSection />
      <WhyUsSection />
      <ServicesSection />
      <ProvidersPreviewSection />
      <AppSection />
      <JoinUsSection />
      <FaqSection />
      <StoryScrollEngine />
    </div>
  );
}
