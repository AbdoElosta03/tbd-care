import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared button/link styles. Variants: primary, secondary. */

type ButtonVariant = "primary" | "secondary";

const variantClassName: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary:
    "border border-secondary bg-card text-primary hover:bg-secondary/10",
};

export function buttonClassName(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors",
    variantClassName[variant],
    className,
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClassName(variant, className)}>
      {children}
    </Link>
  );
}
