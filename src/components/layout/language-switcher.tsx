"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLocale } from "@/app/actions/set-locale";
import { localeNames, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** Writes the `locale` cookie, then refreshes RSC so copy and `dir` update. */

type LanguageSwitcherProps = {
  currentLocale: Locale;
  className?: string;
};

export function LanguageSwitcher({ currentLocale, className }: LanguageSwitcherProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-card p-1",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((locale) => {
        const active = locale === currentLocale;

        return (
          <button
            key={locale}
            type="button"
            disabled={pending}
            aria-pressed={active}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted hover:text-foreground",
            )}
            onClick={() => {
              if (active) {
                return;
              }

              startTransition(async () => {
                await setLocale(locale);
                router.refresh();
              });
            }}
          >
            {localeNames[locale]}
          </button>
        );
      })}
    </div>
  );
}
