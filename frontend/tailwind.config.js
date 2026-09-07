export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* ------------------------------------------------------------------
           ONE global design system — Innobles
           Primary navy  #172B3A · Dark navy #0F172A · Accent orange #FF9866
           White #FFFFFF · Light surface #F8FAFC · Border #E2E8F0
        ------------------------------------------------------------------ */
        primary: "#172B3A",
        "primary-dark": "#0F172A",
        accent: "#FF9866",
        "accent-hover": "#F0703F",
        background: "#FFFFFF",
        surface: "#FFFFFF",
        "light-surface": "#F8FAFC",
        text: "#172B3A",
        "text-secondary": "#64748B",
        "text-muted": "#94A3B8",

        /* Backward-compatible aliases used across the codebase. */
        dark: "#F8FAFC", // light surface (used by ErrorBoundary / light sections)
        ink: "#172B3A",
        muted: "#64748B",
        line: "#E2E8F0",

        /* Brand aliases — all mapped into the navy/orange system. */
        brand: {
          orange: "#FF9866",
          yellow: "#F0703F", // accent-hover (legacy hover role)
          cyan: "#172B3A", // navy primary (legacy cyan role)
        },

        /* Careers design system — mapped into the same palette. */
        career: {
          orange: "#FF9866",
          "orange-hover": "#F0703F",
          black: "#172B3A",
          ink: "#172B3A",
          gray: "#64748B",
          light: "#94A3B8",
          border: "#E2E8F0",
          line: "#E2E8F0",
          soft: "#F8FAFC",
          "orange-light": "#FFE9DE",
        },

        /* Blog design system — mapped into the same palette. */
        blog: {
          base: "#172B3A",
          raised: "#F8FAFC",
          red: "#FF9866",
          paper: "#FFFFFF",
          "paper-muted": "#E2E8F0",
          ink: "#172B3A",
          muted: "#64748B",
          line: "#E2E8F0",
        },
        charcoal: "#303438",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        disp: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

