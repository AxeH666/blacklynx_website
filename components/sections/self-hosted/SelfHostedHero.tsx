import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";
import VoidMount from "@/components/sections/debugging/VoidMount";

export default function SelfHostedHero(): React.JSX.Element {
  return (
    <Section className="py-space-16 md:py-space-20">
      <div className="grid items-start gap-space-12 lg:grid-cols-2 lg:gap-space-16">
        <div className="max-w-[60ch] text-left">
          <Eyebrow>Self-hosted</Eyebrow>
          <DisplayHeading
            as="h1"
            measure="max-w-none"
            wrap="balance"
            className="mt-space-4 [&>span]:block md:!text-5xl xl:!text-6xl"
          >
            <span>Your code</span>
            <span>never leaves</span>
            <span>your&nbsp;infrastructure.</span>
          </DisplayHeading>

          <p className="mt-space-6 max-w-[60ch] text-lg font-normal text-text-secondary">
            Run Jericho entirely inside your own network. Local inference, local
            verification, local test execution — no outbound calls in this mode.
          </p>

          <div className="mt-space-6 flex flex-wrap items-center gap-space-4">
            <CTA variant="primary" href="/waitlist">
              Request access
            </CTA>
            <CTA variant="ghost" href="#contrast">
              Hosted vs self-hosted
            </CTA>
          </div>
        </div>

        <div className="w-full lg:mt-[calc(1.125rem+var(--space-4))]">
          <VoidMount label="// air-gapped deployment" aspect="square" />
        </div>
      </div>
    </Section>
  );
}
