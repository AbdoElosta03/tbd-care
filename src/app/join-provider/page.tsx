import type { Metadata } from "next";
import { JoinForm } from "@/components/join/join-form";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

/** `/join-provider` — full provider join form (local submit). */

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.joinProvider.title,
    description: dict.joinProvider.description,
  };
}

export default async function JoinProviderPage() {
  const dict = await getDictionary();
  const locale = await getLocale();
  const { fields: fieldLabels, ...copy } = dict.joinProvider;

  const fields = [
    { name: "fullName", label: fieldLabels.fullName, type: "text", autoComplete: "name" },
    { name: "email", label: fieldLabels.email, type: "email", autoComplete: "email" },
    {
      name: "specialty",
      label: fieldLabels.specialty,
      type: "text",
      autoComplete: "organization-title",
    },
  ];

  return (
    <Section>
      <SectionHeading as="h1" title={dict.joinProvider.title} description={dict.joinProvider.description} />
      <div className="mt-10 max-w-xl">
        <JoinForm
          locale={locale}
          copy={copy}
          fields={fields}
          messageField={{ name: "message", label: fieldLabels.message }}
        />
      </div>
    </Section>
  );
}
