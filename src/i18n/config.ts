export const locales = ["ar", "en"] as const;

/** Supported locales. Arabic is the default until the user switches. */

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocale(value: string | undefined | null): Locale {
  if (value && isLocale(value)) {
    return value;
  }
  return defaultLocale;
}
