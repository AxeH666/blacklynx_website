import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";
import VoidMount from "@/components/sections/debugging/VoidMount";

export default function DemoMount(): React.JSX.Element {
  return (
    <Section className="pt-space-0 pb-space-16">
      <Reveal>
        <Eyebrow>Live proof</Eyebrow>
        <DisplayHeading measure="max-w-[20ch]" className="mt-space-4">
          Watch it prove a fix
        </DisplayHeading>
        <div className="mt-space-6">
          <VoidMount label="// interactive demo" aspect="video" />
        </div>
      </Reveal>
    </Section>
  );
}
