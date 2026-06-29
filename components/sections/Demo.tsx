import Section from "@/components/ui/Section";

type DemoProps = {
  title?: string;
};

export default function Demo({
  title = "Watch it prove a fix"
}: DemoProps): React.JSX.Element {
  return (
    <Section>
      <h2 className="font-display text-3xl font-semibold tracking-[var(--tracking-heading)] text-text md:text-4xl">
        {title}
      </h2>

      {/* INTERACTIVE DEMO MOUNT POINT — the real interactive product demo gets
          rebuilt here in a later pass. Empty bordered container for now. */}
      <div
        aria-hidden="true"
        className="mt-space-8 aspect-video w-full border border-raised bg-surface"
      />
    </Section>
  );
}
