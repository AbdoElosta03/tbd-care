import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Horizontal page gutter and max width. */

type ContainerProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export function Container({ id, children, className }: ContainerProps) {
  return (
    <div id={id} className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}
