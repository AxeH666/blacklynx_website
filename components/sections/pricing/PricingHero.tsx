import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

export default function PricingHero(): React.JSX.Element {
  return (
    <Section className="py-space-16 md:py-space-20">
      <div className="max-w-[60ch] text-left">
        <Eyebrow>Simple pricing</Eyebrow>
        <DisplayHeading
          as="h1"
          measure="max-w-none"
          wrap="balance"
          className="mt-space-4 [&>span]:block"
        >
          <span>Straightforward pricing.</span>
          <span>No per-token billing.</span>
        </DisplayHeading>

        <p className="mt-space-6 max-w-[60ch] text-lg font-normal text-text-secondary">
          Solo, team, or fully self-hosted. Pick the deployment that fits your
          constraints — every tier includes runtime-verified debugging and
          reachability-aware security.
        </p>
      </div>
    </Section>
  );
}
