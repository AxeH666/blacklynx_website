import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/sections/debugging/DisplayHeading";
import VoidMount from "@/components/sections/debugging/VoidMount";
import Pipeline from "@/components/sections/debugging/Pipeline";
import DemoMount from "@/components/sections/debugging/DemoMount";
import TrustProof from "@/components/sections/debugging/TrustProof";
import ClosingBand from "@/components/sections/debugging/ClosingBand";

export const metadata: Metadata = {
  title: "Debugging — Jericho",
  description:
    "Paste a stack trace. Jericho retrieves the exact function, verifies the fix against your real code, and runs your tests to prove it works."
};

export default function DebuggingPage(): React.JSX.Element {
  return (
    <>
      <Section className="py-space-16 md:py-space-20">
        <div className="grid items-center gap-space-12 lg:grid-cols-2 lg:gap-space-16">
          <div className="max-w-[60ch] text-left">
            <Eyebrow>Debugging</Eyebrow>
            <DisplayHeading
              as="h1"
              measure="max-w-none"
              className="mt-space-4 [&_span]:block"
            >
              <span>Finds the exact bug.</span>
              <span>Proves the fix.</span>
            </DisplayHeading>
            <p className="mt-space-6 max-w-[60ch] text-lg font-normal text-text-secondary">
              Jericho retrieves the exact function from your codebase, verifies the
              fix against your real code, then runs your tests to prove it works
              before it shows you anything.
            </p>
            <div className="mt-space-6 flex flex-wrap items-center gap-space-4">
              <CTA variant="primary" href="/waitlist">
                Request access
              </CTA>
              <CTA variant="ghost" href="#pipeline">
                See the pipeline
              </CTA>
            </div>
          </div>

          {/* 3D CANVAS MOUNT POINT — R3F scene mounts here in a later pass. */}
          <VoidMount label="// visualization loading" aspect="square" />
        </div>
      </Section>

      <Pipeline />
      <DemoMount />
      <TrustProof />
      <ClosingBand />
    </>
  );
}
