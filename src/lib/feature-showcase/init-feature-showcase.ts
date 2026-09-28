import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Alternating service rows: reveal copy/visuals and dim inactive rows. */

type InitFeatureShowcaseOptions = {
  scrub?: number;
};

export function initFeatureShowcase(
  root: HTMLElement | null,
  options: InitFeatureShowcaseOptions = {},
  useLocalContext = true,
): (() => void) | undefined {
  if (!root) {
    return undefined;
  }

  const rows = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".feature-showcase-row"));

  if (rows.length === 0) {
    return undefined;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("is-feature-showcase-ready");

  if (reduced) {
    rows.forEach((row) => {
      row.classList.add("is-feature-active");
      row.classList.remove("is-feature-dimmed");
    });
    return undefined;
  }

  gsap.registerPlugin(ScrollTrigger);

  const scrub = options.scrub ?? 0.42;
  const dir = document.documentElement.dir === "rtl" ? -1 : 1;

  const run = () => {
    rows.forEach((row, index) => {
      const visual = row.querySelector<HTMLElement>(".feature-visual");
      const icon = row.querySelector<HTMLElement>(".feature-visual__icon-wrap");
      const indexEl = row.querySelector<HTMLElement>(".feature-showcase__index");
      const title = row.querySelector<HTMLElement>(".feature-showcase__title");
      const desc = row.querySelector<HTMLElement>(".feature-showcase__desc");
      const bullets = gsap.utils.toArray<HTMLElement>(
        row.querySelectorAll(".feature-showcase__bullet"),
      );

      const fromSide = index % 2 === 0;
      const fromX = dir * (fromSide ? -72 : 72);

      if (visual) {
        const photo = visual.querySelector<HTMLElement>(".feature-showcase__photo");

        gsap.fromTo(
          visual,
          { opacity: 0, x: fromX, y: 56 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 86%",
              end: "top 40%",
              scrub,
            },
          },
        );

        if (photo) {
          const clipFrom =
            fromSide !== (dir < 0)
              ? "inset(0 100% 0 0)"
              : "inset(0 0 0 100%)";

          gsap.fromTo(
            photo,
            { clipPath: clipFrom },
            {
              clipPath: "inset(0 0 0 0)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 84%",
                end: "top 38%",
                scrub,
              },
            },
          );
        }
      }

      if (icon) {
        gsap.fromTo(
          icon,
          { scale: 0.86 },
          {
            scale: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              end: "top 44%",
              scrub,
            },
          },
        );
      }

      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 78%",
          end: "top 42%",
          scrub,
        },
      });

      if (indexEl) {
        textTimeline.fromTo(indexEl, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.2 });
      }
      if (title) {
        textTimeline.fromTo(title, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.22 }, "-=0.12");
      }
      if (desc) {
        textTimeline.fromTo(desc, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.24 }, "-=0.1");
      }
      bullets.forEach((bullet, bulletIndex) => {
        textTimeline.fromTo(
          bullet,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.16 },
          bulletIndex === 0 ? "-=0.08" : "-=0.12",
        );
      });

      ScrollTrigger.create({
        trigger: row,
        start: "top 54%",
        end: "bottom 46%",
        onEnter: () => setRowFocus(rows, row),
        onEnterBack: () => setRowFocus(rows, row),
      });
    });

    setRowFocus(rows, rows[0]);
  };

  if (useLocalContext) {
    const ctx = gsap.context(run, root);
    return () => {
      ctx.revert();
      root.classList.remove("is-feature-showcase-ready");
    };
  }

  run();
  return undefined;
}

function setRowFocus(rows: HTMLElement[], active: HTMLElement) {
  rows.forEach((row) => {
    const isActive = row === active;
    row.classList.toggle("is-feature-active", isActive);
    row.classList.toggle("is-feature-dimmed", !isActive);
  });
}
