type DisplayHeadingProps = {
  as?: "h1" | "h2";
  children: React.ReactNode;
  className?: string;
  /** Constrain measure so text-wrap: pretty breaks on phrase boundaries. */
  measure?: string;
  /** pretty = phrase-aware wraps; balance = even line lengths (hero headlines). */
  wrap?: "pretty" | "balance";
};

const sizeClass: Record<NonNullable<DisplayHeadingProps["as"]>, string> = {
  h1: "text-5xl md:text-6xl tracking-[var(--tracking-display)]",
  h2: "text-3xl md:text-4xl tracking-[var(--tracking-heading)]"
};

export default function DisplayHeading({
  as: Tag = "h2",
  children,
  className = "",
  measure = "max-w-[40ch]",
  wrap = "pretty"
}: DisplayHeadingProps): React.JSX.Element {
  const wrapClass = wrap === "balance" ? "text-balance" : "text-pretty";

  return (
    <Tag
      className={[
        "font-display font-medium text-foreground",
        wrapClass,
        sizeClass[Tag],
        measure,
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
