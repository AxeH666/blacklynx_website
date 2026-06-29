import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";
import ProofCard from "@/components/sections/ProofCard";

export default function Hero(): React.JSX.Element {
  return (
    <Section className="py-space-16 md:py-space-20">
      <div className="grid items-start gap-space-12 lg:grid-cols-2 lg:gap-space-16">
        <div className="max-w-[60ch] text-left">
          <Eyebrow>Proof, not guesses</Eyebrow>
          <DisplayHeading
            as="h1"
            measure="max-w-none"
            wrap="balance"
            className="mt-space-4 [&>span]:block lg:[&>span]:whitespace-nowrap"
          >
            <span>Finds the exact&nbsp;bug.</span>
            <span>Proves the fix.</span>
          </DisplayHeading>

          <p className="mt-space-6 max-w-[60ch] text-lg font-normal text-text-secondary">
            Jericho retrieves the exact function from your codebase, verifies the
            fix against your real code, then runs your tests to prove it works. No
            guessing.
          </p>

          <div className="mt-space-6 flex flex-wrap items-center gap-space-4">
            <CTA variant="primary" href="/waitlist">
              Request access
            </CTA>
            <CTA variant="ghost" href="/debugging">
              See how it works
            </CTA>
          </div>

          <p className="mt-space-8 font-mono text-sm tracking-[0.05em] text-text-muted">
            Runtime-verified · Self-hosted or cloud · Python today, more soon
          </p>
        </div>

        {/* Offset panel top to h1 cap-line: eyebrow line box + heading top margin */}
        <div className="w-full lg:mt-[calc(1.125rem+var(--space-4))]">
          <ProofCard />
        </div>
      </div>
    </Section>
  );
}
