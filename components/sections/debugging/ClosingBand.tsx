import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import Divider from "@/components/ui/Divider";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

export default function ClosingBand(): React.JSX.Element {
  return (
    <Section className="py-space-20">
      <Divider etched className="mb-space-12" />
      <DisplayHeading measure="max-w-[22ch]">
        Put it on your next stack trace.
      </DisplayHeading>
      <p className="mt-space-4 max-w-[60ch] text-lg font-normal text-text-secondary">
        Request access and let Jericho prove the fix on your own codebase.
      </p>
      <div className="mt-space-6 flex">
        <CTA variant="primary" href="/waitlist">
          Request access
        </CTA>
      </div>
    </Section>
  );
}
