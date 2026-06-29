import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

export default function Proof(): React.JSX.Element {
  return (
    <Section className="pt-space-16 pb-space-8">
      <Eyebrow>The difference</Eyebrow>
      <DisplayHeading measure="max-w-[20ch]" className="mt-space-4">
        Only shows what it can prove.
      </DisplayHeading>

      <p className="mt-space-6 max-w-[60ch] text-pretty text-lg font-normal text-text-secondary">
        Most AI tools generate a fix and move on. Jericho withholds the answer
        until it can verify the fix exists in your real code and passes your
        tests. Silence over a wrong answer.
      </p>
    </Section>
  );
}
