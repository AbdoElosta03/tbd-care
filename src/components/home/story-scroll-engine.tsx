"use client";

import { useEffect } from "react";
import { initHomeStory } from "@/lib/home-story/init-home-story";
import { scrollFromLocationHash } from "@/lib/smooth-scroll";

/** Mounts GSAP/Lenis on `/` after hydration and tags `html` with `story-gsap`. */

export function StoryScrollEngine() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("story-gsap");

    const cleanup = initHomeStory();

    function onHashChange() {
      scrollFromLocationHash();
    }

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      cleanup();
      root.classList.remove("story-gsap");
    };
  }, []);

  return null;
}
