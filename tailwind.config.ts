import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0D14",
        panel: "#12151F",
        panel2: "#171B27",
        hairline: "#242A3D",
        ivory: "#EDEEF3",
        muted: "#9198AE",
        muted2: "#5C6178",
        gold: "#D8B45C",
        "gold-dim": "#8A7333",
        azure: "#5FD0E8",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-space-grotesk)", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
