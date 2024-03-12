import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        pulse: "pulse 2s infinite",
      },
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },
      colors: {
        blue: {
          400: "#2589FE",
          500: "#0070F3",
          600: "#2F6FEB",
        },
      },
    },
    keyframes: {
      wiggle: {
        "0%, 100%": { transform: "rotate(-3deg)" },
        "50%": { transform: "rotate(3deg)" },
      },
      pulse: {
        "0%": {
          transform: "scale(0.95)",
          boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.7)",
        },

        "70%": {
          transform: "scale(1)",
          boxShadow: "0 0 0 10px rgba(0, 0, 0, 0)",
        },

        "100%": {
          transform: "scale(0.95)",
          boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
        },
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
export default config;
