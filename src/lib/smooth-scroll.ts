import type Lenis from "lenis";

const HEADER_OFFSET = 88;
const DEFAULT_DURATION = 1.85;

let lenis: Lenis | null = null;

export function setSmoothScrollLenis(instance: Lenis | null) {
  lenis = instance;
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function scrollToTop(duration: number) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const resolvedDuration = reduced ? 0 : duration;

  if (lenis) {
    lenis.scrollTo(0, { duration: resolvedDuration, easing: easeOutQuart });
    return;
  }

  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}

export function scrollToSectionId(id: string, duration = DEFAULT_DURATION) {
  if (id === "hero") {
    scrollToTop(duration);
    return;
  }

  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const resolvedDuration = reduced ? 0 : duration;

  if (lenis) {
    lenis.scrollTo(target, {
      offset: -HEADER_OFFSET,
      duration: resolvedDuration,
      easing: easeOutQuart,
    });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}

export function scrollFromLocationHash() {
  const id = window.location.hash.replace(/^#/, "");
  if (!id) {
    return;
  }
  scrollToSectionId(id);
}

export function isHomeHashHref(href: string): string | null {
  const hashIndex = href.indexOf("#");
  if (hashIndex < 0) {
    return null;
  }

  const path = href.slice(0, hashIndex);
  const id = href.slice(hashIndex + 1);
  if (!id) {
    return null;
  }

  if (path && path !== "/") {
    return null;
  }

  return id;
}

export function handleHomeHashNavClick(
  event: { preventDefault: () => void },
  href: string,
  pathname: string,
): boolean {
  const id = isHomeHashHref(href);
  if (!id || pathname !== "/") {
    return false;
  }

  event.preventDefault();
  window.history.pushState(null, "", `/#${id}`);
  scrollToSectionId(id);
  return true;
}
