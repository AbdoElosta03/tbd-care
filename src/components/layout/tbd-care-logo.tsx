import { cn } from "@/lib/cn";

/** Inline SVG wordmark used in the footer. */

type TbdCareLogoProps = {
  className?: string;
  title?: string;
};

export function TbdCareLogo({ className, title = "tbd care" }: TbdCareLogoProps) {
  return (
    <svg
      className={cn("tbd-care-logo", className)}
      viewBox="0 -8 92 86"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="46"
        fill="currentColor"
        fontFamily="var(--font-inter), Inter, Segoe UI, sans-serif"
        fontSize="54"
        fontWeight="800"
        letterSpacing="-1.6"
      >
        tbd
      </text>
      <text
        x="1"
        y="70"
        fill="currentColor"
        fontFamily="var(--font-inter), Inter, Segoe UI, sans-serif"
        fontSize="15"
        fontWeight="600"
        letterSpacing="8.2"
      >
        CARE
      </text>
    </svg>
  );
}
