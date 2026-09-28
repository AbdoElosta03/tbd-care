/** Public site URL for canonical links and Open Graph. */

const DEFAULT_SITE_URL = "https://www.tbdcare.com";

export const BRAND_LOGO_PATH = "/image/TBD-Care-Logo.webp";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) {
    return DEFAULT_SITE_URL;
  }
  try {
    return new URL(raw).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}
