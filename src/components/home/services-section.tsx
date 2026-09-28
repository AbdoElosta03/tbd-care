import { Container } from "@/components/layout/container";
import { StoryHeading } from "@/components/home/story-heading";
import { AlternatingFeatureShowcase } from "@/components/features/alternating-feature-showcase";
import { getDictionary } from "@/i18n/get-dictionary";
import { paths } from "@/lib/paths";
import { SERVICE_IMAGES } from "@/lib/service-images";

/** Maps service copy to the home photo showcase. */

export async function ServicesSection() {
  const dict = await getDictionary();

  const items = dict.services.items.map((service, index) => ({
    id: service.slug,
    index: String(index + 1).padStart(2, "0"),
    title: service.title,
    description: service.summary,
    bullets: service.steps.slice(0, 3).map((step) => step.title),
    visualKey: service.slug,
    href: paths.service(service.slug),
    image: SERVICE_IMAGES[service.slug]
      ? { src: SERVICE_IMAGES[service.slug], alt: service.title }
      : undefined,
  }));

  return (
    <section id="services" className="story-services story-services-showcase">
      <Container>
        <StoryHeading
          title={dict.services.title}
          description={dict.services.description}
          align="center"
        />
        <AlternatingFeatureShowcase items={items} scrollManaged="home" />
      </Container>
    </section>
  );
}
