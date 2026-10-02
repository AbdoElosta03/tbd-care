import { ProviderBrowser } from "@/components/providers/provider-browser";
import type { NetworkFacility } from "@/lib/api";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

/** Localizes directory content and hands API controls to the client browser. */

const categoryOrder: NetworkFacility["category"][] = ["hospitals", "clinics", "pharmacies", "other"];

export async function ProviderDirectory() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const categories = categoryOrder.map((id) => {
    const item = dict.providers.list.find((provider) => provider.id === id);
    const other = locale === "ar"
      ? { name: "مزودون آخرون", description: "خدمات صحية متنوعة" }
      : { name: "Other providers", description: "Additional healthcare services" };

    return {
      id,
      name: item?.name ?? other.name,
      description: item?.specialty ?? other.description,
    };
  });

  return (
    <ProviderBrowser
      categories={categories}
      locale={locale}
      //why ? : we need to localize the copy for the provider browser
      copy={{
        searchLabel: dict.providers.searchLabel,
        searchPlaceholder: dict.providers.searchPlaceholder,
        cityLabel: dict.providers.cityLabel,
        allCities: dict.providers.allCities,
        viewOnMap: dict.providers.viewOnMap,
        hideMap: dict.providers.hideMap,
        back: dict.providers.back,
        empty: dict.providers.empty,
        openInGoogleMaps: dict.providers.openInGoogleMaps,
        countSuffix: dict.providers.countSuffix,
        previous: dict.providers.previous,
        next: dict.providers.next,
        pageOf: dict.providers.pageOf,
      }}
    />
  );
}
