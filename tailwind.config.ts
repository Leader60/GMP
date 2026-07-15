import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0F19",
        surface: "#131A2A",
        surface2: "#1B2438",
        hairline: "#2A3552",
        paper: "#F5F3EE",
        muted: "#8B93A7",
        gold: "#E3B23C",
        ember: "#E4572E",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(245,243,238,0.045) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;
