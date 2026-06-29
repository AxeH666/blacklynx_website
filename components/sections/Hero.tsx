import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";

export default function Hero(): React.JSX.Element {
  return (
    <Section>
      <div className="grid items-center gap-space-16 lg:grid-cols-2">
        <div className="max-w-[60ch] text-left">
          <h1 className="font-display text-5xl font-semibold tracking-[var(--tracking-display)] text-text md:text-6xl">
            Finds the exact bug. Proves the fix.
          </h1>

          <p className="mt-space-6 max-w-[60ch] text-lg text-text opacity-80">
            Jericho retrieves the exact function from your codebase, verifies the
            fix against your real code, then runs your tests to prove it works. No
            guessing.
          </p>

          <div className="mt-space-8 flex flex-wrap items-center gap-space-4">
            <CTA variant="primary" href="/waitlist">
              Request access
            </CTA>
            <CTA variant="ghost" href="/debugging">
              See how it works
            </CTA>
          </div>

          <p className="mt-space-8 font-mono text-text opacity-60">
            Runtime-verified · Self-hosted or cloud · Python today, more soon
          </p>
        </div>

        {/* 3D CANVAS MOUNT POINT — the hero "lock-on" R3F scene mounts here in a
            later pass (lazy-loaded client wrapper, dynamic ssr:false). Static
            placeholder for now; headline + CTA above stay in SSR'd HTML. */}
        <div
          aria-hidden="true"
          className="aspect-square w-full border border-raised bg-surface"
        />
      </div>
    </Section>
  );
}
