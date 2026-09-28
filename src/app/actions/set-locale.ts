"use server";

import { cookies } from "next/headers";
import { locales, type Locale } from "@/i18n/config";
import { LOCALE_COOKIE } from "@/i18n/get-dictionary";

/** Persist the selected locale for one year. */

export async function setLocale(locale: Locale) {
  if (!locales.includes(locale)) {
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
