import Section from "@/components/ui/Section";

const points: { title: string; body: string }[] = [
  {
    title: "Dependency exposure",
    body: "Maps every package and version against known advisories across your dependency tree."
  },
  {
    title: "Secret detection",
    body: "Flags credentials, tokens, and keys committed anywhere in your source."
  },
  {
    title: "Reachability heuristics",
    body: "Decides whether vulnerable code sits on a path your application actually executes."
  },
  {
    title: "Evidence-bound findings",
    body: "Every finding cites the exact file, line, and call path it was derived from."
  }
];

export default function Security(): React.JSX.Element {
  return (
    <Section id="scanning">
      <h2 className="max-w-[40ch] font-display text-3xl font-semibold tracking-[var(--tracking-heading)] text-foreground md:text-4xl">
        What Jericho scans
      </h2>

      <p className="mt-space-6 max-w-[60ch] text-lg text-foreground opacity-80">
        Four scanning layers, built into the same plugin as debugging.
      </p>

      <dl className="mt-space-16 grid gap-space-12 md:grid-cols-2">
        {points.map((point) => (
          <div key={point.title}>
            <dt className="font-display text-xl text-foreground">
              {point.title}
            </dt>
            <dd className="mt-space-2 max-w-[60ch] text-foreground opacity-70">
              {point.body}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
