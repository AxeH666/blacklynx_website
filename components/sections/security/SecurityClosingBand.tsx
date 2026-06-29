import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import Divider from "@/components/ui/Divider";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

export default function SecurityClosingBand(): React.JSX.Element {
  return (
    <Section className="pt-space-0 pb-space-16">
      <Divider etched className="mb-space-12" />

      <div className="border-l border-border pl-space-8 md:pl-space-12">
        <DisplayHeading measure="max-w-[22ch]">
          Find what actually reaches you.
        </DisplayHeading>
        <p className="mt-space-4 max-w-[55ch] text-lg font-normal text-text-secondary">
          Request access and scan your codebase for vulnerabilities that matter.
        </p>
        <div className="mt-space-6 flex">
          <CTA variant="primary" href="/waitlist">
            Request access
          </CTA>
        </div>
      </div>
    </Section>
  );
}
