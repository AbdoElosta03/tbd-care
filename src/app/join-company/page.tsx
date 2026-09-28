import type { Metadata } from "next";
import { JoinForm } from "@/components/join/join-form";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

/** `/join-company` — company contact form (local submit). */

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.joinCompany.title,
    description: dict.joinCompany.description,
  };
}

export default async function JoinCompanyPage() {
  const dict = await getDictionary();
  const locale = await getLocale();
  const { fields: fieldLabels, ...copy } = dict.joinCompany;

  const fields = [
    {
      name: "companyName",
      label: fieldLabels.companyName,
      type: "text",
      autoComplete: "organization",
    },
    { name: "email", label: fieldLabels.email, type: "email", autoComplete: "email" },
    { name: "contactName", label: fieldLabels.contactName, type: "text", autoComplete: "name" },
  ];

  return (
    <Section>
      <SectionHeading as="h1" title={dict.joinCompany.title} description={dict.joinCompany.description} />
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
