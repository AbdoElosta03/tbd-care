import type { Dictionary } from "@/i18n/types";

/** English UI copy. Keep keys aligned with `ar.ts` and `types.ts`. */

const dictionary: Dictionary = {
  site: {
    name: "TBD Care",
    description:
      "Your health companion. Third-party administration, second medical opinion, and a provider network, 24 hours a day.",
    keywords: [
      "TBD Care",
      "health insurance",
      "third-party administration",
      "provider network",
      "Libya",
      "Tripoli",
      "second medical opinion",
    ],
    skipToContent: "Skip to content",
  },
  common: {
    menu: "Menu",
    close: "Close",
    footerNav: "Navigation",
    backToServices: "Back to services",
    step: "Step",
  },
  nav: {
    header: [
      { key: "home", label: "TBD Home" },
      { key: "services", label: "Services" },
      { key: "app", label: "Application" },
      { key: "providers", label: "Network" },
    ],
    footer: [
      { key: "home", label: "TBD Home" },
      { key: "whyUs", label: "Why TBD?" },
      { key: "services", label: "Services" },
      { key: "secondOpinion", label: "Second medical opinion" },
      { key: "app", label: "TBD Care app" },
      { key: "providers", label: "TBD Medical Network" },
      { key: "joinProvider", label: "Join our network" },
      { key: "faq", label: "FAQ" },
    ],
  },
  hero: {
    title: "TBD Care",
    description:
      "Healthcare closer to you across Libya, with a wide medical network and a simple digital experience from the first visit to the last claim.",
    primaryAction: "Explore our services",
    secondaryAction: "Medical network",
    visualAlt:
      "A TBD Care clinician in a modern clinic, with TBDCare and 0800 150 150",
  },
  about: {
    eyebrow: "About us",
    title: "Healthcare that feels closer and clearer",
    description:
      "TBD Care is a Libyan healthcare network that brings medical providers and digital tools together, helping individuals and company employees reach the right care with confidence and speed.",
    points: [
      { id: "connected", title: "Connected care", description: "One network connecting every member to the right provider." },
      { id: "local", title: "Local expertise", description: "Healthcare solutions shaped around the Libyan market." },
      { id: "digital", title: "Digital experience", description: "Simpler steps and clearer follow-up throughout the journey." },
    ],
  },
  partners: {
    eyebrow: "Our partners",
    title: "Trusted by leading organizations",
    description: "We are proud to work with Libyan organizations that care about employee health and experience.",
    items: [
      { id: "nooran-bank", name: "Al-Nooran Bank", monogram: "N" },
      { id: "noc", name: "National Oil Corporation", monogram: "NOC" },
      { id: "altafani", name: "Al-Tafani Company", monogram: "T" },
      { id: "qetaf", name: "Qetaf", monogram: "Q" },
      { id: "connectHub", name: "Connect Hub", monogram: "CH" },
    ],
  },
  whyUs: {
    title: "Why TBD is different",
    description: "Six points that turn paper coverage into care you can actually feel.",
    points: [
      {
        id: "cloud",
        title: "Integrated system",
        lead: "One place to run the plan",
        description:
          "A single platform for policies, approvals, claims, and service follow-up from start to finish.",
      },
      {
        id: "cost",
        title: "Cost control",
        lead: "A firmer hold on spending",
        description:
          "Utilization analysis and cost management that cut waste and get more value from the coverage.",
      },
      {
        id: "support",
        title: "Real support",
        lead: "Support around the clock",
        description:
          "A specialist team that follows up on questions and helps members reach the right services.",
      },
      {
        id: "opinion",
        title: "Second medical opinion",
        lead: "A more confident clinical decision",
        description:
          "A review of the diagnosis and the case with specialist physicians before important treatment decisions.",
      },
      {
        id: "privacy",
        title: "Privacy and security",
        lead: "Your data stays protected",
        description:
          "Health data held with precise access rights, to a high standard of privacy and security.",
      },
      {
        id: "experience",
        title: "A smoother member experience",
        lead: "Easier, faster services",
        description:
          "Clear access to services, approvals, and insurance information, with a simple digital experience.",
      },
    ],
  },
  services: {
    title: "Services",
    description:
      "Third-party administration, second medical opinion, and cost containment. Open a service to read the details.",
    items: [
      {
        slug: "tpa-services",
        title: "TPA services",
        summary:
          "We run the health plan for insurers and self-funded groups: faster approvals and claims, benefits visible at the same moment to the member, the employer, and the provider, and a multilingual team on call around the clock.",
        description:
          "TBD Care provides third-party administration to insurance companies and self-funded groups, with a team that handles issues through an advanced working style.",
        stepsTitle: "What the service includes",
        stepsDescription: "Advantages published for TBD third-party administration.",
        steps: [
          {
            id: "software",
            title: "Real-time benefits information",
            description:
              "Cloud software that makes benefits information available to members, employers, and providers in real time.",
          },
          {
            id: "claims",
            title: "Approvals and claims",
            description:
              "Fast approvals and claims processing, managed by specialists in the field.",
          },
          {
            id: "plans",
            title: "Benefits plan design",
            description:
              "Help for clients building healthcare benefits plans for local or international needs.",
          },
          {
            id: "team",
            title: "Multilingual team, 24/7",
            description:
              "A multilingual claims team available around the clock for clients and members.",
          },
          {
            id: "tailor",
            title: "Tailored to each client",
            description:
              "Services shaped to each client, with support for members seeking medical care worldwide.",
          },
        ],
      },
      {
        slug: "second-opinion",
        title: "Second medical opinion",
        summary:
          "Before a major treatment goes ahead, a physician in the same specialty reviews the diagnosis and the care plan with you. TBD members can request it at no extra cost, so the next decision is clearer.",
        description:
          "Members can request a second medical opinion with no extra cost. The medical team offers a review of the diagnosis by an expert in that exact field.",
        stepsTitle: "How the service is described",
        stepsDescription: "What TBD publishes about second medical opinion.",
        steps: [
          {
            id: "access",
            title: "Available to members",
            description: "The service is offered to TBD members as part of their access to care.",
          },
          {
            id: "review",
            title: "Review in the same specialty",
            description: "A medical expert in the same field reviews the diagnosis.",
          },
          {
            id: "cost",
            title: "No extra cost",
            description: "TBD states that this second opinion is provided with no extra cost added.",
          },
        ],
      },
      {
        slug: "cost-containment",
        title: "Cost containment",
        summary:
          "We look at the treatment path and the bill together. When care looks excessive or poorly matched, we flag it early — protecting the patient from harm that was never needed, and the payer from a cost that could have been avoided.",
        description:
          "Excessive or inappropriate medical treatment can harm patients and become costly for individuals and employers. Cost containment is TBD’s response to those practices.",
        stepsTitle: "The published position",
        stepsDescription: "How TBD describes cost containment on its site.",
        steps: [
          {
            id: "risk",
            title: "Protect the patient",
            description:
              "Inappropriate treatment can be harmful, not only expensive.",
          },
          {
            id: "cost",
            title: "Protect the payer",
            description:
              "The same practices raise cost for individuals and employers.",
          },
          {
            id: "role",
            title: "TBD’s role",
            description:
              "TBD positions its team to stand against those practices.",
          },
        ],
      },
    ],
  },
  providers: {
    previewTitle: "Find a provider close to you",
    previewDescription:
      "A wide network of trusted hospitals, clinics, doctors, and pharmacies, locally and internationally. The names below are placeholders until the live directory is connected.",
    previewAction: "View the network",
    directoryTitle: "TBD Medical Network",
    directoryDescription:
      "Explore TBD Care network providers, choose the right category, then search by name or city.",
    searchLabel: "Search",
    searchPlaceholder: "Search by name or address",
    cityLabel: "City",
    allCities: "All cities",
    viewOnMap: "View on map",
    hideMap: "Hide map",
    back: "All categories",
    empty: "No matching results.",
    openInGoogleMaps: "Open in Google Maps",
    countSuffix: "providers",
    previous: "Previous",
    next: "Next",
    pageOf: "of",
    list: [
      {
        id: "hospitals",
        slug: "hospitals",
        name: "Hospitals",
        specialty: "Inpatient and specialist care",
        city: "Local and international",
      },
      {
        id: "clinics",
        slug: "clinics",
        name: "Clinics",
        specialty: "Outpatient care",
        city: "Local and international",
      },
      {
        id: "doctors",
        slug: "doctors",
        name: "Doctors",
        specialty: "Medical specialists",
        city: "Local and international",
      },
      {
        id: "pharmacies",
        slug: "pharmacies",
        name: "Pharmacies",
        specialty: "Medication dispensing",
        city: "Local and international",
      },
    ],
  },
  app: {
    title: "Your full coverage in your pocket",
    description:
      "The TBD Care app puts everything you need at your fingertips: submit claims, show your card, and find the nearest provider in seconds.",
    promo: {
      title: "Your health coverage, in your pocket.",
      descriptionBefore: "Your card, claims, and medical network — ",
      descriptionHighlight: "in seconds",
      descriptionAfter: ", from one app available 24/7.",
      ratingValue: "4.9",
      ratingLabel: "· 10,000+ ratings across both stores",
    },
    storeLinks: {
      appStore: {
        eyebrow: "Download on the",
        title: "App Store",
        href: "https://apps.apple.com/us/app/tbd-care-app/id6451255176",
      },
      playStore: {
        eyebrow: "Get it on",
        title: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.tbdcare&pcampaignid=web_share",
      },
    },
    features: [
      {
        id: "membership",
        title: "Membership",
        shortLabel: "Membership",
        subtitle: "Your digital card, always with you",
        description: "Show your membership card and coverage instantly from the app, anytime.",
      },
      {
        id: "claims",
        title: "Claims",
        shortLabel: "Claims",
        subtitle: "Track every claim status",
        description:
          "Upload bills and reports from the app or portal and track every claim step by step.",
      },
      {
        id: "network",
        title: "Medical network",
        shortLabel: "Network",
        subtitle: "Providers near you",
        description:
          "Find a hospital, clinic, or pharmacy near you across the trusted TBD network.",
      },
      {
        id: "second-opinion",
        title: "Second medical opinion",
        shortLabel: "Second opinion",
        subtitle: "Review by a specialist",
        description:
          "Request a specialist review of your diagnosis — at no extra cost to the member.",
      },
    ],
    phoneScreens: {
      membership: {
        greeting: "Hello, Sarah Al-Otaibi",
        screenTitle: "Membership card",
        brand: "TBD Care",
        tier: "Gold plan",
        memberName: "Sarah Al-Otaibi",
        memberId: "TBD-204-8812",
        validUntil: "Valid until 12/2027",
        dependentsLabel: "Dependents",
        dependents: "3 members",
        copayLabel: "Copayment",
        copay: "10%",
      },
      claims: {
        screenTitle: "Recent claims",
        newClaim: "New claim",
        items: [
          {
            id: "c1",
            provider: "Tripoli Hospital",
            amount: "LYD 1,240",
            status: "Under review",
            tone: "warning",
          },
          {
            id: "c2",
            provider: "Dental Clinic",
            amount: "LYD 380",
            status: "Approved",
            tone: "success",
          },
        ],
      },
      network: {
        screenTitle: "Medical network",
        searchPlaceholder: "Search for a hospital or clinic",
        items: [
          {
            id: "p1",
            name: "Tripoli Hospital",
            type: "Hospital",
            distance: "2.4 km",
          },
          {
            id: "p2",
            name: "Heart Clinic",
            type: "Specialist clinic",
            distance: "5.1 km",
          },
          {
            id: "p3",
            name: "Al-Noor Pharmacy",
            type: "Pharmacy",
            distance: "0.8 km",
          },
        ],
      },
      secondOpinion: {
        screenTitle: "Second medical opinion",
        noExtraCost: "No extra cost",
        caseTitle: "Diagnosis review request",
        specialtyLabel: "Specialty",
        specialty: "Cardiology",
        statusLabel: "Status",
        status: "Under review",
        stepLabel: "Current step",
        step: "Specialist review",
        progressLabel: "Request progress",
      },
    },
  },
  faq: {
    title: "FAQ",
    description:
      "Answers drawn from the public TBD Care site. The member and provider FAQ pages were not copied in full.",
    items: [
      {
        id: "what",
        question: "What is TBD Care?",
        answer:
          "TBD Care describes itself as a health companion. It provides third-party administration and helps families, individuals, and employers use the healthcare system.",
      },
      {
        id: "opinion",
        question: "Is a second medical opinion included?",
        answer:
          "Yes. Members can request a second medical opinion at no extra cost. A medical expert in the same field reviews the diagnosis.",
      },
      {
        id: "support",
        question: "How do I reach client services?",
        answer:
          "Free call 0800 150 150, 24/7, or email client.services@tbdcare.com. The published address is Al-Shat road, Sooq Al-Juma, Tripoli, Libya.",
      },
      {
        id: "network",
        question: "What is in the medical network?",
        answer:
          "Trusted hospitals, clinics, doctors, and pharmacies, locally and internationally.",
      },
      {
        id: "app",
        question: "What can members do in the app?",
        answer:
          "Submit claims and view policy information, anytime and anywhere.",
      },
    ],
  },
  joinUs: {
    title: "Contact us",
    description: "Our customer team is ready to answer your questions and help you at any time. We are always here for you.",
    visualAlt: "Three medical professionals standing behind the TBD Care section, appearing through the blue container",
    eyebrow: "Always on",
    submitLabel: "Send message",
    resetLabel: "Edit details",
    success: "Your message stayed on this page. TBD has not received it yet.",
    successLabel: "Sent",
    fields: {
      fullName: "Full name",
      email: "Email",
      phone: "Phone number",
      message: "Write your message here...",
    },
    providerTitle: "Join as a provider",
    providerDescription:
      "Hospitals, clinics, doctors, and pharmacies can join the network. Providers submit claims and pre-authorizations through TBD E-Health.",
    providerAction: "Provider request",
    companyTitle: "Join as a company",
    companyDescription:
      "Insurance companies and self-funded groups can use TBD third-party administration, locally or internationally.",
    companyAction: "Company request",
  },
  joinProvider: {
    title: "Join our network",
    description:
      "A request form for providers who want to join the TBD medical network. Submission is stored on this page only until the process is connected.",
    submitLabel: "Submit request",
    resetLabel: "Edit details",
    success:
      "Your details stayed on this page. TBD has not received this request yet.",
    fields: {
      fullName: "Full name",
      email: "Email",
      specialty: "Specialty",
      message: "About your facility",
    },
  },
  joinCompany: {
    title: "Third-party administration enquiry",
    description:
      "A request form for insurance companies and self-funded groups. Submission is stored on this page only until the process is connected.",
    submitLabel: "Submit request",
    resetLabel: "Edit details",
    success:
      "Your details stayed on this page. TBD has not received this request yet.",
    fields: {
      companyName: "Company name",
      email: "Email",
      contactName: "Contact name",
      message: "About the company",
    },
  },
  footerContact: {
    title: "Contact us",
    phone: "0800 150 150",
    phoneHref: "tel:0800150150",
    email: "client.services@tbdcare.com",
    emailHref: "mailto:client.services@tbdcare.com",
    address: "Tripoli, Al-Shat Road – Semaforo Al-Fath",
    socialLabel: "Follow us",
    social: [
      { id: "facebook", label: "Facebook", href: "#" },
      { id: "instagram", label: "Instagram", href: "#" },
      { id: "linkedin", label: "LinkedIn", href: "#" },
      { id: "x", label: "X", href: "#" },
    ],
  },
};

export default dictionary;
