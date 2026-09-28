"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, ChevronLeft, ChevronRight, MapPin, Pill, Search, Stethoscope } from "lucide-react";
import type { NetworkCategoryId } from "@/data/network-facilities";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/cn";

/** Provider directory UI: category cards, local search/filter, pagination, and map embed. */

export type BrowserFacility = {
  id: string;
  category: NetworkCategoryId;
  cityId: string;
  city: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

export type BrowserCategory = {
  id: NetworkCategoryId;
  name: string;
  description: string;
};

type BrowserCopy = {
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
};

const PAGE_SIZE = 4;

const categoryIcons = {
  hospitals: Building2,
  clinics: Stethoscope,
  pharmacies: Pill,
} as const;

// Category accents stay distinct while shared text and surfaces use design tokens.
const categoryWash = {
  hospitals: "from-primary to-[#4aa4ef]",
  clinics: "from-[#1d4ed8] to-[#60a5fa]",
  pharmacies: "from-[#0f766e] to-[#2dd4bf]",
} as const;

function motionDelay(ms: number) {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return 0;
  }
  return ms;
}

function mapsEmbedUrl(lat: number, lng: number) {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
}

function mapsLink(lat: number, lng: number) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

function ResultSkeleton() {
  return (
    <ul className="mt-6 grid gap-3" aria-hidden="true">
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <li key={index} className="animate-pulse rounded-[1.25rem] bg-white px-5 py-4 shadow-[0_10px_30px_rgb(16_24_40/0.05)]">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-[#e7eef8]" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-3.5 w-40 max-w-[55%] rounded-full bg-[#e7eef8]" />
              <div className="h-3 w-56 max-w-[70%] rounded-full bg-[#f1f5fb]" />
            </div>
            <div className="hidden h-9 w-28 rounded-full bg-[#eef3fa] sm:block" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ProviderBrowser({
  categories,
  facilities,
  cities,
  copy,
}: {
  categories: BrowserCategory[];
  facilities: BrowserFacility[];
  cities: Array<{ id: string; name: string }>;
  copy: BrowserCopy;
}) {
  const [categoryId, setCategoryId] = useState<NetworkCategoryId | null>(null);
  const [phase, setPhase] = useState<"categories" | "leaving" | "loading" | "results">("categories");
  const [query, setQuery] = useState("");
  const [cityId, setCityId] = useState("all");
  const [mapId, setMapId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [listLoading, setListLoading] = useState(false);

  const category = categories.find((item) => item.id === categoryId) ?? null;

  // Keep transition phases explicit so reduced-motion users can skip delays.
  useEffect(() => {
    if (phase !== "leaving" && phase !== "loading") return;
    const next = phase === "leaving" ? "loading" : "results";
    const delay = motionDelay(phase === "leaving" ? 340 : 720);
    const timer = window.setTimeout(() => setPhase(next), delay);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const cityOptions = useMemo(() => {
    if (!categoryId) return cities;
    const used = new Set(
      facilities.filter((facility) => facility.category === categoryId).map((facility) => facility.cityId),
    );
    return cities.filter((city) => used.has(city.id));
  }, [categoryId, cities, facilities]);

  // Search and pagination run locally until the directory API is connected.
  const results = useMemo(() => {
    if (!categoryId) return [];
    const needle = query.trim().toLowerCase();
    return facilities.filter((facility) => {
      if (facility.category !== categoryId) return false;
      if (cityId !== "all" && facility.cityId !== cityId) return false;
      if (!needle) return true;
      return `${facility.name} ${facility.address} ${facility.city}`.toLowerCase().includes(needle);
    });
  }, [categoryId, cityId, facilities, query]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const mapped = results.find((facility) => facility.id === mapId) ?? null;

  function openCategory(id: NetworkCategoryId) {
    setCategoryId(id);
    setQuery("");
    setCityId("all");
    setMapId(null);
    setPage(1);
    setPhase("leaving");
  }

  function resetCategory() {
    setCategoryId(null);
    setQuery("");
    setCityId("all");
    setMapId(null);
    setPage(1);
    setListLoading(false);
    setPhase("categories");
  }

  function changePage(nextPage: number) {
    setMapId(null);
    setListLoading(true);
    window.setTimeout(() => {
      setPage(nextPage);
      setListLoading(false);
    }, motionDelay(420));
  }

  function showOnMap() {
    const next = pageItems[0] ?? results[0];
    if (!next) return;
    setMapId((current) => (current && results.some((facility) => facility.id === current) ? null : next.id));
  }

  if (phase === "categories" || phase === "leaving") {
    return (
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {categories.map((item) => {
          const Icon = categoryIcons[item.id];
          const count = facilities.filter((facility) => facility.category === item.id).length;
          const picked = phase === "leaving" && categoryId === item.id;
          const dimmed = phase === "leaving" && categoryId !== item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => openCategory(item.id)}
              disabled={phase === "leaving"}
              className={cn(
                "group relative flex min-h-64 flex-col overflow-hidden rounded-[1.75rem] bg-white p-6 text-start shadow-[0_18px_40px_rgb(8_114_214/0.08)] transition duration-300",
                "hover:-translate-y-1 hover:shadow-[0_24px_48px_rgb(8_114_214/0.16)]",
                picked && "z-10 scale-[1.04] shadow-[0_28px_60px_rgb(8_114_214/0.22)]",
                dimmed && "scale-[0.97] opacity-40",
              )}
            >
              <span className={cn("absolute inset-x-0 top-0 h-28 bg-gradient-to-bl opacity-95", categoryWash[item.id])} />
              <span className="absolute -end-6 -top-8 size-28 rounded-full bg-white/20" />
              <span className="relative grid size-14 place-items-center rounded-2xl bg-white/95 text-primary shadow-sm">
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <span className="relative mt-auto pt-16 text-2xl font-semibold text-foreground">{item.name}</span>
              <span className="relative mt-2 text-sm leading-6 text-muted">{item.description}</span>
              <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {count} {copy.countSuffix}
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={resetCategory}
        className="inline-flex items-center gap-2 text-sm font-medium text-primary"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
        {copy.back}
      </button>
      <h2 className="mt-4 text-2xl font-semibold">{category?.name}</h2>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-end">
        <label className="grid min-w-0 flex-1 gap-1.5 text-sm font-medium">
          {copy.searchLabel}
          <span className="relative">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setMapId(null);
                setPage(1);
              }}
              placeholder={copy.searchPlaceholder}
              className="h-11 w-full rounded-full border border-border bg-card ps-10 pe-4 text-sm outline-none focus-visible:border-primary"
            />
          </span>
        </label>
        <label className="grid gap-1.5 text-sm font-medium lg:w-56">
          {copy.cityLabel}
          <select
            value={cityId}
            onChange={(event) => {
              setCityId(event.target.value);
              setMapId(null);
              setPage(1);
            }}
            className="h-11 rounded-full border border-border bg-card px-4 text-sm outline-none focus-visible:border-primary"
          >
            <option value="all">{copy.allCities}</option>
            {cityOptions.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={showOnMap}
          disabled={results.length === 0 || phase === "loading" || listLoading}
          className={buttonClassName("primary", "gap-2 disabled:opacity-50")}
        >
          <MapPin className="size-4" aria-hidden="true" />
          {mapped ? copy.hideMap : copy.viewOnMap}
        </button>
      </div>

      {phase === "loading" || listLoading ? (
        <ResultSkeleton />
      ) : (
        <>
          {mapped ? (
            <div className="mt-6 overflow-hidden rounded-[1.25rem] bg-white shadow-[0_16px_40px_rgb(8_114_214/0.08)]">
              <iframe
                title={mapped.name}
                src={mapsEmbedUrl(mapped.lat, mapped.lng)}
                className="h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <p className="text-sm font-medium">{mapped.name}</p>
                <a
                  href={mapsLink(mapped.lat, mapped.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary"
                >
                  {copy.openInGoogleMaps}
                </a>
              </div>
            </div>
          ) : null}

          {results.length === 0 ? (
            <p className="mt-8 text-muted">{copy.empty}</p>
          ) : (
            <ul className="mt-6 grid gap-3">
              {pageItems.map((facility) => (
                <li key={facility.id}>
                  <article
                    className={cn(
                      "flex flex-col gap-4 rounded-[1.25rem] bg-white px-5 py-4 shadow-[0_10px_30px_rgb(16_24_40/0.05)] sm:flex-row sm:items-center sm:justify-between",
                      mapped?.id === facility.id && "ring-2 ring-primary",
                    )}
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-secondary-soft text-primary">
                        <MapPin className="size-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-semibold">{facility.name}</h3>
                        <p className="mt-1 text-sm text-muted">{facility.address}</p>
                        <p className="mt-2 inline-flex rounded-full bg-secondary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {facility.city}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMapId(facility.id)}
                      className={buttonClassName("secondary", "gap-2")}
                    >
                      <MapPin className="size-4" aria-hidden="true" />
                      {copy.viewOnMap}
                    </button>
                  </article>
                </li>
              ))}
            </ul>
          )}

          {results.length > PAGE_SIZE ? (
            <nav className="mt-6 flex items-center justify-between gap-3" aria-label={copy.pageOf}>
              <button
                type="button"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className={buttonClassName("secondary", "gap-1.5 disabled:opacity-40")}
              >
                <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
                {copy.previous}
              </button>
              <p className="text-sm font-medium text-muted">
                {currentPage} {copy.pageOf} {pageCount}
              </p>
              <button
                type="button"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === pageCount}
                className={buttonClassName("secondary", "gap-1.5 disabled:opacity-40")}
              >
                {copy.next}
                <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </button>
            </nav>
          ) : null}
        </>
      )}
    </div>
  );
}
