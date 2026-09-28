/** Service hero / showcase images keyed by dictionary slug. */

export const SERVICE_IMAGES: Record<string, string> = {
  "tpa-services": "/image/feature1-image.webp",
  "second-opinion": "/image/feature2-image.webp",
  "cost-containment": "/image/feature3-image.webp",
};

export function serviceImageForSlug(slug: string): string | undefined {
  return SERVICE_IMAGES[slug];
}
