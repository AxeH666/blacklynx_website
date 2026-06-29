import Link from "next/link";

const routeLinks: { label: string; href: string }[] = [
  { label: "Debugging", href: "/debugging" },
  { label: "Security", href: "/security" },
  { label: "Self-hosted", href: "/self-hosted" },
  { label: "Pricing", href: "/pricing" }
];

const externalLinks: { label: string; href: string }[] = [
  { label: "Contact", href: "mailto:contact@blackkrait.com" },
  { label: "GitHub", href: "https://github.com" }
];

export default function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-raised">
      <div className="mx-auto max-w-6xl px-space-6 py-space-16">
        <div className="flex flex-wrap items-center justify-between gap-space-6">
          <Link
            href="/"
            className="font-display font-medium tracking-wide text-foreground"
          >
            JERICHO
          </Link>

          <nav className="flex flex-wrap items-center gap-space-8">
            {routeLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-foreground opacity-70 transition-opacity hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="font-display text-foreground opacity-70 transition-opacity hover:opacity-100"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <p className="mt-space-12 font-mono text-foreground opacity-50">
          © 2026 Blackkrait Technologies
        </p>
      </div>
    </footer>
  );
}
