import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        raised: "var(--raised)",
        overlay: "var(--overlay)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        text: "var(--text)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-fg": "var(--accent-fg)"
      },
      fontFamily: {
        display: ["var(--font-geist)", "Geist", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Geist Mono", "monospace"]
      },
      spacing: {
        "space-1": "var(--space-1)",
        "space-2": "var(--space-2)",
        "space-3": "var(--space-3)",
        "space-4": "var(--space-4)",
        "space-5": "var(--space-5)",
        "space-6": "var(--space-6)",
        "space-8": "var(--space-8)",
        "space-10": "var(--space-10)",
        "space-12": "var(--space-12)",
        "space-16": "var(--space-16)",
        "space-20": "var(--space-20)",
        "space-24": "var(--space-24)"
      },
      transitionTimingFunction: {
        "ease-out-cubic": "var(--ease-out-cubic)",
        "ease-out-snappy": "var(--ease-out-snappy)",
        "ease-spring-bounce": "var(--ease-spring-bounce)",
        "ease-out-quart": "var(--ease-out-quart)",
        "ease-out-expo": "var(--ease-out-expo)"
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        DEFAULT: "var(--dur)",
        slow: "var(--dur-slow)"
      },
      borderRadius: {
        none: "0",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)"
      }
    }
  },
  plugins: []
};

export default config;
