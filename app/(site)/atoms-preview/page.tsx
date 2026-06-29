import type { Metadata } from "next";
import CTA from "@/components/ui/CTA";
import Card from "@/components/ui/Card";
import { cardInnerRadiusStyle } from "@/components/ui/cardInnerRadiusStyle";
import Divider from "@/components/ui/Divider";
import Eyebrow from "@/components/ui/Eyebrow";

// DEV ONLY — remove this route before launch. Atom chrome preview (Stage 2).
export const metadata: Metadata = {
  title: "Atoms Preview (dev) — Jericho",
  robots: { index: false, follow: false }
};

export default function AtomsPreviewPage(): React.JSX.Element {
  return (
    <div className="bg-canvas py-space-24">
      <div className="mx-auto max-w-3xl space-y-space-16 px-space-6">
        <header className="space-y-space-4 border border-border bg-surface p-space-8">
          <Eyebrow>Dev only</Eyebrow>
          <h1 className="font-display text-2xl font-semibold text-foreground">
            Stage 2 atom preview
          </h1>
          <p className="text-sm text-text-secondary">
            Remove <code className="font-mono">app/(site)/atoms-preview/</code> before
            launch. Hub and spokes are unchanged — atoms only.
          </p>
        </header>

        <section className="space-y-space-6">
          <Eyebrow>Buttons</Eyebrow>
          <div className="flex flex-wrap items-center gap-space-4">
            <CTA variant="primary" href="#primary">
              Primary default
            </CTA>
            <CTA variant="ghost" href="#ghost">
              Ghost default
            </CTA>
            <CTA variant="primary" href="#compact" size="compact">
              Primary compact
            </CTA>
            <CTA variant="ghost" href="#ghost-compact" size="compact">
              Ghost compact
            </CTA>
          </div>
        </section>

        <Divider etched />

        <section className="space-y-space-6">
          <Eyebrow>Card</Eyebrow>
          <Card padding="space-12">
            <Eyebrow>Surface chrome</Eyebrow>
            <p className="mt-space-4 max-w-[50ch] text-sm text-text-secondary">
              Real <code className="font-mono">--border</code> hairline, top-lit inset
              highlight, optional sheen. Nested panel uses concentric radius.
            </p>
            <div
              className="mt-space-8 border border-border bg-raised p-space-6"
              style={cardInnerRadiusStyle()}
            >
              <p className="font-mono text-xs text-text-muted">
                inner radius = calc(var(--card-radius) - var(--card-padding))
              </p>
            </div>
          </Card>
        </section>

        <section className="space-y-space-6">
          <Eyebrow>Divider</Eyebrow>
          <p className="text-sm text-text-secondary">Plain hairline</p>
          <Divider />
          <p className="text-sm text-text-secondary">Etched (inset highlight beneath)</p>
          <Divider etched />
        </section>

        <section className="space-y-space-4">
          <Eyebrow>Eyebrow</Eyebrow>
          <p className="text-sm text-text-secondary">
            Mono uppercase label — technical signal per D3.
          </p>
        </section>
      </div>
    </div>
  );
}
