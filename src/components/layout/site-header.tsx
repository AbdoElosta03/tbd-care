"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { SiteNav } from "@/components/layout/site-nav";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { paths } from "@/lib/paths";
import { handleHomeHashNavClick } from "@/lib/smooth-scroll";

/** Floating header: language, nav, logo. Mobile menu closes on route change. */

type NavLink = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  locale: Locale;
  siteName: string;
  headerNav: NavLink[];
  menuLabel: string;
  closeLabel: string;
};

export function SiteHeader({
  locale,
  siteName,
  headerNav,
  menuLabel,
  closeLabel,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(pathname === "/");
  const open = openPath === pathname;
  const networkOverlay = pathname === paths.providers;

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPath(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const hero = document.querySelector(".story-hero");

    function update() {
      setScrolled(window.scrollY > 12);
      if (!hero) {
        setOverHero(false);
        return;
      }
      setOverHero(hero.getBoundingClientRect().bottom > 72);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        "site-header",
        overHero && "is-over-hero",
        scrolled && "is-scrolled",
        open && "is-open",
        networkOverlay && "is-network-overlay",
      )}
    >
      <div className="site-header-bar">
        <LanguageSwitcher currentLocale={locale} className="site-lang" />
        <div className="site-header-nav">
          <SiteNav
            ariaLabel="Main navigation"
            items={headerNav}
            className="site-nav-pill"
            listClassName="site-nav-links"
          />
          <button
            type="button"
            className="site-menu-button"
            aria-expanded={open}
            aria-controls={open ? "mobile-navigation" : undefined}
            onClick={() =>
              setOpenPath((current) => (current === pathname ? null : pathname))
            }
          >
            {open ? closeLabel : menuLabel}
          </button>
        </div>
        <Link
          href={paths.home}
          scroll={false}
          className="site-logo"
          onClick={(event) => {
            handleHomeHashNavClick(event, paths.home, pathname);
          }}
        >
          <Image
            src="/image/TBD-Care-Logo.webp"
            alt={siteName}
            width={48}
            height={48}
          />
        </Link>
      </div>
      {open ? (
        <div id="mobile-navigation" className="site-mobile-panel">
          <SiteNav
            ariaLabel="Mobile navigation"
            items={headerNav}
            listClassName="site-mobile-links"
            onNavigate={() => setOpenPath(null)}
          />
        </div>
      ) : null}
    </header>
  );
}
