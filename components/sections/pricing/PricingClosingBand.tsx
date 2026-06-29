import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import Divider from "@/components/ui/Divider";
import Reveal from "@/components/ui/Reveal";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

export default function PricingClosingBand(): React.JSX.Element {
  return (
    <Section className="pt-space-0 pb-space-16">
      <Divider etched className="mb-space-12" />

      <Reveal>
      <div className="border-l border-border pl-space-8 md:pl-space-12">
        <DisplayHeading measure="max-w-[22ch]">
          Start with the tier that fits.
        </DisplayHeading>
        <p className="mt-space-4 max-w-[55ch] text-lg font-normal text-text-secondary">
          Request access and we&apos;ll help you choose hosted or self-hosted for
          your team.
        </p>
        <div className="mt-space-6 flex">
          <CTA variant="primary" href="/waitlist">
            Request access
          </CTA>
        </div>
      </div>
      </Reveal>
    </Section>
  );
}
