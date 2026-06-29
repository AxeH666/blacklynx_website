import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";
import VoidMount from "@/components/sections/debugging/VoidMount";

export default function SecurityHero(): React.JSX.Element {
  return (
    <Section className="py-space-16 md:py-space-20">
      <div className="grid items-start gap-space-12 lg:grid-cols-2 lg:gap-space-16">
        <div className="max-w-[60ch] text-left">
          <Eyebrow>Reachability-aware</Eyebrow>
          <DisplayHeading
            as="h1"
            measure="max-w-none"
            wrap="balance"
            className="mt-space-4 [&>span]:block md:!text-5xl xl:!text-6xl"
          >
            <span>Security that</span>
            <span>knows your</span>
            <span>codebase.</span>
          </DisplayHeading>

          <p className="mt-space-6 max-w-[60ch] text-lg font-normal text-text-secondary">
            Reachability-aware scanning built into the same plugin. It tells you
            whether a vulnerable package is actually on a path your code runs —
            not just that it exists.
          </p>

          <div className="mt-space-6 flex flex-wrap items-center gap-space-4">
            <CTA variant="primary" href="/waitlist">
              Request access
            </CTA>
            <CTA variant="ghost" href="#reachability">
              See reachability
            </CTA>
          </div>
        </div>

        <div className="w-full lg:mt-[calc(1.125rem+var(--space-4))]">
          <VoidMount label="// reachability map" aspect="square" />
        </div>
      </div>
    </Section>
  );
}
