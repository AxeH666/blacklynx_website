import type { Metadata } from "next";
import SecurityHero from "@/components/sections/security/SecurityHero";
import ReachabilityContrast from "@/components/sections/security/ReachabilityContrast";
import ScanningLayers from "@/components/sections/security/ScanningLayers";
import SecurityDemoMount from "@/components/sections/security/SecurityDemoMount";
import SecurityClosingBand from "@/components/sections/security/SecurityClosingBand";

export const metadata: Metadata = {
  title: "Security — Jericho",
  description:
    "Reachability-aware scanning that tells you whether a vulnerable package is actually on a path your code runs — not just that it exists."
};

export default function SecurityPage(): React.JSX.Element {
  return (
    <>
      <SecurityHero />
      <ReachabilityContrast />
      <ScanningLayers />
      <SecurityDemoMount />
      <SecurityClosingBand />
    </>
  );
}
