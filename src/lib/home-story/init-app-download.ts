import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Parallax for the app copy column and phone mockups. */

type InitAppDownloadOptions = {
  scrub: number;
  dir: 1 | -1;
};

export function initAppDownload(
  section: Element | null,
  options: InitAppDownloadOptions,
): (() => void) | undefined {
  if (!section?.classList.contains("app-download")) {
    return undefined;
  }

  const copy = section.querySelector<HTMLElement>(".app-download__copy");
  const stage = section.querySelector<HTMLElement>(".app-phone-stage");
  if (!copy || !stage) {
    return undefined;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    return undefined;
  }

  gsap.registerPlugin(ScrollTrigger);

  let floatTween: gsap.core.Tween | null = null;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      copy,
      { opacity: 0, x: options.dir * 52 },
      {
        opacity: 1,
        x: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "top 50%",
          scrub: options.scrub,
        },
      },
    );

    gsap.fromTo(
      stage,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 52%",
          scrub: options.scrub,
        },
      },
    );

    const phoneOrder = [".app-phone--center", ".app-phone--left", ".app-phone--right"];
    phoneOrder.forEach((selector, orderIndex) => {
      const phone = section.querySelector<HTMLElement>(selector);
      if (!phone) {
        return;
      }

      gsap.fromTo(
        phone,
        { y: 140, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: `top ${78 - orderIndex * 2}%`,
            end: "top 36%",
            scrub: options.scrub,
          },
        },
      );
    });

    gsap.to(copy, {
      y: -6,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: "bottom 10%",
        scrub: options.scrub,
      },
    });

    gsap.to(stage, {
      y: -6,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: "bottom 10%",
        scrub: options.scrub,
      },
    });

    const stopFloat = () => {
      floatTween?.kill();
      floatTween = null;
      gsap.set(stage, { clearProps: "y" });
    };

    const startFloat = () => {
      floatTween?.kill();
      floatTween = gsap.to(stage, {
        y: "-=5",
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    };

    ScrollTrigger.create({
      trigger: section,
      start: "top 55%",
      end: "bottom 92%",
      onEnter: startFloat,
      onLeave: stopFloat,
      onEnterBack: startFloat,
      onLeaveBack: stopFloat,
    });
  }, section);

  return () => {
    floatTween?.kill();
    ctx.revert();
  };
}
