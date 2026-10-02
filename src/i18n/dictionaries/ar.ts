import type { Dictionary } from "@/i18n/types";

/** Arabic UI copy. Keep keys aligned with `en.ts` and `types.ts`. */

const dictionary: Dictionary = {
  site: {
    name: "TBD Care",
    description:
      "رفيقك الصحي. إدارة الطرف الثالث، والرأي الطبي الآخر، وشبكة مزودين، على مدار الساعة.",
    keywords: [
      "TBD Care",
      "تأمين صحي",
      "إدارة الطرف الثالث",
      "شبكة مزودين",
      "ليبيا",
      "طرابلس",
      "رأي طبي ثانٍ",
    ],
    skipToContent: "تخطي إلى المحتوى",
  },
  common: {
    menu: "القائمة",
    close: "إغلاق",
    footerNav: "التنقل",
    backToServices: "العودة إلى الخدمات",
    step: "الخطوة",
  },
  nav: {
    header: [
      { key: "home", label: "الرئيسية" },
      { key: "services", label: "الخدمات" },
      { key: "app", label: "تطبيق" },
      { key: "providers", label: "الشبكة" },
    ],
    footer: [
      { key: "home", label: "الرئيسية" },
      { key: "whyUs", label: "لماذا TBD؟" },
      { key: "services", label: "الخدمات" },
      { key: "secondOpinion", label: "الرأي الطبي الآخر" },
      { key: "app", label: "تطبيق TBD Care" },
      { key: "providers", label: "الشبكة الطبية" },
      { key: "joinProvider", label: "انضم إلى الشبكة" },
      { key: "faq", label: "الأسئلة الشائعة" },
    ],
  },
  hero: {
    title: "TBD Care",
    description:
      "رعاية صحية أقرب إليك في مختلف المدن الليبية، بشبكة طبية واسعة وتجربة رقمية بسيطة من أول زيارة حتى آخر مطالبة",
    primaryAction: "تعرف على خدماتنا",
    secondaryAction: "الشبكة الطبية",
    visualAlt: "طبيب من TBD Care في عيادة حديثة، مع حساب TBDCare ورقم 0800 150 150",
  },
  about: {
    eyebrow: "من نحن",
    title: "رعاية صحية أكثر قربًا ووضوحًا",
    description:
      "TBD Care شبكة رعاية صحية ليبية تجمع بين مزودي الخدمات الطبية والتقنيات الرقمية لتسهيل وصول الأفراد وموظفي الشركات إلى الرعاية المناسبة بثقة وسرعة.",
    points: [
      { id: "connected", title: "رعاية مترابطة", description: "شبكة واحدة تربط المستفيد بمزود الخدمة المناسب." },
      { id: "local", title: "خبرة محلية", description: "حلول مصممة لتناسب احتياجات السوق الليبي." },
      { id: "digital", title: "تجربة رقمية", description: "إجراءات أبسط ومتابعة أوضح في كل خطوة." },
    ],
  },
  partners: {
    eyebrow: "شركاؤنا",
    title: "ثقة تجمعنا مع مؤسسات رائدة",
    description: "نفخر بالعمل مع جهات ليبية تشاركنا الاهتمام بصحة موظفيها وجودة تجربتهم.",
    items: [
      { id: "nooran-bank", name: "مصرف النوران", monogram: "ن" },
      { id: "noc", name: "المؤسسة الوطنية للنفط", monogram: "NOC" },
      { id: "altafani", name: "شركة التفاني", monogram: "ت" },
      { id: "qetaf", name: "قطاف", monogram: "ق" },
      { id: "connectHub", name: "Connect Hub", monogram: "CH" },
    ],
  },
  whyUs: {
    title: "لماذا تختلف TBD",
    description: "ست نقاط توضّح الفرق بين تأمين على الورق ورعاية تشعر بها فعلاً.",
    points: [
      {
        id: "cloud",
        title: "نظام متكامل",
        lead: "إدارة موحدة للتأمين",
        description:
          "منصة واحدة لإدارة الوثائق والموافقات والمطالبات ومتابعة الخدمات من البداية للنهاية.",
      },
      {
        id: "cost",
        title: "ضبط التكلفة",
        lead: "تحكم أفضل في الإنفاق",
        description:
          "تحليل الاستهلاك وإدارة التكاليف للحد من الهدر وتحقيق أفضل قيمة للتغطية.",
      },
      {
        id: "support",
        title: "دعم حقيقي",
        lead: "دعم متواصل 24/7",
        description: "فريق متخصص لمتابعة الاستفسارات والمساعدة في الوصول إلى الخدمات المناسبة.",
      },
      {
        id: "opinion",
        title: "رأي طبي ثانٍ",
        lead: "قرار طبي أكثر اطمئنانًا",
        description:
          "إتاحة مراجعة التشخيص والحالات الطبية مع أطباء متخصصين قبل القرارات العلاجية المهمة.",
      },
      {
        id: "privacy",
        title: "خصوصية وأمان",
        lead: "بياناتك محمية دائمًا",
        description:
          "حماية البيانات الصحية وصلاحيات وصول دقيقة وفق أعلى معايير الخصوصية والأمان.",
      },
      {
        id: "experience",
        title: "تجربة عضو سلسة",
        lead: "خدمات أسهل وأسرع",
        description:
          "وصول واضح للخدمات والموافقات والمعلومات التأمينية مع تجربة رقمية بسيطة.",
      },
    ],
  },
  services: {
    title: "الخدمات",
    description:
      "إدارة الطرف الثالث، والرأي الطبي الآخر، وضبط التكلفة. افتح الخدمة لقراءة التفاصيل.",
    items: [
      {
        slug: "tpa-services",
        title: "خدمات إدارة الطرف الثالث",
        summary:
          "ندير برنامج التأمين الصحي نيابةً عن شركات التأمين والمجموعات ذات التمويل الذاتي: موافقات ومطالبات أسرع، ومعلومات المنافع ظاهرة للعضو وصاحب العمل والمزود في اللحظة نفسها، مع فريق متعدد اللغات على مدار الساعة.",
        description:
          "تقدّم TBD Care إدارة الطرف الثالث لشركات التأمين والمجموعات ذات التمويل الذاتي، بفريق يتعامل مع المسائل بأسلوب عمل متقدم.",
        stepsTitle: "ما تشمله الخدمة",
        stepsDescription: "مزايا منشورة لخدمة إدارة الطرف الثالث لدى TBD.",
        steps: [
          {
            id: "software",
            title: "معلومات المنافع فورًا",
            description:
              "برمجيات سحابية تجعل معلومات المنافع متاحة للأعضاء وأصحاب العمل والمزودين في الوقت الفعلي.",
          },
          {
            id: "claims",
            title: "الموافقات والمطالبات",
            description: "موافقات ومعالجة مطالبات سريعة، يديرها متخصصون في المجال.",
          },
          {
            id: "plans",
            title: "تصميم خطط المنافع",
            description:
              "مساعدة العملاء على بناء خطط منافع صحية تناسب احتياجاتهم محليًا أو دوليًا.",
          },
          {
            id: "team",
            title: "فريق متعدد اللغات على مدار الساعة",
            description: "فريق مطالبات متعدد اللغات متاح طوال اليوم للعملاء والأعضاء.",
          },
          {
            id: "tailor",
            title: "خدمة تُفصَّل لكل عميل",
            description:
              "تُشكَّل الخدمة حسب كل عميل، مع دعم الأعضاء في الحصول على الرعاية الطبية حول العالم.",
          },
        ],
      },
      {
        slug: "second-opinion",
        title: "الرأي الطبي الآخر",
        summary:
          "قبل أن تمضي في علاج كبير، يراجع طبيب من التخصص نفسه التشخيص وخطة العلاج معك. الخدمة متاحة لأعضاء TBD دون تكلفة إضافية، حتى يكون القرار أوضح قبل الخطوة التالية.",
        description:
          "يمكن للأعضاء طلب رأي طبي آخر دون تكلفة إضافية. يقدّم الفريق الطبي مراجعة للتشخيص من خبير في المجال نفسه.",
        stepsTitle: "كيف تُوصف الخدمة",
        stepsDescription: "ما تنشره TBD عن الرأي الطبي الآخر.",
        steps: [
          {
            id: "access",
            title: "متاح للأعضاء",
            description: "تُقدَّم الخدمة لأعضاء TBD ضمن وصولهم إلى الرعاية.",
          },
          {
            id: "review",
            title: "مراجعة في التخصص نفسه",
            description: "يراجع خبير طبي في المجال نفسه التشخيص.",
          },
          {
            id: "cost",
            title: "دون تكلفة إضافية",
            description: "تذكر TBD أن هذا الرأي يُقدَّم دون إضافة تكلفة.",
          },
        ],
      },
      {
        slug: "cost-containment",
        title: "ضبط التكلفة",
        summary:
          "نراجع مسار العلاج والتكلفة معًا. إذا بدا الإجراء زائدًا أو غير مناسب نوقفه مبكرًا، فنحمي المريض من ضرر لا داعي له، ونحمي الجهة الدافعة من فاتورة كان يمكن تجنّبها.",
        description:
          "قد يضر العلاج الزائد أو غير المناسب المريض، ويصبح مكلفًا للأفراد وأصحاب العمل. ضبط التكلفة هو موقف TBD من هذه الممارسات.",
        stepsTitle: "الموقف المنشور",
        stepsDescription: "كيف تصف TBD ضبط التكلفة في موقعها.",
        steps: [
          {
            id: "risk",
            title: "حماية المريض",
            description: "العلاج غير المناسب قد يكون ضارًا، وليس مكلفًا فقط.",
          },
          {
            id: "cost",
            title: "حماية الجهة الدافعة",
            description: "الممارسات نفسها ترفع التكلفة على الأفراد وأصحاب العمل.",
          },
          {
            id: "role",
            title: "دور TBD",
            description: "تضع TBD فريقها في مواجهة هذه الممارسات.",
          },
        ],
      },
    ],
  },
  providers: {
    previewTitle: "ابحث عن مزود قريب منك",
    previewDescription:
      "شبكة واسعة من المستشفيات والعيادات والأطباء والصيدليات الموثوقة، محليًا ودوليًا. الأسماء أدناه هيكل تجريبي إلى أن يُربط الدليل الحي.",
    previewAction: "عرض الشبكة",
    directoryTitle: "الشبكة الطبية TBD",
    directoryDescription:
      "اكتشف مزودي الرعاية ضمن شبكة TBD Care، واختر التصنيف المناسب ثم ابحث بالاسم أو المدينة.",
    searchLabel: "بحث",
    searchPlaceholder: "ابحث بالاسم أو العنوان",
    cityLabel: "المدينة",
    allCities: "كل المدن",
    viewOnMap: "عرض على الخريطة",
    hideMap: "إخفاء الخريطة",
    back: "كل الفئات",
    empty: "لا توجد نتائج مطابقة.",
    openInGoogleMaps: "فتح في خرائط جوجل",
    countSuffix: "مزود",
    previous: "السابق",
    next: "التالي",
    pageOf: "من",
    list: [
      {
        id: "hospitals",
        slug: "hospitals",
        name: "مستشفيات",
        specialty: "رعاية داخلية وتخصصية",
        city: "محلي ودولي",
      },
      {
        id: "clinics",
        slug: "clinics",
        name: "عيادات",
        specialty: "رعاية خارجية",
        city: "محلي ودولي",
      },
      {
        id: "doctors",
        slug: "doctors",
        name: "أطباء",
        specialty: "تخصصات طبية",
        city: "محلي ودولي",
      },
      {
        id: "pharmacies",
        slug: "pharmacies",
        name: "صيدليات",
        specialty: "صرف الأدوية",
        city: "محلي ودولي",
      },
    ],
  },
  app: {
    title: "تأمينك كاملاً في جيبك",
    description:
      "تطبيق TBD Care يضع كل ما تحتاجه بين يديك: قدّم مطالباتك، اعرض بطاقتك، وابحث عن أقرب مقدم خدمة في ثوانٍ.",
    promo: {
      title: "تأمينك الصحي في جيبك",
      descriptionBefore: "بطاقتك ومطالباتك وشبكتك الطبية — ",
      descriptionHighlight: "في ثوانٍ",
      descriptionAfter: "، من تطبيق واحد متاح على مدار الساعة.",
      ratingValue: "4.9",
      ratingLabel: "· أكثر من 10,000 تقييم على المتجرين",
    },
    storeLinks: {
      appStore: {
        eyebrow: "حمّل من",
        title: "App Store",
        href: "https://apps.apple.com/us/app/tbd-care-app/id6451255176",
      },
      playStore: {
        eyebrow: "متاح على",
        title: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.tbdcare&pcampaignid=web_share",
      },
    },
    features: [
      {
        id: "membership",
        title: "العضوية",
        shortLabel: "العضوية",
        subtitle: "بطاقتك الرقمية معك دائماً",
        description: "اعرض بطاقة العضوية والتغطية فوراً من التطبيق في أي وقت.",
      },
      {
        id: "claims",
        title: "المطالبات",
        shortLabel: "المطالبات",
        subtitle: "تتبع حالة كل مطالبة",
        description:
          "ارفع الفواتير والتقارير من التطبيق أو البوابة، وتابع حالة كل مطالبة خطوة بخطوة.",
      },
      {
        id: "network",
        title: "الشبكة الطبية",
        shortLabel: "الشبكة",
        subtitle: "مزودون قريبون منك",
        description:
          "ابحث عن مستشفى أو عيادة أو صيدلية قريبة منك ضمن شبكة TBD الموثوقة.",
      },
      {
        id: "second-opinion",
        title: "الرأي الطبي الآخر",
        shortLabel: "رأي ثانٍ",
        subtitle: "مراجعة من خبير التخصص",
        description:
          "اطلب مراجعة تشخيصك من خبير في نفس التخصص — بدون تكلفة إضافية للعضو.",
      },
    ],
    phoneScreens: {
      membership: {
        greeting: "مرحباً، سارة العتيبي",
        screenTitle: "بطاقة العضوية",
        brand: "TBD Care",
        tier: "الفئة الذهبية",
        memberName: "سارة العتيبي",
        memberId: "TBD-204-8812",
        validUntil: "صالحة حتى 12/2027",
        dependentsLabel: "المُعالون",
        dependents: "3 أفراد",
        copayLabel: "نسبة التحمل",
        copay: "10%",
      },
      claims: {
        screenTitle: "المطالبات الأخيرة",
        newClaim: "مطالبة جديدة",
        items: [
          {
            id: "c1",
            provider: "مستشفى طرابلس",
            amount: "1,240 د.ل",
            status: "قيد المراجعة",
            tone: "warning",
          },
          {
            id: "c2",
            provider: "عيادة الأسنان",
            amount: "380 د.ل",
            status: "مُوافق عليها",
            tone: "success",
          },
        ],
      },
      network: {
        screenTitle: "الشبكة الطبية",
        searchPlaceholder: "ابحث عن مستشفى أو عيادة",
        items: [
          {
            id: "p1",
            name: "مستشفى طرابلس",
            type: "مستشفى",
            distance: "2.4 كم",
          },
          {
            id: "p2",
            name: "عيادة القلب",
            type: "عيادة متخصصة",
            distance: "5.1 كم",
          },
          {
            id: "p3",
            name: "صيدلية النور",
            type: "صيدلية",
            distance: "0.8 كم",
          },
        ],
      },
      secondOpinion: {
        screenTitle: "الرأي الطبي الآخر",
        noExtraCost: "بدون تكلفة إضافية",
        caseTitle: "طلب مراجعة تشخيص",
        specialtyLabel: "التخصص",
        specialty: "أمراض القلب",
        statusLabel: "الحالة",
        status: "قيد المراجعة",
        stepLabel: "الخطوة الحالية",
        step: "مراجعة خبير التخصص",
        progressLabel: "تقدم الطلب",
      },
    },
  },
  faq: {
    title: "الأسئلة الشائعة",
    description:
      "",
    items: [
      {
        id: "what",
        question: "ما هي TBD Care؟",
        answer:
          "تصف TBD Care نفسها بأنها رفيق صحي. تقدّم إدارة الطرف الثالث وتساعد الأسر والأفراد وأصحاب العمل على استخدام نظام الرعاية الصحية.",
      },
      {
        id: "opinion",
        question: "هل الرأي الطبي الآخر مشمول؟",
        answer:
          "نعم. يمكن للأعضاء طلب رأي طبي آخر دون تكلفة إضافية. يراجع خبير في التخصص نفسه التشخيص.",
      },
      {
        id: "support",
        question: "كيف أتواصل مع خدمة العملاء؟",
        answer:
          "اتصال مجاني 0800 150 150 على مدار الساعة، أو البريد client.services@tbdcare.com. العنوان المنشور: طريق الشط، سوق الجمعة، طرابلس، ليبيا.",
      },
      {
        id: "network",
        question: "ماذا تضم الشبكة الطبية؟",
        answer: "مستشفيات وعيادات وأطباء وصيدليات موثوقة، محليًا ودوليًا.",
      },
      {
        id: "app",
        question: "ماذا يفعل العضو في التطبيق؟",
        answer: "إرسال المطالبات وعرض بيانات الوثيقة في أي وقت ومن أي مكان.",
      },
    ],
  },
  joinUs: {
    title: "تواصل معنا",
    description: "فريق خدمة العملاء جاهز للرد على استفساراتكم ومساعدتكم في أي وقت، نحن هنا لخدمتكم دائماً.",
    visualAlt: "ثلاثة متخصصين طبيين يقفون خلف قسم TBD Care ويظهرون من خلال الحاوية الزرقاء",
    eyebrow: "خدمة مستمرة",
    submitLabel: "إرسال الرسالة",
    resetLabel: "تعديل البيانات",
    success: "بقيت الرسالة في هذه الصفحة. لم تصل إلى TBD بعد.",
    successLabel: "تم الإرسال",
    fields: {
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      message: "اكتب رسالتك هنا ...",
    },
    providerTitle: "انضم كمزود",
    providerDescription:
      "يمكن للمستشفيات والعيادات والأطباء والصيدليات الانضمام إلى الشبكة. يرسل المزودون المطالبات والموافقات المسبقة عبر TBD E-Health.",
    providerAction: "طلب مزود",
    companyTitle: "انضم كشركة",
    companyDescription:
      "يمكن لشركات التأمين والمجموعات ذات التمويل الذاتي استخدام إدارة الطرف الثالث من TBD، محليًا أو دوليًا.",
    companyAction: "طلب شركة",
  },
  joinProvider: {
    title: "انضم إلى الشبكة",
    description:
      "نموذج لمزود يريد الانضمام إلى الشبكة الطبية لدى TBD. يبقى الإرسال داخل هذه الصفحة إلى أن تُربط المعالجة.",
    submitLabel: "إرسال الطلب",
    resetLabel: "تعديل البيانات",
    success: "بقيت البيانات في هذه الصفحة. لم يصل الطلب إلى TBD.",
    fields: {
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      specialty: "التخصص",
      message: "نبذة عن المنشأة",
    },
  },
  joinCompany: {
    title: "استفسار إدارة الطرف الثالث",
    description:
      "نموذج لشركات التأمين والمجموعات ذات التمويل الذاتي. يبقى الإرسال داخل هذه الصفحة إلى أن تُربط المعالجة.",
    submitLabel: "إرسال الطلب",
    resetLabel: "تعديل البيانات",
    success: "بقيت البيانات في هذه الصفحة. لم يصل الطلب إلى TBD.",
    fields: {
      companyName: "اسم الشركة",
      email: "البريد الإلكتروني",
      contactName: "اسم المسؤول",
      message: "نبذة عن الشركة",
    },
  },
  footerContact: {
    title: "تواصل معنا",
    phone: "0800 150 150",
    phoneHref: "tel:0800150150",
    email: "client.services@tbdcare.com",
    emailHref: "mailto:client.services@tbdcare.com",
    address: "طرابلس طريق الشط - سيمافرو الفتح",
    socialLabel: "تابعنا",
    social: [
      { id: "facebook", label: "Facebook", href: "#" },
      { id: "instagram", label: "Instagram", href: "#" },
      { id: "linkedin", label: "LinkedIn", href: "#" },
      { id: "x", label: "X", href: "#" },
    ],
  },
};

export default dictionary;
