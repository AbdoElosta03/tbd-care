# TBD Care API

JSON, UTF-8, `Content-Type: application/json`. Bilingual fields: `{ "ar": "...", "en": "..." }`. Pages start at `1`.

**Arabic:** [README.md](./README.md)

**Two endpoints only:** `POST /api/contact` · `GET /api/network`

---

## Shared error shape

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
| 429 | `RATE_LIMITED` (include `Retry-After`) |
| 500 | `INTERNAL_ERROR` |
| 503 | `SERVICE_UNAVAILABLE` |

Empty search or filter → **200** with `data: []`, not an error.

---

## `POST /api/contact`

**Body**

```json
{
  "fullName": "Ahmad Ali",
  "email": "ahmad@example.com",
  "phone": "+218911112233",
  "message": "Message text",
  "locale": "ar"
}
```

| Field | Required | Rule |
| --- | --- | --- |
| `fullName` | yes | 2–120 chars after trim |
| `email` | yes | Valid email, max 254 |
| `phone` | yes | 8–20: digits, space, `+`, `-` |
| `message` | yes | 10–2000 |
| `locale` | no | `ar` or `en`, default `ar` |

**201**

```json
{
  "data": {
    "id": "msg_123",
    "receivedAt": "2026-09-28T10:00:00Z"
  }
}
```

Rate limit: 5 requests per IP per 60 seconds → `429`.

---

## `GET /api/network`

Provider list plus **cities** and per-type **counts** in `meta`, with pagination and filters.

**Query**

| Param | Required | Description |
| --- | --- | --- |
| `city` | no | City id (slug). Omit for all cities |
| `search` | no | Case-insensitive match on name and address (`ar`/`en`), max 100 chars |
| `page` | no | Integer ≥ 1, default `1` |
| `pageSize` | no | Integer 1–50, default `20` |

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

**Rules**

- `meta.cities`: all cities (for UI dropdowns).
- `meta.counts`: provider totals per type for the same `city` and `search` as the request (not paginated).
- `category`: `hospitals` | `clinics` | `pharmacies` | `other`.
- `meta.pageCount` = `ceil(total / pageSize)`, or `0` when `total === 0`.
- `page` beyond the last page while results exist → **200** with the last page.

**Common errors**

| HTTP | `code` | Cause |
| --- | --- | --- |
| 422 | `VALIDATION_ERROR` | Unknown `city`, invalid `page`/`pageSize`, or `search` longer than 100 |
| 500 | `INTERNAL_ERROR` | Data read failure |
| 503 | `SERVICE_UNAVAILABLE` | Network directory unavailable |

---

## Developer cheat sheet

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

// Any failure
{ "error": { "code", "message", "requestId", "details?" } }
```
