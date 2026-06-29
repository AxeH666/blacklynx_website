import Section from "@/components/ui/Section";

export default function Proof(): React.JSX.Element {
  return (
    <Section>
      <h2 className="max-w-[40ch] font-display text-3xl font-semibold tracking-[var(--tracking-heading)] text-text md:text-4xl">
        Only shows what it can prove.
      </h2>

      <p className="mt-space-6 max-w-[60ch] text-lg text-text opacity-80">
        Most AI tools generate a fix and move on. Jericho withholds the answer
        until it can verify the fix exists in your real code and passes your
        tests. Silence over a wrong answer.
      </p>
    </Section>
  );
}
