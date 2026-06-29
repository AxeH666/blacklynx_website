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

const base =
  "inline-flex items-center justify-center rounded-md font-display transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const sizeClass: Record<Size, string> = {
  default: "px-space-6 py-space-4",
  compact: "px-space-4 py-space-2 text-sm tracking-[-0.01em]"
};

const variantClass: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:bg-accent-hover",
  ghost: "border border-border-strong text-text hover:border-text"
};

export default function CTA({
  variant,
  href,
  children,
  className = "",
  size = "default"
}: CTAProps): React.JSX.Element {
  const classes = `${base} ${sizeClass[size]} ${variantClass[variant]} ${className}`;

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
