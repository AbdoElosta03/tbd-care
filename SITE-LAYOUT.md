# تخطيط موقع TBD Care

هذا الملف يصف الهيكل الحالي كما يحدده الكود. اللغة الافتراضية هي العربية،
وجميع نصوص الواجهة موجودة في `src/i18n/dictionaries`.

## الغلاف المشترك

كل الصفحات تستخدم:

```text
الهيدر العائم
└── تبديل اللغة | التنقل | الشعار

المحتوى الخاص بالمسار

الفوتر
└── تعريف مختصر | روابط | تواصل | شبكات اجتماعية
```

على الشاشات الصغيرة يتحول تنقل الهيدر إلى قائمة قابلة للفتح.

## الصفحة الرئيسية `/`

ترتيب الأقسام الفعلي في `src/app/page.tsx`:

```text
Hero
├── عنوان ووصف
├── رابط الخدمات
├── رابط الشبكة
└── صورة الطبيب

Why TBD                         #why-us
└── ست نقاط تظهر بالتتابع أثناء التمرير

Services                        #services
└── ثلاث خدمات بصور ونصوص متعاقبة

Provider network preview
├── مستشفيات
├── عيادات
├── أطباء
├── صيدليات
└── رابط /providers

Mobile app                      #app
├── روابط App Store وGoogle Play
└── ثلاث شاشات للتطبيق

Contact banner                  #join-us
├── نموذج تواصل مختصر
└── صورة فريق الرعاية

FAQ                             #faq
└── Accordion للأسئلة الشائعة
```

لا يوجد قسم `#about` في الصفحة الحالية. الحركة يديرها
`StoryScrollEngine` مع GSAP وLenis، وتوجد معالجة لحالة تقليل الحركة.

## صفحات الخدمات

المسار الديناميكي: `/services/[slug]`.

```text
/services/tpa-services
/services/second-opinion
/services/cost-containment
```

كل صفحة تعرض عنوان الخدمة ووصفها وخطواتها في
`AlternatingFeatureShowcase`.

## دليل الشبكة `/providers`

```text
عنوان الدليل
└── اختيار الفئة
    ├── مستشفيات
    ├── عيادات
    └── صيدليات

نتائج الفئة
├── بحث بالاسم أو العنوان
├── فلترة حسب المدينة
├── صفحات نتائج
└── خريطة Google للمزود المحدد
```

البيانات الحالية تجريبية ومحلية في `src/data/network-facilities.ts`.

## نماذج الانضمام

- `/join-provider` — بيانات المزود والتخصص والمنشأة.
- `/join-company` — بيانات الشركة ومسؤول التواصل.

الإرسال حاليًا محلي فقط. الربط المستقبلي موضح في `docs/api/README.md`.

## خريطة المسارات

```text
/
├── #why-us
├── #services
├── #app
├── #join-us
├── #faq
├── /providers
├── /services/tpa-services
├── /services/second-opinion
├── /services/cost-containment
├── /join-provider
└── /join-company
```

## مصادر التعديل

- النصوص والترجمة: `src/i18n/dictionaries/ar.ts` و`en.ts`.
- ترتيب الرئيسية: `src/app/page.tsx`.
- تنسيق الأقسام: `src/design/story.css`.
- ألوان وهوية التصميم: `src/design/tokens.css`.
- روابط التنقل: `src/lib/paths.ts` والقواميس.
- بيانات الشبكة: `src/data/network-facilities.ts`.
