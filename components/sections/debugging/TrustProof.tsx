import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

const proofPoints: { title: string; body: string }[] = [
  {
    title: "Grounded in your real functions",
    body: "Retrieval runs over your actual codebase — the fix references code that exists, not a plausible-looking invention."
  },
  {
    title: "Verified before you see it",
    body: "A fix is only surfaced once it passes verification against your source and your test suite."
  },
  {
    title: "Silence over a wrong answer",
    body: "If Jericho can't prove a fix, it says nothing. No confident hallucinations."
  }
];

export default function TrustProof(): React.JSX.Element {
  return (
    <Section className="py-space-16">
      <Eyebrow>Trust model</Eyebrow>
      <DisplayHeading measure="max-w-[24ch]" className="mt-space-4">
        Why the answer is trustworthy
      </DisplayHeading>

      <dl className="mt-space-8 grid gap-space-6 md:grid-cols-3">
        {proofPoints.map((point) => (
          <Card key={point.title} padding="space-8">
            <dt className="font-display text-xl font-medium text-foreground">
              {point.title}
            </dt>
            <dd className="mt-space-3 text-base font-normal text-text-secondary">
              {point.body}
            </dd>
          </Card>
        ))}
      </dl>
    </Section>
  );
}
