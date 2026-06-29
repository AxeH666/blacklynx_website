import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Divider from "@/components/ui/Divider";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

const layers: { index: string; mono: string; title: string; body: string }[] = [
  {
    index: "01",
    mono: "dependency exposure",
    title: "Dependency exposure",
    body: "Maps every package and version against known advisories across your dependency tree."
  },
  {
    index: "02",
    mono: "secret detection",
    title: "Secret detection",
    body: "Flags credentials, tokens, and keys committed anywhere in your source."
  },
  {
    index: "03",
    mono: "reachability heuristics",
    title: "Reachability heuristics",
    body: "Decides whether vulnerable code sits on a path your application actually executes."
  },
  {
    index: "04",
    mono: "evidence-bound findings",
    title: "Evidence-bound findings",
    body: "Every finding cites the exact file, line, and call path it was derived from."
  }
];

export default function ScanningLayers(): React.JSX.Element {
  return (
    <Section id="scanning" className="pt-space-0 pb-space-16">
      <Divider etched className="mb-space-12" />

      <Eyebrow>Scanning layers</Eyebrow>
      <DisplayHeading measure="max-w-[20ch]" className="mt-space-4">
        What Jericho scans
      </DisplayHeading>

      <p className="mt-space-6 max-w-[60ch] text-pretty text-base font-normal text-text-secondary">
        Four scanning layers, built into the same plugin as debugging.
      </p>

      <dl className="mt-space-8 grid gap-space-6 md:grid-cols-2 md:items-stretch">
        {layers.map((layer) => (
          <Card
            key={layer.title}
            interactive
            padding="space-8"
            className="flex h-full flex-col"
            innerClassName="flex h-full flex-col"
          >
            <Eyebrow>
              <span className="tabular-nums">{layer.index}</span>
              <span className="px-space-2 text-text-muted">/</span>
              {layer.mono}
            </Eyebrow>
            <dt className="atom-card__heading mt-space-6 font-display text-xl font-medium text-[oklch(0.88_0_0)]">
              {layer.title}
            </dt>
            <dd className="atom-card__body mt-space-3 flex-1 text-pretty text-base font-normal text-text-secondary">
              {layer.body}
            </dd>
          </Card>
        ))}
      </dl>
    </Section>
  );
}
