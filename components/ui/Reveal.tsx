"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType
} from "react";

/** Stagger step between sibling reveals (DESIGN.LAWS PART 5 — 40–80ms). */
export const REVEAL_STAGGER_STEP_MS = 50;

const OBSERVER_ROOT_MARGIN = "0px 0px 12% 0px";
const OBSERVER_THRESHOLD = 0.01;

type RevealPhase = "idle" | "pending" | "revealed";

type RevealOwnProps<T extends ElementType> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  /** `eager` = never hide (heroes / LCP). `scroll` = IntersectionObserver (default). */
  mode?: "scroll" | "eager";
  /** Sibling index for cascade delay (`index * REVEAL_STAGGER_STEP_MS`). */
  staggerIndex?: number;
};

type RevealProps<T extends ElementType = "div"> = RevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps<T>>;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isInRevealZone(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const viewHeight = window.innerHeight;
  const visibleHeight = Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0);

  if (visibleHeight <= 0) {
    return false;
  }

  const visibleRatio = visibleHeight / Math.max(rect.height, 1);
  return visibleRatio >= 0.12 || rect.top <= viewHeight * 0.88;
}

export default function Reveal<T extends ElementType = "div">({
  as,
  children,
  className = "",
  mode = "scroll",
  staggerIndex = 0,
  ...rest
}: RevealProps<T>): React.JSX.Element {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<RevealPhase>("idle");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (mode === "eager" || prefersReducedMotion()) {
      setPhase("revealed");
      return;
    }

    if (isInRevealZone(el)) {
      setPhase("revealed");
      return;
    }

    setPhase("pending");

    const delayMs = staggerIndex * REVEAL_STAGGER_STEP_MS;
    let timeoutId: number | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          return;
        }

        observer.disconnect();

        const reveal = (): void => {
          setPhase("revealed");
        };

        if (delayMs > 0) {
          timeoutId = window.setTimeout(reveal, delayMs);
        } else {
          reveal();
        }
      },
      { rootMargin: OBSERVER_ROOT_MARGIN, threshold: OBSERVER_THRESHOLD }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [mode, staggerIndex]);

  const classes = [
    "reveal",
    phase === "pending" ? "reveal--pending" : "",
    phase === "revealed" ? "reveal--visible" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
