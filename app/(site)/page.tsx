import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Doorways from "@/components/sections/Doorways";
import Proof from "@/components/sections/Proof";
import PricingTeaser from "@/components/sections/PricingTeaser";

export const metadata: Metadata = {
  title: "Jericho — Proof, not guesses",
  description:
    "Jericho finds the exact bug, proves the fix against your real code, and scans for vulnerabilities that actually reach you."
};

export default function Home(): React.JSX.Element {
  return (
    <>
      <Hero />
      <Doorways />
      <Proof />
      <PricingTeaser />
    </>
  );
}
