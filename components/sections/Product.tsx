"use client";

import Terminal from "@/components/ui/Terminal";

const features = [
  "Automatic bug detection — catches exceptions before they reach users",
  "Continuous security scanning — SQL injection, broken auth, IDOR, hardcoded secrets",
  "Codebase-aware — understands your architecture across every file and dependency",
  "Verified answers — every fix checked against your source before delivery",
  "Supports every major language and framework"
];

export default function Product() {
  return (
    <section id="product" className="section-shell">
      <div className="content-grid grid gap-14 lg:grid-cols-2 lg:gap-0">
        <div className="lg:border-r lg:border-blacklynx-border lg:pr-14">
          <p className="text-xs font-semibold tracking-[0.28em] text-blacklynx-accent">
            PRODUCT
          </p>
          <h2 className="heading-tight mt-6 max-w-[560px] text-[44px] text-blacklynx-text md:text-[64px]">
            OpenForge. The AI engineering assistant that actually understands your code.
          </h2>
          <div className="mt-10 flex flex-col gap-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="border-l border-blacklynx-accent bg-blacklynx-surface px-5 py-4 text-sm text-blacklynx-text"
              >
                {feature}
              </div>
            ))}
          </div>
          <a
            href="https://github.com/AxeH666/openforge"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.08em] text-blacklynx-accent transition-transform hover:translate-x-1"
          >
            View documentation
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="lg:pl-14">
          <Terminal />
        </div>
      </div>
    </section>
  );
}
