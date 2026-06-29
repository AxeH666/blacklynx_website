import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import CTABand from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "Self-hosted — Jericho",
  description:
    "Run Jericho fully inside your own infrastructure. Air-gapped, local-only inference, no external API calls. Built for regulated and government teams."
};

const audience: { title: string; body: string }[] = [
  {
    title: "Regulated industries",
    body: "Finance, healthcare, and other teams bound by data-residency and compliance requirements."
  },
  {
    title: "Government",
    body: "Public-sector environments where source code cannot leave controlled networks."
  },
  {
    title: "Air-gapped environments",
    body: "Networks with no outbound internet access, where every dependency runs locally."
  }
];

const included: { title: string; body: string }[] = [
  {
    title: "Full local stack",
    body: "Retrieval, verification, and test execution all run on hardware you control."
  },
  {
    title: "No external API calls",
    body: "In self-hosted mode, nothing about your code or traces leaves your network."
  },
  {
    title: "Unlimited developers",
    body: "Licensed per deployment, not per seat. Onboard the whole org."
  }
];

const contrast: { mode: string; body: string }[] = [
  {
    mode: "Hosted",
    body: "Uses cloud inference APIs for the fastest setup and lowest maintenance. Code is sent to those APIs to produce a fix."
  },
  {
    mode: "Self-hosted",
    body: "Fully local and air-gappable. Slower to stand up, but no code or trace ever leaves your infrastructure."
  }
];

export default function SelfHostedPage(): React.JSX.Element {
  return (
    <>
      <Section>
        <div className="max-w-[60ch] text-left">
          <h1 className="font-display text-5xl font-semibold tracking-[var(--tracking-display)] text-foreground md:text-6xl">
            Your code never leaves your infrastructure.
          </h1>
          <p className="mt-space-6 max-w-[60ch] text-lg text-foreground opacity-80">
            Run Jericho entirely inside your own network. Local inference, local
            verification, local test execution — no outbound calls in this mode.
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
          Who it&apos;s for
        </h2>
        <dl className="mt-space-16 grid gap-space-12 md:grid-cols-3">
          {audience.map((item) => (
            <div key={item.title}>
              <dt className="font-display text-xl text-foreground">
                {item.title}
              </dt>
              <dd className="mt-space-2 max-w-[60ch] text-foreground opacity-70">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <h2 className="max-w-[40ch] font-display text-3xl font-semibold tracking-[var(--tracking-heading)] text-foreground md:text-4xl">
          What&apos;s included
        </h2>
        <dl className="mt-space-16 grid gap-space-12 md:grid-cols-3">
          {included.map((item) => (
            <div key={item.title}>
              <dt className="font-display text-xl text-foreground">
                {item.title}
              </dt>
              <dd className="mt-space-2 max-w-[60ch] text-foreground opacity-70">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <h2 className="max-w-[40ch] font-display text-3xl font-semibold tracking-[var(--tracking-heading)] text-foreground md:text-4xl">
          Hosted vs self-hosted — the honest version
        </h2>
        <div className="mt-space-16 grid gap-space-6 md:grid-cols-2">
          {contrast.map((item) => (
            <article
              key={item.mode}
              className="flex flex-col border border-raised bg-surface p-space-12"
            >
              <h3 className="font-display text-xl text-foreground">
                {item.mode}
              </h3>
              <p className="mt-space-4 max-w-[60ch] text-foreground opacity-70">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <CTABand
        heading="Keep your code in-house."
        body="Request access to discuss a self-hosted or air-gapped Jericho deployment."
      />
    </>
  );
}
