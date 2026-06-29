"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CTA from "@/components/ui/CTA";

const navLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Debugging", href: "/debugging" },
  { label: "Security", href: "/security" },
  { label: "Self-hosted", href: "/self-hosted" },
  { label: "Pricing", href: "/pricing" }
];

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function isActive(pathname: string, href: string): boolean {
  const current = normalizePath(pathname);
  const target = normalizePath(href);

  if (target === "/") {
    return current === "/";
  }

  return current === target || current.startsWith(`${target}/`);
}

export default function Nav(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-raised bg-canvas">
      <nav className="mx-auto flex max-w-6xl flex-col gap-space-4 px-space-6 py-space-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between md:contents">
          <Link
            href="/"
            className="font-display font-medium tracking-wide text-foreground md:order-1"
          >
            JERICHO
          </Link>

          <CTA
            variant="primary"
            href="/waitlist"
            size="compact"
            className="shrink-0 md:order-3"
          >
            Request access
          </CTA>
        </div>

        <ul className="flex items-center gap-space-6 overflow-x-auto md:order-2 md:flex-1 md:justify-center md:overflow-visible lg:justify-start lg:pl-space-8">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href} className="shrink-0">
                <Link
                  href={link.href}
                  scroll
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap border-b font-display text-sm text-foreground transition-opacity md:text-base ${
                    active
                      ? "border-foreground opacity-100"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
