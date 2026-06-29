import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import HowItWorks from "@/components/sections/HowItWorks";
import Demo from "@/components/sections/Demo";
import CTABand from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "Debugging — Jericho",
  description:
    "Paste a stack trace. Jericho retrieves the exact function, verifies the fix against your real code, and runs your tests to prove it works."
};

const proofPoints: { title: string; body: string }[] = [
  {
    title: "Grounded in your real functions",
    body: "Retrieval runs over your actual codebase — the fix references code that exists, not a plausible-looking invention."
  },
  {
    title: "Verified before you see it",
    body: "A fix is only surfaced once it passes verification against your source and your test suite."
  },
  {
    title: "Silence over a wrong answer",
    body: "If Jericho can't prove a fix, it says nothing. No confident hallucinations."
  }
];

export default function DebuggingPage(): React.JSX.Element {
  return (
    <>
      <Section>
        <div className="grid items-center gap-space-16 lg:grid-cols-2">
          <div className="max-w-[60ch] text-left">
            <h1 className="font-display text-5xl font-semibold tracking-[var(--tracking-display)] text-text md:text-6xl">
              Finds the exact bug. Proves the fix.
            </h1>
            <p className="mt-space-6 max-w-[60ch] text-lg text-text opacity-80">
              Jericho retrieves the exact function from your codebase, verifies the
              fix against your real code, then runs your tests to prove it works
              before it shows you anything.
            </p>
            <div className="mt-space-8 flex flex-wrap items-center gap-space-4">
              <CTA variant="primary" href="/waitlist">
                Request access
              </CTA>
              <CTA variant="ghost" href="#pipeline">
                See the pipeline
              </CTA>
            </div>
          </div>

          {/* 3D CANVAS MOUNT POINT — debugging hero "lock-on" R3F scene mounts
              here in a later pass (lazy-loaded client wrapper, dynamic ssr:false).
              Static placeholder for now; headline + CTA stay in SSR'd HTML. */}
          <div
            aria-hidden="true"
            className="aspect-square w-full border border-raised bg-surface"
          />
        </div>
      </Section>

      {/* TODO: debugging gets its own deeper pipeline treatment later — HowItWorks is a temporary shared placeholder, keep this swappable. */}
      <div id="pipeline">
        <HowItWorks />
      </div>

      <Demo title="Watch it prove a fix" />

      <Section>
        <h2 className="max-w-[40ch] font-display text-3xl font-semibold tracking-[var(--tracking-heading)] text-text md:text-4xl">
          Why the answer is trustworthy
        </h2>
        <dl className="mt-space-16 grid gap-space-12 md:grid-cols-3">
          {proofPoints.map((point) => (
            <div key={point.title}>
              <dt className="font-display text-xl text-text">
                {point.title}
              </dt>
              <dd className="mt-space-2 max-w-[60ch] text-text opacity-70">
                {point.body}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <CTABand
        heading="Put it on your next stack trace."
        body="Request access and let Jericho prove the fix on your own codebase."
      />
    </>
  );
}
