// ACCENT DISCIPLINE: only ONE variant="primary" per viewport. The palette is pure
// monochrome — hierarchy comes from LIGHTNESS, not hue. The primary CTA is the
// lightest element in its viewport (silver fill, dark text). If a section needs two
// actions, one is primary, one is ghost. Never two silver primaries in the same fold.

import Link from "next/link";

type Variant = "primary" | "ghost";
type Size = "default" | "compact";

// children is REQUIRED — a CTA can never render without a visible text label.
// No empty buttons, ever.
type CTAProps = {
  variant: Variant;
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: Size;
};

const variantClass: Record<Variant, string> = {
  primary: "atom-btn atom-btn-primary",
  ghost: "atom-btn atom-btn-ghost"
};

export default function CTA({
  variant,
  href,
  children,
  className = "",
  size = "default"
}: CTAProps): React.JSX.Element {
  const classes = [
    variantClass[variant],
    size === "compact" ? "atom-btn--compact" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  // Internal navigation uses next/link; hashes, mailto, and external use <a>.
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
