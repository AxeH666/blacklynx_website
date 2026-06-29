import type { Metadata } from "next";
import SelfHostedHero from "@/components/sections/self-hosted/SelfHostedHero";
import WhoItsFor from "@/components/sections/self-hosted/WhoItsFor";
import WhatsIncluded from "@/components/sections/self-hosted/WhatsIncluded";
import DeploymentContrast from "@/components/sections/self-hosted/DeploymentContrast";
import SelfHostedClosingBand from "@/components/sections/self-hosted/SelfHostedClosingBand";

export const metadata: Metadata = {
  title: "Self-hosted — Jericho",
  description:
    "Run Jericho fully inside your own infrastructure. Air-gapped, local-only inference, no external API calls. Built for regulated and government teams."
};

export default function SelfHostedPage(): React.JSX.Element {
  return (
    <>
      <SelfHostedHero />
      <WhoItsFor />
      <WhatsIncluded />
      <DeploymentContrast />
      <SelfHostedClosingBand />
    </>
  );
}
