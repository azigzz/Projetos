import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#E1C696",
        pageAlt: "#E2C799",
        cover: "#5A3825",
        ink: "#111111",
        cream: "#F3E7DD",
        blueAccent: "#0878F2",
        purpleAccent: "#A855F7",
        orangeAccent: "#FF5A1F",
        greenAccent: "#00B847",
      },
      boxShadow: {
        paper: "0 18px 55px rgba(17, 17, 17, 0.14)",
        soft: "0 10px 35px rgba(90, 56, 37, 0.14)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
