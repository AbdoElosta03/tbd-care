import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/service-detail";
import ar from "@/i18n/dictionaries/ar";
import { getDictionary, getServiceFromDictionary } from "@/i18n/get-dictionary";

/** `/services/[slug]` — static service pages from dictionary slugs. */

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ar.services.items.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const dict = await getDictionary();
  const service = getServiceFromDictionary(dict, slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const dict = await getDictionary();
  const service = getServiceFromDictionary(dict, slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
