import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { buildSiteMetadata } from "@/lib/build-site-metadata";
import { navHref } from "@/lib/paths";
import "./globals.css";

/** Root shell: locale, direction, fonts, header, and footer. */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary();

  return buildSiteMetadata(dict, locale);
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const dict = await getDictionary();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const headerNav = dict.nav.header.map((item) => ({
    label: item.label,
    href: navHref(item.key),
  }));

  const footerNav = dict.nav.footer.map((item) => ({
    label: item.label,
    href: navHref(item.key),
  }));

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${tajawal.variable} h-full`}>
      <body
        className={`${locale === "ar" ? tajawal.className : inter.className} flex min-h-full flex-col font-sans antialiased`}
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:start-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          {dict.site.skipToContent}
        </a>
        <SiteHeader
          locale={locale}
          siteName={dict.site.name}
          headerNav={headerNav}
          menuLabel={dict.common.menu}
          closeLabel={dict.common.close}
        />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter
          siteName={dict.site.name}
          siteDescription={dict.site.description}
          footerNav={footerNav}
          footerNavTitle={dict.common.footerNav}
          contact={dict.footerContact}
        />
      </body>
    </html>
  );
}
