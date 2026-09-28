import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Scroll-linked draw for network nodes, SVG rails, and the directory CTA. */

type InitNetworkPreviewOptions = {
  scrub: number;
  dir: 1 | -1;
  desktop: boolean;
};

export function initNetworkPreview(
  section: Element | null,
  options: InitNetworkPreviewOptions,
): (() => void) | undefined {
  if (!section?.classList.contains("story-network--static")) {
    return undefined;
  }

  const nodes = gsap.utils.toArray<HTMLElement>(section.querySelectorAll(".network-node"));
  const segments = gsap.utils.toArray<SVGPathElement>(section.querySelectorAll(".network-segment"));
  const connectors = gsap.utils.toArray<HTMLElement>(
    section.querySelectorAll(".network-v-connector"),
  );
  const action = section.querySelector<HTMLElement>(".network-action");

  if (nodes.length === 0) {
    return undefined;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    return undefined;
  }

  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {
    if (options.desktop && segments.length > 0) {
      gsap.set(segments, { strokeDashoffset: 1 });
      gsap.to(segments, {
        strokeDashoffset: 0,
        ease: "power1.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 52%",
          scrub: options.scrub,
        },
      });
    }

    connectors.forEach((connector) => {
      gsap.set(connector, { scaleY: 0, transformOrigin: "top center" });
      gsap.to(connector, {
        scaleY: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: connector,
          start: "top 92%",
          end: "top 72%",
          scrub: options.scrub,
        },
      });
    });

    nodes.forEach((node, index) => {
      const fromX = options.dir * (index % 2 === 0 ? -56 : 56);
      gsap.fromTo(
        node,
        { opacity: 0, x: fromX, y: 10 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: node,
            start: "top 86%",
            end: "top 58%",
            scrub: options.scrub,
          },
        },
      );
    });

    if (action) {
      gsap.fromTo(
        action,
        { opacity: 0, y: 18, x: options.dir * -24 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: action,
            start: "top 92%",
            end: "top 72%",
            scrub: options.scrub,
          },
        },
      );
    }
  }, section);

  return () => {
    ctx.revert();
  };
}
