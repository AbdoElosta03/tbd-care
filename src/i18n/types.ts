import type { Provider } from "@/types/provider";

/** Shape of `ar.ts` / `en.ts`. Keep both dictionaries in sync with this type. */

export type NavItemCopy = {
  key: string;
  label: string;
};

export type ServiceCopy = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  stepsTitle: string;
  stepsDescription: string;
  steps: Array<{ id: string; title: string; description: string }>;
};

export type Dictionary = {
  site: {
    name: string;
    description: string;
    keywords: string[];
    skipToContent: string;
  };
  common: {
    menu: string;
    close: string;
    footerNav: string;
    backToServices: string;
    step: string;
  };
  nav: {
    header: NavItemCopy[];
    footer: NavItemCopy[];
  };
  hero: {
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
    visualAlt: string;
  };
  whyUs: {
    title: string;
    description: string;
    points: Array<{ id: string; title: string; lead: string; description: string }>;
  };
  services: {
    title: string;
    description: string;
    items: ServiceCopy[];
  };
  providers: {
    previewTitle: string;
    previewDescription: string;
    previewAction: string;
    directoryTitle: string;
    directoryDescription: string;
    searchLabel: string;
    searchPlaceholder: string;
    cityLabel: string;
    allCities: string;
    viewOnMap: string;
    hideMap: string;
    back: string;
    empty: string;
    openInGoogleMaps: string;
    countSuffix: string;
    previous: string;
    next: string;
    pageOf: string;
    list: Provider[];
  };
  app: {
    title: string;
    description: string;
    promo: {
      title: string;
      descriptionBefore: string;
      descriptionHighlight: string;
      descriptionAfter: string;
      ratingValue: string;
      ratingLabel: string;
    };
    storeLinks: {
      appStore: { href: string; eyebrow: string; title: string };
      playStore: { href: string; eyebrow: string; title: string };
    };
    features: Array<{
      id: string;
      title: string;
      subtitle: string;
      description: string;
      shortLabel: string;
    }>;
    phoneScreens: {
      membership: {
        greeting: string;
        screenTitle: string;
        brand: string;
        tier: string;
        memberName: string;
        memberId: string;
        validUntil: string;
        dependentsLabel: string;
        dependents: string;
        copayLabel: string;
        copay: string;
      };
      claims: {
        screenTitle: string;
        newClaim: string;
        items: Array<{
          id: string;
          provider: string;
          amount: string;
          status: string;
          tone: "success" | "warning";
        }>;
      };
      network: {
        screenTitle: string;
        searchPlaceholder: string;
        items: Array<{ id: string; name: string; type: string; distance: string }>;
      };
      secondOpinion: {
        screenTitle: string;
        noExtraCost: string;
        caseTitle: string;
        specialtyLabel: string;
        specialty: string;
        statusLabel: string;
        status: string;
        stepLabel: string;
        step: string;
        progressLabel: string;
      };
    };
  };
  faq: {
    title: string;
    description: string;
    items: Array<{ id: string; question: string; answer: string }>;
  };
  joinUs: {
    title: string;
    description: string;
    visualAlt: string;
    eyebrow: string;
    submitLabel: string;
    resetLabel: string;
    success: string;
    successLabel: string;
    fields: {
      fullName: string;
      email: string;
      phone: string;
      message: string;
    };
    providerTitle: string;
    providerDescription: string;
    providerAction: string;
    companyTitle: string;
    companyDescription: string;
    companyAction: string;
  };
  joinProvider: {
    title: string;
    description: string;
    submitLabel: string;
    resetLabel: string;
    success: string;
    fields: {
      fullName: string;
      email: string;
      specialty: string;
      message: string;
    };
  };
  joinCompany: {
    title: string;
    description: string;
    submitLabel: string;
    resetLabel: string;
    success: string;
    fields: {
      companyName: string;
      email: string;
      contactName: string;
      message: string;
    };
  };
  footerContact: {
    title: string;
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
    address: string;
    socialLabel: string;
    social: Array<{
      id: "facebook" | "instagram" | "linkedin" | "x";
      label: string;
      href: string;
    }>;
  };
};
