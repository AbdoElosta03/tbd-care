import { FaqAccordion } from "@/components/home/faq-accordion";
import { Container } from "@/components/layout/container";
import { StoryHeading } from "@/components/home/story-heading";
import { getDictionary } from "@/i18n/get-dictionary";

/** Homepage FAQ wrapper. */

export async function FaqSection() {
  const dict = await getDictionary();

  return (
    <section id="faq" className="story-faq">
      <Container>
        <StoryHeading
          title={dict.faq.title}
          description={dict.faq.description}
          align="center"
          compact
        />
        <FaqAccordion items={dict.faq.items} />
      </Container>
    </section>
  );
}
