const principles = [
  {
    title: "India-hosted. Globally secure.",
    body: "OpenForge runs on BlackLynx GPU infrastructure based entirely in India. Your code never crosses international borders. Enterprise air-gap deployment available."
  },
  {
    title: "No subscriptions. No lock-in.",
    body: "Best-in-class open-weight models. No API keys. No per-token billing. No dependency on any external AI provider. Ever."
  },
  {
    title: "Built for scale.",
    body: "From a two-person startup to a 500-engineer org. Rs. 499 per developer per month. Enterprise pricing available."
  }
];

export default function WhyBlackLynx() {
  return (
    <section className="section-shell grid-bg">
      <div className="content-grid">
        <h2 className="heading-tight mx-auto max-w-[760px] text-center text-[44px] text-blacklynx-text md:text-[64px]">
          Built different. By design.
        </h2>
        <div className="mt-16 grid border border-blacklynx-border bg-blacklynx-bg/80 md:grid-cols-3">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className={`min-h-[300px] p-8 ${index > 0 ? "border-t border-blacklynx-border md:border-l md:border-t-0" : ""}`}
            >
              <h3 className="font-heading text-2xl font-semibold text-blacklynx-text">
                {principle.title}
              </h3>
              <p className="mt-6 text-sm leading-7 text-blacklynx-muted">
                {principle.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
