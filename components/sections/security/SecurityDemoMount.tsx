import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";
import VoidMount from "@/components/sections/debugging/VoidMount";

export default function SecurityDemoMount(): React.JSX.Element {
  return (
    <Section className="pt-space-0 pb-space-16">
      <Eyebrow>Live proof</Eyebrow>
      <DisplayHeading measure="max-w-[24ch]" className="mt-space-4">
        Watch it trace a vulnerability
      </DisplayHeading>
      <div className="mt-space-6">
        <VoidMount label="// vulnerability trace" aspect="video" />
      </div>
    </Section>
  );
}
