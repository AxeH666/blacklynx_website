"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "Product", href: "#product" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Vision", href: "#vision" },
  {
    label: "GitHub",
    href: "https://github.com/AxeH666/openforge",
    external: true
  }
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let lastScroll = window.scrollY;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: () => {
        const current = window.scrollY;
        gsap.to(nav, {
          y: current > lastScroll && current > 80 ? -88 : 0,
          duration: 0.28,
          ease: "power2.out",
          overwrite: true
        });
        lastScroll = current;
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-blacklynx-border bg-blacklynx-bg/85 backdrop-blur-xl"
    >
      <nav className="mx-auto grid h-20 w-full max-w-[1280px] grid-cols-[auto_1fr_auto] items-center px-6">
        <a href="#hero" className="flex items-center mr-6">
          <Image src="/logo.png" alt="BlackLynx" width={128} height={48} className="h-8 w-auto" />
        </a>

        <div className="hidden items-center justify-center gap-6 text-[18px] font-semibold text-blacklynx-muted md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="transition-colors hover:text-blacklynx-text"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden justify-end md:flex">
          <Button href="#early-access" className="h-11 px-5">
            Request Access
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="col-start-3 ml-auto flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-blacklynx-border md:hidden"
        >
          <span className="h-px w-5 bg-blacklynx-text" />
          <span className="h-px w-5 bg-blacklynx-text" />
          <span className="h-px w-5 bg-blacklynx-text" />
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-t border-blacklynx-border bg-blacklynx-bg px-6 py-5 md:hidden"
          >
            <div className="flex flex-col gap-5 text-[18px] font-semibold text-blacklynx-muted">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button href="#early-access" onClick={() => setOpen(false)}>
                Request Access
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
