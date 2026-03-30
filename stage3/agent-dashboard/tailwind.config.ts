import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        shell: "#0b1220",
        card: "#121b2e",
        border: "#25344d",
        ok: "#25c275",
        warn: "#eab308",
        fail: "#ef4444",
        brand: "#38bdf8"
      }
    }
  },
  plugins: []
};

export default config;
