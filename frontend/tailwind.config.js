export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* ------------------------------------------------------------------
           ONE global design system — Innobles
           Primary navy  #172033 · Dark navy #0F172A · Accent orange #F59E0B
           White #FFFFFF · Light surface #F8FAFC · Border #E2E8F0
        ------------------------------------------------------------------ */
        primary: "#172033",
        "primary-dark": "#0F172A",
        accent: "#F59E0B",
        "accent-hover": "#D97706",
        background: "#FFFFFF",
        surface: "#FFFFFF",
        "light-surface": "#F8FAFC",
        text: "#172033",
        "text-secondary": "#64748B",
        "text-muted": "#94A3B8",

        /* Backward-compatible aliases used across the codebase. */
        dark: "#F8FAFC", // light surface (used by ErrorBoundary / light sections)
        ink: "#172033",
        muted: "#64748B",
        line: "#E2E8F0",

        /* Brand aliases — all mapped into the navy/orange system. */
        brand: {
          orange: "#F59E0B",
          yellow: "#D97706", // accent-hover (legacy hover role)
          cyan: "#172033", // navy primary (legacy cyan role)
        },

        /* Careers design system — mapped into the same palette. */
        career: {
          orange: "#F59E0B",
          "orange-hover": "#D97706",
          black: "#0F172A",
          ink: "#172033",
          gray: "#64748B",
          light: "#94A3B8",
          border: "#E2E8F0",
          line: "#E2E8F0",
          soft: "#F8FAFC",
          "orange-light": "#FEF3C7",
        },

        /* Blog design system — mapped into the same palette. */
        blog: {
          base: "#172033",
          raised: "#F8FAFC",
          red: "#F59E0B",
          paper: "#FFFFFF",
          "paper-muted": "#E2E8F0",
          ink: "#172033",
          muted: "#64748B",
          line: "#E2E8F0",
        },
      },
      fontFamily: {
        disp: ["Poppins", "sans-serif"],
        sans: ["Poppins", "sans-serif"],
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

