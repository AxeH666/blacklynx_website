import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";

type CTABandProps = {
  heading: string;
  body: string;
};

// The single silver primary in its own viewport — the conversion action at the
// bottom of each spoke page.
export default function CTABand({
  heading,
  body
}: CTABandProps): React.JSX.Element {
  return (
    <Section>
      <h2 className="max-w-[40ch] font-display text-3xl font-semibold tracking-[var(--tracking-heading)] text-text md:text-4xl">
        {heading}
      </h2>
      <p className="mt-space-6 max-w-[60ch] text-lg text-text opacity-80">
        {body}
      </p>
      <div className="mt-space-8 flex">
        <CTA variant="primary" href="/waitlist">
          Request access
        </CTA>
      </div>
    </Section>
  );
}
