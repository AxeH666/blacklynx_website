import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import CTA from "@/components/ui/CTA";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

type Tier = {
  index: string;
  mono: string;
  name: string;
  amount: string;
  cadence: string;
  features: string[];
  cta: string;
};

// Equal-weight tiers: all ghost CTAs so the nav silver primary stays the only
// accent in the first viewport (accent discipline).
const tiers: Tier[] = [
  {
    index: "01",
    mono: "solo",
    name: "Solo",
    amount: "$17",
    cadence: "/mo",
    features: [
      "One developer",
      "Hosted debugging + security",
      "Runtime-verified fixes",
      "Community support"
    ],
    cta: "Request access"
  },
  {
    index: "02",
    mono: "team",
    name: "Team",
    amount: "$22",
    cadence: "/seat/mo",
    features: [
      "Everything in Solo",
      "Shared workspace",
      "Per-seat billing",
      "Priority support"
    ],
    cta: "Request access"
  },
  {
    index: "03",
    mono: "self-hosted",
    name: "Self-hosted",
    amount: "$300",
    cadence: "/yr",
    features: [
      "Runs on your infrastructure",
      "Air-gapped deployment",
      "No code leaves your network",
      "Unlimited developers"
    ],
    cta: "Discuss deployment"
  }
];

export default function PricingTiers(): React.JSX.Element {
  return (
    <Section id="tiers" className="pt-space-0 pb-space-16">
      <Eyebrow>Plans</Eyebrow>
      <DisplayHeading measure="max-w-[16ch]" className="mt-space-4">
        Choose your tier
      </DisplayHeading>

      <div className="mt-space-8 grid gap-space-6 md:grid-cols-3 md:items-stretch">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            padding="space-12"
            className="flex h-full w-full flex-col"
            innerClassName="flex h-full flex-col"
          >
            <Eyebrow>
              <span className="tabular-nums">{tier.index}</span>
              <span className="px-space-2 text-text-muted">/</span>
              {tier.mono}
            </Eyebrow>

            <h3 className="mt-space-6 font-display text-xl font-medium text-foreground">
              {tier.name}
            </h3>

            <div className="mt-space-4">
              <p className="font-display text-4xl font-medium tabular-nums tracking-[var(--tracking-display)] text-foreground">
                {tier.amount}
              </p>
              <p className="mt-space-1 font-mono text-sm tracking-[0.05em] text-text-muted">
                {tier.cadence}
              </p>
            </div>

            <ul className="mt-space-6 flex flex-1 flex-col gap-space-2">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="text-pretty text-base font-normal text-text-secondary"
                >
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-space-8">
              <CTA variant="ghost" href="/waitlist" className="w-full">
                {tier.cta}
              </CTA>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
