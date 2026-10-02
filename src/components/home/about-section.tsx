import { Container } from "@/components/layout/container";
import { getDictionary } from "@/i18n/get-dictionary";

/** Short company introduction placed directly after the homepage hero. */

export async function AboutSection() {
  const dict = await getDictionary();

  return (
    <section id="about" className="home-about" aria-labelledby="about-title">
      <Container>
        <div className="home-about-layout">
          <div className="home-about-copy">
            <p className="home-section-eyebrow">{dict.about.eyebrow}</p>
            <h2 id="about-title">{dict.about.title}</h2>
            <p>{dict.about.description}</p>
          </div>

          <div className="home-about-points">
            {dict.about.points.map((point, index) => (
              <article key={point.id} className="home-about-point">
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
