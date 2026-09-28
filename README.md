# TBD Care

موقع تعريفي ثنائي اللغة لشركة TBD Care. يعرض الخدمات، شبكة المزودين،
تطبيق الهاتف، ونماذج التواصل والانضمام. المشروع مبني بـ Next.js App Router
ويستخدم مكونات خادم افتراضيًا مع مكونات عميل للتفاعل والحركة.

## الحالة الحالية

- اللغتان العربية والإنجليزية متاحتان، والعربية هي الافتراضية.
- اللغة محفوظة في cookie باسم `locale` من دون تغيير عنوان الصفحة.
- بيانات دليل المزودين محلية وتجريبية حتى ربط واجهة API.
- نماذج التواصل والانضمام تعرض نجاحًا محليًا ولا ترسل البيانات إلى خادم بعد.
- عقد الـ API المقترح موثق في `docs/api/README.md` ([English](./docs/api/README.en.md))، ولا توجد Route Handlers حاليًا.

## التقنيات

- Next.js 16.3.6 (App Router)
- React 19.2.8 وTypeScript 5
- Tailwind CSS 4 وCSS مخصص
- GSAP وScrollTrigger وLenis لحركة الصفحة الرئيسية
- Motion لزر حالة الإرسال
- Lucide React للأيقونات

## التشغيل

```bash
npm install
npm run dev
```

افتح `http://localhost:3000`.

للتجربة من جهاز آخر على الشبكة:

```bash
npm run dev -- --hostname 0.0.0.0
```

استخدم عنوان IP المحلي للجهاز. إعداد `allowedDevOrigins` موجود في
`next.config.ts` لاختبار الشبكة المحلية.

## أوامر الجودة والبناء

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

لا توجد حزمة اختبارات أو CI في الوقت الحالي.

## المسارات

- `/` — الصفحة الرئيسية.
- `/providers` — دليل المستشفيات والعيادات والصيدليات مع البحث والخريطة.
- `/services/tpa-services` — خدمات إدارة الطرف الثالث.
- `/services/second-opinion` — الرأي الطبي الآخر.
- `/services/cost-containment` — ضبط التكلفة.
- `/join-provider` — نموذج انضمام مزود.
- `/join-company` — نموذج تواصل الشركات.

أقسام الصفحة الرئيسية بالترتيب:
`Hero` ← `#why-us` ← `#services` ← شبكة المزودين ← `#app` ←
`#join-us` ← `#faq`.

## تدفق التطبيق

1. يقرأ `src/app/layout.tsx` اللغة من cookie عن طريق
   `src/i18n/get-dictionary.ts`.
2. تُحمّل نسخة النص المناسبة من `src/i18n/dictionaries`.
3. تُبنى الصفحة على الخادم، ثم تعمل مكونات العميل عند الحاجة.
4. يشغّل `StoryScrollEngine` حركة الصفحة الرئيسية ويضيف `story-gsap` إلى
   عنصر `html`.
5. عند تفعيل تقليل الحركة، يبقى المحتوى ظاهرًا من دون حركة تمرير.

## هيكل المصدر

```text
src/
├── app/                    # Routes, layout, locale action, globals
├── components/
│   ├── layout/             # Header, footer, nav, language switcher
│   ├── home/               # Homepage sections and GSAP mount
│   ├── features/           # Alternating service showcase
│   ├── providers/          # Directory server + client browser
│   ├── services/           # Service detail body
│   ├── join/               # Shared contact/join form
│   ├── ui/                 # Button and inner-page heading
│   └── animata/            # CTA arrow and submit status button
├── data/                   # Sample medical network
├── design/                 # Tokens and homepage/shell CSS
├── i18n/                   # Locale config, dictionaries, types
├── lib/                    # Paths, class merge, GSAP initializers
└── types/                  # Provider preview type for dictionaries
```

## دليل الملفات

### ملفات الجذر

- `.gitignore` — يستبعد الاعتماديات ومخرجات Next.js والبيئة والتغطية.
- `AGENTS.md` — تعليمات Next.js الخاصة بوكلاء البرمجة.
- `CLAUDE.md` — يحيل إلى تعليمات `AGENTS.md`.
- `README.md` — دليل المشروع الحالي.
- `SITE-LAYOUT.md` — وصف مرئي مختصر للصفحات وترتيب الأقسام.
- `components.json` — إعداد shadcn وتعاريف المسارات والتنسيق.
- `eslint.config.mjs` — قواعد ESLint الخاصة بـ Next.js وTypeScript.
- `next.config.ts` — إعداد Next.js ونطاقات التطوير المحلية.
- `package.json` — السكربتات والاعتماديات المباشرة.
- `package-lock.json` — قفل نسخ الاعتماديات.
- `postcss.config.mjs` — تشغيل Tailwind CSS عبر PostCSS.
- `tsconfig.json` — إعداد TypeScript والاسم المختصر `@/*`.

### `src/app` — المسارات والغلاف

- `layout.tsx` — metadata والخطوط واللغة والاتجاه والهيدر والفوتر.
- `page.tsx` — ترتيب أقسام الصفحة الرئيسية.
- `globals.css` — استيراد Tailwind وملفات التصميم والقواعد العامة.
- `favicon.ico` — أيقونة المتصفح.
- `actions/set-locale.ts` — Server Action لتحديث cookie اللغة.
- `providers/page.tsx` — صفحة دليل الشبكة.
- `join-provider/page.tsx` — صفحة نموذج المزود.
- `join-company/page.tsx` — صفحة نموذج الشركة.
- `services/[slug]/page.tsx` — صفحة خدمة ديناميكية مع التحقق من slug.

### `src/components/layout` — الغلاف والتنقل

- `container.tsx` — يحدد العرض الأفقي الموحد للمحتوى.
- `section.tsx` — غلاف الأقسام الداخلية ومسافاتها.
- `site-header.tsx` — الهيدر العائم وقائمة الجوال والشعار.
- `site-nav.tsx` — يرسم قوائم روابط الهيدر والفوتر.
- `language-switcher.tsx` — يبدّل العربية والإنجليزية ويحدّث الصفحة.
- `site-footer.tsx` — الفوتر وروابط التواصل والشبكات الاجتماعية.
- `tbd-care-logo.tsx` — نسخة SVG من الشعار مستخدمة في الفوتر.

### `src/components/home` — أقسام الرئيسية

- `hero-section.tsx` — العنوان الرئيسي والأزرار وصورة الطبيب.
- `why-us-section.tsx` — نقاط تميّز TBD المتتابعة.
- `services-section.tsx` — يحول الخدمات إلى عرض صور ونصوص متعاقب.
- `providers-preview-section.tsx` — معاينة فئات الشبكة ومسارها المرئي.
- `app-section.tsx` — مزايا التطبيق وروابط المتاجر.
- `phone-screens.tsx` — تركيب صور شاشات التطبيق الثلاث.
- `join-us-section.tsx` — بانر التواصل والصورة الجماعية.
- `faq-section.tsx` — غلاف قسم الأسئلة الشائعة.
- `faq-accordion.tsx` — تفاعل فتح وإغلاق الأسئلة.
- `story-heading.tsx` — عنوان موحد لأقسام القصة.
- `story-scroll-engine.tsx` — يربط دورة حياة React بمحرك GSAP.

### المكونات الوظيفية والمشتركة

- `components/features/alternating-feature-showcase.tsx` — عرض متعاقب للخدمات والخطوات.
- `components/features/feature-icon-map.tsx` — يربط مفاتيح الخدمات بالأيقونات.
- `components/features/feature-visual-placeholder.tsx` — رسم بديل عندما لا توجد صورة.
- `components/providers/provider-directory.tsx` — يهيئ بيانات الدليل حسب اللغة.
- `components/providers/provider-browser.tsx` — البحث والتصفية والصفحات والخريطة.
- `components/services/service-detail.tsx` — محتوى صفحة تفاصيل الخدمة.
- `components/join/join-form.tsx` — النموذج المشترك بنسختيه الكاملة والمختصرة.
- `components/ui/button.tsx` — أنماط الأزرار والروابط.
- `components/ui/section-heading.tsx` — عنوان الصفحات الداخلية.
- `components/animata/button/slide-arrow-link.tsx` — رابط CTA بسهم متحرك.
- `components/animata/button/status-button.tsx` — زر إرسال بحالات idle/loading/success.

### البيانات والترجمة والأنواع

- `src/data/network-facilities.ts` — مدن ومنشآت الشبكة التجريبية وإحداثياتها.
- `src/i18n/config.ts` — اللغات المدعومة واللغة الافتراضية.
- `src/i18n/get-dictionary.ts` — قراءة اللغة وتحميل القاموس على الخادم.
- `src/i18n/types.ts` — أنواع جميع نصوص الواجهة.
- `src/i18n/dictionaries/ar.ts` — النص العربي.
- `src/i18n/dictionaries/en.ts` — النص الإنجليزي.
- `src/types/provider.ts` — نوع عناصر معاينة المزودين المستخدم في القواميس.

### التصميم والحركة والمساعدات

- `src/design/tokens.css` — ألوان العلامة والمسافات والأشكال والظلال.
- `src/design/story.css` — تنسيقات الصفحة الرئيسية والهيدر والفوتر وحالات الحركة.
- `src/lib/utils.ts` — دمج أسماء Tailwind بواسطة `clsx` و`tailwind-merge`.
- `src/lib/cn.ts` — إعادة تصدير `cn` لتوحيد مسارات الاستيراد القديمة.
- `src/lib/paths.ts` — المسارات والـ anchors وربط مفاتيح التنقل.
- `src/lib/feature-showcase/feature-bullets.ts` — يحول النص إلى نقاط قصيرة.
- `src/lib/feature-showcase/init-feature-showcase.ts` — حركة عرض الخدمات.
- `src/lib/home-story/init-home-story.ts` — تهيئة Lenis وGSAP وأقسام الرئيسية.
- `src/lib/home-story/init-app-download.ts` — حركة قسم التطبيق.
- `src/lib/home-story/init-network-preview.ts` — حركة شبكة المزودين.

### الصور والتوثيق والأدوات

- `public/image/TBD-Care-Logo.webp` — شعار الهيدر المحسن.
- `public/image/doctor-image.webp` — صورة Hero.
- `public/image/doctors-image.webp` — صورة قسم التواصل.
- `public/image/feature1-image.webp` إلى `feature3-image.webp` — صور الخدمات.
- `public/image/TBD-APP-IMAGE.webp` ونسختا `-2` و`-3` — شاشات التطبيق.
- `docs/api/README.md` و`docs/api/README.en.md` — عقد API مستقبلي للشبكة ونموذج التواصل.
- `docs/PROJECT-REVIEW.md` — نتائج المراجعة والإصلاحات والمخاطر المتبقية.
- `scripts/cutout-doctors.py` — أداة يدوية لإزالة الخلفية الخضراء من صورة الفريق.

## تعديل المحتوى

- عدّل النصوص في القاموسين مع المحافظة على تطابق البنية مع
  `src/i18n/types.ts`.
- لإضافة خدمة، أضفها إلى `services.items` في القاموسين، ثم أضف صورتها عند
  الحاجة إلى `SERVICE_IMAGES` في `services-section.tsx`.
- عدّل روابط الهيدر والفوتر في القواميس وربطها في `src/lib/paths.ts`.
- الصور المستخدمة يجب أن تكون WebP بحجم قريب من أكبر حجم عرض فعلي، مع
  تحديد `sizes` في `next/image`.

## وثائق إضافية

- [تخطيط الصفحات](./SITE-LAYOUT.md)
- [عقد API المقترح](./docs/api/README.md) · [API contract (EN)](./docs/api/README.en.md)
- [تقرير المراجعة](./docs/PROJECT-REVIEW.md)
