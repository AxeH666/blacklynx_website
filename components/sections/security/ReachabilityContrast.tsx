import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

const states: {
  label: string;
  path: string;
  title: string;
  body: string;
}[] = [
  {
    label: "reachable: false",
    path: "lodash@4.17.20 → tree-shaken, never imported",
    title: "Noise most scanners report",
    body: "A flawed package is in your tree, but no code path in your application ever calls the affected function. Real, but not exploitable here."
  },
  {
    label: "reachable: true",
    path: "requests@2.28.0 → app/http/client.py:84",
    title: "What Jericho surfaces first",
    body: "The vulnerable function sits on a call path your code executes. This is the finding that deserves your attention now."
  }
];

export default function ReachabilityContrast(): React.JSX.Element {
  return (
    <Section id="reachability" className="pt-space-0 pb-space-16">
      <Reveal>
        <Eyebrow>Reachability model</Eyebrow>
        <DisplayHeading measure="max-w-[18ch]" className="mt-space-4">
          Reachable beats present
        </DisplayHeading>

        <p className="mt-space-6 max-w-[60ch] text-pretty text-lg font-normal text-text-secondary">
          Most tools flag every advisory in your lockfile. Jericho separates
          vulnerabilities that exist from vulnerabilities your code can actually
          reach.
        </p>
      </Reveal>

      <div className="mt-space-8 border-l border-border pl-space-8 md:pl-space-12">
        <div className="grid gap-space-6 md:grid-cols-2 md:items-stretch">
          {states.map((state, index) => (
            <Reveal key={state.label} staggerIndex={index} className="h-full">
            <Card
              interactive
              padding="space-12"
              className="flex h-full flex-col"
              innerClassName="flex h-full flex-col"
            >
              <code className="font-mono text-sm tracking-[0.05em] text-text-muted">
                {state.label}
              </code>
              <code className="mt-space-2 block font-mono text-xs tracking-[0.05em] text-text-secondary">
                {state.path}
              </code>
              <h3 className="atom-card__heading mt-space-6 font-display text-xl font-medium text-[oklch(0.88_0_0)]">
                {state.title}
              </h3>
              <p className="atom-card__body mt-space-3 flex-1 text-pretty text-base font-normal text-text-secondary">
                {state.body}
              </p>
            </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
