import { Fragment, type ReactNode } from "react";
import { SlideArrowLink } from "@/components/animata/button/slide-arrow-link";
import { Container } from "@/components/layout/container";
import { StoryHeading } from "@/components/home/story-heading";
import { getDictionary } from "@/i18n/get-dictionary";
import { paths } from "@/lib/paths";

/** Home preview of the four network categories plus the SVG connector. */

/** Single continuous wave through all four orb centers (desktop). */
const networkWavePath =
  "M 150 90 C 250 132, 350 132, 450 90 C 550 48, 650 48, 750 90 C 850 132, 950 132, 1050 90";

function ProviderIcon({ id }: { id: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<string, ReactNode> = {
    hospitals: (
      <>
        <path d="M4 20V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5V20" />
        <path d="M4 20h16M9 20v-3h6v3M12 8v6M9 11h6" />
      </>
    ),
    clinics: (
      <>
        <rect x="4" y="3.5" width="16" height="17" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    doctors: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 19.5c1.2-3.2 3.5-4.8 6.5-4.8s5.3 1.6 6.5 4.8" />
      </>
    ),
    pharmacies: (
      <>
        <rect x="8" y="3.5" width="8" height="17" rx="4" />
        <path d="M12 8v6M9.2 11h5.6" />
      </>
    ),
  };

  return (
    <svg {...common} className="network-glyph">
      {paths[id] ?? paths.hospitals}
    </svg>
  );
}

export async function ProvidersPreviewSection() {
  const dict = await getDictionary();

  return (
    <section className="story-network story-network--static">
      <Container>
        <StoryHeading
          title={dict.providers.previewTitle}
          description={dict.providers.previewDescription}
          align="center"
          compact
        />
        <div className="network-field">
          <svg className="network-wave" viewBox="0 0 1200 180" aria-hidden="true">
            <path className="network-segment" d={networkWavePath} pathLength={1} />
          </svg>
          <div className="network-nodes">
            {dict.providers.list.map((provider, index) => (
              <Fragment key={provider.id}>
                {index > 0 ? <div className="network-v-connector" aria-hidden="true" /> : null}
                <article className="network-node">
                  <div className="network-orb">
                    <span className="network-icon">
                      <ProviderIcon id={provider.id} />
                    </span>
                  </div>
                  <div className="network-copy">
                    <h3>{provider.name}</h3>
                    <p>{provider.specialty}</p>
                    <p className="network-meta">{provider.city}</p>
                  </div>
                </article>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="network-action">
          <SlideArrowLink href={paths.providers}>{dict.providers.previewAction}</SlideArrowLink>
        </div>
      </Container>
    </section>
  );
}
