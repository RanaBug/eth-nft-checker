import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#13072E",
        "dark-medium-purple": "#201042",
        "medium-purple": "#3F2182",
        "light-purple": "#B3AAFF",
        "light-green": "#FF97E8",
      },
      fontFamily: {
        sans: ["var(--font-dmsans)"],
      },
    },
  },
  plugins: [],
};
export default config;
