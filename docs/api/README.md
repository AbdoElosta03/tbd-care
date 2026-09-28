# TBD Care API

JSON، UTF-8، `Content-Type: application/json`. النص ثنائي اللغة: `{ "ar": "...", "en": "..." }`. الصفحات من `1`.

**English:** [README.en.md](./README.en.md)

**نقطتان فقط:** `POST /api/contact` · `GET /api/network`

---

## خطأ عام (كل الـ APIs)

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": { "city": "Unknown city" },
    "requestId": "req_01JABC"
  }
}
```

| HTTP | `code` |
| --- | --- |
| 400 | `BAD_REQUEST` |
| 404 | `NOT_FOUND` |
| 405 | `METHOD_NOT_ALLOWED` |
| 415 | `UNSUPPORTED_MEDIA_TYPE` |
| 422 | `VALIDATION_ERROR` |
| 429 | `RATE_LIMITED` (+ `Retry-After`) |
| 500 | `INTERNAL_ERROR` |
| 503 | `SERVICE_UNAVAILABLE` |

بحث/فلتر فارغ → **200** و`data: []` وليس خطأ.

---

## `POST /api/contact`

**Body**

```json
{
  "fullName": "Ahmad Ali",
  "email": "ahmad@example.com",
  "phone": "+218911112233",
  "message": "نص الرسالة",
  "locale": "ar"
}
```

| حقل | مطلوب | قاعدة |
| --- | --- | --- |
| `fullName` | نعم | 2–120 بعد trim |
| `email` | نعم | بريد صالح، ≤254 |
| `phone` | نعم | 8–20: أرقام، مسافة، `+`، `-` |
| `message` | نعم | 10–2000 |
| `locale` | لا | `ar` \| `en` (افتراضي `ar`) |

**201**

```json
{
  "data": {
    "id": "msg_123",
    "receivedAt": "2026-09-28T10:00:00Z"
  }
}
```

حدّ المعدّل: 5 طلبات / IP / 60 ثانية → `429`.

---

## `GET /api/network`

قائمة مزوّدي الخدمة + **مدن** + **أعداد** حسب النوع (ضمن `meta`)، مع ترقيم صفحات وفلترة.

**Query**

| param | مطلوب | وصف |
| --- | --- | --- |
| `city` | لا | `id` مدينة (slug). بدونها = كل المدن |
| `search` | لا | بحث غير حسّاس لحالة الأحرف في الاسم والعنوان (`ar`/`en`)، ≤100 حرف |
| `page` | لا | ≥1، افتراضي `1` |
| `pageSize` | لا | 1–50، افتراضي `20` |

**200**

```json
{
  "data": [
    {
      "id": "tripoli-central-hospital",
      "category": "hospitals",
      "cityId": "tripoli",
      "name": { "ar": "مستشفى طرابلس المركزي", "en": "Tripoli Central Hospital" },
      "address": { "ar": "طريق الشط، طرابلس", "en": "Al Shatt Road, Tripoli" },
      "lat": 32.8872,
      "lng": 13.1913
    }
  ],
  "meta": {
    "cities": [
      { "id": "tripoli", "name": { "ar": "طرابلس", "en": "Tripoli" } },
      { "id": "benghazi", "name": { "ar": "بنغازي", "en": "Benghazi" } }
    ],
    "counts": {
      "hospitals": 12,
      "clinics": 45,
      "pharmacies": 30,
      "other": 5
    },
    "page": 1,
    "pageSize": 20,
    "total": 92,
    "pageCount": 5
  }
}
```

**قواعد**

- `meta.cities`: كل المدن المتاحة (للقوائم في الواجهة).
- `meta.counts`: أعداد المزوّدين لكل نوع **بنفس** `city` و`search` في الطلب (بدون ترقيم الصفحات).
- `category`: `hospitals` \| `clinics` \| `pharmacies` \| `other`.
- `meta.pageCount` = `ceil(total / pageSize)` أو `0` إذا `total === 0`.
- `page` بعد آخر صفحة مع وجود نتائج → **200** بآخر صفحة.

**أخطاء شائعة**

| HTTP | `code` | سبب |
| --- | --- | --- |
| 422 | `VALIDATION_ERROR` | `city` غير معروف، `page`/`pageSize` خارج النطاق، `search` > 100 |
| 500 | `INTERNAL_ERROR` | فشل قراءة البيانات |
| 503 | `SERVICE_UNAVAILABLE` | مصدر الشبكة غير متاح |

---

## ملخص للمطور

```json
// POST /api/contact  → 201
{ "data": { "id": "string", "receivedAt": "ISO-8601" } }

// GET /api/network?city=&search=&page=&pageSize=  → 200
{
  "data": [ { "id", "category", "cityId", "name", "address", "lat", "lng" } ],
  "meta": {
    "cities": [ { "id", "name" } ],
    "counts": { "hospitals", "clinics", "pharmacies", "other" },
    "page", "pageSize", "total", "pageCount"
  }
}

// أي فشل
{ "error": { "code", "message", "requestId", "details?" } }
```
