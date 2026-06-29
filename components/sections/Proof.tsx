import Section from "@/components/ui/Section";
import Divider from "@/components/ui/Divider";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

export default function Proof(): React.JSX.Element {
  return (
    <Section className="pt-space-0 pb-space-16">
      <Divider etched className="mb-space-12" />

      <div className="border-l border-border pl-space-8 md:pl-space-12">
        <div className="grid gap-space-6 md:grid-cols-[minmax(0,30ch)_1fr] md:items-start md:gap-x-space-16">
          <div>
            <Eyebrow>The difference</Eyebrow>
            <DisplayHeading measure="max-w-[16ch]" className="mt-space-4">
              Only shows what it can prove.
            </DisplayHeading>
          </div>

          <p className="text-pretty text-lg font-normal text-text-secondary md:pt-[calc(1.125rem+var(--space-4))]">
            Most AI tools generate a fix and move on. Jericho withholds the answer
            until it can verify the fix exists in your real code and passes your
            tests. Silence over a wrong answer.
          </p>
        </div>
      </div>
    </Section>
  );
}
