import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        strike: {
          bg: "#080808",
          text: "#F0F0F0",
          accent: "#C8102E",
          dim: "#7A0A1A",
          border: "#1A1A1A",
          mid: "#2A2A2A",
          muted: "#555555"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
