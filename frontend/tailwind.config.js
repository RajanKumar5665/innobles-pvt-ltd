export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blog: {
          base: "#000000",
          raised: "#f9f9f9",
          red: "#b61316",
          paper: "#ffffff",
          "paper-muted": "#dedede",
          ink: "#212529",
          muted: "#60656c",
          line: "#dedede",
        },
        primary: "#00BCD4",
        accent: "#F7941D",
        brand: {
          orange: "#F7941D",
          yellow: "#FFC928",
          cyan: "#00BCD4",
        },
        dark: "#F8FAFC",
        ink: "#1A2332",
        muted: "#64748B",
        line: "#E8EDF3",
        surface: "#FFFFFF",
        career: {
          orange: "#ff7200",
          "orange-hover": "#f56700",
          black: "#0b0b0b",
          ink: "#171717",
          gray: "#737373",
          light: "#8a8a8a",
          border: "#e8e8e8",
          line: "#eeeeee",
          soft: "#fafafa",
          "orange-light": "#fff4eb",
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
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #F7941D 0%, #FFC928 50%, #00BCD4 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, #FFF7ED 0%, #FFFBEB 45%, #ECFEFF 100%)",
      },
    },
  },
  plugins: [],
};
