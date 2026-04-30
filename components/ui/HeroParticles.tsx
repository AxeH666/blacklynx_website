"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function HeroParticles(): JSX.Element | null {
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  const particleOptions = useMemo<ISourceOptions>(
    () => ({
      background: {
        color: "#000000"
      },
      detectRetina: true,
      fpsLimit: 60,
      fullScreen: {
        enable: false
      },
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            width: 1200,
            height: 800
          }
        },
        color: {
          value: "#00F5FF"
        },
        opacity: {
          value: 0.2
        },
        size: {
          value: { min: 1, max: 2.2 }
        },
        links: {
          enable: true,
          distance: 150,
          color: "#00F5FF",
          opacity: 0.05,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.45,
          outModes: {
            default: "bounce"
          }
        }
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse"
          },
          resize: {
            enable: true
          }
        },
        modes: {
          repulse: {
            distance: 120,
            duration: 0.35
          }
        }
      }
    }),
    []
  );

  if (!particlesReady) {
    return null;
  }

  return (
    <Particles
      id="blacklynx-particles"
      options={particleOptions}
      className="absolute inset-0"
    />
  );
}
