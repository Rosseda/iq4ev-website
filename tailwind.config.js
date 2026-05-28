/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        iq: {
          orange: "#ff6600",
          pink: "#ff2d55",
          dark: "#020617",
          muted: "#64748b",
          soft: "#f8fafc",
        },
      },
    },
  },
  plugins: [],
};