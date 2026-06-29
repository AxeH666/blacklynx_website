import Link from "next/link";
import Section from "@/components/ui/Section";
import Divider from "@/components/ui/Divider";
import Eyebrow from "@/components/ui/Eyebrow";

export default function PricingTeaser(): React.JSX.Element {
  return (
    <Section className="pt-space-8 pb-space-12">
      <Divider etched className="mb-space-6" />
      <div className="flex flex-col items-start gap-space-4">
        <Eyebrow>Pricing</Eyebrow>
        <p className="max-w-[60ch] text-pretty text-lg font-normal text-text-secondary">
          Solo, team, or fully self-hosted. Straightforward pricing, no per-token
          billing.
        </p>
        <Link
          href="/pricing"
          className="group mt-space-2 inline-flex items-center gap-space-2 font-display text-sm font-medium text-foreground"
        >
          See pricing
          <span
            aria-hidden="true"
            className="text-text-secondary transition-colors group-hover:text-foreground"
          >
            →
          </span>
        </Link>
      </div>
    </Section>
  );
}
