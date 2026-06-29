import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";

const tiers: { name: string; price: string; features: string[] }[] = [
  {
    name: "Solo",
    price: "$17/mo",
    features: [
      "One developer",
      "Hosted debugging + security",
      "Runtime-verified fixes",
      "Community support"
    ]
  },
  {
    name: "Team",
    price: "$22/seat/mo",
    features: [
      "Everything in Solo",
      "Shared workspace",
      "Per-seat billing",
      "Priority support"
    ]
  },
  {
    name: "Self-hosted",
    price: "$300/yr",
    features: [
      "Runs on your infrastructure",
      "Air-gapped deployment",
      "No code leaves your network",
      "Unlimited developers"
    ]
  }
];

export default function Pricing(): React.JSX.Element {
  return (
    <Section id="pricing">
      <h2 className="font-display text-3xl font-semibold tracking-[var(--tracking-heading)] text-text md:text-4xl">
        Pricing
      </h2>

      <div className="mt-space-16 grid gap-space-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="flex flex-col border border-raised bg-surface p-space-8"
          >
            <h3 className="font-display text-xl text-text">
              {tier.name}
            </h3>
            <p className="mt-space-2 font-display text-3xl text-text">
              {tier.price}
            </p>

            <ul className="mt-space-6 flex flex-col gap-space-2">
              {tier.features.map((feature) => (
                <li key={feature} className="text-text opacity-70">
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-space-8 flex">
              <CTA variant="ghost" href="/waitlist" className="w-full">
                Request access
              </CTA>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
