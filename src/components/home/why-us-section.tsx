import { Container } from "@/components/layout/container";
import { getDictionary } from "@/i18n/get-dictionary";

/** Six Why TBD points; GSAP pins and highlights rows on desktop. */

export async function WhyUsSection() {
  const dict = await getDictionary();
  const total = String(dict.whyUs.points.length).padStart(2, "0");

  return (
    <section id="why-tbd" className="story-pin story-why why-grid why-bento">
      <div className="story-pin-frame">
        <Container>
          <div className="why-layout">
            <div className="why-head">
              <div className="why-heading">
                <h2>{dict.whyUs.title}</h2>
                <p className="story-copy">{dict.whyUs.description}</p>
              </div>
              <div className="why-progress" aria-hidden="true">
                <span className="why-count">
                  {total} / {total}
                </span>
                <div className="why-meter">
                  <span />
                </div>
              </div>
            </div>
            <ol className="why-stage">
              {dict.whyUs.points.map((point, index) => (
                <li
                  key={point.id}
                  className={`why-bento-item${index === 0 ? " is-why-active is-why-revealed" : ""}`}
                  data-why-index={index}
                >
                  <article className="why-row" data-why-id={point.id}>
                    <div className="why-row__head">
                      <span className="why-index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3>{point.title}</h3>
                    </div>
                    <p className="why-row__lead">{point.lead}</p>
                    <p className="why-row__copy">{point.description}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}
