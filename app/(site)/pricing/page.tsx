import type { Metadata } from "next";
import PricingHero from "@/components/sections/pricing/PricingHero";
import PricingTiers from "@/components/sections/pricing/PricingTiers";
import PricingFinePrint from "@/components/sections/pricing/PricingFinePrint";
import PricingClosingBand from "@/components/sections/pricing/PricingClosingBand";

export const metadata: Metadata = {
  title: "Pricing — Jericho",
  description:
    "Solo, team, or fully self-hosted. Straightforward pricing with no per-token billing."
};

export default function PricingPage(): React.JSX.Element {
  return (
    <>
      <PricingHero />
      <PricingTiers />
      <PricingFinePrint />
      <PricingClosingBand />
    </>
  );
}
