import { ProviderBrowser } from "@/components/providers/provider-browser";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { networkCities, networkFacilities, type NetworkCategoryId } from "@/data/network-facilities";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

/** Localizes sample network data and hands it to the client browser. */

const categoryOrder: NetworkCategoryId[] = ["hospitals", "clinics", "pharmacies"];

export async function ProviderDirectory() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  const categories = categoryOrder.map((id) => {
    const source = dict.providers.list.find((provider) => provider.id === id);
    return {
      id,
      name: source?.name ?? id,
      description: source?.specialty ?? "",
    };
  });

  const cityName = new Map(networkCities.map((city) => [city.id, city.name[locale]]));

  return (
    <Section>
      <SectionHeading
        as="h1"
        title={dict.providers.directoryTitle}
        description={dict.providers.directoryDescription}
      />
      <ProviderBrowser
        categories={categories}
        cities={networkCities.map((city) => ({ id: city.id, name: city.name[locale] }))}
        facilities={networkFacilities.map((facility) => ({
          id: facility.id,
          category: facility.category,
          cityId: facility.cityId,
          city: cityName.get(facility.cityId) ?? facility.cityId,
          name: facility.name[locale],
          address: facility.address[locale],
          lat: facility.lat,
          lng: facility.lng,
        }))}
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
    </Section>
  );
}
