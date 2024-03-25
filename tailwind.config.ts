import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        ragnarok:
          "0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)",
        aesthetic: "0_3px_10px_rgb(0,0,0,0.2)",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        pulse: "pulse 2s infinite",
        shine: "shine 1s",
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
        amber: {
          "50": "#FFFDF2",
          "100": "#FFFBE6",
          "200": "#FFF5C2",
          "300": "#FFED9E",
          "400": "#FFD754",
          "500": "#FFBE0B",
          "600": "#E6A309",
          "700": "#BF7E06",
          "800": "#995B03",
          "900": "#733E02",
          "950": "#4A2301",
        },
        "international-orange": {
          "50": "#FFFAF2",
          "100": "#FFF5E6",
          "200": "#FFE4C2",
          "300": "#FCCD9A",
          "400": "#FC9851",
          "500": "#FB5607",
          "600": "#E04807",
          "700": "#BA3704",
          "800": "#962803",
          "900": "#701B01",
          "950": "#470F01",
        },
        rose: {
          "50": "#FFF2FB",
          "100": "#FFE6F7",
          "200": "#FFBFE9",
          "300": "#FF99D6",
          "400": "#FF4DA9",
          "500": "#FF006E",
          "600": "#E60060",
          "700": "#BF0049",
          "800": "#990036",
          "900": "#730024",
          "950": "#4A0015",
        },
        "purple-heart": {
          "50": "#FCF5FF",
          "100": "#F6E8FC",
          "200": "#E8CAFA",
          "300": "#DAADF7",
          "400": "#B272F2",
          "500": "#8338EC",
          "600": "#722FD6",
          "700": "#5620B3",
          "800": "#3D148F",
          "900": "#280C6B",
          "950": "#160545",
        },
        "azure-radiance": {
          "50": "#F5FCFF",
          "100": "#EBF8FF",
          "200": "#CFECFF",
          "300": "#B0DDFF",
          "400": "#75B8FF",
          "500": "#3A86FF",
          "600": "#3073E6",
          "700": "#2155BF",
          "800": "#153D99",
          "900": "#0B2973",
          "950": "#05164A",
        },
      },
    },
    keyframes: {
      shine: {
        "100%": { left: "125%" },
      },
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
