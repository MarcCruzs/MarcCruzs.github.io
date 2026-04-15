import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // All colors pull from CSS vars — swap theme by swapping vars, not code.
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
          ink: "var(--color-primary-ink)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          dark: "var(--color-accent-dark)",
          ink: "var(--color-accent-ink)",
        },
        olive: "var(--color-olive)",
        seafoam: "var(--color-seafoam)",
        text: {
          DEFAULT: "var(--color-text)",
          muted: "var(--color-text-muted)",
          subtle: "var(--color-text-subtle)",
        },
        background: "var(--color-background)",
        surface: {
          DEFAULT: "var(--color-surface)",
          raised: "var(--color-surface-raised)",
          dark: "var(--color-surface-dark)",
        },
        "on-dark": "var(--color-on-dark)",
        border: {
          DEFAULT: "var(--color-border)",
          hover: "var(--color-border-hover)",
        },
        danger: "var(--color-danger)",
        warn: "var(--color-warn)",
      },
      fontFamily: {
        display: ['"Fraunces Variable"', '"Fraunces Fallback"', "Georgia", "serif"],
        body: ['"Inter Variable"', '"Inter Fallback"', "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', '"Inter Fallback"', "system-ui", "sans-serif"],
      },
      fontSize: {
        // Map Tailwind sizes onto the modular type scale (clamp-based)
        "step--1": "var(--step--1)",
        "step-0":  "var(--step-0)",
        "step-1":  "var(--step-1)",
        "step-2":  "var(--step-2)",
        "step-3":  "var(--step-3)",
        "step-4":  "var(--step-4)",
        "step-5":  "var(--step-5)",
        "step-6":  "var(--step-6)",
      },
      spacing: {
        "s-1": "var(--space-1)",
        "s-2": "var(--space-2)",
        "s-3": "var(--space-3)",
        "s-4": "var(--space-4)",
        "s-5": "var(--space-5)",
        "s-6": "var(--space-6)",
        "s-7": "var(--space-7)",
        "s-8": "var(--space-8)",
        "s-9": "var(--space-9)",
        "s-10": "var(--space-10)",
        "s-11": "var(--space-11)",
        "s-12": "var(--space-12)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        in: "var(--ease-in)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s var(--ease-out) forwards",
        "fade-in": "fade-in 0.4s var(--ease-out) forwards",
        "slide-up": "slide-up 0.5s var(--ease-out) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
