import Section from "@/components/ui/Section";
import Divider from "@/components/ui/Divider";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

const steps: { index: string; title: string; tech: string }[] = [
  {
    index: "01",
    title: "Paste the stack trace",
    tech: "POST /debug"
  },
  {
    index: "02",
    title: "Jericho retrieves the exact code",
    tech: "RAG over your codebase"
  },
  {
    index: "03",
    title: "It verifies against your real functions",
    tech: "confidence_score · verified=true"
  },
  {
    index: "04",
    title: "It runs your tests to prove the fix",
    tech: "runtime verified, then POST /apply"
  }
];

export default function Pipeline(): React.JSX.Element {
  return (
    <Section id="pipeline" className="py-space-16">
      <Eyebrow>Debugging pipeline</Eyebrow>
      <DisplayHeading measure="max-w-[22ch]" className="mt-space-4">
        From stack trace to proven fix
      </DisplayHeading>

      <ol className="mt-space-6">
        {steps.map((step, i) => (
          <li key={step.index}>
            {i > 0 ? <Divider etched className="my-space-4" /> : null}
            <div className="grid gap-space-3 py-space-4 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-space-8">
              <span className="font-mono text-sm tabular-nums tracking-[0.05em] text-text-muted">
                {step.index}
              </span>
              <h3 className="font-display text-xl font-medium text-foreground">
                {step.title}
              </h3>
              <code className="font-mono text-sm tracking-[0.05em] text-text-secondary md:text-right">
                {step.tech}
              </code>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
