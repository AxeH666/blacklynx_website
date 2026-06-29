import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Divider from "@/components/ui/Divider";
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
    <Section className="pt-space-0 pb-space-16">
      <Divider etched className="mb-space-12" />
      <Eyebrow>Trust model</Eyebrow>
      <DisplayHeading measure="max-w-[24ch]" className="mt-space-4">
        Why the answer is trustworthy
      </DisplayHeading>

      <dl className="mt-space-8 grid gap-space-6 md:grid-cols-3 md:items-stretch">
        {proofPoints.map((point) => (
          <Card
            key={point.title}
            interactive
            padding="space-8"
            className="flex h-full flex-col"
            innerClassName="flex h-full flex-col"
          >
            <dt className="atom-card__heading font-display text-xl font-medium text-[oklch(0.88_0_0)]">
              {point.title}
            </dt>
            <dd className="atom-card__body mt-space-3 flex-1 text-base font-normal text-text-secondary">
              {point.body}
            </dd>
          </Card>
        ))}
      </dl>
    </Section>
  );
}
