import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Geometric fallback when a feature row has no photo. */

type FeatureVisualPlaceholderProps = {
  icon: LucideIcon;
  className?: string;
  variant?: "a" | "b" | "c";
};

export function FeatureVisualPlaceholder({
  icon: Icon,
  className,
  variant = "a",
}: FeatureVisualPlaceholderProps) {
  return (
    <div
      className={cn("feature-visual", `feature-visual--${variant}`, className)}
      aria-hidden="true"
    >
      <div className="feature-visual__glow" />
      <div className="feature-visual__dots" />
      <span className="feature-visual__ring feature-visual__ring--outer" />
      <span className="feature-visual__ring feature-visual__ring--inner" />
      <span className="feature-visual__shape feature-visual__shape--one" />
      <span className="feature-visual__shape feature-visual__shape--two" />
      <div className="feature-visual__icon-wrap">
        <Icon strokeWidth={1.5} />
      </div>
    </div>
  );
}
