import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // T∞bL∞p Brand Colors
        primary: {
          DEFAULT: '#8F7CFF', // Primary Purple
          hover: '#C6B7FF',   // Soft Lavender
        },
        secondary: {
          DEFAULT: '#6A6FD9', // Cool Blue-Purple
          hover: '#8F7CFF',
        },
        accent: {
          pink: '#F2B6E8',      // Pastel Pink
          lilac: '#E6DFFF',     // Light Lilac
          highlight: '#F5C3EE', // Soft Pink Highlight
        },
        dark: {
          bg: '#090617',      // Primary Background (matches logo)
          surface: '#14172B', // Secondary Dark Surface
          panel: '#1A1D2E',   // Tertiary panel color
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
