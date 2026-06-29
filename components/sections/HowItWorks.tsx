import Section from "@/components/ui/Section";

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

export default function HowItWorks(): React.JSX.Element {
  return (
    <Section id="how">
      <h2 className="max-w-[40ch] font-display text-3xl font-semibold tracking-[var(--tracking-heading)] text-foreground md:text-4xl">
        From stack trace to proven fix
      </h2>

      <ol className="mt-space-16">
        {steps.map((step, i) => (
          <li
            key={step.index}
            className={`grid gap-space-4 py-space-8 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-space-8 ${
              i > 0 ? "border-t border-raised" : ""
            }`}
          >
            <span className="font-mono text-foreground opacity-50">
              {step.index}
            </span>
            <h3 className="font-display text-xl text-foreground">
              {step.title}
            </h3>
            <code className="text-foreground opacity-70 md:text-right">
              {step.tech}
            </code>
          </li>
        ))}
      </ol>
    </Section>
  );
}
