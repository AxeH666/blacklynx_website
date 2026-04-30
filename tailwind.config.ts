import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        blacklynx: {
          bg: "#000000",
          surface: "#0A0A0A",
          accent: "#00F5FF",
          border: "#1A1A1A",
          text: "#F5F5F5",
          muted: "#6B7280"
        }
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
