import { cn } from "@/lib/cn";

/** Masked heading used by home story sections. */

type StoryHeadingProps = {
  title: string;
  description?: string;
  as?: "h1" | "h2";
  align?: "start" | "center";
  compact?: boolean;
};

export function StoryHeading({
  title,
  description,
  as = "h2",
  align = "start",
  compact = false,
}: StoryHeadingProps) {
  const Tag = as;

  return (
    <div className={cn("story-heading", align === "center" && "is-center", compact && "is-compact")}>
      <Tag className="story-mask">
        <span>{title}</span>
      </Tag>
      {description ? <p className="story-lede">{description}</p> : null}
    </div>
  );
}
