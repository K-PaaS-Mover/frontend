/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        pthin: ["Pretendard-Thin", "sans-serif"],
        pextralight: ["Pretendard-ExtraLight", "sans-serif"],
        plight: ["Pretendard-Light", "sans-serif"],
        pregular: ["Pretendard-Regular", "sans-serif"],
        pmedium: ["Pretendard-Medium", "sans-serif"],
        psemibold: ["Pretendard-SemiBold", "sans-serif"],
        pbold: ["Pretendard-Bold", "sans-serif"],
        pextrabold: ["Pretendard-ExtraBold", "sans-serif"],
        pblack: ["Pretendard-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
