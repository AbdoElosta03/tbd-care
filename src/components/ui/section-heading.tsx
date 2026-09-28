/** Page heading for inner routes (providers, join, service detail). */

type SectionHeadingProps = {
  title: string;
  description?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  title,
  description,
  as = "h2",
}: SectionHeadingProps) {
  const Tag = as;

  return (
    <div className="max-w-2xl">
      <Tag className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
        {title}
      </Tag>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-muted">{description}</p>
      ) : null}
    </div>
  );
}
