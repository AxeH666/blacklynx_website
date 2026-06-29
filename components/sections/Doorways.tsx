import Link from "next/link";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Eyebrow from "@/components/ui/Eyebrow";

const doors: {
  index: string;
  title: string;
  promise: string;
  sub: string;
  href: string;
  label: string;
}[] = [
  {
    index: "01",
    title: "Debugging",
    promise: "Find the exact bug. Prove the fix.",
    sub: "Paste a stack trace. Jericho retrieves the real function, verifies the fix, and runs your tests before it shows you anything.",
    href: "/debugging",
    label: "Enter debugging"
  },
  {
    index: "02",
    title: "Security",
    promise: "Know which vulnerabilities actually reach your code.",
    sub: "Reachability-aware scanning in the same plugin. It separates exploitable paths from noise.",
    href: "/security",
    label: "Enter security"
  }
];

// Equal-weight doorways: both are link-affordance cards so neither dominates and
// the silver primary stays rationed to the hero/nav (accent discipline).
export default function Doorways(): React.JSX.Element {
  return (
    <Section className="py-space-16">
      <div className="grid gap-space-6 md:grid-cols-2 md:items-stretch">
        {doors.map((door) => (
          <Link key={door.title} href={door.href} className="group flex h-full">
            <Card
              padding="space-12"
              className="flex h-full w-full flex-col transition-colors group-hover:border-border-strong"
              innerClassName="flex h-full flex-col"
            >
              <Eyebrow>
                <span className="tabular-nums">{door.index}</span>
                <span className="px-space-2 text-text-muted">/</span>
                {door.title}
              </Eyebrow>

              <p className="mt-space-6 max-w-[28ch] text-pretty font-display text-2xl font-medium tracking-[var(--tracking-heading)] text-foreground">
                {door.promise}
              </p>

              <p className="mt-space-4 max-w-[52ch] text-pretty text-base font-normal text-text-secondary">
                {door.sub}
              </p>

              <span className="mt-auto inline-flex items-center gap-space-2 pt-space-8 font-display text-sm font-medium text-foreground">
                {door.label}
                <span
                  aria-hidden="true"
                  className="text-text-secondary transition-colors group-hover:text-foreground"
                >
                  →
                </span>
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
