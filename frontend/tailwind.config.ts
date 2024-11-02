/** @format */

import type { Config } from "tailwindcss";
import daisyui from "daisyui";
const config: Config = {
  daisyui: {
    themes: ["light"],
  },

  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#d70a6a",
      },
    },
  },
  plugins: [daisyui],
};
export default config;
