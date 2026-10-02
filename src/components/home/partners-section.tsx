import Image from "next/image";
import { Container } from "@/components/layout/container";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

type Partner = {
  id: string;
  name: string;
};

const partnerLogos: Record<string, string> = {
  "nooran-bank": "/image/partners/nub-invers-logo.svg",
  noc: "/image/partners/NOC-logo-ar-colored.svg",
  altafani: "/image/partners/navLogoTafanipng.68495194.png",
  qetaf: "/image/partners/qetaf.png",
  connectHub: "/image/partners/connectHub.png",
};

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <li className="partner-logo" aria-label={partner.name}>
      <span className="partner-logo-image">
        <Image
          src={partnerLogos[partner.id]}
          alt={partner.name}
          fill
          sizes="(max-width: 759px) 14rem, 17rem"
          className="partner-logo-image-asset"
        />
      </span>
    </li>
  );
}

/** Continuous, reduced-motion-safe wordmark strip for client organizations. */

export async function PartnersSection() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <section className="home-partners" aria-labelledby="partners-title">
      <Container className="home-partners-heading">
        <p className="home-section-eyebrow">{dict.partners.eyebrow}</p>
        <h2 id="partners-title">{dict.partners.title}</h2>
        <p>{dict.partners.description}</p>
      </Container>

      <div className="partners-marquee" dir="ltr">
        <div className="partners-track">
          {[0, 1].map((copyIndex) => (
            <ul
              key={copyIndex}
              className="partners-group"
              dir={locale === "ar" ? "rtl" : "ltr"}
              aria-hidden={copyIndex === 1 ? "true" : undefined}
            >
              {dict.partners.items.map((partner) => (
                <PartnerLogo key={`${copyIndex}-${partner.id}`} partner={partner} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
