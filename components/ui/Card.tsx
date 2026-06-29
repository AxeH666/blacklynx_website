type CardPadding = "space-6" | "space-8" | "space-12";

const paddingClass: Record<CardPadding, string> = {
  "space-6": "p-space-6",
  "space-8": "p-space-8",
  "space-12": "p-space-12"
};

type CardProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  padding?: CardPadding;
  sheen?: boolean;
};

export default function Card({
  children,
  className = "",
  innerClassName = "",
  padding = "space-12",
  sheen = true
}: CardProps): React.JSX.Element {
  const cardStyle = {
    "--card-radius": "var(--radius-lg)",
    "--card-padding": `var(--${padding})`
  } as React.CSSProperties;

  return (
    <div
      className={[
        "atom-card",
        sheen ? "atom-card--sheen" : "",
        paddingClass[padding],
        className
      ]
        .filter(Boolean)
        .join(" ")}
      style={cardStyle}
    >
      <div className={["atom-card__inner", innerClassName].filter(Boolean).join(" ")}>
        {children}
      </div>
    </div>
  );
}

/** Concentric inner radius: outer radius minus padding (DESIGN.LAWS D2). */
export function cardInnerRadiusStyle(): React.CSSProperties {
  return {
    borderRadius: "calc(var(--card-radius) - var(--card-padding))"
  };
}
