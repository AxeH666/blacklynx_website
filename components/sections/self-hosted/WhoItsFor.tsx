import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

const audiences: { index: string; mono: string; title: string; body: string }[] = [
  {
    index: "01",
    mono: "regulated industries",
    title: "Regulated industries",
    body: "Finance, healthcare, and other teams bound by data-residency and compliance requirements."
  },
  {
    index: "02",
    mono: "government",
    title: "Government",
    body: "Public-sector environments where source code cannot leave controlled networks."
  },
  {
    index: "03",
    mono: "air-gapped",
    title: "Air-gapped environments",
    body: "Networks with no outbound internet access, where every dependency runs locally."
  }
];

export default function WhoItsFor(): React.JSX.Element {
  return (
    <Section className="pt-space-0 pb-space-16">
      <Eyebrow>Audience</Eyebrow>
      <DisplayHeading measure="max-w-[16ch]" className="mt-space-4">
        Who it&apos;s for
      </DisplayHeading>

      <dl className="mt-space-8 grid gap-space-6 md:grid-cols-3 md:items-stretch">
        {audiences.map((item) => (
          <Card
            key={item.title}
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
        ))}
      </dl>
    </Section>
  );
}
