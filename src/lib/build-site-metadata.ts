import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { BRAND_LOGO_PATH, getSiteUrl } from "@/lib/site";

export function buildSiteMetadata(dict: Dictionary, locale: Locale): Metadata {
  const siteUrl = getSiteUrl();
  const { name, description, keywords } = dict.site;
  const openGraphLocale = locale === "ar" ? "ar_LY" : "en_US";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: name,
      template: `%s | ${name}`,
    },
    description,
    applicationName: name,
    keywords,
    authors: [{ name: name, url: siteUrl }],
    creator: name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [{ url: BRAND_LOGO_PATH, type: "image/webp" }],
      apple: [{ url: BRAND_LOGO_PATH, type: "image/webp" }],
    },
    openGraph: {
      type: "website",
      locale: openGraphLocale,
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_LY"],
      url: siteUrl,
      siteName: name,
      title: name,
      description,
      images: [
        {
          url: BRAND_LOGO_PATH,
          width: 48,
          height: 48,
          alt: name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: name,
      description,
      images: [BRAND_LOGO_PATH],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
