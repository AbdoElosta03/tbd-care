"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Building2, Check, ChevronDown, ChevronLeft, ChevronRight, MapPin, Pill, Search, Stethoscope } from "lucide-react";
import { buttonClassName } from "@/components/ui/button";
import type { NetworkFacility, NetworkResponse } from "@/lib/api";
import type { ApiFailure } from "@/lib/api/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type CategoryId = NetworkFacility["category"];

type BrowserCategory = {
  id: CategoryId;
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

const PAGE_SIZE = 10;

const categoryVisuals: Record<CategoryId, { image: string; Icon: typeof Building2 }> = {
  hospitals: { image: "/image/network-hospitals.png", Icon: Building2 },
  clinics: { image: "/image/network-clinics.png", Icon: Stethoscope },
  pharmacies: { image: "/image/network-pharmacies.png", Icon: Pill },
  other: { image: "/image/network-other.png", Icon: Building2 },
};

function mapsEmbedUrl(lat: number, lng: number) {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
}

function mapsLink(lat: number, lng: number) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

function ResultSkeleton() {
  return (
    <ul className="mt-6 grid gap-3" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, index) => (
        <li key={index} className="animate-pulse rounded-[1.25rem] bg-white px-5 py-4 shadow-[0_10px_30px_rgb(16_24_40/0.05)]">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-[#e7eef8]" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-3.5 w-40 max-w-[55%] rounded-full bg-[#e7eef8]" />
              <div className="h-3 w-56 max-w-[70%] rounded-full bg-[#f1f5fb]" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ProviderBrowser({ categories, copy, locale }: { categories: BrowserCategory[]; copy: BrowserCopy; locale: Locale }) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<NetworkResponse | null>(null);
  const [resolvedRequest, setResolvedRequest] = useState("");
  const [failedRequest, setFailedRequest] = useState("");
  const [mapId, setMapId] = useState<string | null>(null);
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const cityMenuRef = useRef<HTMLDivElement>(null);

  const requestKey = `${selectedCategory ?? "categories"}:${city}:${search}:${page}`;
  const loading = resolvedRequest !== requestKey && failedRequest !== requestKey;
  const error = failedRequest === requestKey;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const controller = new AbortController();
    const searchParams = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) });

    if (selectedCategory) searchParams.set("category", selectedCategory);
    if (city) searchParams.set("city", city);
    if (search) searchParams.set("search", search);

    fetch(`/api/network?${searchParams.toString()}`, { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        const body = (await response.json()) as NetworkResponse | ApiFailure;
        if (!response.ok) throw new Error((body as ApiFailure).error?.message ?? "Unable to load the provider network.");
        return body as NetworkResponse;
      })
      .then((data) => {
        setResult(data);
        setResolvedRequest(requestKey);
      })
      .catch((requestError: unknown) => {
        if (!(requestError instanceof DOMException && requestError.name === "AbortError")) setFailedRequest(requestKey);
      });

    return () => controller.abort();
  }, [city, page, requestKey, search, selectedCategory]);

  useEffect(() => {
    function closeCityMenu(event: PointerEvent) {
      if (!cityMenuRef.current?.contains(event.target as Node)) {
        setCityMenuOpen(false);
      }
    }

    function closeCityMenuWithKeyboard(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setCityMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeCityMenu);
    document.addEventListener("keydown", closeCityMenuWithKeyboard);
    return () => {
      document.removeEventListener("pointerdown", closeCityMenu);
      document.removeEventListener("keydown", closeCityMenuWithKeyboard);
    };
  }, []);

  const facilities = result?.data ?? [];
  const cities = result?.meta.cities ?? [];
  const mapped = facilities.find((facility) => facility.id === mapId) ?? null;
  const category = categories.find((item) => item.id === selectedCategory);
  const selectedCity = cities.find((item) => item.id === city);
  const selectedCityName = selectedCity
    ? selectedCity.name[locale] || selectedCity.name.en || selectedCity.name.ar
    : copy.allCities;
  const errorMessage = locale === "ar" ? "تعذر تحميل مزودي الخدمة حالياً." : "Unable to load providers right now.";

  function nameFor(facility: NetworkFacility) {
    return facility.name[locale] || facility.name.en || facility.name.ar;
  }

  function addressFor(facility: NetworkFacility) {
    return facility.address[locale] || facility.address.en || facility.address.ar;
  }

  function selectCategory(categoryId: CategoryId) {
    setSelectedCategory(categoryId);
    setSearchInput("");
    setSearch("");
    setCity("");
    setPage(1);
    setMapId(null);
  }

  function resetCategory() {
    setSelectedCategory(null);
    setSearchInput("");
    setSearch("");
    setCity("");
    setPage(1);
    setMapId(null);
  }

  if (!selectedCategory) {
    return (
      <div className="mx-auto grid w-full max-w-3xl gap-4 px-4 pb-12 pt-[calc(var(--header-h)+2rem)] sm:grid-cols-2 sm:px-6 md:pb-16 md:pt-[calc(var(--header-h)+3rem)]">
        {categories.map((item) => {
          const visual = categoryVisuals[item.id];
          const count = result?.meta.counts[item.id] ?? 0;
          const Icon = visual.Icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectCategory(item.id)}
              className="group relative min-h-44 overflow-hidden rounded-[1.35rem] bg-primary p-4 text-start shadow-[0_18px_40px_rgb(8_114_214/0.15)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgb(8_114_214/0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
              <span className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${visual.image})` }} />
              <span
                className="absolute inset-x-0 bottom-0 h-[72%] bg-primary/20 backdrop-blur-[1px]"
                style={{
                  maskImage: "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
                }}
              />
              <span
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(8, 114, 214, 0.92) 0%, rgba(8, 114, 214, 0.68) 30%, rgba(8, 114, 214, 0.28) 58%, rgba(8, 114, 214, 0.04) 82%, transparent 100%)",
                }}
              />
              <span className="relative flex h-full flex-col items-start justify-end">
                <span className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-lg font-semibold text-white">{item.name}</span>
                </span>
                <span className="mt-1.5 max-w-sm text-xs leading-5 text-white/80">{item.description}</span>
                <span className="mt-3 rounded-full bg-white/14 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm">{loading ? "…" : `${count} ${copy.countSuffix}`}</span>
              </span>
            </button>
          );
        })}
        {error ? <p role="alert" className="sm:col-span-2 text-muted">{errorMessage}</p> : null}
      </div>
    );
  }

  return (
    <div>
      <section
        className="network-hero relative min-h-[30rem] bg-[#eaf6ff] bg-cover bg-center"
        style={{ backgroundImage: "url(/image/network-libya-background-v2.png)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white" />
        <div className="relative z-10 mx-auto min-h-[30rem] w-full max-w-7xl px-4 pb-12 pt-[calc(var(--header-h)+2rem)] sm:px-6 sm:pt-[calc(var(--header-h)+3rem)]">
          <button type="button" onClick={resetCategory} className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/10 backdrop-blur-md transition hover:bg-white">
            <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
            {copy.back}
          </button>
          <div className="mt-10 max-w-md py-4 [text-shadow:0_1px_18px_rgb(255_255_255/0.95)]">
            <p className="text-sm font-semibold text-primary">{locale === "ar" ? "شبكة رعاية أقرب إليك" : "Care closer to you"}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#071b36] sm:text-5xl">{category?.name}</h1>
            <p className="mt-4 text-base leading-7 text-[#52647a]">{category?.description}</p>
            <p className="mt-5 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              {result?.meta.total ?? 0} {copy.countSuffix}
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6">
      <div className="-mt-8 flex flex-col gap-4 rounded-[1.5rem] border border-white/80 bg-white/92 p-4 shadow-[0_18px_50px_rgb(31_65_110/0.12)] backdrop-blur-xl lg:flex-row lg:items-end lg:p-5">
        <label className="grid min-w-0 flex-1 gap-1.5 text-sm font-medium">
          {copy.searchLabel}
          <span className="relative">
            <Search className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-primary" aria-hidden="true" />
            <input value={searchInput} onChange={(event) => { setSearchInput(event.target.value); setMapId(null); }} placeholder={copy.searchPlaceholder} className="h-14 w-full rounded-2xl border border-[#dce9f5] bg-[#f8fbff] ps-12 pe-4 text-sm shadow-inner outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10" />
          </span>
        </label>
        <div className="grid gap-1.5 text-sm font-medium lg:w-64">
          <span>{copy.cityLabel}</span>
          <div ref={cityMenuRef} className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={cityMenuOpen}
              onClick={() => setCityMenuOpen((open) => !open)}
              className="flex h-14 w-full items-center rounded-2xl border border-[#dce9f5] bg-[#f8fbff] ps-4 pe-3 text-start text-sm font-medium text-foreground shadow-inner outline-none transition hover:border-primary/35 hover:bg-white focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/8 text-primary">
                <MapPin className="size-4.5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 truncate px-3">{selectedCityName}</span>
              <ChevronDown className={cn("size-5 shrink-0 text-muted transition-transform duration-200", cityMenuOpen && "rotate-180")} aria-hidden="true" />
            </button>

            {cityMenuOpen ? (
              <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 max-h-72 overflow-y-auto rounded-2xl border border-[#dce9f5] bg-white p-2 shadow-[0_20px_55px_rgb(31_65_110/0.18)]" role="listbox" aria-label={copy.cityLabel}>
                {[{ id: "", name: { ar: copy.allCities, en: copy.allCities } }, ...cities].map((item) => {
                  const itemName = item.name[locale] || item.name.en || item.name.ar;
                  const selected = city === item.id;

                  return (
                    <button
                      key={item.id || "all"}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        setCity(item.id);
                        setPage(1);
                        setMapId(null);
                        setCityMenuOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition",
                        selected ? "bg-primary text-white" : "text-foreground hover:bg-primary/7 hover:text-primary",
                      )}
                    >
                      <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg", selected ? "bg-white/16" : "bg-primary/8 text-primary")}>
                        <MapPin className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1 truncate">{itemName}</span>
                      {selected ? <Check className="size-4 shrink-0" aria-hidden="true" /> : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {loading ? <ResultSkeleton /> : null}
      {!loading && error ? <p role="alert" className="mt-8 text-muted">{errorMessage}</p> : null}
      {!loading && !error && facilities.length === 0 ? <p className="mt-8 text-muted">{copy.empty}</p> : null}

      {!loading && !error && facilities.length > 0 ? (
        <>
          {mapped ? (
            <div className="mt-6 overflow-hidden rounded-[1.25rem] bg-white shadow-[0_16px_40px_rgb(8_114_214/0.08)]">
              <iframe title={nameFor(mapped)} src={mapsEmbedUrl(mapped.lat, mapped.lng)} className="h-80 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <p className="text-sm font-medium">{nameFor(mapped)}</p>
                <a href={mapsLink(mapped.lat, mapped.lng)} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary">{copy.openInGoogleMaps}</a>
              </div>
            </div>
          ) : null}

          <ul className="mt-7 grid gap-4">
            {facilities.map((facility) => (
              <li key={facility.id}>
                <article className={cn("group flex flex-col gap-4 rounded-[1.35rem] border border-[#e8f0f8] bg-white/95 p-3 shadow-[0_12px_35px_rgb(31_65_110/0.07)] transition duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_18px_42px_rgb(8_114_214/0.12)] sm:flex-row sm:items-center sm:justify-between", mapped?.id === facility.id && "border-primary/40 ring-2 ring-primary/20")}>
                  <div className="min-w-0 px-2 py-2">
                    <h3 className="font-semibold text-[#071b36] transition group-hover:text-primary">{nameFor(facility)}</h3>
                    <p className="mt-2 text-sm text-muted">{addressFor(facility)}</p>
                    <span className="mt-3 inline-flex rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/10">
                      {category?.name}
                    </span>
                  </div>
                  <button type="button" onClick={() => setMapId((current) => current === facility.id ? null : facility.id)} className={buttonClassName("secondary", "mx-1 gap-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white")}><MapPin className="size-4" aria-hidden="true" />{mapped?.id === facility.id ? copy.hideMap : copy.viewOnMap}</button>
                </article>
              </li>
            ))}
          </ul>

          {(result?.meta.pageCount ?? 0) > 1 ? (
            <nav className="mt-6 flex items-center justify-between gap-3" aria-label={copy.pageOf}>
              <button type="button" onClick={() => { setPage((currentPage) => currentPage - 1); setMapId(null); }} disabled={page === 1} className={buttonClassName("secondary", "gap-1.5 disabled:opacity-40")}><ChevronLeft className="size-4 rtl:rotate-180" aria-hidden="true" />{copy.previous}</button>
              <p className="text-sm font-medium text-muted">{result?.meta.page} {copy.pageOf} {result?.meta.pageCount}</p>
              <button type="button" onClick={() => { setPage((currentPage) => currentPage + 1); setMapId(null); }} disabled={page === result?.meta.pageCount} className={buttonClassName("secondary", "gap-1.5 disabled:opacity-40")}>{copy.next}<ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" /></button>
            </nav>
          ) : null}
        </>
      ) : null}
      </div>
    </div>
  );
}
