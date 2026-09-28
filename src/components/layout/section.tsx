import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/cn";

/** Vertical section wrapper for inner pages. */

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 md:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}
