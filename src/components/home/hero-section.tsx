import Image from "next/image";
import { Container } from "@/components/layout/container";
import { SlideArrowLink } from "@/components/animata/button/slide-arrow-link";
import { ButtonLink } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import { paths } from "@/lib/paths";

/** Full-viewport home intro: copy, CTAs, and LCP doctor image. */

export async function HeroSection() {
  const dict = await getDictionary();

  return (
    <section id="hero" className="story-hero" aria-labelledby="hero-title">
      <div className="story-hero-canvas" aria-hidden="true">
        <div className="story-hero-dots" />
        <div className="story-glow story-glow-a" />
        <div className="story-glow story-glow-b" />
        <div className="story-glow story-glow-c" />
        <div className="story-hero-drift">
          <svg className="story-hero-arc story-hero-arc-a" viewBox="0 0 640 640">
            <circle cx="320" cy="320" r="250" />
            <circle cx="320" cy="320" r="188" />
          </svg>
          <svg className="story-hero-arc story-hero-arc-b" viewBox="0 0 520 520">
            <circle cx="260" cy="260" r="210" />
            <circle cx="260" cy="260" r="146" />
          </svg>
        </div>
      </div>
      <div className="story-hero-pin">
        <div className="story-hero-sticky">
          <Container className="story-hero-stage">
            <div className="story-hero-copy">
              <div className="story-hero-enter">
                <div className="story-mark" aria-hidden="true" />
                <h1 id="hero-title" className="story-hero-title">
                  <span>{dict.hero.title}</span>
                </h1>
                <p className="story-hero-lede">{dict.hero.description}</p>
                <div className="story-hero-actions">
                  <SlideArrowLink href={paths.services}>{dict.hero.primaryAction}</SlideArrowLink>
                  <ButtonLink
                    href={paths.providers}
                    variant="secondary"
                    className="story-hero-cta-network min-h-12 px-6"
                  >
                    {dict.hero.secondaryAction}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Container>
          <div className="story-hero-figure">
            <div className="story-hero-decor" aria-hidden="true">
              <div className="story-hero-doctor-glow" />
              <svg className="story-hero-arc story-hero-arc-c" viewBox="0 0 480 480">
                <circle cx="250" cy="230" r="168" />
                <circle cx="250" cy="230" r="118" />
              </svg>
              <div className="story-hero-card story-hero-card-a">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 12h4.2l1.6-3.4 2.8 7.2 1.7-3.8H19.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="story-hero-card story-hero-card-b">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 6.2v11.6M6.2 12h11.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </div>
              <div className="story-hero-card story-hero-card-c">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 4.8 6.4 7.1v4.7c0 3.3 2.3 5.6 5.6 6.9 3.3-1.3 5.6-3.6 5.6-6.9V7.1L12 4.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="story-hero-doctor-wrap">
              <Image
                src="/image/doctor-image.webp"
                alt={dict.hero.visualAlt}
                width={1261}
                height={1247}
                priority
                sizes="(min-width: 1100px) 980px, (min-width: 760px) 480px, 92vw"
                className="story-hero-doctor"
              />
            </div>
          </div>
          <div className="story-hero-wave" aria-hidden="true">
            <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
              <path
                fill="var(--background)"
                d="M0,118 C220,196 340,28 620,72 C900,116 1020,198 1240,132 C1340,98 1390,108 1440,96 L1440,220 L0,220 Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
