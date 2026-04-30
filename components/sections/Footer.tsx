import Image from "next/image";

const links = [
  { label: "Product", href: "#product" },
  {
    label: "GitHub",
    href: "https://github.com/AxeH666/openforge",
    external: true
  },
  { label: "mohi@blacklynx.dev", href: "mailto:mohi@blacklynx.dev" }
];

export default function Footer() {
  return (
    <footer className="border-t border-blacklynx-border px-6 py-8">
      <div className="mx-auto grid max-w-[1180px] gap-6 text-sm text-blacklynx-muted md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="BlackLynx" width={24} height={24} className="h-6 w-auto" />
          <span>© 2026 BlackLynx Technologies</span>
        </div>
        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="transition-colors hover:text-blacklynx-text"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="md:text-right">Built in India. Trusted everywhere.</p>
      </div>
    </footer>
  );
}
