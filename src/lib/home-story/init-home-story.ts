import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { initAppDownload } from "@/lib/home-story/init-app-download";
import { initFeatureShowcase } from "@/lib/feature-showcase/init-feature-showcase";
import { initNetworkPreview } from "@/lib/home-story/init-network-preview";
import { scrollFromLocationHash, setSmoothScrollLenis } from "@/lib/smooth-scroll";

/** Homepage scroll story: Lenis + GSAP. No-ops when reduced motion is on. */

function storyDir(): 1 | -1 {
  return document.documentElement.dir === "rtl" ? -1 : 1;
}

function meterOrigin(): string {
  return document.documentElement.dir === "rtl" ? "right center" : "left center";
}

export function initHomeStory(): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const page = document.querySelector(".story-page");
  if (!page) {
    return () => {};
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    return () => {};
  }

  gsap.registerPlugin(ScrollTrigger);

  let lenis: Lenis | null = null;
  const ticker = (time: number) => {
    lenis?.raf(time * 1000);
  };

  lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    touchMultiplier: 1.15,
  });

  setSmoothScrollLenis(lenis);
  lenis.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length && lenis && value !== undefined) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis?.scroll ?? window.scrollY;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  const ctx = gsap.context(() => {
    const dir = storyDir();
    const scrub = 0.42;

    const progressBar = page.querySelector(".story-progress > span");
    if (progressBar) {
      gsap.set(progressBar, { scaleY: 0, transformOrigin: "top center" });
      gsap.to(progressBar, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 900px)",
        mobile: "(max-width: 899px)",
      },
      (context) => {
        const desktop = Boolean(context.conditions?.desktop);
        // Initialize each visible homepage section within one GSAP context.
        setupHero();
        setupWhy(desktop, scrub);
        setupServices(desktop, dir, scrub);
        setupNetwork(desktop, dir, scrub);
        setupApp(desktop, dir, scrub);
        setupJoin(desktop, dir, scrub);
        setupFooter(scrub);
      },
    );
  }, page);

  ScrollTrigger.refresh();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollFromLocationHash();
      ScrollTrigger.refresh();
    });
  });

  return () => {
    ctx.revert();
    lenis?.destroy();
    lenis = null;
    setSmoothScrollLenis(null);
    gsap.ticker.remove(ticker);
  };
}

// Hero entrance and ambient parallax.
function setupHero() {
  const hero = document.querySelector(".story-hero");
  const title = hero?.querySelector(".story-hero-title span");
  const lede = hero?.querySelector(".story-hero-lede");
  const actions = hero?.querySelector(".story-hero-actions");
  const doctor = hero?.querySelector(".story-hero-doctor-wrap");
  const decor = hero?.querySelector(".story-hero-decor");
  const drift = hero?.querySelector(".story-hero-drift");
  const wave = hero?.querySelector(".story-hero-wave svg");
  const cards = gsap.utils.toArray<HTMLElement>(".story-hero-card", hero ?? undefined);

  if (!hero || !title) {
    return;
  }

  gsap.set([title, lede, actions].filter(Boolean), { y: 22, opacity: 0 });
  gsap.to(title, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.08 });
  if (lede) {
    gsap.to(lede, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.24 });
  }
  if (actions) {
    gsap.to(actions, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", delay: 0.4 });
  }

  if (doctor) {
    const doctorTl = gsap.timeline({ delay: 0.14 });
    doctorTl.fromTo(
      doctor,
      { y: 58, opacity: 0, scale: 0.965 },
      { y: 0, opacity: 1, scale: 1, duration: 1.15, ease: "power3.out" },
    );
    doctorTl.to(doctor, {
      y: -8,
      duration: 3.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  cards.forEach((card, index) => {
    const cardTl = gsap.timeline({ delay: 0.46 + index * 0.14 });
    cardTl.fromTo(card, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" });
    cardTl.to(card, {
      y: index % 2 === 0 ? -6 : 6,
      duration: 3.3 + index * 0.28,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  });

  const parallax = [decor, drift].filter(Boolean);
  if (parallax.length > 0) {
    gsap.to(parallax, {
      y: -26,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 0.65,
      },
    });
  }

  if (wave) {
    gsap.fromTo(
      wave,
      { y: 0 },
      {
        y: -10,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      },
    );
  }
}

// Sequential reveal for the six Why TBD rows.
function setupWhy(desktop: boolean, scrub: number) {
  const section = document.querySelector(".story-why.why-bento");
  if (!section) {
    return;
  }

  setupWhyBentoScroll(section, desktop, scrub);
}

const WHY_SEQUENTIAL_END = 0.88;

function setupWhyBentoScroll(section: Element, desktop: boolean, scrub: number) {
  const pinFrame = section.querySelector(".story-pin-frame");
  const items = gsap.utils.toArray<HTMLElement>(section.querySelectorAll(".why-bento-item"));
  const meter = section.querySelector(".why-meter > span");
  const countEl = section.querySelector(".why-count");
  const total = items.length;

  if (total === 0) {
    return;
  }

  section.classList.add("is-why-scroll-ready");

  const endDistance = () => `+=${window.innerHeight * (desktop ? 3.1 : 2.35)}`;

  const applyScrollState = (progress: number) => {
    if (progress >= WHY_SEQUENTIAL_END) {
      section.classList.add("is-why-all-active");
      items.forEach((item) => {
        item.classList.remove("is-why-active", "is-why-inactive");
        item.classList.add("is-why-revealed");
      });
      if (countEl) {
        countEl.textContent = `${String(total).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
      }
      return;
    }

    section.classList.remove("is-why-all-active");

    const seqProgress = progress / WHY_SEQUENTIAL_END;
    const activeIndex = Math.min(total - 1, Math.max(0, Math.floor(seqProgress * total)));

    items.forEach((item, index) => {
      const isRevealed = index <= activeIndex;
      item.classList.toggle("is-why-revealed", isRevealed);

      if (!isRevealed) {
        item.classList.remove("is-why-active", "is-why-inactive");
        return;
      }

      const isActive = index === activeIndex;
      item.classList.toggle("is-why-active", isActive);
      item.classList.toggle("is-why-inactive", !isActive);
    });

    if (countEl) {
      countEl.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    }
  };

  if (desktop && pinFrame) {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: endDistance,
      pin: pinFrame,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });
  }

  if (meter) {
    gsap.set(meter, { scaleX: 0, transformOrigin: meterOrigin() });
  }

  ScrollTrigger.create({
    trigger: section,
    start: desktop ? "top top" : "top 72%",
    end: desktop ? endDistance : "bottom 18%",
    scrub,
    invalidateOnRefresh: true,
    onUpdate: (self) => applyScrollState(self.progress),
  });

  applyScrollState(0);

  if (meter) {
    gsap.to(meter, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: desktop ? "top top" : "top 72%",
        end: desktop ? endDistance : "bottom 18%",
        scrub,
        invalidateOnRefresh: true,
      },
    });
  }
}

// Service showcase and remaining section reveals.
function setupServices(_desktop: boolean, _dir: 1 | -1, scrub: number) {
  const section = document.querySelector(".story-services");
  const heading = section?.querySelector(".story-heading");
  const showcase = section?.querySelector<HTMLElement>(".feature-showcase");

  if (heading) {
    revealHeading(heading, scrub);
  }

  if (showcase) {
    initFeatureShowcase(showcase, { scrub }, false);
  }
}

// Network preview nodes and SVG connectors.
function setupNetwork(desktop: boolean, dir: 1 | -1, scrub: number) {
  const section = document.querySelector(".story-network--static");
  const heading = section?.querySelector(".story-heading");

  if (heading) {
    revealHeading(heading, scrub);
  }

  initNetworkPreview(section, { scrub, dir, desktop });
}

// App download copy + phone stack.
function setupApp(_desktop: boolean, dir: 1 | -1, scrub: number) {
  const section = document.querySelector(".app-download");
  initAppDownload(section, { scrub, dir });
}

// Contact banner form, intro, and team photo.
function setupJoin(desktop: boolean, dir: 1 | -1, scrub: number) {
  const section = document.querySelector(".story-join");
  const formCol = section?.querySelector<HTMLElement>(".join-banner__form-col");
  const intro = section?.querySelector<HTMLElement>(".join-banner__intro");
  const team = section?.querySelector<HTMLElement>(".join-banner__team");
  const heading = section?.querySelector(".story-heading");

  if (heading) {
    revealHeading(heading, scrub);
  }

  if (!section || !formCol || !intro || !team) {
    return;
  }

  const formShell = section.querySelector<HTMLElement>(".join-banner-form");
  const formControls = gsap.utils.toArray<HTMLElement>(
    section.querySelectorAll(".join-banner-form > *"),
  );

  gsap.fromTo(
    formCol,
    { x: dir * (desktop ? -64 : -32), y: 36, opacity: 0.25, scale: 0.97 },
    {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 84%",
        end: "top 44%",
        scrub,
      },
    },
  );

  if (formShell) {
    gsap.fromTo(
      formShell,
      { boxShadow: "0 0 0 rgb(8 114 214 / 0)" },
      {
        boxShadow: "0 24px 48px rgb(8 114 214 / 0.08)",
        ease: "none",
        scrollTrigger: {
          trigger: formCol,
          start: "top 80%",
          end: "top 50%",
          scrub,
        },
      },
    );
  }

  if (formControls.length > 0) {
    gsap.fromTo(
      formControls,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: formCol,
          start: "top 78%",
          end: "top 46%",
          scrub,
        },
      },
    );
  }

  gsap.fromTo(
    intro,
    { y: 32, opacity: 0.3 },
    {
      y: 0,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 44%",
        scrub,
      },
    },
  );

  gsap.fromTo(
    team,
    { y: 72, opacity: 0.2, scale: 0.94 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 76%",
        end: "top 38%",
        scrub,
      },
    },
  );
}

// Footer rise on scroll.
function setupFooter(scrub: number) {
  const footer = document.querySelector("body > footer");
  if (!footer) {
    return;
  }

  gsap.fromTo(
    footer,
    { y: 32, opacity: 0.65 },
    {
      y: 0,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: footer,
        start: "top 95%",
        end: "top 70%",
        scrub,
      },
    },
  );
}

function revealHeading(heading: Element, scrub: number) {
  const mask = heading.querySelector(".story-mask > span");
  const lede = heading.querySelector(".story-lede");

  if (mask) {
    gsap.fromTo(
      mask,
      { yPercent: 105 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heading,
          start: "top 86%",
          end: "top 56%",
          scrub,
        },
      },
    );
  }

  if (lede) {
    gsap.fromTo(
      lede,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: heading,
          start: "top 78%",
          end: "top 50%",
          scrub,
        },
      },
    );
  }
}
