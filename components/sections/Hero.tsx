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
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden border-b border-blacklynx-border px-6"
    >
      <HeroParticles />
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[clamp(420px,65vw,800px)] h-[clamp(420px,65vw,800px)] bg-[#00F5FF]/5 blur-[180px] rounded-full" />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
        linear-gradient(#00F5FF 1px, transparent 1px),
        linear-gradient(90deg, #00F5FF 1px, transparent 1px)
      `,
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center text-center">
        <div className="hero-reveal relative flex justify-center items-center mb-8">
          <div className="absolute w-[clamp(200px,25vw,320px)] h-[clamp(200px,25vw,320px)] bg-[#00F5FF]/10 blur-[120px] rounded-full" />
          <Image
            src="/logo.png"
            alt="BlackLynx Logo"
            width={140}
            height={140}
            className="relative z-10 w-[clamp(80px,8vw,140px)] h-auto object-contain"
          />
        </div>
        <h1
          className="hero-reveal text-[clamp(36px,6vw,96px)] leading-[1.05] tracking-[-0.02em] font-bold text-[#F5F5F5] max-w-[1100px]"
        >
          Hunt the bug before it hunts you.
        </h1>
        <p className="hero-reveal mt-6 text-[clamp(16px,1.5vw,22px)] text-[#6B7280] max-w-[600px] leading-relaxed">
          OpenForge detects bugs and security vulnerabilities before your users
          do. Every language. Every framework. Under 30 seconds.
        </p>
        <div className="hero-reveal flex gap-4 mt-10 flex-wrap justify-center">
          <Button href="#early-access" className="hover:bg-[#00d9e6]">
            Request Early Access
          </Button>
          <Button href="#how-it-works" variant="ghost" className="hover:bg-[#00d9e6]">
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
