import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Divider from "@/components/ui/Divider";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

const modes: {
  label: string;
  path: string;
  title: string;
  body: string;
}[] = [
  {
    label: "network: cloud",
    path: "inference → third-party APIs · store=false",
    title: "Hosted",
    body: "Uses cloud inference APIs for the fastest setup and lowest maintenance. Your code and traces are sent to those APIs to produce a fix — nothing is stored after the request completes."
  },
  {
    label: "network: local",
    path: "inference → on-prem · egress=none",
    title: "Self-hosted",
    body: "Fully local and air-gappable. More setup to stand up, but no code or trace leaves your infrastructure. The right choice when residency and isolation matter."
  }
];

export default function DeploymentContrast(): React.JSX.Element {
  return (
    <Section id="contrast" className="pt-space-0 pb-space-16">
      <Divider etched className="mb-space-12" />

      <Reveal>
        <Eyebrow>Deployment model</Eyebrow>
        <DisplayHeading measure="max-w-[28ch]" className="mt-space-4">
          Hosted vs self-hosted — the honest version
        </DisplayHeading>

        <p className="mt-space-6 max-w-[60ch] text-pretty text-lg font-normal text-text-secondary">
          Both are legitimate. Hosted optimizes for speed and simplicity; self-hosted
          optimizes for control and isolation. Pick based on your constraints, not
          marketing.
        </p>
      </Reveal>

      <div className="mt-space-8 border-l border-border pl-space-8 md:pl-space-12">
        <div className="grid gap-space-6 md:grid-cols-2 md:items-stretch">
          {modes.map((mode, index) => (
            <Reveal key={mode.label} staggerIndex={index} className="h-full">
            <Card
              interactive
              padding="space-12"
              className="flex h-full flex-col"
              innerClassName="flex h-full flex-col"
            >
              <code className="font-mono text-sm tracking-[0.05em] text-text-muted">
                {mode.label}
              </code>
              <code className="mt-space-2 block font-mono text-xs tracking-[0.05em] text-text-secondary">
                {mode.path}
              </code>
              <h3 className="atom-card__heading mt-space-6 font-display text-xl font-medium text-[oklch(0.88_0_0)]">
                {mode.title}
              </h3>
              <p className="atom-card__body mt-space-3 flex-1 text-pretty text-base font-normal text-text-secondary">
                {mode.body}
              </p>
            </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
