import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['var(--font-jockey)'],
        mono: ['var(--font-roboto-mono)'],
      },
      boxShadow: {
        'purple': '0 4px 6px -1px rgba(129, 90, 245, 0.1), 0 2px 4px -2px rgba(129, 90, 245, 0.1)', // Example for purple shadow
      },
    },
  },
  plugins: [],
};
export default config;
