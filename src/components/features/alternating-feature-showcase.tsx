"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FeatureVisualPlaceholder } from "@/components/features/feature-visual-placeholder";
import { featureIconForKey } from "@/components/features/feature-icon-map";
import { initFeatureShowcase } from "@/lib/feature-showcase/init-feature-showcase";
import { cn } from "@/lib/utils";

/** Alternating photo/copy rows for home services and service detail pages. */

export type AlternatingFeatureItem = {
  id: string;
  index: string;
  title: string;
  description: string;
  bullets: string[];
  visualKey: string;
  href?: string;
  image?: {
    src: string;
    alt: string;
  };
};

type AlternatingFeatureShowcaseProps = {
  items: AlternatingFeatureItem[];
  className?: string;
  /** Home story calls init from setupServices; other pages self-init. */
  scrollManaged?: "home" | "self";
};

const VISUAL_VARIANTS: Array<"a" | "b" | "c"> = ["a", "b", "c"];

export function AlternatingFeatureShowcase({
  items,
  className,
  scrollManaged = "self",
}: AlternatingFeatureShowcaseProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollManaged === "home") {
      return undefined;
    }

    return initFeatureShowcase(rootRef.current) ?? undefined;
  }, [items, scrollManaged]);

  return (
    <div ref={rootRef} className={cn("feature-showcase", className)}>
      {items.map((item, index) => {
        const Icon = featureIconForKey(item.visualKey);
        const isReverse = index % 2 === 1;
        const variant = VISUAL_VARIANTS[index % VISUAL_VARIANTS.length];
        const showBullets = item.bullets.length >= 2;

        return (
          <article
            key={item.id}
            className={cn(
              "feature-showcase-row",
              isReverse && "feature-showcase-row--reverse",
              index === 0 && "is-feature-active",
              index !== 0 && "is-feature-dimmed",
            )}
          >
            <div className="feature-showcase__visual">
              {item.image ? (
                <div className="feature-visual feature-visual--photo">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={1088}
                    height={994}
                    className="feature-showcase__photo"
                    sizes="(max-width: 899px) 100vw, 34rem"
                  />
                </div>
              ) : (
                <FeatureVisualPlaceholder icon={Icon} variant={variant} />
              )}
            </div>

            <div className="feature-showcase__copy">
              <p className="feature-showcase__index">{item.index}</p>
              <h3 className="feature-showcase__title">{item.title}</h3>
              <p className="feature-showcase__desc">{item.description}</p>

              {showBullets ? (
                <ul className="feature-showcase__bullets">
                  {item.bullets.map((bullet, bulletIndex) => (
                    <li key={`${item.id}-${bulletIndex}`} className="feature-showcase__bullet">
                      <span className="feature-showcase__bullet-icon" aria-hidden="true">
                        <Check strokeWidth={2.5} />
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {item.href ? (
                <Link href={item.href} className="feature-showcase__link" aria-label={item.title}>
                  <span className="feature-showcase__link-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
