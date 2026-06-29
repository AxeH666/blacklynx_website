import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Divider from "@/components/ui/Divider";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

const included: { index: string; mono: string; title: string; body: string }[] = [
  {
    index: "01",
    mono: "local stack",
    title: "Full local stack",
    body: "Retrieval, verification, and test execution all run on hardware you control."
  },
  {
    index: "02",
    mono: "no egress",
    title: "No external API calls",
    body: "In self-hosted mode, nothing about your code or traces leaves your network."
  },
  {
    index: "03",
    mono: "per deployment",
    title: "Unlimited developers",
    body: "Licensed per deployment, not per seat. Onboard the whole org."
  }
];

export default function WhatsIncluded(): React.JSX.Element {
  return (
    <Section className="pt-space-0 pb-space-16">
      <Divider etched className="mb-space-12" />

      <Reveal>
        <Eyebrow>Deployment scope</Eyebrow>
        <DisplayHeading measure="max-w-[18ch]" className="mt-space-4">
          What&apos;s included
        </DisplayHeading>

        <p className="mt-space-6 max-w-[60ch] text-pretty text-base font-normal text-text-secondary">
          Everything required to run Jericho on infrastructure you own — no cloud
          dependency in self-hosted mode.
        </p>
      </Reveal>

      <div className="mt-space-8 grid gap-space-6 md:grid-cols-3 md:items-stretch">
        {included.map((item, index) => (
          <Reveal key={item.title} staggerIndex={index} className="h-full">
          <Card
            interactive
            padding="space-8"
            className="flex h-full flex-col"
            innerClassName="flex h-full flex-col"
          >
            <Eyebrow>
              <span className="tabular-nums">{item.index}</span>
              <span className="px-space-2 text-text-muted">/</span>
              {item.mono}
            </Eyebrow>
            <dt className="atom-card__heading mt-space-6 font-display text-xl font-medium text-[oklch(0.88_0_0)]">
              {item.title}
            </dt>
            <dd className="atom-card__body mt-space-3 flex-1 text-pretty text-base font-normal text-text-secondary">
              {item.body}
            </dd>
          </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
