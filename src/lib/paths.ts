/** Internal routes and dictionary nav-key lookup. */

export const paths = {
  home: "/#hero",
  whyUs: "/#why-tbd",
  services: "/#services",
  secondOpinion: "/services/second-opinion",
  app: "/#app",
  faq: "/#faq",
  providers: "/providers",
  joinProvider: "/join-provider",
  joinCompany: "/join-company",
  service: (slug: string) => `/services/${slug}`,
} as const;

export type NavKey = keyof typeof paths;

const navHrefByKey: Record<string, string> = {
  home: paths.home,
  whyUs: paths.whyUs,
  services: paths.services,
  secondOpinion: paths.secondOpinion,
  app: paths.app,
  providers: paths.providers,
  joinProvider: paths.joinProvider,
  faq: paths.faq,
};

export function navHref(key: string) {
  return navHrefByKey[key] ?? paths.home;
}
