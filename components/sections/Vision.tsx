const phases = [
  {
    eyebrow: "LIVE NOW",
    title: "OpenForge — AI Debugging",
    details: "Automatic exception capture, root cause analysis, and verified fixes. Django and Python. Sub-30-second response time.",
    active: true
  },
  {
    eyebrow: "2026",
    title: "OpenForge Security — Proactive Scanning",
    details: "Continuous vulnerability detection across every language and framework. SQL injection, broken auth, IDOR, hardcoded secrets - caught before they ship."
  },
  {
    eyebrow: "2027",
    title: "BlackLynx Platform",
    details: "The complete security and reliability platform for engineering organizations. Audit trails, compliance reporting, and real-time threat detection. Fully self-hosted."
  }
];

export default function Vision() {
  return (
    <section id="vision" className="section-shell overflow-hidden">
      <div className="content-grid">
        <h2 className="heading-tight text-[44px] text-blacklynx-text md:text-[64px]">
          The roadmap.
        </h2>
        <p className="mt-5 max-w-[620px] text-xl leading-8 text-blacklynx-muted">
          We&apos;re building the operating system for secure software.
        </p>

        <div className="relative mt-16">
          <div className="absolute left-6 top-0 h-full w-px bg-blacklynx-accent md:left-0 md:top-1/2 md:h-px md:w-full md:-translate-y-1/2" />
          <div className="relative grid gap-6 md:grid-cols-3">
            {phases.map((phase) => (
              <article
                key={phase.eyebrow}
                className={`bg-blacklynx-bg p-7 ${phase.active ? "border border-l-4 border-blacklynx-accent" : "border border-blacklynx-border"}`}
              >
                <p className="text-xs font-semibold tracking-[0.24em] text-blacklynx-accent">
                  {phase.eyebrow}
                </p>
                <h3 className="mt-5 font-heading text-2xl font-semibold leading-tight text-blacklynx-text">
                  {phase.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-blacklynx-muted">
                  {phase.details}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
