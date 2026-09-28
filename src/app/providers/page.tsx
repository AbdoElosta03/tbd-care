import type { Metadata } from "next";
import { ProviderDirectory } from "@/components/providers/provider-directory";
import { getDictionary } from "@/i18n/get-dictionary";

/** `/providers` — searchable sample network directory. */

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.providers.directoryTitle,
    description: dict.providers.directoryDescription,
  };
}

export default function ProvidersPage() {
  return <ProviderDirectory />;
}
