"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Install once",
    body: "One plugin. Connects to your IDE and your repository. Works with every major language and framework out of the box. No configuration. No cloud accounts required.",
    icon: "folder"
  },
  {
    number: "02",
    title: "OpenForge watches your code",
    body: "OpenForge monitors your codebase and flags potential bugs and vulnerabilities as they're introduced. You stay in control - every finding requires your confirmation before any action is taken.",
    icon: "terminal"
  },
  {
    number: "03",
    title: "Fix with confidence",
    body: "Root cause, exact location, verified fix, security impact. Delivered in under 30 seconds. Every answer is verified against your source before it reaches you.",
    icon: "check"
  }
];

function StepIcon({ type }: { type: string }) {
  if (type === "folder") {
    return (
      <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
        <path d="M6 14h14l4 5h18v19H6V14Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M13 28h22M18 34h12" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (type === "terminal") {
    return (
      <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
        <path d="M7 11h34v26H7V11Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="m15 20 6 5-6 5M25 31h10" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
      <path d="M9 25 20 36 39 13" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 8h32v32H8V8Z" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-step",
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            once: true
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={ref} className="section-shell">
      <div className="content-grid">
        <h2 className="heading-tight max-w-[860px] text-[44px] text-blacklynx-text md:text-[64px]">
          From code to fix. No guesswork.
        </h2>
        <div className="mt-16 grid border border-blacklynx-border md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className={`work-step min-h-[360px] p-8 ${index > 0 ? "border-t border-blacklynx-border md:border-l md:border-t-0" : ""}`}
            >
              <div className="text-xs font-semibold tracking-[0.24em] text-blacklynx-accent">
                {step.number}
              </div>
              <div className="mt-12 text-blacklynx-accent">
                <StepIcon type={step.icon} />
              </div>
              <h3 className="mt-10 font-heading text-2xl font-semibold text-blacklynx-text">
                {step.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-blacklynx-muted">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
