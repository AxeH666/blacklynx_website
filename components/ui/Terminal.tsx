"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const terminalInput = `● OpenForge detected an exception in auth/views.py`;

const terminalOutput = `ROOT CAUSE
Missing key 'token' in request payload. Handler assumes
token is always present but client omits it on first login.

FIX
Replace direct key access with .get() and handle the
missing case explicitly before proceeding.

CONFIDENCE  ████████████░  94%
VERIFIED    ✓ Grounded against auth/views.py:38–51
SECURITY    No vulnerability detected in this path`;

export default function Terminal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    const fullText = `${terminalInput}

${terminalOutput}`;

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const step = () => {
          frame += 1;
          setText(fullText.slice(0, frame));
          if (frame < fullText.length) {
            window.setTimeout(step, 14);
          }
        };
        step();
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-[420px] border border-blacklynx-border bg-blacklynx-surface"
    >
      <div className="flex h-11 items-center gap-2 border-b border-blacklynx-border px-4">
        <span className="h-2.5 w-2.5 bg-blacklynx-muted" />
        <span className="h-2.5 w-2.5 bg-blacklynx-border" />
        <span className="h-2.5 w-2.5 bg-blacklynx-accent" />
      </div>
      <pre className="whitespace-pre-wrap p-5 font-mono text-sm leading-7 text-blacklynx-text">
        <code>{text}</code>
        <span className="inline-block h-4 w-2 translate-y-0.5 bg-blacklynx-accent" />
      </pre>
    </div>
  );
}
