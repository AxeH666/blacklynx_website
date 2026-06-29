import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";

const doors: {
  title: string;
  promise: string;
  sub: string;
  href: string;
  label: string;
}[] = [
  {
    title: "Debugging",
    promise: "Find the exact bug. Prove the fix.",
    sub: "Paste a stack trace. Jericho retrieves the real function, verifies the fix, and runs your tests before it shows you anything.",
    href: "/debugging",
    label: "Enter debugging →"
  },
  {
    title: "Security",
    promise: "Know which vulnerabilities actually reach your code.",
    sub: "Reachability-aware scanning in the same plugin. It separates exploitable paths from noise.",
    href: "/security",
    label: "Enter security →"
  }
];

// Equal-weight doorways: both use the ghost variant so neither dominates and the
// silver primary stays rationed to the hero/nav.
export default function Doorways(): React.JSX.Element {
  return (
    <Section>
      <div className="grid gap-space-6 md:grid-cols-2">
        {doors.map((door) => (
          <article
            key={door.title}
            className="flex flex-col border border-raised bg-surface p-space-12"
          >
            <h2 className="font-display text-2xl font-semibold tracking-[var(--tracking-heading)] text-text">
              {door.title}
            </h2>
            <p className="mt-space-4 max-w-[40ch] font-display text-xl text-text">
              {door.promise}
            </p>
            <p className="mt-space-4 max-w-[60ch] text-text opacity-70">
              {door.sub}
            </p>
            <div className="mt-space-8 flex">
              <CTA variant="ghost" href={door.href}>
                {door.label}
              </CTA>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
