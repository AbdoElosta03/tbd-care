import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { getDictionary } from "@/i18n/get-dictionary";
import type { ServiceCopy } from "@/i18n/types";
import { paths } from "@/lib/paths";
import { serviceImageForSlug } from "@/lib/service-images";

/** Service detail: one image beside the copy, centered on the page. */

export async function ServiceDetail({ service }: { service: ServiceCopy }) {
  const dict = await getDictionary();
  const imageSrc = serviceImageForSlug(service.slug);

  return (
    <section className="service-detail-page">
      <Container className="service-detail-split">
        {imageSrc ? (
          <figure className="service-detail-split__media">
            <Image
              src={imageSrc}
              alt={service.title}
              width={1088}
              height={994}
              className="service-detail-split__photo"
              sizes="(max-width: 899px) 100vw, 32rem"
              priority
            />
          </figure>
        ) : null}

        <div className="service-detail-split__copy">
          <Link href={paths.services} className="service-detail-back">
            <ChevronLeft className="rtl:rotate-180" aria-hidden="true" />
            <span>{dict.common.backToServices}</span>
          </Link>

          <header>
            <h1 className="service-detail-split__title">{service.title}</h1>
            <p className="service-detail-split__lede">{service.description}</p>
          </header>

          <section className="service-detail-split__steps" aria-labelledby="service-steps-title">
            <h2 id="service-steps-title" className="service-detail-split__steps-title">
              {service.stepsTitle}
            </h2>
            <ol className="service-detail-split__list">
              {service.steps.map((step) => (
                <li key={step.id}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </Container>
    </section>
  );
}
