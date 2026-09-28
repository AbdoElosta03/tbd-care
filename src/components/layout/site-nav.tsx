"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { handleHomeHashNavClick, isHomeHashHref } from "@/lib/smooth-scroll";

/** Link list used by header and footer. */

export type NavLink = {
  label: string;
  href: string;
};

type SiteNavProps = {
  ariaLabel: string;
  items: NavLink[];
  className?: string;
  listClassName?: string;
  onNavigate?: () => void;
};

export function SiteNav({
  ariaLabel,
  items,
  className,
  listClassName,
  onNavigate,
}: SiteNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ul className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", listClassName)}>
        {items.map((item) => {
          const homeHash = isHomeHashHref(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                scroll={homeHash ? false : undefined}
                onClick={(event) => {
                  if (handleHomeHashNavClick(event, item.href, pathname)) {
                    onNavigate?.();
                    return;
                  }
                  onNavigate?.();
                }}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
