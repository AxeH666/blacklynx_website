import Section from "@/components/ui/Section";
import Divider from "@/components/ui/Divider";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";

const notes: { heading: string; body: string }[] = [
  {
    heading: "Flat pricing",
    body: "No per-token billing and no usage-metered surprises. The price on the card is the price you plan around."
  },
  {
    heading: "The whole product, every tier",
    body: "Every tier includes debugging and security scanning in the same plugin — not stripped-down tiers with paywalled features."
  },
  {
    heading: "Hosted or self-hosted",
    body: "Hosted tiers use cloud inference for the fastest setup. Self-hosted runs fully on your infrastructure when residency matters."
  }
];

export default function PricingFinePrint(): React.JSX.Element {
  return (
    <Section className="pt-space-0 pb-space-16">
      <Divider etched className="mb-space-12" />

      <Eyebrow>Billing model</Eyebrow>
      <DisplayHeading measure="max-w-[20ch]" className="mt-space-4">
        What&apos;s included in every tier
      </DisplayHeading>

      <ul className="mt-space-8 border-l border-border pl-space-8 md:pl-space-12">
        {notes.map((note, i) => (
          <li key={note.heading} className={i > 0 ? "mt-space-6 border-t border-border pt-space-6" : ""}>
            <h3 className="font-display text-lg font-medium tracking-normal text-foreground">
              {note.heading}
            </h3>
            <p className="mt-space-2 max-w-[60ch] text-pretty text-base font-normal text-text-secondary">
              {note.body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
