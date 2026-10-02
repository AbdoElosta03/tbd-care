import { NextResponse, type NextRequest } from "next/server";
import { fetchNetworkFromBackend } from "@/lib/api/backend";
import type { NetworkFacility, NetworkResponse } from "@/lib/api";

export const dynamic = "force-dynamic";

// The external API returns these values but cannot filter by them directly.
const categories: NetworkFacility["category"][] = ["hospitals", "clinics", "pharmacies", "other"];

// Preserve the upstream status and JSON body when no local transformation is needed.
function responseFromBackend(response: Response, body: string) {
  return new NextResponse(body, {
    status: response.status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": response.headers.get("content-type") ?? "application/json; charset=utf-8",
    },
  });
}

// Use safe defaults when the browser omits or sends an invalid pagination value.
function positiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category");

    // Forward standard city, search, and pagination queries without changing them.
    if (!category || !categories.includes(category as NetworkFacility["category"])) {
      const response = await fetchNetworkFromBackend(request.nextUrl.searchParams);
      return responseFromBackend(response, await response.text());
    }

    const page = positiveInteger(request.nextUrl.searchParams.get("page"), 1);
    const pageSize = Math.min(50, positiveInteger(request.nextUrl.searchParams.get("pageSize"), 20));
    const upstreamParams = new URLSearchParams(request.nextUrl.searchParams);
    upstreamParams.delete("category");
    upstreamParams.set("page", "1");
    upstreamParams.set("pageSize", "50");

    // Load every matching upstream page so category filtering stays correct across pagination.
    const firstResponse = await fetchNetworkFromBackend(upstreamParams);
    const firstBody = await firstResponse.text();

    if (!firstResponse.ok) {
      return responseFromBackend(firstResponse, firstBody);
    }

    const firstPage = JSON.parse(firstBody) as NetworkResponse;
    const remainingPages = Array.from({ length: Math.max(0, firstPage.meta.pageCount - 1) }, (_, index) => index + 2);
    const remainingRecords = await Promise.all(
      remainingPages.map(async (nextPage) => {
        const params = new URLSearchParams(upstreamParams);
        params.set("page", String(nextPage));
        const response = await fetchNetworkFromBackend(params);

        if (!response.ok) {
          throw new Error("Unable to load the complete provider network.");
        }

        return (await response.json() as NetworkResponse).data;
      }),
    );
    const records = [firstPage.data, ...remainingRecords]
      .flat()
      .filter((facility) => facility.category === category);
    const pageCount = records.length === 0 ? 0 : Math.ceil(records.length / pageSize);
    const currentPage = pageCount === 0 ? 1 : Math.min(page, pageCount);
    const start = (currentPage - 1) * pageSize;

    // Return the requested slice with metadata that reflects the selected category.
    return NextResponse.json({
      data: records.slice(start, start + pageSize),
      meta: {
        ...firstPage.meta,
        page: currentPage,
        pageSize,
        total: records.length,
        pageCount,
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "SERVICE_UNAVAILABLE",
          message: "Provider network is temporarily unavailable.",
        },
      },
      { status: 503 },
    );
  }
}
