"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import Button from "@/components/ui/Button";

const HeroParticles = dynamic(() => import("@/components/ui/HeroParticles"), {
  ssr: false
});

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.16,
          ease: "power3.out"
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden border-b border-blacklynx-border px-6 pt-20"
    >
      <HeroParticles />

      <div className="pointer-events-none absolute inset-x-0 top-[22%] mx-auto h-72 w-72 bg-[radial-gradient(circle,rgba(0,245,255,0.18)_0%,rgba(0,245,255,0)_68%)] opacity-80" />

      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center text-center">
        <div className="hero-reveal cyan-glow mb-8">
          <Image
            src="/logo.png"
            alt="BlackLynx"
            width={120}
            height={120}
            className="h-[120px] w-auto"
            priority
          />
        </div>
        <h1 className="hero-reveal mt-8 heading-tight max-w-[980px] text-[58px] text-blacklynx-text md:text-[96px]">
          Hunt the bug before it hunts you.
        </h1>
        <p className="hero-reveal mt-7 max-w-[600px] text-lg leading-8 text-blacklynx-muted md:text-2xl md:leading-9">
          OpenForge detects bugs and security vulnerabilities before your users
          do. Every language. Every framework. Under 30 seconds.
        </p>
        <div className="hero-reveal mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="#early-access">Request Early Access</Button>
          <Button href="#how-it-works" variant="ghost">
            See How It Works
          </Button>
        </div>
        <p className="hero-reveal mt-6 text-sm text-blacklynx-muted">
          Trusted by engineering teams across India
        </p>
      </div>

      <a
        href="#stats"
        aria-label="Scroll to stats"
        className="absolute bottom-8 left-1/2 h-9 w-9 -translate-x-1/2 border border-blacklynx-accent text-blacklynx-accent"
      >
        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-2 rotate-45 border-b border-r border-blacklynx-accent animate-bounce" />
      </a>
    </section>
  );
}
