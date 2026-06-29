import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import Security from "@/components/sections/Security";
import Demo from "@/components/sections/Demo";
import CTABand from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "Security — Jericho",
  description:
    "Reachability-aware scanning that tells you whether a vulnerable package is actually on a path your code runs — not just that it exists."
};

const reachability: { label: string; title: string; body: string }[] = [
  {
    label: "vulnerable, but unreachable",
    title: "Noise most scanners report",
    body: "A flawed package is in your tree, but no code path in your application ever calls the affected function. Real, but not exploitable here."
  },
  {
    label: "actually on a path you run",
    title: "What Jericho surfaces first",
    body: "The vulnerable function sits on a call path your code executes. This is the finding that deserves your attention now."
  }
];

export default function SecurityPage(): React.JSX.Element {
  return (
    <>
      <Section>
        <div className="max-w-[60ch] text-left">
          <h1 className="font-display text-5xl font-semibold tracking-[var(--tracking-display)] text-foreground md:text-6xl">
            Security that knows your codebase.
          </h1>
          <p className="mt-space-6 max-w-[60ch] text-lg text-foreground opacity-80">
            Reachability-aware scanning built into the same plugin. It tells you
            whether a vulnerable package is actually on a path your code runs — not
            just that it exists.
          </p>
          <div className="mt-space-8 flex">
            <CTA variant="primary" href="/waitlist">
              Request access
            </CTA>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="max-w-[40ch] font-display text-3xl font-semibold tracking-[var(--tracking-heading)] text-foreground md:text-4xl">
          Reachable beats present
        </h2>
        <div className="mt-space-16 grid gap-space-6 md:grid-cols-2">
          {reachability.map((item) => (
            <article
              key={item.label}
              className="flex flex-col border border-raised bg-surface p-space-12"
            >
              <code className="text-foreground opacity-60">{item.label}</code>
              <h3 className="mt-space-4 font-display text-xl text-foreground">
                {item.title}
              </h3>
              <p className="mt-space-4 max-w-[60ch] text-foreground opacity-70">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Security />

      <Demo title="Watch it trace a vulnerability" />

      <CTABand
        heading="Find what actually reaches you."
        body="Request access and scan your codebase for vulnerabilities that matter."
      />
    </>
  );
}
