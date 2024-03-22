/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        whisper: ["Whisper", "cursive"],
        oswald: ["Oswald", "sans-serif"],
        slackside: ["Slackside One", "cursive"],
        madimi: ["Madimi One", "sans-serif"],
      },
      animation: {
        progress: "progress 1s infinite linear",
      },
      keyframes: {
        progress: {
          "0%": { transform: " translateX(0) scaleX(0)" },
          "40%": { transform: "translateX(0) scaleX(0.4)" },
          "100%": { transform: "translateX(100%) scaleX(0.5)" },
        },
      },
      transformOrigin: {
        "left-right": "0% 50%",
      },
    },
  },
  plugins: [],
};
