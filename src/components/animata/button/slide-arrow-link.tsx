"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Primary CTA with a sliding arrow; CSS in `story.css` styles the home instance. */

type SlideArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function SlideArrowLink({ href, children, className }: SlideArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "slide-arrow-link group/slide relative inline-flex min-h-12 items-center overflow-hidden rounded-full border border-transparent bg-white p-1.5 text-sm font-medium text-primary",
        className,
      )}
    >
      <div
        className="absolute start-0 top-0 flex h-full w-11 items-center justify-end rounded-full bg-primary transition-all duration-200 ease-in-out group-hover/slide:w-full"
        aria-hidden="true"
      >
        <span className="me-2.5 text-primary-foreground transition-all duration-200 ease-in-out">
          <ArrowRight className="size-5 rtl:rotate-180" strokeWidth={2} />
        </span>
      </div>
      <span className="relative z-10 whitespace-nowrap ps-16 pe-6 font-medium transition-all duration-200 ease-in-out group-hover/slide:-start-2 group-hover/slide:ps-6 group-hover/slide:text-primary-foreground">
        {children}
      </span>
    </Link>
  );
}
