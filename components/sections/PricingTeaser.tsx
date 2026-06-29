import Link from "next/link";
import Section from "@/components/ui/Section";
import Divider from "@/components/ui/Divider";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function PricingTeaser(): React.JSX.Element {
  return (
    <Section className="pt-space-0 pb-space-16">
      <Divider etched className="mb-space-8" />

      <Reveal>
      <div className="flex flex-col gap-space-4 md:flex-row md:items-center md:justify-between md:gap-space-12">
        <div className="min-w-0">
          <Eyebrow>Pricing</Eyebrow>
          <p className="mt-space-2 max-w-[52ch] text-pretty text-base font-normal text-text-secondary">
            Solo, team, or fully self-hosted. Straightforward pricing, no per-token
            billing.
          </p>
        </div>

        <Link
          href="/pricing"
          className="atom-levitate group inline-flex shrink-0 items-center gap-space-2 self-start rounded-lg font-display text-sm font-medium text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/80 md:self-center"
        >
          See pricing
          <span
            aria-hidden="true"
            className="atom-arrow-cue text-text-secondary group-hover:text-foreground"
          >
            →
          </span>
        </Link>
      </div>
      </Reveal>
    </Section>
  );
}
