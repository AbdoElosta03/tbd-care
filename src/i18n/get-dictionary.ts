import { cookies } from "next/headers";
import { cache } from "react";
import { defaultLocale, resolveLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

/** Request-cached locale + dictionary from the `locale` cookie. */

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ar: () => import("@/i18n/dictionaries/ar").then((module) => module.default),
  en: () => import("@/i18n/dictionaries/en").then((module) => module.default),
};

export const LOCALE_COOKIE = "locale";

export const getLocale = cache(async (): Promise<Locale> => {
  const cookieStore = await cookies();
  return resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value ?? defaultLocale);
});

export const getDictionary = cache(async (): Promise<Dictionary> => {
  const locale = await getLocale();
  return dictionaries[locale]();
});

export function getServiceFromDictionary(dict: Dictionary, slug: string) {
  return dict.services.items.find((service) => service.slug === slug);
}
