import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0f1f",
        bg2: "#0d1428",
        card: "#121a33",
        card2: "#161f40",
        border: "#232c4f",
        muted: "#8c96bf",
        blue: "#5b8def",
        purple: "#9b6bf2",
        good: "#3ecf8e",
        warn: "#f2a93b",
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        grad: "linear-gradient(135deg,#5b8def,#9b6bf2)",
      },
    },
  },
  plugins: [],
};
export default config;
