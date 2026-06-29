import type { Metadata } from "next";
import Pricing from "@/components/sections/Pricing";

export const metadata: Metadata = {
  title: "Pricing — Jericho",
  description:
    "Solo, team, or fully self-hosted. Straightforward pricing with no per-token billing."
};

export default function PricingPage(): React.JSX.Element {
  return <Pricing />;
}
