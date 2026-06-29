import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";

export default function PricingTeaser(): React.JSX.Element {
  return (
    <Section>
      <div className="flex flex-col items-start gap-space-6">
        <p className="max-w-[60ch] text-lg text-text opacity-80">
          Solo, team, or fully self-hosted. Straightforward pricing, no per-token
          billing.
        </p>
        <CTA variant="ghost" href="/pricing">
          See pricing →
        </CTA>
      </div>
    </Section>
  );
}
