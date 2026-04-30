"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 30, prefix: "< ", suffix: "s", label: "From error to verified fix" },
  { value: 0, suffix: "", label: "Vulnerabilities that reach production undetected" },
  { value: 50, suffix: "+", label: "Languages and frameworks supported" },
  { value: 100, suffix: "%", label: "India-hosted infrastructure" }
];

export default function StatsBar() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-stat]").forEach((element) => {
        const target = Number(element.dataset.value ?? "0");
        const prefix = element.dataset.prefix ?? "";
        const suffix = element.dataset.suffix ?? "";
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            once: true
          },
          onUpdate: () => {
            element.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
          }
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" ref={ref} className="w-full border-y border-[#1A1A1A]">
      <div className="max-w-5xl mx-auto grid grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`px-10 py-12 ${index > 0 ? "border-l border-[#1A1A1A]" : ""}`}
          >
            <div
              data-stat
              data-value={stat.value}
              data-prefix={stat.prefix ?? ""}
              data-suffix={stat.suffix ?? ""}
              className="heading-tight text-4xl text-blacklynx-text md:text-5xl"
            >
              {`${stat.prefix ?? ""}0${stat.suffix ?? ""}`}
            </div>
            <p className="mt-3 text-sm leading-6 text-blacklynx-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
