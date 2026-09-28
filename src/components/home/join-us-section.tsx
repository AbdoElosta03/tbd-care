import Image from "next/image";
import { Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { JoinForm } from "@/components/join/join-form";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

/** Home contact banner with compact form and team photo. */

export async function JoinUsSection() {
  const dict = await getDictionary();
  const locale = await getLocale();
  const { fields: fieldLabels, ...copy } = dict.joinUs;

  const fields = [
    { name: "fullName", label: fieldLabels.fullName, type: "text", autoComplete: "name" },
    { name: "email", label: fieldLabels.email, type: "email", autoComplete: "email" },
    { name: "phone", label: fieldLabels.phone, type: "tel", autoComplete: "tel" },
  ];

  return (
    <section id="join-us" className="story-join story-join--banner" aria-labelledby="join-us-title">
      <div className="join-banner__decor" aria-hidden="true">
        <span className="join-banner__orb join-banner__orb--a" />
        <span className="join-banner__orb join-banner__orb--b" />
        <span className="join-banner__cross join-banner__cross--a" />
        <span className="join-banner__cross join-banner__cross--b" />
      </div>
      <Container className="join-banner">
        <div className="join-banner__form-col">
          <JoinForm
            compact
            locale={locale}
            copy={copy}
            fields={fields}
            messageField={{ name: "message", label: fieldLabels.message }}
          />
        </div>

        <div className="join-banner__visual">
          <div className="join-banner__intro">
            <span className="join-banner__badge">
              <Clock aria-hidden="true" />
              <span className="join-banner__badge-time">24/7</span>
              <span className="join-banner__badge-label">{dict.joinUs.eyebrow}</span>
            </span>
            <h2 id="join-us-title">{dict.joinUs.title}</h2>
            <p className="join-banner__lede">{dict.joinUs.description}</p>
          </div>
          <div className="join-banner__team">
            <Image
              src="/image/doctors-image.webp"
              alt={dict.joinUs.visualAlt}
              width={1152}
              height={648}
              sizes="(min-width: 900px) 36rem, 100vw"
              className="join-banner__photo"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
